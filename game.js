const $=s=>document.querySelector(s);
const screens=[...document.querySelectorAll('.screen')];
function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id))}

const beasts={
embercub:{id:'embercub',name:'Embercub',type:'Fire',role:'Damage',cost:140,range:135,rate:.65,damage:22,color:'#ff7a3d',evo20:'Pyrelion',evo30:'Infernalion',sprite:'assets/sprites/embercub.svg'},
sprigpaw:{id:'sprigpaw',name:'Sprigpaw',type:'Nature',role:'Control',cost:150,range:125,rate:.85,damage:16,color:'#62c96b',evo20:'Thornmaw',evo30:'Elderfang',sprite:'assets/sprites/sprigpaw.svg'},
bubblit:{id:'bubblit',name:'Bubblit',type:'Water',role:'Slow',cost:145,range:130,rate:.75,damage:18,color:'#55a8ff',evo20:'Tiderex',evo30:'Abyssara',sprite:'assets/sprites/bubblit.svg'},
sparkit:{id:'sparkit',name:'Sparkit',type:'Electric',role:'Chain',cost:150,range:132,rate:.8,damage:17,color:'#ffd64e',evo20:'Voltail',evo30:'Stormclaw',sprite:'assets/sprites/sparkit.svg'},
pebblum:{id:'pebblum',name:'Pebblum',type:'Rock',role:'Heavy',cost:165,range:118,rate:1.05,damage:26,color:'#a89b8e',evo20:'Boulderback',evo30:'Titanrock',sprite:'assets/sprites/pebblum.svg'},
gustwing:{id:'gustwing',name:'Gustwing',type:'Wind',role:'Range',cost:155,range:160,rate:.78,damage:15,color:'#b6efd0',evo20:'Galehawk',evo30:'Tempestral',sprite:'assets/sprites/gustwing.svg'},
toxip:{id:'toxip',name:'Toxip',type:'Poison',role:'Damage over Time',cost:150,range:128,rate:.88,damage:15,color:'#d46be8',evo20:'Venomane',evo30:'Plaguefang',sprite:'assets/sprites/toxip.svg'},
frostkit:{id:'frostkit',name:'Frostkit',type:'Ice',role:'Freeze',cost:175,range:135,rate:.9,damage:19,color:'#9fe8ff',evo20:'Glacifang',evo30:'Cryowyrm',sprite:'assets/sprites/frostkit.svg'},
shadepup:{id:'shadepup',name:'Shadepup',type:'Dark',role:'Critical',cost:180,range:125,rate:.72,damage:24,color:'#8f79cf',evo20:'Dreadfang',evo30:'Nightreaver',sprite:'assets/sprites/shadepup.svg'},
lumpling:{id:'lumpling',name:'Lumpling',type:'Light',role:'Splash',cost:185,range:145,rate:.88,damage:20,color:'#fff0a2',evo20:'Radihorn',evo30:'Solarius',sprite:'assets/sprites/lumpling.svg'},
voltwing:{id:'voltwing',name:'Voltwing',type:'Electric',role:'Chain+',cost:190,range:165,rate:.7,damage:21,color:'#fff277',evo20:'Thunderoc',evo30:'Stormra',sprite:'assets/sprites/voltwing.svg'},
scorchick:{id:'scorchick',name:'Scorchick',type:'Fire',role:'Rapid Burn',cost:135,range:120,rate:.52,damage:14,color:'#ff9a3d',evo20:'Flarewing',evo30:'Sunphoenix',sprite:'assets/sprites/scorchick.svg'},
mosshell:{id:'mosshell',name:'Mosshell',type:'Nature',role:'Stagger',cost:160,range:112,rate:1.0,damage:23,color:'#78b85b',evo20:'Groveshell',evo30:'Worldback',sprite:'assets/sprites/mosshell.svg'},
drizzlet:{id:'drizzlet',name:'Drizzlet',type:'Water',role:'Rapid Slow',cost:140,range:138,rate:.58,damage:15,color:'#6bcce8',evo20:'Rilltail',evo30:'Torrentusk',sprite:'assets/sprites/drizzlet.svg'},
zapmoth:{id:'zapmoth',name:'Zapmoth',type:'Electric',role:'Fast Chain',cost:145,range:145,rate:.62,damage:15,color:'#ffe55f',evo20:'Voltmoth',evo30:'Tempestwing',sprite:'assets/sprites/zapmoth.svg'},
cindrake:{id:'cindrake',name:'Cindrake',type:'Fire',role:'Meteor',cost:235,range:155,rate:.92,damage:38,color:'#ff6b35',evo20:'Magmara',evo30:'Vulcanox',sprite:'assets/sprites/cindrake.svg'},
sporeling:{id:'sporeling',name:'Sporeling',type:'Poison',role:'Toxic Burst',cost:220,range:150,rate:.82,damage:28,color:'#d47be3',evo20:'Mycomaw',evo30:'Fungorath',sprite:'assets/sprites/sporeling.svg'},
drakeling:{id:'drakeling',name:'Drakeling',type:'Wind',role:'Piercing Gale',cost:230,range:185,rate:.68,damage:29,color:'#8de6d7',evo20:'Draconis',evo30:'Aetherion',sprite:'assets/sprites/drakeling.svg'},
voidling:{id:'voidling',name:'Voidling',type:'Dark',role:'Void Critical',cost:240,range:160,rate:.75,damage:36,color:'#a675e8',evo20:'Riftbeast',evo30:'Oblivion',sprite:'assets/sprites/voidling.svg'}
};

const starters=['embercub','sprigpaw','bubblit'];
const commonPool=['sparkit','pebblum','gustwing','toxip','scorchick','mosshell','drizzlet','zapmoth'];
const rarePool=['frostkit','shadepup','lumpling','voltwing'];
const epicPool=['cindrake','sporeling','drakeling','voidling'];
const commonCost=100,rareCost=300,epicCost=750;
const beastRatings={
embercub:{power:7,speed:8,range:6,special:7},
sprigpaw:{power:5,speed:6,range:6,special:9},
bubblit:{power:6,speed:7,range:6,special:8},
sparkit:{power:6,speed:8,range:6,special:8},
pebblum:{power:9,speed:4,range:5,special:6},
gustwing:{power:5,speed:8,range:9,special:6},
toxip:{power:5,speed:6,range:6,special:9},
frostkit:{power:6,speed:6,range:7,special:9},
shadepup:{power:9,speed:9,range:5,special:7},
lumpling:{power:7,speed:6,range:8,special:8},
voltwing:{power:8,speed:9,range:9,special:9},
scorchick:{power:5,speed:10,range:5,special:7},
mosshell:{power:8,speed:4,range:4,special:7},
drizzlet:{power:5,speed:9,range:7,special:7},
zapmoth:{power:5,speed:10,range:8,special:8},
cindrake:{power:10,speed:6,range:8,special:9},
sporeling:{power:8,speed:7,range:8,special:10},
drakeling:{power:8,speed:9,range:10,special:9},
voidling:{power:10,speed:8,range:8,special:10}
};
function evolutionStage(id){
  const l=progress(id).level;
  return l>=30?3:l>=15?2:1;
}
function stageStats(id){
  const base=beastRatings[id],stage=evolutionStage(id),cap=stage*10;
  return {
    stage,cap,
    power:Math.min(cap,base.power*stage),
    speed:Math.min(cap,base.speed*stage),
    range:Math.min(cap,base.range*stage),
    special:Math.min(cap,base.special*stage)
  };
}
function statBars(id){
  const s=stageStats(id);
  return `<div class="stat-grid">
    <div><span>Power</span><b>${s.power}/${s.cap}</b></div>
    <div><span>Speed</span><b>${s.speed}/${s.cap}</b></div>
    <div><span>Range</span><b>${s.range}/${s.cap}</b></div>
    <div><span>Special</span><b>${s.special}/${s.cap}</b></div>
  </div>`;
}

