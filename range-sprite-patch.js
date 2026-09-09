// Beastward sprite/runtime patch: reliable drag placement + battle quality-of-life
(() => {
  const custom={shadepup:{sprite:'assets/pixel/shadepup.png?v=39',tower:'assets/pixel/shadepup.png?v=39'},scorchick:{sprite:'assets/pixel/scorchick.png?v=39',tower:'assets/pixel/scorchick.png?v=39'},voidling:{sprite:'assets/pixel/voidling.png?v=39',tower:'assets/pixel/voidling.png?v=39'}};
  Object.entries(custom).forEach(([id,art])=>{if(!beasts[id])return;beasts[id].sprite=art.sprite;beasts[id].towerSprite=art.tower;const img=new Image();img.onerror=()=>{img.src='assets/sprites/'+id+'.svg'};img.src=art.tower;spriteImgs[id]=img});

  const originalStageSpriteMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){if(stage!==2)return originalStageSpriteMarkup(id,stage,extra,unseen);const b=beasts[id],name=nameForStage(id,2),src=`assets/pixel/evolved/${id}_2.svg?v=65`;return `<span class="stage-sprite stage-2 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;opacity:${unseen?'.86':'1'}!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`};
  Object.keys(beasts).forEach(id=>{const img=new Image();img.onerror=()=>{img.src=beasts[id].sprite};img.src=`assets/pixel/evolved/${id}_2.svg?v=65`;evolutionSpriteImgs[id][2]=img});

  let pointer=null,dragSpecies=null,dragPointerId=null,dragging=false,suppressClick=false;
  const canvasPosFromClient=(clientX,clientY)=>{const r=canvas.getBoundingClientRect();return{x:(clientX-r.left)*canvas.width/r.width,y:(clientY-r.top)*canvas.height/r.height,inside:clientX>=r.left&&clientX<=r.right&&clientY>=r.top&&clientY<=r.bottom}};
  const pointerPos=e=>canvasPosFromClient(e.clientX,e.clientY);
  function placementValid(x,y,b){return !!b&&gold>=b.cost&&distPath(x,y)>=55&&!blockedByScenery(x,y)&&!towers.some(t=>Math.hypot(t.x-x,t.y-y)<64)}
  function placementReason(pos,id){const b=beasts[id];if(!b)return '';if(!pos||!pos.inside)return 'DRAG ONTO THE FIELD';if(gold<b.cost)return 'NOT ENOUGH GOLD';if(distPath(pos.x,pos.y)<55)return 'TOO CLOSE TO THE PATH';if(blockedByScenery(pos.x,pos.y))return 'BLOCKED BY SCENERY';if(towers.some(t=>Math.hypot(t.x-pos.x,t.y-pos.y)<64))return 'TOO CLOSE TO ANOTHER BEAST';return 'RELEASE TO DEPLOY'}
  function rangeRing(x,y,range,colour,valid=true){ctx.save();ctx.fillStyle=valid?colour:'#ff5959';ctx.globalAlpha=.20;ctx.beginPath();ctx.arc(x,y,range,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.92;ctx.strokeStyle=valid?colour:'#ff6b6b';ctx.lineWidth=3;ctx.setLineDash([10,7]);ctx.beginPath();ctx.arc(x,y,range,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=.42;ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,Math.max(18,range-8),0,Math.PI*2);ctx.stroke();ctx.restore()}

  const board=document.querySelector('.battle-board');
  const placementHint=document.createElement('div');
  placementHint.id='placementHint';placementHint.className='placement-hint';placementHint.hidden=true;
  if(board)board.appendChild(placementHint);
  function updatePlacementHint(){if(!placementHint)return;if(!dragging||!dragSpecies){placementHint.hidden=true;return}const reason=placementReason(pointer,dragSpecies);placementHint.textContent=reason;placementHint.hidden=false;placementHint.classList.toggle('valid',reason==='RELEASE TO DEPLOY')}

  function beginDrag(e,el,id){if(gold<beasts[id].cost)return;e.preventDefault();dragSpecies=id;dragPointerId=e.pointerId;dragging=true;suppressClick=true;selectedSpecies=null;selectedTower=null;renderSelectedTower();pointer=pointerPos(e);updatePlacementHint();document.querySelectorAll('.tower-choice').forEach(x=>x.classList.toggle('dragging',x===el));try{el.setPointerCapture(e.pointerId)}catch(_){}}
  function placeDraggedBeast(id,pos){const b=beasts[id];if(!pos.inside||!placementValid(pos.x,pos.y,b))return false;const placed={x:pos.x,y:pos.y,b:battleStats(id),cool:0,baseCost:b.cost,spent:b.cost,powerTier:0,specialTier:0,skillTier:0,targetMode:'first'};towers.push(placed);if(running)waveParticipants.add(id);gold-=b.cost;selectedTower=null;selectedSpecies=null;pointer=null;document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected','dragging'));ui();renderSelectedTower();return true}
  function installDragHandlers(){document.querySelectorAll('.tower-choice').forEach(el=>{if(el.dataset.dragReady)return;el.dataset.dragReady='1';const id=save.unlocked.find(id=>el.textContent.includes(nameFor(id)))||save.unlocked[[...el.parentNode.children].indexOf(el)];if(!id)return;el.onclick=e=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false}};el.addEventListener('pointerdown',e=>beginDrag(e,el,id),{passive:false})})}
  const originalChoices=choices;choices=function(){originalChoices();installDragHandlers()};choices();
  document.addEventListener('pointermove',e=>{if(!dragging||e.pointerId!==dragPointerId)return;e.preventDefault();pointer=pointerPos(e);updatePlacementHint()},{passive:false});
  document.addEventListener('pointerup',e=>{if(!dragging||e.pointerId!==dragPointerId)return;e.preventDefault();const pos=pointerPos(e),id=dragSpecies;placeDraggedBeast(id,pos);dragging=false;dragSpecies=null;dragPointerId=null;pointer=null;updatePlacementHint();document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('dragging'));setTimeout(()=>{suppressClick=false},0)},{passive:false});
  document.addEventListener('pointercancel',e=>{if(e.pointerId!==dragPointerId)return;dragging=false;dragSpecies=null;dragPointerId=null;pointer=null;updatePlacementHint();document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('dragging'))});
  canvas.addEventListener('pointermove',e=>{if(!dragging)pointer=pointerPos(e)});canvas.addEventListener('pointerleave',()=>{if(!dragging)pointer=null});

  const startBtn=document.getElementById('startWaveBtn'),livesEl=document.getElementById('lives'),hud=document.querySelector('.battle-hud'),gameScreen=document.getElementById('gameScreen');
  let autoWave=localStorage.getItem('beastwardAutoWave')==='1',autoTimer=null,autoTick=null;
  const autoBtn=document.createElement('button');autoBtn.id='autoWaveBtn';autoBtn.className='battle-action auto-wave-btn';
  if(startBtn&&hud)startBtn.insertAdjacentElement('afterend',autoBtn);
  function clearAutoCountdown(){if(autoTimer){clearTimeout(autoTimer);autoTimer=null}if(autoTick){clearInterval(autoTick);autoTick=null}}
  function setAutoWave(on,label){autoWave=!!on;localStorage.setItem('beastwardAutoWave',autoWave?'1':'0');clearAutoCountdown();autoBtn.classList.toggle('active',autoWave);autoBtn.textContent=label||(autoWave?'AUTO ON':'AUTO OFF')}
  function canAutoStart(){return autoWave&&gameScreen?.classList.contains('active')&&startBtn&&!startBtn.disabled&&/START/i.test(startBtn.textContent||'')}
  function scheduleAutoWave(){clearAutoCountdown();if(!canAutoStart()){autoBtn.textContent=autoWave?'AUTO ON':'AUTO OFF';return}const lives=Number(livesEl?.textContent||20);if(lives<=5){setAutoWave(false,'AUTO PAUSED');autoBtn.classList.add('danger');setTimeout(()=>autoBtn.classList.remove('danger'),1600);return}let left=3;autoBtn.textContent=`AUTO ${left}`;autoTick=setInterval(()=>{left--;if(left>0)autoBtn.textContent=`AUTO ${left}`},800);autoTimer=setTimeout(()=>{clearAutoCountdown();if(canAutoStart()){startBtn.click();autoBtn.textContent='AUTO ON'}},2400)}
  autoBtn.addEventListener('click',()=>{setAutoWave(!autoWave);if(autoWave)scheduleAutoWave()});
  setAutoWave(autoWave);
  if(startBtn)new MutationObserver(scheduleAutoWave).observe(startBtn,{attributes:true,childList:true,subtree:true});
  if(livesEl)new MutationObserver(()=>{if(autoWave&&Number(livesEl.textContent||20)<=5)scheduleAutoWave()}).observe(livesEl,{childList:true,subtree:true});

  const qolStyle=document.createElement('style');qolStyle.textContent=`
    .placement-hint{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);z-index:9;padding:8px 13px;border-radius:999px;background:#371b1be8;color:#ffd6d6;border:1px solid #ff7777;font-size:11px;font-weight:900;letter-spacing:.07em;pointer-events:none;box-shadow:0 4px 14px #0008}.placement-hint.valid{background:#173b2be8;color:#caffdc;border-color:#64d98b}.auto-wave-btn.active{background:#356f4b!important;border-color:#76d69a!important}.auto-wave-btn.danger{background:#8e3636!important;border-color:#ff8585!important}@media(max-width:760px){.battle-hud{gap:5px!important}.battle-hud .battle-action,.battle-hud .battle-exit,.battle-hud .speed-choice{min-height:36px!important;font-size:10px!important;padding:6px 8px!important}.auto-wave-btn{min-width:64px!important}.placement-hint{bottom:8px;font-size:10px;padding:7px 10px;max-width:82%;text-align:center}}
  `;document.head.appendChild(qolStyle);

  const baseDraw=draw;draw=function(){baseDraw();if(selectedTower)rangeRing(selectedTower.x,selectedTower.y,selectedTower.b.range,selectedTower.b.color||'#ffe17b',true);if(dragging&&dragSpecies&&pointer){const b=battleStats(dragSpecies),valid=pointer.inside&&placementValid(pointer.x,pointer.y,beasts[dragSpecies]);rangeRing(pointer.x,pointer.y,b.range,b.color||'#ffe17b',valid);const stage=evolutionStage(dragSpecies);ctx.save();ctx.globalAlpha=valid?.92:.62;const img=stage===2?(evolutionSpriteImgs[dragSpecies]?.[2]||spriteImgs[dragSpecies]):stage===3?(evolutionSpriteImgs[dragSpecies]?.[3]||spriteImgs[dragSpecies]):spriteImgs[dragSpecies];if(img&&img.complete){const size=stage===3?82:stage===2?78:74;ctx.drawImage(img,pointer.x-size/2,pointer.y-size/2,size,size)}ctx.restore()}};
})();