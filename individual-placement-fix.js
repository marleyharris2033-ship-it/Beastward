// Beastward individual placement fix v2
// Supports tap-to-select AND drag-to-place, while keeping the upgrade panel closed after deployment.
(()=>{
let selectedUid=null,dragUid=null,dragging=false,dragGhost=null,suppressClick=false;
function instance(uid){return (save.beastInstances||[]).find(x=>x&&x.uid===uid)||null}
function currentSquad(){return (save.lastInstanceLoadout||[]).filter(u=>instance(u)).slice(0,6)}
function canvas(){return document.querySelector('#gameCanvas')||document.querySelector('canvas')}
function canvasPoint(clientX,clientY){const c=canvas();if(!c)return null;const r=c.getBoundingClientRect();if(clientX<r.left||clientX>r.right||clientY<r.top||clientY>r.bottom)return null;return{x:(clientX-r.left)*c.width/r.width,y:(clientY-r.top)*c.height/r.height}}
function canPlace(uid,x,y){const i=instance(uid);if(!i||!currentSquad().includes(uid)||towers.some(t=>t.instanceUid===uid))return false;const b=beasts[i.species];return gold>=b.cost&&distPath(x,y)>=55&&!blockedByScenery(x,y)&&!towers.some(t=>Math.hypot(t.x-x,t.y-y)<64)}
function place(uid,x,y){const i=instance(uid);if(!i||!canPlace(uid,x,y))return false;const b=beasts[i.species];const placed={x,y,b:battleStats(uid),instanceUid:uid,cool:0,baseCost:b.cost,spent:b.cost,powerTier:0,specialTier:0,skillTier:0,targetMode:'first'};towers.push(placed);if(running)waveParticipants.add(uid);gold-=b.cost;
  // Deployment is not a tower-selection action. Keep upgrades closed until the player taps the placed tower.
  selectedTower=null;selectedSpecies=null;selectedUid=null;
  document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));
  ui();renderSelectedTower();choices();return true}
function removeGhost(){dragGhost?.remove();dragGhost=null}
function moveGhost(e){if(!dragGhost)return;dragGhost.style.left=e.clientX+'px';dragGhost.style.top=e.clientY+'px';const p=canvasPoint(e.clientX,e.clientY);dragGhost.classList.toggle('valid',!!(p&&canPlace(dragUid,p.x,p.y)));dragGhost.classList.toggle('invalid',!(p&&canPlace(dragUid,p.x,p.y)))}
function beginDrag(uid,e){if(e.pointerType==='mouse'&&e.button!==0)return;dragUid=uid;dragging=false;const sx=e.clientX,sy=e.clientY;
  const move=ev=>{if(!dragUid)return;if(!dragging&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>8){dragging=true;suppressClick=true;const i=instance(dragUid);dragGhost=document.createElement('div');dragGhost.className='tower-drag-ghost';dragGhost.innerHTML=stageSpriteMarkup(i.species,evolutionStage(dragUid),'tower-drag-sprite');document.body.appendChild(dragGhost)}if(dragging){ev.preventDefault();moveGhost(ev)}};
  const up=ev=>{document.removeEventListener('pointermove',move,true);document.removeEventListener('pointerup',up,true);if(dragging){ev.preventDefault();ev.stopPropagation();const p=canvasPoint(ev.clientX,ev.clientY);if(p)place(dragUid,p.x,p.y);setTimeout(()=>suppressClick=false,0)}removeGhost();dragUid=null;dragging=false};
  document.addEventListener('pointermove',move,{capture:true,passive:false});document.addEventListener('pointerup',up,true)}

choices=function(){
  const w=$('#towerChoices');if(!w)return;w.innerHTML='';
  currentSquad().forEach(uid=>{
    const i=instance(uid),b=beasts[i.species],s=stageStats(uid),placed=towers.some(t=>t.instanceUid===uid),el=document.createElement('button');
    el.className='tower-choice'+(placed?' instance-used':'');el.disabled=placed;
    el.innerHTML=`${stageSpriteMarkup(i.species,evolutionStage(uid),'tower-list-sprite')}<div><b>${nameFor(uid)} <em>#${uid.slice(-4).toUpperCase()}</em></b><small>Lv ${i.level} • ★${i.ascension} • ${b.cost} gold${placed?' • DEPLOYED':''}</small><small>POW ${s.power} • SPD ${s.speed} • RNG ${s.range}</small></div>`;
    el.addEventListener('pointerdown',e=>{if(!placed)beginDrag(uid,e)});
    el.onclick=()=>{
      if(placed||suppressClick)return;
      selectedUid=uid;selectedSpecies=i.species;selectedTower=null;
      renderSelectedTower();
      document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
    };
    w.appendChild(el);
  });
};

const c=canvas();
if(c){
  c.addEventListener('pointerdown',e=>{
    if(!selectedUid)return;
    const p=canvasPoint(e.clientX,e.clientY);if(!p)return;
    const existing=towers.find(t=>Math.hypot(t.x-p.x,t.y-p.y)<=40);if(existing)return;
    if(!canPlace(selectedUid,p.x,p.y))return;
    e.preventDefault();e.stopImmediatePropagation();place(selectedUid,p.x,p.y);
  },true);
}

const style=document.createElement('style');style.textContent=`
.tower-choice{touch-action:none}
.tower-drag-ghost{position:fixed;z-index:99999;pointer-events:none;transform:translate(-50%,-50%);width:72px;height:72px;display:grid;place-items:center;border-radius:50%;background:#13261ccc;border:2px solid #d8bc62;box-shadow:0 8px 28px #0009;opacity:.92}
.tower-drag-ghost.invalid{border-color:#d95b5b;filter:saturate(.65)}.tower-drag-ghost.valid{border-color:#70d98a}
.tower-drag-ghost .tower-drag-sprite,.tower-drag-ghost img,.tower-drag-ghost svg{max-width:62px!important;max-height:62px!important;width:62px!important;height:62px!important;object-fit:contain}
`;document.head.appendChild(style);
const sell=$('#sellTowerBtn');if(sell){const old=sell.onclick;sell.onclick=e=>{const r=old?.call(sell,e);setTimeout(choices,0);return r}}
try{choices()}catch(e){}
document.documentElement.dataset.individualPlacement='fixed-v2';
})();