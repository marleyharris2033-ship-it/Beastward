// Beastward consolidated loadout system v1
// Replaces the old six-beast and sort/synergy loadout patches with one clean implementation.
(()=>{
const MAX_LOADOUT=6;
let sortMode='level';
const defs=()=>window.BeastwardSynergies?.definitions||[];
const instances=()=>[...(save.beastInstances||[])].filter(i=>i&&beasts[i.species]);
const inst=uid=>instances().find(i=>i.uid===uid);
function rarityFor(species){if(Array.isArray(epicPool)&&epicPool.includes(species))return'epic';if(Array.isArray(rarePool)&&rarePool.includes(species))return'rare';return'common'}
function rarityRank(i){return({epic:3,rare:2,common:1}[rarityFor(i.species)]||1)}
function sortedInstances(){const list=instances();return list.sort((a,b)=>{if(sortMode==='level')return(b.level||1)-(a.level||1)||beasts[a.species].name.localeCompare(beasts[b.species].name);if(sortMode==='rarity')return rarityRank(b)-rarityRank(a)||(b.level||1)-(a.level||1);if(sortMode==='type')return beasts[a.species].type.localeCompare(beasts[b.species].type)||(b.level||1)-(a.level||1);return beasts[a.species].name.localeCompare(beasts[b.species].name)||(b.level||1)-(a.level||1)})}
function ownedTypes(){return new Set(instances().map(i=>beasts[i.species].type))}
function selectedTypes(){return new Set((loadoutDraft||[]).map(inst).filter(Boolean).map(i=>beasts[i.species].type))}
function canCompose(s){const types=ownedTypes();return s.types.every(t=>types.has(t))}
function active(s){const types=selectedTypes();return s.types.every(t=>types.has(t))}

renderLoadoutPicker=function(){
  const grid=document.querySelector('#loadoutGrid'),count=document.querySelector('#loadoutCount'),start=document.querySelector('#loadoutStartBtn'),title=document.querySelector('#loadoutLevelName');
  if(!grid)return;
  if(title&&pendingLevelId){const lvl=levels.find(x=>x.id===pendingLevelId);if(lvl)title.textContent=(pendingMode==='hard'?'HARD ENDGAME • ':'')+levelCode(lvl)+' • '+lvl.name}
  grid.innerHTML='';
  sortedInstances().forEach(i=>{
    const s=stageStats(i.uid),selected=loadoutDraft.includes(i.uid),el=document.createElement('button');
    el.className='loadout-card'+(selected?' selected':'');
    el.dataset.uid=i.uid;
    el.innerHTML=`${stageSpriteMarkup(i.species,typeof stage==='function'?stage(i):evolutionStage(i.species),'loadout-sprite')}<div class="loadout-card-copy"><b>${typeof displayName==='function'?displayName(i):beasts[i.species].name} <small>#${i.uid.slice(-4).toUpperCase()}</small></b><small>Lv ${i.level} • ★${i.ascension||0} • ${beasts[i.species].type}</small><small>POW ${s.power} • SPD ${s.speed} • RNG ${s.range}</small></div><span class="loadout-check">${selected?'✓':'+'}</span>`;
    el.onclick=()=>{const n=loadoutDraft.indexOf(i.uid);if(n>=0)loadoutDraft.splice(n,1);else if(loadoutDraft.length<MAX_LOADOUT)loadoutDraft.push(i.uid);renderLoadoutPicker()};
    grid.appendChild(el);
  });
  if(count)count.textContent=loadoutDraft.length+' / '+MAX_LOADOUT+' selected';
  if(start){start.disabled=!loadoutDraft.length;start.textContent=loadoutDraft.length?'DEFEND WITH '+loadoutDraft.length:'SELECT AT LEAST 1'}
  ensureControls();
};

openLoadoutPicker=function(id){
  pendingLevelId=id;pendingMode=campaignMode;
  const valid=(save.lastInstanceLoadout||[]).filter(u=>inst(u)).slice(0,MAX_LOADOUT);
  loadoutDraft=valid.length?valid:instances().slice(0,Math.min(MAX_LOADOUT,instances().length)).map(x=>x.uid);
  renderLoadoutPicker();
  document.querySelector('#loadoutModal')?.classList.remove('hidden');
};

beginSelectedLevel=function(){
  if(!pendingLevelId||!loadoutDraft.length)return;
  battleInstanceLoadout=[...loadoutDraft].slice(0,MAX_LOADOUT);
  save.lastInstanceLoadout=[...battleInstanceLoadout];
  battleLoadout=battleInstanceLoadout.map(u=>inst(u)?.species).filter(Boolean);
  save.lastLoadout=[...battleLoadout];
  persist();
  currentLevel=levels.find(x=>x.id===pendingLevelId);path=currentLevel.path;battleMode=pendingMode;
  document.querySelector('#loadoutModal')?.classList.add('hidden');pendingLevelId=null;reset();show('gameScreen');last=performance.now();requestAnimationFrame(loop);
};

function ensureControls(){
  const top=document.querySelector('.loadout-topline');if(!top)return;
  let row=document.querySelector('#loadoutExtraControls');if(!row){row=document.createElement('div');row.id='loadoutExtraControls';row.className='loadout-extra-controls';top.insertAdjacentElement('afterend',row)}
  row.innerHTML=`<label>Sort <select id="loadoutSort"><option value="level">Level</option><option value="rarity">Rarity</option><option value="type">Type</option><option value="name">Name</option></select></label><button id="openSynergyGuide" type="button">✦ View Synergies</button>`;
  const sel=row.querySelector('#loadoutSort');sel.value=sortMode;sel.onchange=()=>{sortMode=sel.value;renderLoadoutPicker()};
  row.querySelector('#openSynergyGuide').onclick=e=>{e.preventDefault();e.stopPropagation();openGuide()};
  const hint=top.querySelector('small');if(hint)hint.textContent='Choose up to six beasts for this level.';
}
function openGuide(){
  let modal=document.querySelector('#synergyGuideModal');if(!modal){modal=document.createElement('div');modal.id='synergyGuideModal';modal.className='synergy-guide-modal';document.body.appendChild(modal)}
  const rows=defs().map(s=>{const possible=canCompose(s),on=active(s);return`<div class="synergy-guide-card ${possible?'possible':''} ${on?'active':''}"><span>${s.icon}</span><div><b>${s.name}</b><em>${s.types.join(' + ')}</em><small>${s.desc}</small></div><strong>${on?'ACTIVE':possible?'AVAILABLE':'LOCKED'}</strong></div>`}).join('');
  modal.innerHTML=`<div class="synergy-guide-backdrop"></div><section><header><div><small>TEAM BUILDING</small><h3>Synergy Guide</h3></div><button id="closeSynergyGuide" type="button">×</button></header><p>Green means you own the beast types needed to make that synergy. Bright green means your currently selected team already activates it.</p><div class="synergy-guide-list">${rows}</div></section>`;
  modal.classList.add('open');modal.querySelector('#closeSynergyGuide').onclick=()=>modal.classList.remove('open');modal.querySelector('.synergy-guide-backdrop').onclick=()=>modal.classList.remove('open');
}
const style=document.createElement('style');style.textContent=`.loadout-extra-controls{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:8px 0 12px;padding:9px 12px;border:1px solid #ffffff18;border-radius:11px;background:#0b1812}.loadout-extra-controls label{display:flex;align-items:center;gap:7px;color:#b8c4bb;font-size:12px}.loadout-extra-controls select,.loadout-extra-controls button{background:#17271e;color:#f1d66f;border:1px solid #536c59;border-radius:9px;padding:9px 11px;font-weight:800;min-height:40px}.loadout-extra-controls button{border-color:#b89b42;background:linear-gradient(#29422f,#17271e)}.synergy-guide-modal{display:none;position:fixed;inset:0;z-index:1600}.synergy-guide-modal.open{display:grid;place-items:center}.synergy-guide-backdrop{position:absolute;inset:0;background:#000d;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}.synergy-guide-modal section{position:relative;width:min(620px,92vw);max-height:82svh;overflow:auto;background:linear-gradient(145deg,#20362a,#101d16);border:1px solid #c5a849;border-radius:18px;padding:18px;box-shadow:0 24px 70px #000b}.synergy-guide-modal header{display:flex;justify-content:space-between;align-items:center}.synergy-guide-modal h3{margin:2px 0;color:#f0d36d;font:700 26px Georgia,serif}.synergy-guide-modal header small{color:#91a399;letter-spacing:.15em}.synergy-guide-modal header button{width:42px;height:42px;border-radius:50%;border:1px solid #617468;background:#15261c;color:#fff;font-size:24px}.synergy-guide-modal>section>p{color:#b6c3ba;font-size:12px}.synergy-guide-list{display:grid;gap:8px}.synergy-guide-card{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:11px;border-radius:11px;background:#121c17;border:1px solid #ffffff14;opacity:.58}.synergy-guide-card b,.synergy-guide-card em,.synergy-guide-card small{display:block}.synergy-guide-card b{color:#e7d27b}.synergy-guide-card em{font-style:normal;color:#aebbb2;font-size:10px;margin:2px 0}.synergy-guide-card small{color:#9fb0a5;font-size:10px;line-height:1.35}.synergy-guide-card strong{font-size:9px;color:#8c9990}.synergy-guide-card.possible{opacity:1;background:#153722;border-color:#57cf7a}.synergy-guide-card.possible strong{color:#77e397}.synergy-guide-card.active{background:#1d4d2d;border-color:#a2f2a8;box-shadow:0 0 18px #65df8435}.synergy-guide-card.active strong{color:#c5ffca}@media(max-width:620px){.loadout-extra-controls{align-items:stretch}.loadout-extra-controls label{flex:1}.loadout-extra-controls select{width:100%}.loadout-extra-controls button{white-space:nowrap}.synergy-guide-card{grid-template-columns:30px 1fr}.synergy-guide-card strong{grid-column:2}.synergy-guide-modal section{max-height:88svh}}`;document.head.appendChild(style);
try{if(document.querySelector('#loadoutModal:not(.hidden)'))renderLoadoutPicker()}catch(e){}
document.documentElement.dataset.maxBattleLoadout=String(MAX_LOADOUT);
})();