const spriteImgs={};
Object.values(beasts).forEach(b=>{const i=new Image();i.src=b.sprite;spriteImgs[b.id]=i});

function blankSave(){return {starter:null,essence:0,wardenLevel:1,unlocked:[],freeCommonClaimed:false,beastProgress:{},beastCopies:{},ascensions:{},completedLevels:[],createdAt:Date.now(),lastPlayed:Date.now()}}
function normaliseSave(s){s=s||blankSave();s.unlocked=s.unlocked||[];s.beastProgress=s.beastProgress||{};s.beastCopies=s.beastCopies||{};s.ascensions=s.ascensions||{};s.completedLevels=s.completedLevels||[];if(s.freeCommonClaimed===undefined)s.freeCommonClaimed=false;if(!s.wardenLevel)s.wardenLevel=1;if(s.essence===undefined)s.essence=0;return s}
const legacy=localStorage.getItem('beastward-save');
if(legacy&&!localStorage.getItem('beastward-save-1')&&!localStorage.getItem('beastward-save-2')&&!localStorage.getItem('beastward-save-3')){
  localStorage.setItem('beastward-save-1',legacy);
}
let activeSlot=Number(localStorage.getItem('beastward-active-slot')||'0');
let save=activeSlot?normaliseSave(JSON.parse(localStorage.getItem('beastward-save-'+activeSlot)||'null')):blankSave();
let pendingSaveTarget='hub';

function xpNeeded(level){return 60+(level-1)*15}
function progress(id){return save.beastProgress[id]||(save.beastProgress[id]={level:1,xp:0})}
function addBeast(id){if(!save.unlocked.includes(id))save.unlocked.push(id);progress(id)}
function nameFor(id){const b=beasts[id],l=progress(id).level;return l>=30?b.evo30:l>=15?b.evo20:b.name}
function ascension(id){return save.ascensions[id]||0}
function copies(id){return save.beastCopies[id]||0}
function ascensionNeed(id){return [2,5,10][ascension(id)]||null}
function levelMultiplier(id){const l=progress(id).level,a=ascension(id);return (1+(l-1)*.03+(l>=15?.15:0)+(l>=30?.2:0))*(1+a*.08)}
function rangeMultiplier(id){return (1+(progress(id).level-1)*.005)*(1+ascension(id)*.02)}
function persist(){if(!activeSlot)return;save.lastPlayed=Date.now();localStorage.setItem('beastward-save-'+activeSlot,JSON.stringify(save));localStorage.setItem('beastward-active-slot',String(activeSlot));updateHub()}
function updateHub(){
  if($('#essenceTotal'))$('#essenceTotal').textContent=save.essence;
  if($('#wardenLevel'))$('#wardenLevel').textContent=save.wardenLevel;
  if($('#commonEggCost'))$('#commonEggCost').textContent=save.freeCommonClaimed?commonCost+' Essence':'Free';
  if($('#rareEggCost'))$('#rareEggCost').textContent=rareCost+' Essence';
  if($('#epicEggCost'))$('#epicEggCost').textContent=epicCost+' Essence';
}

