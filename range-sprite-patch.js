// Beastward sprite/runtime patch: reliable drag placement + clean Safari-safe fallback art
(() => {
  const custom = {
    shadepup:{sprite:'assets/sprites/shadepup.svg',tower:'assets/sprites/shadepup.svg'},
    scorchick:{sprite:'assets/sprites/scorchick.svg',tower:'assets/sprites/scorchick.svg'},
    voidling:{sprite:'assets/sprites/voidling.svg',tower:'assets/sprites/voidling.svg'}
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
      const img=spriteImgs[dragSpecies];
      if(img&&img.complete){
        ctx.save();
        ctx.globalAlpha=valid?.90:.60;
        ctx.drawImage(img,pointer.x-37,pointer.y-37,74,74);
        ctx.restore();
      }
    }
  };

})();
