// Beastward sprite/runtime patch: reliable drag placement + clean Safari-safe fallback art
(() => {
  const custom = {
    shadepup:{sprite:'assets/pixel/shadepup.png?v=39',tower:'assets/pixel/shadepup.png?v=39'},
    scorchick:{sprite:'assets/pixel/scorchick.png?v=39',tower:'assets/pixel/scorchick.png?v=39'},
    voidling:{sprite:'assets/pixel/voidling.png?v=39',tower:'assets/pixel/voidling.png?v=39'}
  };

  Object.entries(custom).forEach(([id,art])=>{
    if(!beasts[id])return;
    beasts[id].sprite=art.sprite;
    beasts[id].towerSprite=art.tower;
    const img=new Image();
    img.onerror=()=>{img.src='assets/sprites/'+id+'.svg'};
    img.src=art.tower;
    spriteImgs[id]=img;
  });

  // Stage 2 used to rely on one CSS/canvas sprite sheet. Mobile Safari could
  // leave those cells blank, so each first evolution now loads directly from
  // its own SVG. The original sheet remains only as a legacy fallback source.
  const stage2IndividualImgs={};
  stage2SpeciesOrder.forEach(id=>{
    const img=new Image();
    img.onerror=()=>{img.src=beasts[id].sprite};
    img.src='assets/pixel/evolved/'+id+'_2.svg?v=58';
    stage2IndividualImgs[id]=img;
    evolutionSpriteImgs[id]=evolutionSpriteImgs[id]||{};
    evolutionSpriteImgs[id][2]=img;
  });

  const originalSpritePathForStage=spritePathForStage;
  spritePathForStage=function(id,stage=1){
    if(stage===2)return 'assets/pixel/evolved/'+id+'_2.svg?v=58';
    return originalSpritePathForStage(id,stage);
  };
  currentSprite=function(id){return spritePathForStage(id,evolutionStage(id))};

  const originalStageSpriteMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
    if(stage!==2)return originalStageSpriteMarkup(id,stage,extra,unseen);
    const b=beasts[id],name=nameForStage(id,stage),src=spritePathForStage(id,2);
    return `<span class="stage-sprite stage-2 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}">
      <img class="stage-form stage2-direct-form" src="${src}" alt="${unseen?'Undiscovered beast':name}">
    </span>`;
  };

  // game-core still draws Stage 2 towers by cropping stage2SheetImg. Intercept
  // just those crop calls and substitute the matching direct evolution image.
  // This fixes battle towers and drag previews without disturbing other canvas art.
  const nativeDrawImage=CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage=function(image,...args){
    if(image===stage2SheetImg&&args.length===8){
      const sx=args[0],sy=args[1];
      const col=Math.max(0,Math.round(sx/128));
      const row=Math.max(0,Math.round(sy/128));
      const id=stage2SpeciesOrder[row*5+col];
      const replacement=id&&stage2IndividualImgs[id];
      if(replacement&&replacement.complete&&replacement.naturalWidth){
        return nativeDrawImage.call(this,replacement,args[4],args[5],args[6],args[7]);
      }
    }
    return nativeDrawImage.call(this,image,...args);
  };

  let pointer=null,dragSpecies=null,dragPointerId=null,dragging=false,suppressClick=false;

  const canvasPosFromClient=(clientX,clientY)=>{
    const r=canvas.getBoundingClientRect();
    return {
      x:(clientX-r.left)*canvas.width/r.width,
      y:(clientY-r.top)*canvas.height/r.height,
      inside:clientX>=r.left&&clientX<=r.right&&clientY>=r.top&&clientY<=r.bottom
    };
  };
  const pointerPos=e=>canvasPosFromClient(e.clientX,e.clientY);

  function placementValid(x,y,b){
    return !!b&&gold>=b.cost&&distPath(x,y)>=55&&!blockedByScenery(x,y)&&!towers.some(t=>Math.hypot(t.x-x,t.y-y)<64);
  }

  function rangeRing(x,y,range,colour,valid=true){
    ctx.save();
    ctx.fillStyle=valid?colour:'#ff5959';
    ctx.globalAlpha=.20;
    ctx.beginPath();ctx.arc(x,y,range,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.92;
    ctx.strokeStyle=valid?colour:'#ff6b6b';
    ctx.lineWidth=3;ctx.setLineDash([10,7]);
    ctx.beginPath();ctx.arc(x,y,range,0,Math.PI*2);ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha=.42;ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(x,y,Math.max(18,range-8),0,Math.PI*2);ctx.stroke();
    ctx.restore();
  }

  function beginDrag(e,el,id){
    if(gold<beasts[id].cost)return;
    e.preventDefault();
    dragSpecies=id;
    dragPointerId=e.pointerId;
    dragging=true;
    suppressClick=true;
    selectedSpecies=null;
    selectedTower=null;
    renderSelectedTower();
    pointer=pointerPos(e);
    document.querySelectorAll('.tower-choice').forEach(x=>x.classList.toggle('dragging',x===el));
    try{el.setPointerCapture(e.pointerId)}catch(_){}
  }

  function placeDraggedBeast(id,pos){
    const b=beasts[id];
    if(!pos.inside||!placementValid(pos.x,pos.y,b))return false;
    const placed={x:pos.x,y:pos.y,b:battleStats(id),cool:0,baseCost:b.cost,spent:b.cost,powerTier:0,specialTier:0,skillTier:0};
    towers.push(placed);
    if(running)waveParticipants.add(id);
    gold-=b.cost;

    // Do not leave the placed beast selected: range disappears immediately.
    selectedTower=null;
    selectedSpecies=null;
    pointer=null;
    document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected','dragging'));
    ui();renderSelectedTower();
    return true;
  }

  function installDragHandlers(){
    document.querySelectorAll('.tower-choice').forEach(el=>{
      if(el.dataset.dragReady)return;
      el.dataset.dragReady='1';
      const id=save.unlocked.find(id=>el.textContent.includes(nameFor(id)))||save.unlocked[[...el.parentNode.children].indexOf(el)];
      if(!id)return;
      el.onclick=e=>{
        if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false}
      };
      el.addEventListener('pointerdown',e=>beginDrag(e,el,id),{passive:false});
    });
  }

  const originalChoices=choices;
  choices=function(){originalChoices();installDragHandlers()};
  choices();

  document.addEventListener('pointermove',e=>{
    if(!dragging||e.pointerId!==dragPointerId)return;
    e.preventDefault();
    pointer=pointerPos(e);
  },{passive:false});

  document.addEventListener('pointerup',e=>{
    if(!dragging||e.pointerId!==dragPointerId)return;
    e.preventDefault();
    const pos=pointerPos(e),id=dragSpecies;
    placeDraggedBeast(id,pos);
    dragging=false;dragSpecies=null;dragPointerId=null;pointer=null;
    document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('dragging'));
    setTimeout(()=>{suppressClick=false},0);
  },{passive:false});

  document.addEventListener('pointercancel',e=>{
    if(e.pointerId!==dragPointerId)return;
    dragging=false;dragSpecies=null;dragPointerId=null;pointer=null;
    document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('dragging'));
  });

  canvas.addEventListener('pointermove',e=>{if(!dragging)pointer=pointerPos(e)});
  canvas.addEventListener('pointerleave',()=>{if(!dragging)pointer=null});

  const baseDraw=draw;
  draw=function(){
    baseDraw();

    // Range only appears while inspecting a beast or actively dragging one.
    if(selectedTower){
      rangeRing(selectedTower.x,selectedTower.y,selectedTower.b.range,selectedTower.b.color||'#ffe17b',true);
    }

    if(dragging&&dragSpecies&&pointer){
      const b=battleStats(dragSpecies);
      const valid=pointer.inside&&placementValid(pointer.x,pointer.y,beasts[dragSpecies]);
      rangeRing(pointer.x,pointer.y,b.range,b.color||'#ffe17b',valid);
      const stage=evolutionStage(dragSpecies);
      ctx.save();
      ctx.globalAlpha=valid?.92:.62;
      if(stage===2){
        const img=stage2IndividualImgs[dragSpecies];
        if(img&&img.complete&&img.naturalWidth){const size=78;ctx.drawImage(img,pointer.x-size/2,pointer.y-size/2,size,size)}
      }else{
        const img=stage===3?(evolutionSpriteImgs[dragSpecies]?.[3]||spriteImgs[dragSpecies]):spriteImgs[dragSpecies];
        if(img&&img.complete){
          const size=stage===3?82:74;
          ctx.drawImage(img,pointer.x-size/2,pointer.y-size/2,size,size);
        }
      }
      ctx.restore();
    }
  };

})();