function renderStarters(){
  const w=$('#starterGrid');w.innerHTML='';
  starters.forEach(id=>{
    const b=beasts[id],el=document.createElement('button');
    el.className='starter-card';
    el.innerHTML=`<div class="sprite-wrap"><img src="${b.sprite}"></div><h3>${b.name}</h3><span>${b.type} • ${b.role}</span><p>${id==='embercub'?'Burn enemies over time.':id==='sprigpaw'?'Poison and crowd control.':'Slow groups and splash damage.'}</p><div class="tiny">Lv15 ${b.evo20} • Lv30 ${b.evo30}</div>${statBars(id)}`;
    el.onclick=()=>{save.starter=id;addBeast(id);persist();show('hubScreen')};
    w.appendChild(el);
  });
}
function renderCollection(){
  const w=$('#beastCollection');w.innerHTML='';
  const countEl=$('#denCollectedCount');if(countEl)countEl.textContent=save.unlocked.length;
  save.unlocked.forEach(id=>{
    const b=beasts[id],p=progress(id),need=xpNeeded(p.level),a=ascension(id),needCopies=ascensionNeed(id),held=copies(id);
    const ascendLabel=a>=3?'MAX ASCENSION':`Ascend to ★${a+1} • ${held}/${needCopies} copies`;
    w.insertAdjacentHTML('beforeend',`<div class="beast-card">
      <div class="beast-card-top"><div class="sprite-wrap"><img src="${b.sprite}"></div><div class="ascension-stars">${'★'.repeat(a)}${'☆'.repeat(3-a)}</div></div>
      <h3>${nameFor(id)}</h3><div class="beast-meta">${b.type} • ${b.role}</div>
      <p>Level ${p.level}/30</p>
      <div class="xpbar"><div style="width:${p.level>=30?100:Math.min(100,p.xp/need*100)}%"></div></div>
      <div class="tiny">${p.level>=30?'MAX LEVEL':p.xp+' / '+need+' XP'} • Combat bonus +${Math.round((levelMultiplier(id)-1)*100)}%</div>
      <div class="tiny">Lv15 ${b.evo20} • Lv30 ${b.evo30}</div>
      ${statBars(id)}
      <div class="ascend-box"><div><b>Ascension ${a}/3</b><small>${a>=3?'Fully ascended':'Duplicate copies are used here — not Essence.'}</small></div>
      <button class="ascend-btn" data-ascend="${id}" ${a>=3||held<needCopies?'disabled':''}>${ascendLabel}</button></div>
    </div>`);
  });
  document.querySelectorAll('[data-ascend]').forEach(btn=>btn.onclick=()=>ascendBeast(btn.dataset.ascend));
}
function ascendBeast(id){
  const a=ascension(id),need=ascensionNeed(id);if(a>=3||copies(id)<need)return;
  save.beastCopies[id]-=need;save.ascensions[id]=a+1;persist();renderCollection();
}function slotData(slot){try{return normaliseSave(JSON.parse(localStorage.getItem('beastward-save-'+slot)||'null'))}catch(e){return null}}
function renderSaveSlots(){
  const wrap=$('#saveSlots');if(!wrap)return;wrap.innerHTML='';
  for(let slot=1;slot<=3;slot++){
    const raw=localStorage.getItem('beastward-save-'+slot);
    const s=raw?slotData(slot):null;
    const card=document.createElement('div');
    card.className='save-slot'+(s?'':' empty');
    if(s){
      const starter=s.starter&&beasts[s.starter]?beasts[s.starter].name:'Starter not chosen';
      const count=(s.unlocked||[]).length;
      card.innerHTML=`<h3>Save ${slot}</h3><div class="save-meta"><b>${starter}</b><br>Warden Level ${s.wardenLevel||1}<br>${s.essence||0} Essence • ${count} beasts</div><div class="save-slot-actions"><button class="load-save">Load</button><button class="delete-save">Delete</button></div>`;
      card.querySelector('.load-save').onclick=()=>loadSlot(slot);
      card.querySelector('.delete-save').onclick=()=>deleteSlot(slot);
    }else{
      card.innerHTML=`<h3>Save ${slot}</h3><div class="save-meta">Empty slot<br>Start a new Beastwarden journey.</div><div class="save-slot-actions"><button class="create-save">New Game</button></div>`;
      card.querySelector('.create-save').onclick=()=>createSlot(slot);
    }
    wrap.appendChild(card);
  }
}
function openSaveSelect(target='hub'){pendingSaveTarget=target;renderSaveSlots();show('saveSelectScreen')}
function createSlot(slot){activeSlot=slot;save=blankSave();persist();show('starterScreen')}
function loadSlot(slot){
  const s=slotData(slot);if(!s)return;
  activeSlot=slot;save=s;localStorage.setItem('beastward-active-slot',String(slot));updateHub();
  if(!save.starter){show('starterScreen');return}
  if(pendingSaveTarget==='beasts'){renderCollection();show('beastsScreen')}
  else if(pendingSaveTarget==='hatchery')show('hatcheryScreen');
  else if(pendingSaveTarget==='bestiary'){renderBestiary();show('bestiaryScreen');}
  else show('hubScreen');
}
function deleteSlot(slot){
  if(!confirm('Delete Save '+slot+' permanently? This cannot be undone.'))return;
  localStorage.removeItem('beastward-save-'+slot);
  if(activeSlot===slot){activeSlot=0;save=blankSave();localStorage.removeItem('beastward-active-slot')}
  renderSaveSlots();
}
function enter(target='hub'){
  if(!activeSlot||!localStorage.getItem('beastward-save-'+activeSlot)){openSaveSelect(target);return}
  save=slotData(activeSlot)||blankSave();
  if(!save.starter){show('starterScreen');return}
  updateHub();
  if(target==='beasts'){renderCollection();show('beastsScreen')}
  else if(target==='hatchery')show('hatcheryScreen');
  else if(target==='bestiary'){renderBestiary();show('bestiaryScreen');}
  else show('hubScreen');
}

$('#newGameBtn').onclick=()=>openSaveSelect('hub');
$('#titleBeastDenBtn').onclick=()=>openSaveSelect('beasts');
$('#titleHatcheryBtn').onclick=()=>openSaveSelect('hatchery');
$('#titleBestiaryBtn').onclick=()=>openSaveSelect('bestiary');
$('#titleSaveSlotsBtn').onclick=()=>openSaveSelect('hub');
$('#titleSettingsBtn').onclick=()=>show('settingsScreen');
$('#switchSaveBtn').onclick=()=>openSaveSelect('hub');
$('#campaignBtn').onclick=()=>{renderCampaignMap();show('campaignScreen')};
$('#beastsBtn').onclick=()=>{renderCollection();show('beastsScreen')};
$('#hatcheryBtn').onclick=()=>show('hatcheryScreen');
$('#bestiaryBtn').onclick=()=>{renderBestiary();show('bestiaryScreen')};
$('#hubSettingsBtn').onclick=()=>show('settingsScreen');
$('#hubSaveBtn').onclick=()=>openSaveSelect('hub');
$('#settingsSavesBtn').onclick=()=>openSaveSelect('hub');
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>show(b.dataset.back));
const motionKey='beastward-reduced-motion';
function applyMotionSetting(){const on=localStorage.getItem(motionKey)==='1';document.body.classList.toggle('reduced-motion',on);const b=$('#motionToggle');if(b){b.textContent=on?'On':'Off';b.classList.toggle('on',on)}}
if($('#motionToggle'))$('#motionToggle').onclick=()=>{localStorage.setItem(motionKey,localStorage.getItem(motionKey)==='1'?'0':'1');applyMotionSetting()};



