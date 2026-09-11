// Beastward individual placement fix
// Uses the selected physical beast directly, so duplicate species and six-beast squads place reliably.
(()=>{
let selectedUid=null;
function instance(uid){return (save.beastInstances||[]).find(x=>x&&x.uid===uid)||null}
function currentSquad(){return (save.lastInstanceLoadout||[]).filter(u=>instance(u)).slice(0,6)}

choices=function(){
  const w=$('#towerChoices');if(!w)return;w.innerHTML='';
  currentSquad().forEach(uid=>{
    const i=instance(uid),b=beasts[i.species],s=stageStats(uid),placed=towers.some(t=>t.instanceUid===uid),el=document.createElement('button');
    el.className='tower-choice'+(placed?' instance-used':'');el.disabled=placed;
    el.innerHTML=`${stageSpriteMarkup(i.species,evolutionStage(uid),'tower-list-sprite')}<div><b>${nameFor(uid)} <em>#${uid.slice(-4).toUpperCase()}</em></b><small>Lv ${i.level} • ★${i.ascension} • ${b.cost} gold${placed?' • DEPLOYED':''}</small><small>POW ${s.power} • SPD ${s.speed} • RNG ${s.range}</small></div>`;
    el.onclick=()=>{
      if(placed)return;
      selectedUid=uid;selectedSpecies=i.species;selectedTower=null;
      renderSelectedTower();
      document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
    };
    w.appendChild(el);
  });
};

const c=document.querySelector('#gameCanvas')||document.querySelector('canvas');
if(c){
  c.addEventListener('pointerdown',e=>{
    if(!selectedUid)return;
    const i=instance(selectedUid);if(!i||!currentSquad().includes(selectedUid)){selectedUid=null;return}
    if(towers.some(t=>t.instanceUid===selectedUid)){selectedUid=null;selectedSpecies=null;choices();return}
    const r=c.getBoundingClientRect(),x=(e.clientX-r.left)*c.width/r.width,y=(e.clientY-r.top)*c.height/r.height;
    const existing=towers.find(t=>Math.hypot(t.x-x,t.y-y)<=40);
    if(existing)return;
    const b=beasts[i.species];
    if(gold<b.cost||distPath(x,y)<55||blockedByScenery(x,y)||towers.some(t=>Math.hypot(t.x-x,t.y-y)<64))return;
    e.preventDefault();e.stopImmediatePropagation();
    const placed={x,y,b:battleStats(selectedUid),instanceUid:selectedUid,cool:0,baseCost:b.cost,spent:b.cost,powerTier:0,specialTier:0,skillTier:0,targetMode:'first'};
    towers.push(placed);if(running)waveParticipants.add(selectedUid);gold-=b.cost;
    selectedTower=placed;selectedSpecies=null;selectedUid=null;
    document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));
    ui();renderSelectedTower();choices();
  },true);
}

const sell=$('#sellTowerBtn');if(sell){const old=sell.onclick;sell.onclick=e=>{const r=old?.call(sell,e);setTimeout(choices,0);return r}}
try{choices()}catch(e){}
document.documentElement.dataset.individualPlacement='fixed-v1';
})();