const bestiaryLore=[
 {title:'The Beast Core',text:'Ancient living crystal that anchors a Sanctuary. If it falls, the surrounding wilds become vulnerable to corruption.'},
 {title:'Essence',text:'A concentrated form of wild energy earned by defending the Core. Wardens use Essence to hatch new beasts.'},
 {title:'Beastwardens',text:'Protectors who bond with beasts, train them through battle and guide them through evolution.'},
 {title:'Evolution',text:'Every beast can evolve at Level 15 and again at Level 30, gaining greater strength as its bond with the Warden deepens.'}
];
const bestiaryEnemies=[
 {name:'Forest Raider',kind:'Common',text:'A quick invader that travels the Keeper\'s Path in groups.'},
 {name:'Stone Brute',kind:'Heavy',text:'Slow and durable. Best answered with high-power beasts.'},
 {name:'Ruin Hound',kind:'Fast',text:'A swift enemy that punishes gaps in your defence.'},
 {name:'Hollowmaw',kind:'Boss',text:'A corrupted alpha beast whose roar can overwhelm inexperienced Wardens.'}
];
let bestiaryTab='beasts',bestiaryType='All',bestiarySelected=null;
function beastLore(id){
 const notes={
  embercub:['The Kindling Cub','Burns enemies with bright concentrated flame.'],
  sprigpaw:['The Verdant Prowler','Uses poison and roots to control the path.'],
  bubblit:['The Springling','Slows advancing enemies with magical water.'],
  sparkit:['The Static Cub','Electric attacks leap between nearby targets.'],
  pebblum:['The Boulder Heart','A heavy hitter built around raw impact.'],
  gustwing:['The Gale Messenger','Excellent reach and fast wind projectiles.'],
  toxip:['The Mire Hopper','Specialises in poisonous lingering damage.'],
  frostkit:['The Frost Prowler','Freezes and heavily slows dangerous targets.'],
  shadepup:['The Dusk Hunter','High damage with a chance to land critical strikes.'],
  lumpling:['The Dawn Spark','Radiant attacks splash onto nearby enemies.'],
  voltwing:['The Storm Glider','A stronger electric attacker with long range.'],
  scorchick:['The Ember Fledgling','A tiny firebird that attacks extremely quickly.'],
  mosshell:['The Grove Tortoise','A sturdy nature beast whose heavy hits disrupt enemies.'],
  drizzlet:['The River Rascal','A nimble water beast that applies frequent slows.'],
  zapmoth:['The Static Flutter','A lightning moth built around fast chained strikes.'],
  cindrake:['The Cinder Drake','An Epic fire drake whose impacts erupt around the target.'],
  sporeling:['The Dreamcap','An Epic fungus beast that floods groups with toxic spores.'],
  drakeling:['The Skyborn Whelp','An Epic dragonling with extraordinary range and piercing wind.'],
  voidling:['The Riftling','An Epic shadow beast with brutal critical strikes and unstable void energy.']
 };
 return notes[id]||['Wild Beast','A mysterious Beastward creature.'];
}
function renderBestiary(){
 const list=$('#bestiaryList'),detail=$('#bestiaryDetail'),filters=$('#bestiaryFilters'),search=$('#bestiarySearch');
 const bp=$('#bestiaryProgress');if(bp)bp.textContent=`${save.unlocked.length} / ${Object.keys(beasts).length} discovered`;
 if(!list||!detail)return;
 document.querySelectorAll('.bestiary-tab').forEach(b=>b.classList.toggle('active',b.dataset.btab===bestiaryTab));
 filters.innerHTML='';
 if(bestiaryTab==='beasts'){
   ['All',...new Set(Object.values(beasts).map(b=>b.type))].forEach(type=>{const btn=document.createElement('button');btn.className='best-filter'+(type===bestiaryType?' active':'');btn.textContent=type;btn.onclick=()=>{bestiaryType=type;bestiarySelected=null;renderBestiary()};filters.appendChild(btn)});
   const q=(search.value||'').toLowerCase();
   const arr=Object.values(beasts).filter(b=>(bestiaryType==='All'||b.type===bestiaryType)&&(!q||(b.name+' '+b.type+' '+b.role+' '+b.evo20+' '+b.evo30).toLowerCase().includes(q)));
   if(!bestiarySelected||!arr.some(b=>b.id===bestiarySelected))bestiarySelected=arr[0]?.id||null;
   list.innerHTML='';
   arr.forEach(b=>{const row=document.createElement('button');row.className='best-row'+(b.id===bestiarySelected?' active':'');const unlocked=save.unlocked.includes(b.id);row.innerHTML=`<img src="${b.sprite}"><div><h4>${b.name}</h4><small>${b.type} • Lv ${progress(b.id).level}</small><small>${unlocked?'Collected':'Undiscovered'}</small></div><span class="tag">${b.role}</span>`;row.onclick=()=>{bestiarySelected=b.id;renderBestiary()};list.appendChild(row)});
   if(!bestiarySelected){detail.innerHTML='<div class="lore-card">No beasts match your search.</div>';return}
   const b=beasts[bestiarySelected],lore=beastLore(b.id),p=progress(b.id),unlocked=save.unlocked.includes(b.id);
   detail.innerHTML=`<div class="best-hero"><div class="best-portrait"><img src="${b.sprite}"></div><div class="best-detail-title"><h3>${nameFor(b.id)}</h3><div class="best-pills"><span class="best-pill">${b.type}</span><span class="best-pill">${b.role}</span><span class="best-pill">Level ${p.level}/30</span><span class="best-pill">Ascension ${ascension(b.id)}/3</span><span class="best-pill">${unlocked?'Collected':'Not collected'}</span></div><p><b>${lore[0]}</b><br>${lore[1]}</p></div></div>${statBars(b.id)}<div class="best-section"><b>Evolution line</b><div class="evo-line"><div class="evo"><small>Lv 1</small><b>${b.name}</b></div><div class="evo"><small>Lv 15</small><b>${b.evo20}</b></div><div class="evo"><small>Lv 30</small><b>${b.evo30}</b></div></div></div>`;
 }else if(bestiaryTab==='enemies'){
   filters.innerHTML='';list.innerHTML='';
   bestiaryEnemies.forEach((e,i)=>{const row=document.createElement('button');row.className='best-row'+(bestiarySelected===i?' active':'');row.innerHTML=`<div style="font-size:36px">☠️</div><div><h4>${e.name}</h4><small>${e.kind}</small></div><span class="tag">Enemy</span>`;row.onclick=()=>{bestiarySelected=i;renderBestiary()};list.appendChild(row)});
   if(typeof bestiarySelected!=='number')bestiarySelected=0;const e=bestiaryEnemies[bestiarySelected]||bestiaryEnemies[0];detail.innerHTML=`<div class="lore-card"><h3>${e.name}</h3><div class="best-pills"><span class="best-pill">${e.kind}</span><span class="best-pill">Enemy</span></div><p>${e.text}</p></div><div class="best-section"><b>Warden advice</b><p>Use the beast types and stats in your collection to cover weaknesses in speed, durability and crowd size.</p></div>`;
 }else{
   filters.innerHTML='';list.innerHTML='<div class="lore-list">'+bestiaryLore.map(x=>`<div class="lore-card"><h3>${x.title}</h3><p>${x.text}</p></div>`).join('')+'</div>';detail.innerHTML='<div class="lore-card"><h3>Beastward</h3><p>The world is bound by living magic. Stronger beasts make a brighter tomorrow.</p></div>';
 }
}
document.querySelectorAll('.bestiary-tab').forEach(btn=>btn.onclick=()=>{bestiaryTab=btn.dataset.btab;bestiarySelected=null;renderBestiary()});
if($('#bestiarySearch'))$('#bestiarySearch').addEventListener('input',()=>{bestiarySelected=null;renderBestiary()});

function hatch(pool,cost,isFreeCommon=false){
  const free=isFreeCommon&&!save.freeCommonClaimed;
  if(!free&&save.essence<cost){alert("Not enough Essence yet. Beat campaign levels to earn more.");return}
  if(free)save.freeCommonClaimed=true;else save.essence-=cost;
  const id=pool[Math.floor(Math.random()*pool.length)],isNew=!save.unlocked.includes(id);
  if(isNew)addBeast(id);else save.beastCopies[id]=(save.beastCopies[id]||0)+1;
  persist();
  $('#eggResultTitle').textContent=isNew?'New Beast Hatched!':'Duplicate Bond!';
  $('#eggResultSprite').src=beasts[id].sprite;
  $('#eggResultName').textContent=beasts[id].name;
  const a=ascension(id),need=ascensionNeed(id),held=copies(id);
  $('#eggResultText').textContent=isNew?`${beasts[id].name} joined your Beast Den.`:`${beasts[id].name} duplicate gained. You now have ${held}${a<3?'/'+need:''} copies towards the next Ascension.`;
  $('#eggModal').classList.remove('hidden');
}
$('#openCommonEggBtn').onclick=()=>hatch(commonPool,commonCost,true);
$('#openRareEggBtn').onclick=()=>hatch(rarePool,rareCost,false);
$('#openEpicEggBtn').onclick=()=>hatch(epicPool,epicCost,false);
$('#eggResultContinue').onclick=()=>$('#eggModal').classList.add('hidden');

const canvas=$('#gameCanvas'),ctx=canvas.getContext('2d');
const levels=[
{id:1,name:"Keeper's Path",waves:10,reward:120,hp:1,speed:1,path:[{x:0,y:300},{x:180,y:300},{x:180,y:150},{x:430,y:150},{x:430,y:420},{x:700,y:420},{x:700,y:250},{x:1000,y:250}]},
{id:2,name:"Whispering Woods",waves:10,reward:135,hp:1.12,speed:1.03,path:[{x:0,y:180},{x:210,y:180},{x:210,y:390},{x:440,y:390},{x:440,y:120},{x:720,y:120},{x:720,y:330},{x:1000,y:330}]},
{id:3,name:"Broken Bridge",waves:10,reward:150,hp:1.25,speed:1.05,path:[{x:0,y:430},{x:240,y:430},{x:240,y:210},{x:520,y:210},{x:520,y:460},{x:770,y:460},{x:770,y:240},{x:1000,y:240}]},
{id:4,name:"Mosswood Village",waves:10,reward:165,hp:1.4,speed:1.07,path:[{x:0,y:260},{x:150,y:260},{x:150,y:470},{x:390,y:470},{x:390,y:180},{x:650,y:180},{x:650,y:390},{x:1000,y:390}]},
{id:5,name:"Ancient Shrine",waves:10,reward:185,hp:1.58,speed:1.08,boss:true,path:[{x:0,y:120},{x:280,y:120},{x:280,y:320},{x:520,y:320},{x:520,y:500},{x:760,y:500},{x:760,y:250},{x:1000,y:250}]},
{id:6,name:"River Crossing",waves:10,reward:205,hp:1.78,speed:1.1,path:[{x:0,y:360},{x:190,y:360},{x:190,y:110},{x:500,y:110},{x:500,y:380},{x:810,y:380},{x:810,y:180},{x:1000,y:180}]},
{id:7,name:"Corrupted Grove",waves:10,reward:230,hp:2.0,speed:1.12,path:[{x:0,y:490},{x:160,y:490},{x:160,y:220},{x:350,y:220},{x:350,y:80},{x:650,y:80},{x:650,y:430},{x:1000,y:430}]},
{id:8,name:"Beastkeeper Ruins",waves:10,reward:255,hp:2.25,speed:1.14,path:[{x:0,y:210},{x:300,y:210},{x:300,y:470},{x:550,y:470},{x:550,y:160},{x:820,y:160},{x:820,y:340},{x:1000,y:340}]},
{id:9,name:"Hollow Pass",waves:10,reward:285,hp:2.55,speed:1.16,path:[{x:0,y:100},{x:180,y:100},{x:180,y:360},{x:420,y:360},{x:420,y:150},{x:690,y:150},{x:690,y:480},{x:1000,y:480}]},
{id:10,name:"Hollowmaw's Den",waves:10,reward:350,hp:2.9,speed:1.18,boss:true,path:[{x:0,y:300},{x:130,y:300},{x:130,y:100},{x:390,y:100},{x:390,y:500},{x:660,y:500},{x:660,y:210},{x:840,y:210},{x:840,y:380},{x:1000,y:380}]}
];
let currentLevel=levels[0],path=currentLevel.path;
function levelUnlocked(id){return id===1||save.completedLevels.includes(id-1)}
function renderCampaignMap(){
 const map=$('.campaign-map');if(!map)return;
 map.innerHTML='<div class="map-path"></div>';
 const coords=[[12,78],[27,60],[43,73],[55,48],[72,63],[82,42],[68,24],[47,30],[29,17],[88,14]];
 levels.forEach((lvl,i)=>{const unlocked=levelUnlocked(lvl.id),done=save.completedLevels.includes(lvl.id);const el=document.createElement(unlocked?'button':'div');el.className='map-node '+(unlocked?'unlocked':'locked')+(lvl.id===10?' boss-node':'')+(done?' completed':'');el.style.setProperty('--x',coords[i][0]+'%');el.style.setProperty('--y',coords[i][1]+'%');el.innerHTML=`<span>1-${lvl.id}</span><b>${lvl.name}</b><small>${done?'✓ Cleared':unlocked?lvl.waves+' waves':'Locked'}</small>`;if(unlocked)el.onclick=()=>startLevel(lvl.id);map.appendChild(el)});
}
function startLevel(id){currentLevel=levels[id-1];path=currentLevel.path;reset();show('gameScreen');last=performance.now();requestAnimationFrame(loop)}
let towers=[],enemies=[],projectiles=[],effects=[],selectedSpecies=null,selectedTower=null,gold=350,lives=20,wave=0,running=false,last=0,queue=[],speed=1,waveParticipants=new Set();

function ui(){$('#gold').textContent=Math.floor(gold);$('#lives').textContent=lives;$('#wave').textContent=wave;if(selectedTower)renderUpgradeButtons()}
const upgradeDefs={
 power:[
  {name:'Sharpened Instinct',desc:'+20% damage',mult:.65},
  {name:'Hunter Reach',desc:'+18% range and +10% damage',mult:1.0},
  {name:'Apex Force',desc:'+35% damage and empowered projectiles',mult:1.6}
 ],
 special:[
  {name:'Quickened Spirit',desc:'12% faster attacks',mult:.55},
  {name:'Elemental Mastery',desc:'Stronger elemental status effects',mult:.9},
  {name:'Primal Surge',desc:'Unlocks a powerful type-specific effect',mult:1.5}
 ]
};
function upgradeCost(t,path){
 const tier=t[path+'Tier']||0,def=upgradeDefs[path][tier];
 return def?Math.ceil(t.baseCost*def.mult/5)*5:null;
}
function recalcTower(t){
 const base=battleStats(t.b.id),p=t.powerTier||0,s=t.specialTier||0;
 const powerDamage=[1,1.2,1.32,1.782][p]||1;
 const powerRange=[1,1,1.18,1.18][p]||1;
 const specialRate=[1,.88,.88,.88][s]||1;
 t.b={...base,damage:base.damage*powerDamage,range:base.range*powerRange,rate:base.rate*specialRate};
}
function battleStats(id){
  const b=beasts[id];
  return {...b,damage:b.damage*levelMultiplier(id),range:b.range*rangeMultiplier(id),rate:b.rate*(1-ascension(id)*.03)};
}
function choices(){
  const w=$('#towerChoices');w.innerHTML='';
  save.unlocked.forEach(id=>{
    const b=beasts[id],el=document.createElement('button');
    el.className='tower-choice';
    const ss=stageStats(id);el.innerHTML=`<img src="${b.sprite}"><div><b>${nameFor(id)}</b><small>Lv ${progress(id).level} • Stage ${ss.stage} • ${b.role} • ${b.cost} gold</small><small>POW ${ss.power}/${ss.cap} • SPD ${ss.speed}/${ss.cap} • RNG ${ss.range}/${ss.cap}</small></div>`;
    el.onclick=()=>{selectedSpecies=id;selectedTower=null;renderSelectedTower();document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')};
    w.appendChild(el);
  });
}
function renderSelectedTower(){
  const p=$('#selectedTowerPanel');
  if(!selectedTower||!towers.includes(selectedTower)){selectedTower=null;p.classList.add('hidden');return}
  p.classList.remove('hidden');
  $('#selectedTowerName').textContent=nameFor(selectedTower.b.id);
  $('#selectedTowerStats').innerHTML=`Level ${progress(selectedTower.b.id).level} • ★${ascension(selectedTower.b.id)} • Sell ${Math.floor(selectedTower.spent*.8)} gold`+statBars(selectedTower.b.id);
  renderUpgradeButtons();
}
function renderUpgradeButtons(){
 if(!selectedTower)return;
 ['power','special'].forEach(path=>{
   const tier=selectedTower[path+'Tier']||0,other=path==='power'?'special':'power',otherTier=selectedTower[other+'Tier']||0;
   const btn=$('#'+path+'UpgradeBtn'),desc=$('#'+path+'UpgradeDesc');
   if(!btn||!desc)return;
   if(tier>=3){btn.textContent='MAX TIER';btn.disabled=true;desc.textContent='Tier III complete.';return}
   const locked=tier===2&&otherTier>=3,cost=upgradeCost(selectedTower,path),def=upgradeDefs[path][tier];
   btn.disabled=locked||gold<cost;
   btn.textContent=locked?'TIER III LOCKED':`Tier ${tier+1} • ${def.name} • ${cost}g`;
   desc.textContent=locked?'The other path has already claimed Tier III.':def.desc;
 });
}
function buyTowerUpgrade(path){
 if(!selectedTower)return;
 const tier=selectedTower[path+'Tier']||0,other=path==='power'?'special':'power',otherTier=selectedTower[other+'Tier']||0;
 if(tier>=3||(tier===2&&otherTier>=3))return;
 const cost=upgradeCost(selectedTower,path);if(gold<cost)return;
 gold-=cost;selectedTower[path+'Tier']=tier+1;selectedTower.spent+=cost;recalcTower(selectedTower);ui();renderSelectedTower();
}
$('#powerUpgradeBtn').onclick=()=>buyTowerUpgrade('power');
$('#specialUpgradeBtn').onclick=()=>buyTowerUpgrade('special');
function reset(){
  towers=[];enemies=[];projectiles=[];effects=[];selectedSpecies=null;selectedTower=null;gold=350;lives=20;wave=0;running=false;queue=[];speed=1;waveParticipants=new Set();
  document.querySelectorAll('.speed-choice').forEach(b=>b.classList.toggle('active',Number(b.dataset.speed)===1));$('#waveXpNotice').textContent='';ui();choices();renderSelectedTower();
}
$('#exitLevelBtn').onclick=()=>show('campaignScreen');
function setSpeed(next){speed=next;document.querySelectorAll('.speed-choice').forEach(b=>b.classList.toggle('active',Number(b.dataset.speed)===speed))}
document.querySelectorAll('.speed-choice').forEach(b=>b.onclick=()=>setSpeed(Number(b.dataset.speed)));
$('#startWaveBtn').onclick=()=>{
  if(running||wave>=10)return;
  wave++;running=true;waveParticipants=new Set(towers.map(t=>t.b.id));
  const n=5+wave*2+Math.floor((currentLevel.id-1)*.6);queue=[];
  for(let i=0;i<n;i++)queue.push({delay:i*Math.max(420,700-currentLevel.id*20),hp:(55+wave*20)*currentLevel.hp,speed:(45+wave*2)*currentLevel.speed,reward:12+wave+Math.floor(currentLevel.id/2)});
  if(wave===10&&(currentLevel.boss||currentLevel.id===10))queue.push({delay:n*600+600,hp:900*currentLevel.hp,speed:28*currentLevel.speed,reward:180+currentLevel.id*10,boss:true});
  ui();
};

$('#sellTowerBtn').onclick=()=>{
  if(!selectedTower)return;
  const idx=towers.indexOf(selectedTower);if(idx<0)return;
  const refund=Math.floor(selectedTower.spent*.8);
  gold+=refund;towers.splice(idx,1);selectedTower=null;renderSelectedTower();ui();
};

canvas.addEventListener('pointerdown',e=>{
  const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;
  const hit=towers.find(t=>Math.hypot(t.x-x,t.y-y)<=30);
  if(hit){selectedTower=hit;selectedSpecies=null;document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));renderSelectedTower();return}
  if(!selectedSpecies)return;
  const b=beasts[selectedSpecies];
  if(gold<b.cost||distPath(x,y)<55||towers.some(t=>Math.hypot(t.x-x,t.y-y)<45))return;
  towers.push({x,y,b:battleStats(selectedSpecies),cool:0,baseCost:b.cost,spent:b.cost,powerTier:0,specialTier:0});
  if(running)waveParticipants.add(selectedSpecies);
  gold-=b.cost;ui();
});
function distPath(x,y){
  let best=1e9;
  for(let i=0;i<path.length-1;i++){
    const a=path[i],b=path[i+1],vx=b.x-a.x,vy=b.y-a.y,wx=x-a.x,wy=y-a.y,t=Math.max(0,Math.min(1,(vx*wx+vy*wy)/(vx*vx+vy*vy)));
    best=Math.min(best,Math.hypot(x-(a.x+t*vx),y-(a.y+t*vy)));
  }
  return best;
}
function spawn(s){enemies.push({x:path[0].x,y:path[0].y,seg:0,hp:s.hp,max:s.hp,speed:s.speed,reward:s.reward,boss:!!s.boss,slow:0})}
function move(e,dt){
  const target=path[e.seg+1];if(!target)return false;
  let sp=e.speed*(e.slow>0?.58:1);e.slow=Math.max(0,e.slow-dt);
  const dx=target.x-e.x,dy=target.y-e.y,d=Math.hypot(dx,dy);
  if(d<sp*dt){e.x=target.x;e.y=target.y;e.seg++;return e.seg<path.length-1}
  e.x+=dx/d*sp*dt;e.y+=dy/d*sp*dt;return true;
}
function attack(t,dt){
  t.cool-=dt;if(t.cool>0)return;
  const target=enemies.filter(e=>Math.hypot(e.x-t.x,e.y-t.y)<=t.b.range).sort((a,b)=>b.seg-a.seg)[0];
  if(!target)return;
  t.cool=t.b.rate;projectiles.push({x:t.x,y:t.y,target,damage:t.b.damage,type:t.b.type,color:t.b.color,speed:t.b.type==='Rock'?300:t.b.type==='Wind'?520:420,fromX:t.x,fromY:t.y,spin:0,powerTier:t.powerTier||0,specialTier:t.specialTier||0});
}
function addXP(ids,amount){
  const levelUps=[];
  ids.forEach(id=>{
    const p=progress(id);if(p.level>=30)return;
    p.xp+=amount;
    while(p.level<30&&p.xp>=xpNeeded(p.level)){
      p.xp-=xpNeeded(p.level);p.level++;levelUps.push(nameFor(id)+' reached Level '+p.level);
    }
    if(p.level>=30)p.xp=0;
  });
  persist();
  return levelUps;
}
function completeWave(){
  const amount=5+wave*5;
  const ups=addXP(waveParticipants,amount);
  $('#waveXpNotice').textContent=`Wave ${wave} clear • +${amount} XP`;
  if(ups.length)setTimeout(()=>alert(ups.join('\n')),80);
  setTimeout(()=>{if($('#waveXpNotice'))$('#waveXpNotice').textContent=''},1800);
}
function fx(kind,x,y,color='#fff',extra={}){effects.push({kind,x,y,color,life:1,maxLife:1,...extra})}
function hitProjectile(p){
  const mastery=p.specialTier>=2,primal=p.specialTier>=3,apex=p.powerTier>=3;
  let damage=p.damage;
  const critChance=p.type==='Dark'?(primal?.5:mastery?.32:.22):0;
  if(critChance&&Math.random()<critChance){damage*=primal?2.4:2;fx('crit',p.target.x,p.target.y,'#ff6cff')}
  p.target.hp-=damage;

  if(p.type==='Fire'){
    p.target.hp+=0; p.target.hp-=mastery?10:5;
    fx('burst',p.target.x,p.target.y,'#ff7a32',{size:apex?58:42});
    for(let i=0;i<(primal?11:7);i++)fx('particle',p.target.x,p.target.y,'#ffc34f',{vx:(Math.random()-.5)*90,vy:(Math.random()-.5)*90,size:4});
    if(primal)enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<72).forEach(e=>e.hp-=p.damage*.55);
  }
  if(p.type==='Nature'){
    p.target.hp-=mastery?9:5;p.target.slow=Math.max(p.target.slow,mastery?1.8:.75);fx('roots',p.target.x,p.target.y,'#65c96b',{size:primal?58:38});
    if(primal)enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<70).forEach(e=>{e.slow=Math.max(e.slow,1.5);e.hp-=p.damage*.3});
  }
  if(p.type==='Water'){
    p.target.slow=Math.max(p.target.slow,mastery?2.4:1.6);fx('splash',p.target.x,p.target.y,'#60c8ff',{size:primal?62:44});
    if(primal)enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<68).forEach(e=>{e.hp-=p.damage*.35;e.slow=Math.max(e.slow,1.8)});
  }
  if(p.type==='Ice'){
    p.target.slow=Math.max(p.target.slow,mastery?3.2:2.4);fx('freeze',p.target.x,p.target.y,'#c8f5ff',{size:primal?66:46});
    if(primal)enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<62).forEach(e=>e.slow=Math.max(e.slow,2.6));
  }
  if(p.type==='Poison'){
    p.target.hp-=mastery?12:5;fx('poison',p.target.x,p.target.y,'#d96ee8',{size:primal?68:44});
    if(primal)enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<75).forEach(e=>e.hp-=p.damage*.5);
  }
  if(p.type==='Rock'){
    p.target.slow=Math.max(p.target.slow,mastery?.8:.35);fx('dust',p.target.x,p.target.y,'#b7a38e',{size:primal?64:48});
    if(primal)p.target.slow=Math.max(p.target.slow,1.4);
  }
  if(p.type==='Wind'){
    fx('wind',p.target.x,p.target.y,'#d6ffe3',{size:primal?68:46});
    if(mastery)enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<40).forEach(e=>e.hp-=p.damage*.3);
    if(primal)enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<85).forEach(e=>e.hp-=p.damage*.35);
  }
  if(p.type==='Electric'){
    const radius=mastery?92:70,count=primal?(p.damage>20?5:4):(p.damage>20?3:2),chainDamage=p.damage*(primal?.62:mastery?.48:(p.damage>20?.45:.3));
    const targets=enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<radius).slice(0,count);
    targets.forEach(e=>{e.hp-=chainDamage;fx('lightning',p.target.x,p.target.y,'#fff36c',{x2:e.x,y2:e.y})});
    fx('zap',p.target.x,p.target.y,'#fff36c',{size:primal?58:40});
  }
  if(p.type==='Light'){
    const radius=primal?88:mastery?68:55,ratio=primal?.65:mastery?.48:.35;
    enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<radius).forEach(e=>e.hp-=p.damage*ratio);
    fx('light',p.target.x,p.target.y,'#fff4a6',{size:primal?82:60});
  }
  if(apex)fx('apex',p.target.x,p.target.y,p.color,{size:54});
}
function update(dt){
  if(running&&queue.length){queue.forEach(s=>s.delay-=dt*1000);while(queue[0]&&queue[0].delay<=0)spawn(queue.shift())}
  for(let i=enemies.length-1;i>=0;i--){
    if(!move(enemies[i],dt)){lives-=enemies[i].boss?5:1;enemies.splice(i,1);ui();if(lives<=0)return finish(false)}
  }
  towers.forEach(t=>attack(t,dt));
  for(let i=projectiles.length-1;i>=0;i--){
    const p=projectiles[i];
    if(!enemies.includes(p.target)){projectiles.splice(i,1);continue}
    const dx=p.target.x-p.x,dy=p.target.y-p.y,d=Math.hypot(dx,dy);
    if(d<p.speed*dt+8){
      hitProjectile(p);projectiles.splice(i,1);
      if(p.target.hp<=0){gold+=p.target.reward;enemies.splice(enemies.indexOf(p.target),1);ui()}
      continue;
    }
    p.x+=dx/d*p.speed*dt;p.y+=dy/d*p.speed*dt;
  }
  for(let i=effects.length-1;i>=0;i--){const e=effects[i];e.life-=dt;if(e.kind==='particle'){e.x+=(e.vx||0)*dt;e.y+=(e.vy||0)*dt}if(e.life<=0)effects.splice(i,1)}
  if(running&&!queue.length&&!enemies.length){
    running=false;completeWave();
    if(wave>=10)finish(true);
  }
}
function finish(win){
  running=false;queue=[];
  $('#resultModal').classList.remove('hidden');
  $('#resultTitle').textContent=win?'Victory!':'The Core Has Fallen';
  if(win){
    save.essence+=currentLevel.reward;if(!save.completedLevels.includes(currentLevel.id))save.completedLevels.push(currentLevel.id);save.wardenLevel=Math.max(save.wardenLevel,1+Math.ceil(currentLevel.id/2));persist();
    $('#resultText').textContent=`${currentLevel.name} defended. You earned ${currentLevel.reward} Essence. Level ${currentLevel.id<10?'1-'+(currentLevel.id+1)+' unlocked.':'region complete!'}`;
  }else $('#resultText').textContent='Strengthen your defence and try again.';
}
$('#resultContinue').onclick=()=>{$('#resultModal').classList.add('hidden');show('hubScreen')};

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#4f824d';ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let x=0;x<canvas.width;x+=50)for(let y=0;y<canvas.height;y+=50)if((x+y)%100===0){ctx.fillStyle='#5c8f56';ctx.fillRect(x,y,50,50)}
  ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#8e7652';ctx.lineWidth=76;ctx.beginPath();ctx.moveTo(path[0].x,path[0].y);path.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();ctx.strokeStyle='#b39a6a';ctx.lineWidth=58;ctx.stroke();
  ctx.fillStyle='#71b65e';ctx.beginPath();ctx.arc(925,250,52,0,Math.PI*2);ctx.fill();ctx.fillStyle='#e2d36f';ctx.beginPath();ctx.arc(925,250,27,0,Math.PI*2);ctx.fill();
  towers.forEach(t=>{if(t===selectedTower){ctx.strokeStyle='#ffe17b';ctx.lineWidth=4;ctx.beginPath();ctx.arc(t.x,t.y,32,0,Math.PI*2);ctx.stroke()}ctx.fillStyle='#1b2a20';ctx.beginPath();ctx.arc(t.x,t.y,26,0,Math.PI*2);ctx.fill();const img=spriteImgs[t.b.id];if(img&&img.complete)ctx.drawImage(img,t.x-23,t.y-23,46,46)});
  enemies.forEach(e=>{ctx.fillStyle=e.boss?'#6d2738':'#49382b';ctx.beginPath();ctx.arc(e.x,e.y,e.boss?24:16,0,Math.PI*2);ctx.fill();ctx.fillStyle='#171717';ctx.fillRect(e.x-22,e.y-(e.boss?34:26),44,6);ctx.fillStyle='#d95252';ctx.fillRect(e.x-22,e.y-(e.boss?34:26),44*(e.hp/e.max),6)});
  projectiles.forEach(p=>{p.spin=(p.spin||0)+.2;ctx.save();ctx.translate(p.x,p.y);if(p.type==='Fire'){ctx.shadowBlur=16;ctx.shadowColor='#ff6a2b';ctx.fillStyle='#ff9d3d';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(-2,-2,4,0,Math.PI*2);ctx.fill()}else if(p.type==='Nature'){ctx.strokeStyle='#77d66a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-10,6);ctx.lineTo(0,-8);ctx.lineTo(10,6);ctx.stroke()}else if(p.type==='Water'){ctx.fillStyle='#68cfff';ctx.beginPath();ctx.ellipse(0,0,9,6,p.spin,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#d8f6ff';ctx.stroke()}else if(p.type==='Electric'){ctx.strokeStyle='#fff36c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-9,-5);ctx.lineTo(-2,1);ctx.lineTo(1,-5);ctx.lineTo(8,5);ctx.stroke()}else if(p.type==='Rock'){ctx.rotate(p.spin);ctx.fillStyle='#9a8b7d';ctx.fillRect(-8,-8,16,16);ctx.strokeStyle='#e0d2c2';ctx.strokeRect(-8,-8,16,16)}else if(p.type==='Wind'){ctx.strokeStyle='#d8ffe7';ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,10,-1.1,1.1);ctx.stroke()}else if(p.type==='Poison'){ctx.fillStyle='#d66ae6';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#a7ff83';ctx.beginPath();ctx.arc(3,-3,2,0,Math.PI*2);ctx.fill()}else if(p.type==='Ice'){ctx.rotate(p.spin);ctx.strokeStyle='#d9fbff';ctx.lineWidth=3;for(let a=0;a<3;a++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(-9,0);ctx.lineTo(9,0);ctx.stroke()}}else if(p.type==='Dark'){ctx.rotate(-.6);ctx.fillStyle='#7f67bb';ctx.beginPath();ctx.moveTo(-12,0);ctx.quadraticCurveTo(0,-8,12,0);ctx.quadraticCurveTo(0,5,-12,0);ctx.fill()}else if(p.type==='Light'){ctx.shadowBlur=18;ctx.shadowColor='#fff5a8';ctx.fillStyle='#fff6b3';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill()}else{ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(0,0,5,0,Math.PI*2);ctx.fill()}ctx.restore()});
  effects.forEach(e=>{const a=Math.max(0,e.life/e.maxLife);ctx.save();ctx.globalAlpha=a;if(e.kind==='burst'||e.kind==='splash'||e.kind==='freeze'||e.kind==='poison'||e.kind==='dust'||e.kind==='wind'||e.kind==='light'||e.kind==='zap'||e.kind==='apex'){ctx.strokeStyle=e.color;ctx.lineWidth=e.kind==='freeze'?4:3;ctx.beginPath();ctx.arc(e.x,e.y,(e.size||40)*(1-a+.25),0,Math.PI*2);ctx.stroke()}if(e.kind==='roots'){ctx.strokeStyle=e.color;ctx.lineWidth=4;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(e.x,e.y+12);ctx.quadraticCurveTo(e.x+(i-2)*9,e.y-8,e.x+(i-2)*12,e.y-22);ctx.stroke()}}if(e.kind==='particle'){ctx.fillStyle=e.color;ctx.beginPath();ctx.arc(e.x,e.y,(e.size||4)*a,0,Math.PI*2);ctx.fill()}if(e.kind==='lightning'){ctx.strokeStyle=e.color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x,e.y);let mx=(e.x+e.x2)/2,my=(e.y+e.y2)/2;ctx.lineTo(mx+8,my-8);ctx.lineTo(mx-5,my+5);ctx.lineTo(e.x2,e.y2);ctx.stroke()}if(e.kind==='crit'){ctx.fillStyle=e.color;ctx.font='bold 18px sans-serif';ctx.fillText('CRIT!',e.x-22,e.y-24*(1-a)-18)}ctx.restore()});
}
function loop(ts){
  if(!$('#gameScreen').classList.contains('active'))return;
  const dt=Math.min(.033,(ts-last)/1000||0);last=ts;
  update(dt*speed);draw();requestAnimationFrame(loop);
}
renderStarters();updateHub();renderSaveSlots();applyMotionSetting();setSpeed(1);renderCampaignMap();