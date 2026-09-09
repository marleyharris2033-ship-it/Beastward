const $=s=>document.querySelector(s);
const screens=[...document.querySelectorAll('.screen')];
function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id))}

const beasts={
embercub:{id:'embercub',name:'Embercub',type:'Fire',role:'Damage',cost:140,range:138,rate:.60,damage:21,color:'#ff7a3d',evo20:'Pyrelion',evo30:'Infernalion',sprite:'assets/pixel/embercub.png',towerSprite:'assets/pixel/embercub_tower.png'},
sprigpaw:{id:'sprigpaw',name:'Sprigpaw',type:'Nature',role:'Control',cost:150,range:135,rate:.70,damage:19,color:'#62c96b',evo20:'Thornmaw',evo30:'Elderfang',sprite:'assets/pixel/sprigpaw.png',towerSprite:'assets/pixel/sprigpaw_tower.png'},
bubblit:{id:'bubblit',name:'Bubblit',type:'Water',role:'Slow',cost:145,range:140,rate:.65,damage:18,color:'#55a8ff',evo20:'Tiderex',evo30:'Abyssara',sprite:'assets/pixel/bubblit.png',towerSprite:'assets/pixel/bubblit_tower.png'},
sparkit:{id:'sparkit',name:'Sparkit',type:'Electric',role:'Chain',cost:150,range:140,rate:.72,damage:18,color:'#ffd64e',evo20:'Voltail',evo30:'Stormclaw',sprite:'assets/pixel/sparkit.png',towerSprite:'assets/pixel/sparkit_tower.png'},
pebblum:{id:'pebblum',name:'Pebblum',type:'Rock',role:'Heavy',cost:165,range:125,rate:.95,damage:31,color:'#a89b8e',evo20:'Boulderback',evo30:'Titanrock',sprite:'assets/pixel/pebblum.png',towerSprite:'assets/pixel/pebblum_tower.png'},
gustwing:{id:'gustwing',name:'Gustwing',type:'Wind',role:'Range',cost:155,range:175,rate:.66,damage:20,color:'#b6efd0',evo20:'Galehawk',evo30:'Tempestral',sprite:'assets/pixel/gustwing.png',towerSprite:'assets/pixel/gustwing_tower.png'},
toxip:{id:'toxip',name:'Toxip',type:'Poison',role:'Damage over Time',cost:150,range:135,rate:.74,damage:19,color:'#d46be8',evo20:'Venomane',evo30:'Plaguefang',sprite:'assets/pixel/toxip.png',towerSprite:'assets/pixel/toxip_tower.png'},
frostkit:{id:'frostkit',name:'Frostkit',type:'Ice',role:'Freeze',cost:175,range:145,rate:.82,damage:23,color:'#9fe8ff',evo20:'Glacifang',evo30:'Cryowyrm',sprite:'assets/pixel/frostkit.png',towerSprite:'assets/pixel/frostkit_tower.png'},
shadepup:{id:'shadepup',name:'Shadepup',type:'Dark',role:'Critical',cost:180,range:135,rate:.74,damage:24,color:'#8f79cf',evo20:'Dreadfang',evo30:'Nightreaver',sprite:'assets/sprites/shadepup.svg',towerSprite:'assets/sprites/shadepup.svg'},
lumpling:{id:'lumpling',name:'Lumpling',type:'Light',role:'Splash',cost:185,range:155,rate:.82,damage:24,color:'#fff0a2',evo20:'Radihorn',evo30:'Solarius',sprite:'assets/pixel/lumpling.png',towerSprite:'assets/pixel/lumpling_tower.png'},
voltwing:{id:'voltwing',name:'Voltwing',type:'Electric',role:'Chain+',cost:190,range:175,rate:.72,damage:23,color:'#fff277',evo20:'Thunderoc',evo30:'Stormra',sprite:'assets/pixel/voltwing.png',towerSprite:'assets/pixel/voltwing_tower.png'},
scorchick:{id:'scorchick',name:'Scorchick',type:'Fire',role:'Rapid Burn',cost:135,range:125,rate:.45,damage:13,color:'#ff9a3d',evo20:'Flarewing',evo30:'Sunphoenix',sprite:'assets/sprites/scorchick.svg',towerSprite:'assets/sprites/scorchick.svg'},
mosshell:{id:'mosshell',name:'Mosshell',type:'Nature',role:'Stagger',cost:160,range:120,rate:.98,damage:30,color:'#78b85b',evo20:'Groveshell',evo30:'Worldback',sprite:'assets/pixel/mosshell.png',towerSprite:'assets/pixel/mosshell_tower.png'},
drizzlet:{id:'drizzlet',name:'Drizzlet',type:'Water',role:'Rapid Slow',cost:140,range:145,rate:.50,damage:14,color:'#6bcce8',evo20:'Rilltail',evo30:'Torrentusk',sprite:'assets/pixel/drizzlet.png',towerSprite:'assets/pixel/drizzlet_tower.png'},
zapmoth:{id:'zapmoth',name:'Zapmoth',type:'Electric',role:'Fast Chain',cost:145,range:150,rate:.54,damage:14,color:'#ffe55f',evo20:'Voltmoth',evo30:'Tempestwing',sprite:'assets/pixel/zapmoth.png',towerSprite:'assets/pixel/zapmoth_tower.png'},
cindrake:{id:'cindrake',name:'Cindrake',type:'Fire',role:'Meteor',cost:235,range:165,rate:.85,damage:38,color:'#ff6b35',evo20:'Magmara',evo30:'Vulcanox',sprite:'assets/pixel/cindrake.png',towerSprite:'assets/pixel/cindrake_tower.png'},
sporeling:{id:'sporeling',name:'Sporeling',type:'Poison',role:'Toxic Burst',cost:220,range:160,rate:.78,damage:29,color:'#d47be3',evo20:'Mycomaw',evo30:'Fungorath',sprite:'assets/pixel/sporeling.png',towerSprite:'assets/pixel/sporeling_tower.png'},
drakeling:{id:'drakeling',name:'Drakeling',type:'Wind',role:'Piercing Gale',cost:230,range:200,rate:.70,damage:30,color:'#8de6d7',evo20:'Draconis',evo30:'Aetherion',sprite:'assets/pixel/drakeling.png',towerSprite:'assets/pixel/drakeling_tower.png'},
voidling:{id:'voidling',name:'Voidling',type:'Dark',role:'Void Critical',cost:240,range:170,rate:.78,damage:35,color:'#a675e8',evo20:'Riftbeast',evo30:'Oblivion',sprite:'assets/sprites/voidling.svg',towerSprite:'assets/sprites/voidling.svg'}
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

function overlayPathForStage(id,stage=1){
  return stage>1?`assets/pixel/evolved/${id}_${stage}.svg`:null;
}
function currentSprite(id){return beasts[id].sprite}
function stageSpriteMarkup(id,stage=evolutionStage(id),extra=''){
  const b=beasts[id],overlay=overlayPathForStage(id,stage);
  return `<span class="stage-sprite stage-${stage} type-${b.type.toLowerCase()} ${extra}">
    <img class="stage-base" src="${b.sprite}" alt="${nameFor(id)}">
    ${overlay?`<img class="stage-overlay" src="${overlay}" alt="">`:''}
  </span>`;
}
const spriteImgs={},evolutionOverlayImgs={};
Object.values(beasts).forEach(b=>{
  const base=new Image();
  base.onerror=()=>{if(!base.dataset.fallback){base.dataset.fallback='1';base.src='assets/sprites/'+b.id+'.svg'}};
  base.src=b.sprite;
  spriteImgs[b.id]=base;
  evolutionOverlayImgs[b.id]={};
  [2,3].forEach(stage=>{
    const overlay=new Image();
    overlay.src=overlayPathForStage(b.id,stage);
    evolutionOverlayImgs[b.id][stage]=overlay;
  });
});
document.addEventListener('error',e=>{
  const img=e.target;
  if(!img||img.tagName!=='IMG'||img.dataset.spriteFallback)return;
  const src=img.src||'',file=src.split('/').pop()||'';
  if(src.includes('/assets/pixel/evolved/')){
    img.style.display='none';
    return;
  }
  if(src.includes('/assets/pixel/')){
    const id=file.replace('_tower.png','').replace('.png','');
    img.dataset.spriteFallback='1';
    img.src='assets/sprites/'+id+'.svg';
  }
},true);

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
function rangeMultiplier(id){
  // Range grows gently across levels so evolution never makes the battlefield trivial.
  // Lv30 adds ~4.4%, each Ascension adds 1%, and evolution adds a modest 4% / 8%.
  const level=progress(id).level,stage=evolutionStage(id);
  const levelGrowth=1+(level-1)*.0015;
  const ascensionGrowth=1+ascension(id)*.01;
  const evolutionGrowth=stage===3?1.08:stage===2?1.04:1;
  return levelGrowth*ascensionGrowth*evolutionGrowth;
}
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
      <div class="beast-card-top"><div class="sprite-wrap">${stageSpriteMarkup(id)}</div><div class="ascension-stars">${'★'.repeat(a)}${'☆'.repeat(3-a)}</div></div>
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
const enemyTypes={
 raider:{id:'raider',name:'Forest Raider',kind:'Common',hp:1,speed:1,reward:1,size:18,sprite:'assets/enemies/forest_raider.svg',text:'The standard Verdant Valley invader. Balanced health and speed.'},
 hound:{id:'hound',name:'Ruin Hound',kind:'Fast',hp:.62,speed:1.55,reward:.85,size:17,sprite:'assets/enemies/ruin_hound.svg',text:'A fast hunter with low health. It punishes defences with poor coverage.'},
 brute:{id:'brute',name:'Stone Brute',kind:'Heavy',hp:2.15,speed:.68,reward:1.75,size:23,sprite:'assets/enemies/stone_brute.svg',text:'Slow, heavily armoured and difficult to bring down before it reaches the Core.'},
 wisp:{id:'wisp',name:'Grove Wisp',kind:'Swarm',hp:.44,speed:1.18,reward:.55,size:15,sprite:'assets/enemies/wisp_swarm.svg',text:'Fragile spirits that arrive in dense groups and overwhelm slow attackers.'},
 hollowmaw:{id:'hollowmaw',name:'Hollowmaw',kind:'Boss',hp:1,speed:1,reward:1,size:34,sprite:'assets/enemies/hollowmaw.svg',text:'A corrupted alpha beast with enormous health. Five lives are lost if it reaches the Core.'}
};
const bestiaryEnemies=Object.values(enemyTypes);
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
   arr.forEach(b=>{const row=document.createElement('button');row.className='best-row'+(b.id===bestiarySelected?' active':'');const unlocked=save.unlocked.includes(b.id);row.innerHTML=`${stageSpriteMarkup(b.id,evolutionStage(b.id),'row-sprite')}<div><h4>${nameFor(b.id)}</h4><small>${b.type} • Lv ${progress(b.id).level} • ${unlocked?'Collected':'Undiscovered'}</small></div><span class="tag">${b.role}</span>`;row.onclick=()=>{bestiarySelected=b.id;renderBestiary()};list.appendChild(row)});
   if(!bestiarySelected){detail.innerHTML='<div class="lore-card">No beasts match your search.</div>';return}
   const b=beasts[bestiarySelected],lore=beastLore(b.id),p=progress(b.id),unlocked=save.unlocked.includes(b.id);
   detail.innerHTML=`<div class="best-hero"><div class="best-portrait">${stageSpriteMarkup(b.id,evolutionStage(b.id),'portrait-sprite')}</div><div class="best-detail-title"><h3>${nameFor(b.id)}</h3><div class="best-pills"><span class="best-pill">${b.type}</span><span class="best-pill">${b.role}</span><span class="best-pill">Level ${p.level}/30</span><span class="best-pill">Ascension ${ascension(b.id)}/3</span><span class="best-pill">${unlocked?'Collected':'Not collected'}</span></div><p><b>${lore[0]}</b><br>${lore[1]}</p></div></div>${statBars(b.id)}<div class="best-section"><b>Evolution line</b><div class="evo-line"><div class="evo">${stageSpriteMarkup(b.id,1,'evo-sprite')}<small>Lv 1</small><b>${b.name}</b></div><div class="evo">${stageSpriteMarkup(b.id,2,'evo-sprite')}<small>Lv 15</small><b>${b.evo20}</b></div><div class="evo">${stageSpriteMarkup(b.id,3,'evo-sprite')}<small>Lv 30</small><b>${b.evo30}</b></div></div></div>`;
 }else if(bestiaryTab==='enemies'){
   filters.innerHTML='';list.innerHTML='';
   bestiaryEnemies.forEach((e,i)=>{const row=document.createElement('button');row.className='best-row'+(bestiarySelected===i?' active':'');row.innerHTML=`<img src="${e.sprite}" alt="${e.name}"><div><h4>${e.name}</h4><small>${e.kind}</small></div><span class="tag">Enemy</span>`;row.onclick=()=>{bestiarySelected=i;renderBestiary()};list.appendChild(row)});
   if(typeof bestiarySelected!=='number')bestiarySelected=0;const e=bestiaryEnemies[bestiarySelected]||bestiaryEnemies[0];detail.innerHTML=`<div class="best-hero"><div class="best-portrait"><img src="${e.sprite}" alt="${e.name}"></div><div class="best-detail-title"><h3>${e.name}</h3><div class="best-pills"><span class="best-pill">${e.kind}</span><span class="best-pill">Enemy</span></div><p>${e.text}</p></div></div><div class="best-section"><b>Warden advice</b><p>${e.kind==='Fast'?'Use slows, freezes and good path coverage.':e.kind==='Heavy'?'High damage, poison and boss-style single-target builds work well.':e.kind==='Swarm'?'Splash, chain lightning and rapid attackers are ideal.':e.kind==='Boss'?'Use upgraded beasts and combine damage with control effects.':'A balanced defence handles these reliably.'}</p></div>`;
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
{
 id:1,name:"Keeper's Path",theme:"meadow",waves:10,reward:120,hp:1,speed:1,
 pathWidth:74,pathEdge:"#806943",pathFill:"#b79b68",
 path:[{x:-30,y:310},{x:145,y:310},{x:250,y:185},{x:390,y:185},{x:505,y:405},{x:650,y:405},{x:755,y:255},{x:930,y:255}],
 scenery:[
  {kind:"tree",x:90,y:105},{kind:"tree",x:305,y:500},{kind:"tree",x:805,y:95},
  {kind:"bush",x:535,y:95},{kind:"bush",x:820,y:485},{kind:"rock",x:90,y:485},
  {kind:"flowers",x:275,y:85},{kind:"flowers",x:565,y:525},{kind:"flowers",x:850,y:175}
 ]
},
{
 id:2,name:"Whispering Woods",theme:"forest",waves:10,reward:135,hp:1.12,speed:1.03,
 pathWidth:70,pathEdge:"#67533a",pathFill:"#927a54",
 path:[{x:-30,y:90},{x:865,y:90},{x:865,y:505},{x:160,y:505},{x:160,y:215},{x:690,y:215},{x:690,y:390},{x:335,y:390},{x:335,y:305},{x:930,y:305}],
 scenery:[
  {kind:"pine",x:85,y:85},{kind:"pine",x:125,y:500},{kind:"pine",x:330,y:80},{kind:"pine",x:575,y:505},
  {kind:"pine",x:850,y:90},{kind:"stump",x:315,y:285},{kind:"mushroom",x:570,y:255},
  {kind:"mushroom",x:860,y:470},{kind:"bush",x:90,y:360},{kind:"bush",x:620,y:245}
 ]
},
{
 id:3,name:"Broken Bridge",theme:"river",waves:10,reward:150,hp:1.25,speed:1.05,
 pathWidth:68,pathEdge:"#786145",pathFill:"#ad9167",
 path:[{x:-30,y:500},{x:185,y:500},{x:315,y:390},{x:430,y:330},{x:505,y:310},{x:580,y:240},{x:705,y:145},{x:825,y:145},{x:930,y:255}],
 scenery:[
  {kind:"river",x:430,y:0,w:145,h:600,block:true},{kind:"bridge",x:502,y:310,w:150,h:54,dir:"h"},
  {kind:"brokenBridge",x:500,y:485,w:120,h:42},{kind:"reed",x:402,y:95},{kind:"reed",x:598,y:115},
  {kind:"reed",x:402,y:510},{kind:"reed",x:598,y:520},{kind:"rock",x:110,y:140},{kind:"rock",x:865,y:115}
 ]
},
{
 id:4,name:"Mosswood Village",theme:"village",waves:10,reward:165,hp:1.4,speed:1.07,
 pathWidth:72,pathEdge:"#7b6645",pathFill:"#b49a6d",
 path:[{x:-30,y:160},{x:210,y:160},{x:210,y:500},{x:505,y:500},{x:505,y:285},{x:325,y:285},{x:325,y:80},{x:735,y:80},{x:735,y:390},{x:930,y:390}],
 scenery:[
  {kind:"hut",x:85,y:95,block:true},{kind:"hut",x:300,y:120,block:true},{kind:"hut",x:825,y:115,block:true},
  {kind:"hut",x:815,y:500,block:true},{kind:"fence",x:80,y:375,w:130},{kind:"fence",x:480,y:510,w:170},
  {kind:"crate",x:285,y:380},{kind:"crate",x:760,y:265},{kind:"lantern",x:245,y:250},{kind:"lantern",x:545,y:180},
  {kind:"tree",x:520,y:80}
 ]
},
{
 id:5,name:"Ancient Shrine",theme:"shrine",waves:10,reward:185,hp:1.58,speed:1.08,boss:true,
 pathWidth:70,pathEdge:"#55594e",pathFill:"#8d917d",
 path:[{x:-30,y:300},{x:175,y:120},{x:385,y:300},{x:540,y:105},{x:710,y:300},{x:545,y:500},{x:340,y:365},{x:780,y:365},{x:930,y:245}],
 scenery:[
  {kind:"shrine",x:555,y:115,block:true},{kind:"pillar",x:115,y:285},{kind:"pillar",x:165,y:285},
  {kind:"pillar",x:630,y:385},{kind:"pillar",x:680,y:385},{kind:"rune",x:370,y:245},
  {kind:"rune",x:870,y:455},{kind:"lantern",x:355,y:110},{kind:"lantern",x:830,y:235},
  {kind:"rock",x:115,y:500}
 ]
},
{
 id:6,name:"River Crossing",theme:"wetlands",waves:10,reward:205,hp:1.78,speed:1.1,
 pathWidth:66,pathEdge:"#665c45",pathFill:"#9f8d67",
 path:[{x:-30,y:475},{x:180,y:475},{x:180,y:155},{x:335,y:155},{x:485,y:275},{x:635,y:155},{x:805,y:155},{x:805,y:470},{x:930,y:470}],
 scenery:[
  {kind:"water",x:0,y:225,w:1000,h:105,block:true},{kind:"bridge",x:485,y:277,w:125,h:52,dir:"v"},
  {kind:"lily",x:90,y:255},{kind:"lily",x:290,y:292},{kind:"lily",x:680,y:252},{kind:"lily",x:905,y:285},
  {kind:"reed",x:120,y:210},{kind:"reed",x:350,y:345},{kind:"reed",x:700,y:345},{kind:"reed",x:890,y:215},
  {kind:"willow",x:315,y:485},{kind:"rock",x:690,y:95}
 ]
},
{
 id:7,name:"Corrupted Grove",theme:"corrupted",waves:10,reward:230,hp:2.0,speed:1.12,
 pathWidth:70,pathEdge:"#40364d",pathFill:"#6a5678",
 path:[{x:-30,y:115},{x:190,y:115},{x:190,y:470},{x:350,y:470},{x:350,y:190},{x:520,y:190},{x:520,y:505},{x:690,y:505},{x:690,y:120},{x:845,y:120},{x:845,y:430},{x:930,y:430}],
 scenery:[
  {kind:"corruption",x:455,y:320,rx:105,ry:80,block:true},{kind:"corruption",x:835,y:125,rx:75,ry:55,block:true},
  {kind:"deadTree",x:90,y:95},{kind:"deadTree",x:250,y:500},{kind:"deadTree",x:545,y:510},
  {kind:"thorn",x:510,y:185},{kind:"thorn",x:790,y:335},{kind:"voidCrystal",x:500,y:65},
  {kind:"voidCrystal",x:875,y:500},{kind:"mushroom",x:250,y:135}
 ]
},
{
 id:8,name:"Beastkeeper Ruins",theme:"ruins",waves:10,reward:255,hp:2.25,speed:1.14,
 pathWidth:70,pathEdge:"#5b5d55",pathFill:"#858779",
 path:[{x:-30,y:525},{x:130,y:525},{x:130,y:410},{x:300,y:410},{x:300,y:290},{x:470,y:290},{x:470,y:170},{x:650,y:170},{x:650,y:300},{x:815,y:300},{x:815,y:145},{x:930,y:145}],
 scenery:[
  {kind:"wall",x:120,y:95,w:185,h:30,block:true},{kind:"wall",x:675,y:520,w:210,h:28,block:true},
  {kind:"pillar",x:430,y:95},{kind:"pillar",x:470,y:95},{kind:"pillar",x:690,y:285},
  {kind:"statue",x:150,y:430,block:true},{kind:"statue",x:890,y:120,block:true},{kind:"rune",x:430,y:350},
  {kind:"brokenWall",x:675,y:310,w:120},{kind:"tree",x:80,y:520}
 ]
},
{
 id:9,name:"Hollow Pass",theme:"canyon",waves:10,reward:285,hp:2.55,speed:1.16,
 pathWidth:64,pathEdge:"#6e5037",pathFill:"#a47b54",
 path:[{x:-30,y:105},{x:250,y:105},{x:375,y:250},{x:235,y:410},{x:505,y:500},{x:660,y:340},{x:535,y:185},{x:790,y:80},{x:930,y:220}],
 scenery:[
  {kind:"cliff",x:0,y:0,w:1000,h:58,block:true},{kind:"cliff",x:0,y:545,w:1000,h:55,block:true},
  {kind:"boulder",x:105,y:470,block:true},{kind:"boulder",x:315,y:95,block:true},{kind:"boulder",x:845,y:155,block:true},
  {kind:"dryBush",x:305,y:500},{kind:"dryBush",x:560,y:255},{kind:"bones",x:805,y:375},
  {kind:"dustRock",x:525,y:95},{kind:"dustRock",x:85,y:265}
 ]
},
{
 id:10,name:"Hollowmaw's Den",theme:"den",waves:10,reward:350,hp:2.9,speed:1.18,boss:true,
 pathWidth:66,pathEdge:"#352d31",pathFill:"#5d4b4e",
 path:[{x:-30,y:300},{x:120,y:300},{x:120,y:75},{x:875,y:75},{x:875,y:525},{x:245,y:525},{x:245,y:185},{x:745,y:185},{x:745,y:410},{x:385,y:410},{x:385,y:285},{x:620,y:285},{x:620,y:350},{x:930,y:350}],
 scenery:[
  {kind:"cavePool",x:240,y:315,rx:92,ry:70,block:true},{kind:"cavePool",x:745,y:505,rx:75,ry:46,block:true},
  {kind:"caveCrystal",x:80,y:485},{kind:"caveCrystal",x:520,y:85},{kind:"caveCrystal",x:900,y:125},
  {kind:"bones",x:255,y:190},{kind:"bones",x:540,y:400},{kind:"torch",x:290,y:90},
  {kind:"torch",x:770,y:205},{kind:"stalagmite",x:540,y:555,block:true},{kind:"stalagmite",x:900,y:510,block:true}
 ]
}
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
let towers=[],enemies=[],projectiles=[],effects=[],selectedSpecies=null,selectedTower=null,gold=400,lives=20,wave=0,running=false,last=0,queue=[],speed=1,waveParticipants=new Set();

function ui(){$('#gold').textContent=Math.floor(gold);$('#lives').textContent=lives;$('#wave').textContent=wave;if(selectedTower)renderUpgradeButtons()}
const upgradeDefs={
 power:[
  {name:'Sharpened Instinct',desc:'+20% damage',mult:.65},
  {name:'Hunter Reach',desc:'+18% range and +10% damage',mult:1.0},
  {name:'Apex Force',desc:'+35% damage and empowered projectiles',mult:1.6},
  {name:'Mythic Instinct',desc:'Massive final buff: huge damage and extra reach',mult:3.0}
 ],
 special:[
  {name:'Quickened Spirit',desc:'12% faster attacks',mult:.55},
  {name:'Elemental Mastery',desc:'Stronger elemental status effects',mult:.9},
  {name:'Primal Surge',desc:'Unlocks a powerful type-specific effect',mult:1.5},
  {name:'Ancestral Awakening',desc:'Massive final buff: far faster attacks and empowered elemental effects',mult:2.8}
 ]
};
const beastSkills={
 embercub:{name:'Flameheart',desc:['Burn damage +25%','Burn lasts longer and splashes','Inferno: burning targets erupt'],mult:[.55,.9,1.45]},
 sprigpaw:{name:'Verdant Snare',desc:['Root chance +15%','Roots last longer','Wild Growth: roots spread nearby'],mult:[.5,.85,1.4]},
 bubblit:{name:'Tidal Pulse',desc:['Slow strength increased','Slow lasts longer','Riptide: hits splash strong slow'],mult:[.5,.85,1.4]},
 sparkit:{name:'Overcharge',desc:['Chain +1 target','Chain damage +20%','Supercell: chains can stun'],mult:[.55,.9,1.45]},
 pebblum:{name:'Seismic Slam',desc:['Stun lasts longer','Hits splash nearby','Earthshatter: huge area stagger'],mult:[.6,.95,1.5]},
 gustwing:{name:'Tailwind',desc:['Wind pierces +1 target','+12% range','Cyclone: pierces a wide group'],mult:[.5,.9,1.45]},
 toxip:{name:'Virulent Venom',desc:['Poison damage +30%','Poison lasts longer','Plague Cloud: poison spreads'],mult:[.55,.9,1.45]},
 frostkit:{name:'Deep Freeze',desc:['Freeze chance +12%','Freeze lasts longer','Absolute Zero: freezes nearby enemies'],mult:[.6,.95,1.5]},
 shadepup:{name:'Night Hunt',desc:['Critical chance +12%','Critical damage increased','Execution: brutal low-health crits'],mult:[.6,.95,1.55]},
 lumpling:{name:'Radiant Nova',desc:['Splash radius +20%','Splash damage +25%','Sunburst: massive radiant explosion'],mult:[.6,.95,1.5]},
 voltwing:{name:'Storm Relay',desc:['Chain +1 target','Chain damage +25%','Thunderweb: farther chains can stun'],mult:[.65,1,1.55]},
 scorchick:{name:'Ember Rush',desc:['+10% attack speed','Burn damage +25%','Firestorm: rapid hits explode'],mult:[.45,.8,1.35]},
 mosshell:{name:'Ancient Shell',desc:['Stagger lasts longer','+20% boss damage','Quake Shell: attacks stagger an area'],mult:[.55,.9,1.45]},
 drizzlet:{name:'Flash Flood',desc:['Slow strength increased','+10% attack speed','Downpour: splash slow nearby'],mult:[.45,.8,1.35]},
 zapmoth:{name:'Static Swarm',desc:['Chain +1 target','+10% attack speed','Arc Swarm: rapid crowd chaining'],mult:[.5,.85,1.4]},
 cindrake:{name:'Meteor Core',desc:['Meteor splash +25%','Burning splash +30%','Cataclysm: enormous blast'],mult:[.7,1.1,1.7]},
 sporeling:{name:'Spore Colony',desc:['Poison duration +30%','Burst spreads farther','Bloom: infected enemies spread poison'],mult:[.65,1.05,1.65]},
 drakeling:{name:'Skybreaker',desc:['Wind pierces +1 target','+15% range','Tempest Lance: tears through groups'],mult:[.65,1.05,1.65]},
 voidling:{name:'Rift Hunger',desc:['Critical chance +15%','Crits splash void damage','Singularity: crits tear nearby enemies','Event Horizon: huge crit bursts with wide void splash'],mult:[.7,1.1,1.7,3.06]}
};
function upgradeCost(t,path){
 const tier=t[path+'Tier']||0;
 if(path==='skill'){
   const skill=beastSkills[t.b.id],mult=skill?.mult?.[tier];
   return mult?Math.ceil(t.baseCost*mult/5)*5:null;
 }
 const def=upgradeDefs[path][tier];
 return def?Math.ceil(t.baseCost*def.mult/5)*5:null;
}
function recalcTower(t){
 const base=battleStats(t.b.id),p=t.powerTier||0,s=t.specialTier||0,k=t.skillTier||0,id=t.b.id;
 const powerDamage=[1,1.2,1.32,1.782,2.85][p]||1;
 const powerRange=[1,1,1.18,1.18,1.36][p]||1;
 const specialRate=[1,.88,.88,.88,.68][s]||1;
 let skillDamage=1,skillRange=1,skillRate=1;
 if(id==='gustwing'&&k>=2)skillRange*=1.12;
 if(id==='drakeling'&&k>=2)skillRange*=1.15;
 if(id==='scorchick'&&k>=1)skillRate*=k>=2?.82:.90;
 if(id==='drizzlet'&&k>=2)skillRate*=.90;
 if(id==='zapmoth'&&k>=2)skillRate*=.90;
 if(id==='mosshell'&&k>=2)skillDamage*=1.08;
 if(k>=4){skillDamage*=1.35;skillRate*=.82;skillRange*=1.08}
 t.b={...base,damage:base.damage*powerDamage*skillDamage,range:clampCombatRange(base.range*powerRange*skillRange),rate:base.rate*specialRate*skillRate};
}
function combatRangeBase(id){
  // Displayed stats scale from /10 to /20 to /30 as beasts evolve, but combat
  // range uses the stat's PERCENTAGE of its stage cap rather than the raw number.
  // Example: 6/10, 12/20 and 18/30 all represent the same core range identity.
  const stats=stageStats(id);
  const ratio=Math.max(.35,Math.min(1,stats.range/stats.cap));
  return 115+ratio*85; // balanced base spectrum: ~145px to 200px
}
function clampCombatRange(value){return Math.max(135,Math.min(260,value))}
function battleStats(id){
  const b=beasts[id];
  return {...b,damage:b.damage*levelMultiplier(id),range:clampCombatRange(combatRangeBase(id)*rangeMultiplier(id)),rate:b.rate*(1-ascension(id)*.03)};
}
function choices(){
  const w=$('#towerChoices');w.innerHTML='';
  save.unlocked.forEach(id=>{
    const b=beasts[id],el=document.createElement('button');
    el.className='tower-choice';
    const ss=stageStats(id);el.innerHTML=`${stageSpriteMarkup(id,evolutionStage(id),'tower-list-sprite')}<div><b>${nameFor(id)}</b><small>Lv ${progress(id).level} • Stage ${ss.stage} • ${b.role} • ${b.cost} gold</small><small>POW ${ss.power}/${ss.cap} • SPD ${ss.speed}/${ss.cap} • RNG ${ss.range}/${ss.cap}</small></div>`;
    el.onclick=()=>{selectedSpecies=id;selectedTower=null;renderSelectedTower();document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')};
    w.appendChild(el);
  });
}
function closeTowerModal(){
  const modal=$('#selectedTowerModal');
  if(modal)modal.classList.add('hidden');
  const p=$('#selectedTowerPanel');if(p)p.classList.add('hidden');
  selectedTower=null;
}
function renderSelectedTower(){
  const p=$('#selectedTowerPanel'),modal=$('#selectedTowerModal');
  if(!selectedTower||!towers.includes(selectedTower)){
    selectedTower=null;
    if(p)p.classList.add('hidden');
    if(modal)modal.classList.add('hidden');
    return;
  }
  if(p)p.classList.remove('hidden');
  if(modal)modal.classList.remove('hidden');
  $('#selectedTowerName').textContent=nameFor(selectedTower.b.id);
  $('#selectedTowerStats').innerHTML=`Level ${progress(selectedTower.b.id).level} • ★${ascension(selectedTower.b.id)} • Range ${Math.round(selectedTower.b.range)} • Sell ${Math.floor(selectedTower.spent*.8)} gold`+statBars(selectedTower.b.id);
  renderUpgradeButtons();
}
function renderUpgradeButtons(){
 if(!selectedTower)return;
 ['power','special'].forEach(path=>{
   const tier=selectedTower[path+'Tier']||0,other=path==='power'?'special':'power',otherTier=selectedTower[other+'Tier']||0;
   const btn=$('#'+path+'UpgradeBtn'),desc=$('#'+path+'UpgradeDesc');
   if(!btn||!desc)return;
   if(tier>=4){btn.textContent='MAX TIER';btn.disabled=true;desc.textContent='Tier IV complete.';return}
   const locked=tier===3&&otherTier>=4,cost=upgradeCost(selectedTower,path),def=upgradeDefs[path][tier];
   btn.disabled=locked||gold<cost;
   btn.textContent=locked?'TIER IV LOCKED':`Tier ${tier+1} • ${def.name} • ${cost}g`;
   desc.textContent=locked?'The other core path already claimed Tier IV.':def.desc;
 });
 const skill=beastSkills[selectedTower.b.id],tier=selectedTower.skillTier||0,btn=$('#skillUpgradeBtn'),desc=$('#skillUpgradeDesc'),title=$('#skillPathName');
 if(title)title.textContent=skill?.name||'Beast Talent';
 if(btn&&desc&&skill){
   if(tier>=4){btn.textContent='MAX TIER';btn.disabled=true;desc.textContent='Unique talent fully mastered at Tier IV.'}
   else{const cost=upgradeCost(selectedTower,'skill');btn.disabled=gold<cost;btn.textContent=`Tier ${tier+1} • ${cost}g`;desc.textContent=skill.desc[tier]}
 }
}
function buyTowerUpgrade(path){
 if(!selectedTower)return;
 const tier=selectedTower[path+'Tier']||0;
 if(path!=='skill'){
   const other=path==='power'?'special':'power',otherTier=selectedTower[other+'Tier']||0;
   if(tier>=4||(tier===3&&otherTier>=4))return;
 }else if(tier>=4)return;
 const cost=upgradeCost(selectedTower,path);if(gold<cost)return;
 gold-=cost;selectedTower[path+'Tier']=tier+1;selectedTower.spent+=cost;recalcTower(selectedTower);ui();renderSelectedTower();
}
$('#powerUpgradeBtn').onclick=()=>buyTowerUpgrade('power');
$('#specialUpgradeBtn').onclick=()=>buyTowerUpgrade('special');
$('#skillUpgradeBtn').onclick=()=>buyTowerUpgrade('skill');
if($('#closeTowerModalBtn'))$('#closeTowerModalBtn').onclick=()=>closeTowerModal();
if($('#selectedTowerModal')){
  $('#selectedTowerModal').addEventListener('pointerdown',e=>{
    if(e.target.classList.contains('tower-modal-backdrop'))closeTowerModal();
  });
}
function reset(){
  towers=[];enemies=[];projectiles=[];effects=[];selectedSpecies=null;selectedTower=null;gold=400;lives=20;wave=0;running=false;queue=[];speed=1;waveParticipants=new Set();
  document.querySelectorAll('.speed-choice').forEach(b=>b.classList.toggle('active',Number(b.dataset.speed)===1));$('#waveXpNotice').textContent='';ui();choices();renderSelectedTower();updateNextWavePreview();
}
$('#exitLevelBtn').onclick=()=>show('campaignScreen');
function setSpeed(next){speed=next;document.querySelectorAll('.speed-choice').forEach(b=>b.classList.toggle('active',Number(b.dataset.speed)===speed))}
document.querySelectorAll('.speed-choice').forEach(b=>b.onclick=()=>setSpeed(Number(b.dataset.speed)));
function waveEnemyMix(w){
  if(w<=2)return ['raider'];
  if(w===3)return ['raider','hound'];
  if(w===4)return ['raider','wisp'];
  if(w===5)return ['brute','raider'];
  if(w===6)return ['wisp','hound','raider'];
  if(w===7)return ['brute','hound','raider'];
  if(w===8)return ['wisp','brute','hound'];
  if(w===9)return ['brute','hound','wisp','raider'];
  return ['brute','hound','wisp','raider'];
}
function wavePreviewText(w){
  const mix=waveEnemyMix(Math.min(10,w));
  return mix.map(id=>enemyTypes[id].name).join(' • ');
}
function updateNextWavePreview(){
  const el=$('#nextWaveInfo');
  if(!el)return;
  if(wave>=10){el.textContent='Final wave';return}
  el.textContent='Next: '+wavePreviewText(wave+1);
}
$('#startWaveBtn').onclick=()=>{
  if(running||wave>=10)return;
  wave++;running=true;waveParticipants=new Set(towers.map(t=>t.b.id));
  const n=4+wave*2+Math.floor((currentLevel.id-1)*.5),mix=waveEnemyMix(wave);queue=[];
  const waveHp=(48+wave*16+wave*wave*.7)*currentLevel.hp;
  const waveSpeed=(42+wave*1.6)*currentLevel.speed;
  const spacing=Math.max(390,690-currentLevel.id*18);
  for(let i=0;i<n;i++){
    const id=mix[i%mix.length],type=enemyTypes[id];
    queue.push({delay:i*(id==='wisp'?spacing*.62:spacing),hp:waveHp*type.hp,speed:waveSpeed*type.speed,reward:Math.max(5,Math.round((13+wave+Math.floor(currentLevel.id/2))*type.reward)),type:id});
  }
  if(wave===10&&(currentLevel.boss||currentLevel.id===10))queue.push({delay:n*spacing+700,hp:900*currentLevel.hp,speed:28*currentLevel.speed,reward:180+currentLevel.id*10,boss:true,type:'hollowmaw'});
  ui();updateNextWavePreview();
};

$('#sellTowerBtn').onclick=()=>{
  if(!selectedTower)return;
  const idx=towers.indexOf(selectedTower);if(idx<0)return;
  const refund=Math.floor(selectedTower.spent*.8);
  gold+=refund;towers.splice(idx,1);closeTowerModal();ui();
};

canvas.addEventListener('pointerdown',e=>{
  const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;
  const hit=towers.find(t=>Math.hypot(t.x-x,t.y-y)<=40);
  if(hit){selectedTower=hit;selectedSpecies=null;document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));renderSelectedTower();return}
  if(!selectedSpecies)return;
  const b=beasts[selectedSpecies];
  if(gold<b.cost||distPath(x,y)<55||blockedByScenery(x,y)||towers.some(t=>Math.hypot(t.x-x,t.y-y)<64))return;
  const placed={x,y,b:battleStats(selectedSpecies),cool:0,baseCost:b.cost,spent:b.cost,powerTier:0,specialTier:0,skillTier:0};
  towers.push(placed);
  if(running)waveParticipants.add(selectedSpecies);
  gold-=b.cost;selectedTower=placed;selectedSpecies=null;document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));ui();renderSelectedTower();
});
function distPath(x,y){
  let best=1e9;
  for(let i=0;i<path.length-1;i++){
    const a=path[i],b=path[i+1],vx=b.x-a.x,vy=b.y-a.y,wx=x-a.x,wy=y-a.y,t=Math.max(0,Math.min(1,(vx*wx+vy*wy)/(vx*vx+vy*vy)));
    best=Math.min(best,Math.hypot(x-(a.x+t*vx),y-(a.y+t*vy)));
  }
  return best;
}
const enemyImgs={};
Object.values(enemyTypes).forEach(type=>{const img=new Image();img.src=type.sprite;enemyImgs[type.id]=img});
function spawn(s){
  const type=enemyTypes[s.type]||enemyTypes.raider;
  enemies.push({x:path[0].x,y:path[0].y,seg:0,hp:s.hp,max:s.hp,speed:s.speed,reward:s.reward,boss:!!s.boss,type:type.id,size:type.size,slow:0,slowFactor:.62,root:0,stun:0,burn:0,burnDps:0,poison:0,poisonDps:0})
}
function move(e,dt){
  const target=path[e.seg+1];if(!target)return false;
  e.slow=Math.max(0,e.slow-dt);e.root=Math.max(0,(e.root||0)-dt);e.stun=Math.max(0,(e.stun||0)-dt);
  if(e.root>0||e.stun>0)return true;
  const sp=e.speed*(e.slow>0?(e.slowFactor||.62):1);
  const dx=target.x-e.x,dy=target.y-e.y,d=Math.hypot(dx,dy);
  if(d<sp*dt){e.x=target.x;e.y=target.y;e.seg++;return e.seg<path.length-1}
  e.x+=dx/d*sp*dt;e.y+=dy/d*sp*dt;return true;
}
function defeatEnemy(e){const i=enemies.indexOf(e);if(i<0)return false;gold+=e.reward;enemies.splice(i,1);ui();return true;}
function attack(t,dt){
  t.cool-=dt;if(t.cool>0)return;
  const target=enemies.filter(e=>Math.hypot(e.x-t.x,e.y-t.y)<=t.b.range).sort((a,b)=>b.seg-a.seg)[0];
  if(!target)return;
  t.cool=t.b.rate;projectiles.push({x:t.x,y:t.y,target,damage:t.b.damage,type:t.b.type,color:t.b.color,beastId:t.b.id,speed:t.b.type==='Rock'?300:t.b.type==='Wind'?520:420,fromX:t.x,fromY:t.y,spin:0,powerTier:t.powerTier||0,specialTier:t.specialTier||0,skillTier:t.skillTier||0});
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
  const amount=5+wave*5,bonus=24+wave*4;
  gold+=bonus;ui();
  const ups=addXP(waveParticipants,amount);
  $('#waveXpNotice').textContent=`Wave ${wave} clear • +${amount} XP • +${bonus} gold`;
  if(ups.length)setTimeout(()=>alert(ups.join('\n')),80);
  setTimeout(()=>{if($('#waveXpNotice'))$('#waveXpNotice').textContent=''},1800);
}
function fx(kind,x,y,color='#fff',extra={}){effects.push({kind,x,y,color,life:1,maxLife:1,...extra})}
function applyBeastTalent(p,t){
 const k=p.skillTier||0;if(!k||!t)return;
 const near=(r)=>enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<r);
 switch(p.beastId){
  case 'embercub': t.burn=Math.max(t.burn||0,2.4+k*.5);t.burnDps=Math.max(t.burnDps||0,p.damage*(.08+.07*k));if(k>=3)near(70).forEach(e=>e.hp-=p.damage*.32);break;
  case 'sprigpaw': if(Math.random()<.12+.15*k)t.root=Math.max(t.root||0,.35+.22*k);if(k>=3)near(65).forEach(e=>e.root=Math.max(e.root||0,.35));break;
  case 'bubblit': t.slow=Math.max(t.slow||0,1.4+.35*k);t.slowFactor=Math.min(t.slowFactor||1,.62-.05*k);if(k>=3)near(60).forEach(e=>{e.slow=Math.max(e.slow||0,1.4);e.slowFactor=Math.min(e.slowFactor||1,.5)});break;
  case 'sparkit': near(90+10*k).slice(0,k).forEach(e=>{e.hp-=p.damage*(.3+.08*k);if(k>=3&&Math.random()<.25)e.stun=Math.max(e.stun||0,.25)});break;
  case 'pebblum': t.stun=Math.max(t.stun||0,.18+.18*k);if(k>=2)near(62).forEach(e=>e.hp-=p.damage*.25);if(k>=3)near(62).forEach(e=>e.stun=Math.max(e.stun||0,.3));break;
  case 'gustwing': near(115).slice(0,k).forEach(e=>e.hp-=p.damage*(.28+.08*k));break;
  case 'toxip': t.poison=Math.max(t.poison||0,3+k*.5);t.poisonDps=Math.max(t.poisonDps||0,p.damage*(.12+.08*k));if(k>=3)near(70).forEach(e=>{e.poison=Math.max(e.poison||0,2.8);e.poisonDps=Math.max(e.poisonDps||0,p.damage*.2)});break;
  case 'frostkit': if(Math.random()<.1+.12*k)t.stun=Math.max(t.stun||0,.35+.18*k);if(k>=3)near(60).forEach(e=>{e.slow=Math.max(e.slow||0,2);e.slowFactor=Math.min(e.slowFactor||1,.42)});break;
  case 'shadepup': if(Math.random()<.08+.12*k){const bonus=p.damage*(.45+.25*k);t.hp-=bonus;fx('crit',t.x,t.y,'#b777ff')}break;
  case 'lumpling': near(64+8*k).forEach(e=>e.hp-=p.damage*(.12+.11*k));if(k>=3)fx('light',t.x,t.y,'#fff4a6',{size:96});break;
  case 'voltwing': near(110+10*k).slice(0,1+k).forEach(e=>{e.hp-=p.damage*(.35+.08*k);if(k>=3&&Math.random()<.2)e.stun=Math.max(e.stun||0,.25)});break;
  case 'scorchick': t.burn=Math.max(t.burn||0,2+k*.4);t.burnDps=Math.max(t.burnDps||0,p.damage*(.1+.07*k));if(k>=3&&Math.random()<.35)near(52).forEach(e=>e.hp-=p.damage*.28);break;
  case 'mosshell': t.stun=Math.max(t.stun||0,.22+.16*k);if(t.boss)t.hp-=p.damage*(.08*k);if(k>=3)near(62).forEach(e=>e.stun=Math.max(e.stun||0,.28));break;
  case 'drizzlet': t.slow=Math.max(t.slow||0,1.7+.3*k);t.slowFactor=Math.min(t.slowFactor||1,.55-.04*k);if(k>=3)near(58).forEach(e=>{e.slow=Math.max(e.slow||0,1.5);e.slowFactor=Math.min(e.slowFactor||1,.48)});break;
  case 'zapmoth': near(95+8*k).slice(0,1+k).forEach(e=>e.hp-=p.damage*(.26+.08*k));break;
  case 'cindrake': near(72+10*k).forEach(e=>e.hp-=p.damage*(.15+.1*k));if(k>=3)fx('burst',t.x,t.y,'#ff7a32',{size:85});break;
  case 'sporeling': t.poison=Math.max(t.poison||0,3.5+k*.5);t.poisonDps=Math.max(t.poisonDps||0,p.damage*(.14+.07*k));if(k>=2)near(65+8*k).forEach(e=>{e.poison=Math.max(e.poison||0,2.5);e.poisonDps=Math.max(e.poisonDps||0,p.damage*.16)});break;
  case 'drakeling': near(125).slice(0,k+1).forEach(e=>e.hp-=p.damage*(.3+.09*k));break;
  case 'voidling': if(Math.random()<.12+.09*k){t.hp-=p.damage*(.35+.22*k);if(k>=2)near(65).forEach(e=>e.hp-=p.damage*(.12+.08*k));fx('crit',t.x,t.y,'#d06cff')}break;
 }
}
function hitProjectile(p){
  const mastery=p.specialTier>=2,primal=p.specialTier>=3,awakened=p.specialTier>=4,apex=p.powerTier>=3,mythic=p.powerTier>=4,t=p.target;
  let damage=p.damage;
  if(awakened)damage*=1.35;
  if(mythic)damage*=1.18;
  let critChance=0,critMult=2;
  if(p.type==='Dark'){
    critChance=(p.beastId==='voidling'?.35:.28)+(mastery?.10:0)+(primal?.17:0);
    critMult=primal?2.6:mastery?2.2:2;
    if(Math.random()<critChance){damage*=critMult;fx('crit',t.x,t.y,'#ff79ff')}
  }
  t.hp-=damage;

  if(p.type==='Fire'){
    const burnDps=p.damage*(primal?.55:mastery?.42:.28),burnTime=primal?3.4:mastery?3:2.4;
    t.burn=Math.max(t.burn||0,burnTime);t.burnDps=Math.max(t.burnDps||0,burnDps);
    fx('burst',t.x,t.y,'#ff7a32',{size:apex?62:46});
    for(let i=0;i<(primal?10:6);i++)fx('particle',t.x,t.y,'#ffc34f',{vx:(Math.random()-.5)*105,vy:(Math.random()-.5)*105,size:4});
    const splash=(p.beastId==='cindrake'?.38:primal?.48:0),rad=p.beastId==='cindrake'?72:82;
    if(splash)enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<rad).forEach(e=>{e.hp-=p.damage*splash;e.burn=Math.max(e.burn||0,2.2);e.burnDps=Math.max(e.burnDps||0,burnDps*.55)});
  }
  if(p.type==='Nature'){
    t.slow=Math.max(t.slow,mastery?1.9:1.35);t.slowFactor=Math.min(t.slowFactor||1,mastery?.66:.72);
    t.poison=Math.max(t.poison||0,mastery?3.2:2.5);t.poisonDps=Math.max(t.poisonDps||0,p.damage*(mastery?.20:.13));
    if(p.beastId==='mosshell'){t.stun=Math.max(t.stun,mastery?.5:.32)}
    else if(Math.random()<(primal?.55:mastery?.38:.27))t.root=Math.max(t.root,primal?.85:mastery?.62:.45);
    fx('roots',t.x,t.y,'#65c96b',{size:primal?62:42});
    if(primal)enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<75).forEach(e=>{e.root=Math.max(e.root||0,.55);e.poison=Math.max(e.poison||0,2.4);e.poisonDps=Math.max(e.poisonDps||0,p.damage*.12)});
  }
  if(p.type==='Water'){
    const factor=p.beastId==='drizzlet'?(mastery?.44:.52):(mastery?.48:.58);
    t.slow=Math.max(t.slow,mastery?2.6:1.9);t.slowFactor=Math.min(t.slowFactor||1,factor);
    const radius=primal?82:52,ratio=primal?.55:.25;
    enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<radius).forEach(e=>{e.hp-=p.damage*ratio;e.slow=Math.max(e.slow,primal?2.0:1.1);e.slowFactor=Math.min(e.slowFactor||1,primal?.52:.7)});
    fx('splash',t.x,t.y,'#60c8ff',{size:primal?68:48});
  }
  if(p.type==='Ice'){
    t.slow=Math.max(t.slow,mastery?3.2:2.4);t.slowFactor=Math.min(t.slowFactor||1,mastery?.38:.45);
    if(Math.random()<(primal?.48:mastery?.30:.18))t.stun=Math.max(t.stun,primal?.95:mastery?.75:.55);
    fx('freeze',t.x,t.y,'#c8f5ff',{size:primal?70:50});
    if(primal)enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<68).forEach(e=>{e.slow=Math.max(e.slow,2.6);e.slowFactor=Math.min(e.slowFactor||1,.42);e.stun=Math.max(e.stun||0,.45)});
  }
  if(p.type==='Poison'){
    const dot=p.damage*(primal?.65:mastery?.50:.35),time=primal?5:mastery?4.2:3.4;
    t.poison=Math.max(t.poison||0,time);t.poisonDps=Math.max(t.poisonDps||0,dot);
    fx('poison',t.x,t.y,'#d96ee8',{size:primal?72:48});
    const spread=p.beastId==='sporeling'||primal;
    if(spread)enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<(primal?82:62)).forEach(e=>{e.hp-=p.damage*(primal?.35:.2);e.poison=Math.max(e.poison||0,3.2);e.poisonDps=Math.max(e.poisonDps||0,dot*.65)});
  }
  if(p.type==='Rock'){
    if(t.boss)t.hp-=p.damage*(mastery?.35:.22);
    t.stun=Math.max(t.stun,primal?.7:mastery?.48:.28);
    fx('dust',t.x,t.y,'#b7a38e',{size:primal?68:52});
    if(primal)enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<70).forEach(e=>{e.hp-=p.damage*.3;e.stun=Math.max(e.stun||0,.35)});
  }
  if(p.type==='Wind'){
    fx('wind',t.x,t.y,'#d6ffe3',{size:primal?72:50});
    let count=primal?3:mastery?2:1;if(p.beastId==='drakeling')count++;
    enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<105).sort((a,b)=>Math.hypot(a.x-t.x,a.y-t.y)-Math.hypot(b.x-t.x,b.y-t.y)).slice(0,count).forEach(e=>{e.hp-=p.damage*(primal?.65:mastery?.55:.45);fx('wind',e.x,e.y,'#d6ffe3',{size:32})});
  }
  if(p.type==='Electric'){
    const radius=primal?110:mastery?95:78;
    let count=primal?5:mastery?3:2;if(p.beastId==='voltwing'||p.beastId==='zapmoth')count++;
    const ratio=primal?.70:mastery?.55:.45;
    const targets=enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<radius).slice(0,count);
    targets.forEach(e=>{e.hp-=p.damage*ratio;if(primal&&Math.random()<.25)e.stun=Math.max(e.stun||0,.25);fx('lightning',t.x,t.y,'#fff36c',{x2:e.x,y2:e.y})});
    fx('zap',t.x,t.y,'#fff36c',{size:primal?64:44});
  }
  if(p.type==='Light'){
    const radius=primal?96:mastery?76:60,ratio=primal?.80:mastery?.60:.45;
    enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<radius).forEach(e=>e.hp-=p.damage*ratio);
    fx('light',t.x,t.y,'#fff4a6',{size:primal?90:66});
  }
  applyBeastTalent(p,t);
  if(awakened){t.slow=Math.max(t.slow||0,.35);fx('apex',t.x,t.y,p.color,{size:74})}
  if(apex)fx('apex',t.x,t.y,p.color,{size:mythic?82:58});
}
function update(dt){
  if(running&&queue.length){queue.forEach(s=>s.delay-=dt*1000);while(queue[0]&&queue[0].delay<=0)spawn(queue.shift())}
  for(let i=enemies.length-1;i>=0;i--){
    const e=enemies[i];
    if(e.burn>0){e.burn=Math.max(0,e.burn-dt);e.hp-=(e.burnDps||0)*dt}
    if(e.poison>0){e.poison=Math.max(0,e.poison-dt);e.hp-=(e.poisonDps||0)*dt}
    if(e.hp<=0){defeatEnemy(e);continue}
    if(!move(e,dt)){lives-=e.boss?5:1;enemies.splice(i,1);ui();if(lives<=0)return finish(false)}
  }
  towers.forEach(t=>attack(t,dt));
  for(let i=projectiles.length-1;i>=0;i--){
    const p=projectiles[i];
    if(!enemies.includes(p.target)){projectiles.splice(i,1);continue}
    const dx=p.target.x-p.x,dy=p.target.y-p.y,d=Math.hypot(dx,dy);
    if(d<p.speed*dt+8){
      hitProjectile(p);projectiles.splice(i,1);
      if(p.target.hp<=0)defeatEnemy(p.target)
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


function groundPalette(theme){
  return {
    meadow:["#5a8d4d","#639854","#527f47"],
    forest:["#31583a","#3a6542","#294b32"],
    river:["#5b8f55","#659a5d","#4f7e4b"],
    village:["#6f9860","#789f68","#628a57"],
    shrine:["#68705f","#737b69","#5e6656"],
    wetlands:["#4f805f","#5b8d69","#457252"],
    corrupted:["#443b50","#50445f","#393342"],
    ruins:["#596958","#647363","#4f5d4f"],
    canyon:["#876747","#957555","#765a3e"],
    den:["#27272f","#303039","#202028"]
  }[theme]||["#4f824d","#5c8f56","#447643"];
}
function drawGround(level){
  const p=groundPalette(level.theme);
  ctx.fillStyle=p[0];ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let x=0;x<canvas.width;x+=40){
    for(let y=0;y<canvas.height;y+=40){
      const n=((x/40)*7+(y/40)*11+level.id*13)%5;
      if(n===0){ctx.fillStyle=p[1];ctx.fillRect(x,y,40,40)}
      else if(n===1){ctx.fillStyle=p[2];ctx.fillRect(x+5,y+6,3,3);ctx.fillRect(x+25,y+28,2,2)}
    }
  }
  if(level.theme==='den'){
    ctx.fillStyle='#ffffff08';
    for(let x=25;x<1000;x+=100){ctx.beginPath();ctx.arc(x,80+((x*3)%430),2,0,Math.PI*2);ctx.fill()}
  }
}
function roundedRect(x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}
function drawUnderScenery(level){
  (level.scenery||[]).forEach(s=>{
    if(s.kind==='river'||s.kind==='water'){
      ctx.fillStyle=s.kind==='river'?'#3e93be':'#438fb3';ctx.fillRect(s.x,s.y,s.w,s.h);
      ctx.fillStyle='#79c8df88';
      for(let y=s.y+15;y<s.y+s.h;y+=28)for(let x=s.x+10;x<s.x+s.w;x+=85){ctx.fillRect(x,y,34,3)}
      ctx.fillStyle='#d6f2e733';ctx.fillRect(s.x,s.y,4,s.h);ctx.fillRect(s.x+s.w-4,s.y,4,s.h);
    }
    if(s.kind==='corruption'){
      ctx.save();ctx.translate(s.x,s.y);ctx.fillStyle='#5d2f724f';ctx.beginPath();ctx.ellipse(0,0,s.rx,s.ry,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#b44ad888';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,s.rx*.75,s.ry*.55,.3,0,Math.PI*2);ctx.stroke();ctx.restore();
    }
    if(s.kind==='cavePool'){
      ctx.save();ctx.translate(s.x,s.y);ctx.fillStyle='#3b245b';ctx.beginPath();ctx.ellipse(0,0,s.rx,s.ry,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#8754cf';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,0,s.rx*.78,s.ry*.65,0,0,Math.PI*2);ctx.stroke();ctx.restore();
    }
    if(s.kind==='cliff'){
      ctx.fillStyle='#5c412f';ctx.fillRect(s.x,s.y,s.w,s.h);ctx.fillStyle='#a27b56';
      for(let x=s.x;x<s.x+s.w;x+=48){ctx.fillRect(x+6,s.y+9+(x%17),26,8)}
    }
  });
}
function drawPath(level){
  ctx.lineCap='round';ctx.lineJoin='round';
  ctx.strokeStyle=level.pathEdge||'#8e7652';ctx.lineWidth=level.pathWidth||74;
  ctx.beginPath();ctx.moveTo(path[0].x,path[0].y);path.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();
  ctx.strokeStyle=level.pathFill||'#b39a6a';ctx.lineWidth=(level.pathWidth||74)-18;ctx.stroke();
  ctx.strokeStyle='#ffffff13';ctx.lineWidth=2;ctx.setLineDash([12,22]);ctx.stroke();ctx.setLineDash([]);
}
function drawTree(x,y,leaf='#2f6d3b'){
  ctx.fillStyle='#563a25';ctx.fillRect(x-6,y+5,12,26);
  ctx.fillStyle='#1e4028';ctx.beginPath();ctx.arc(x-12,y+3,17,0,Math.PI*2);ctx.arc(x+12,y,18,0,Math.PI*2);ctx.arc(x,y-13,21,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=leaf;ctx.beginPath();ctx.arc(x-8,y-8,14,0,Math.PI*2);ctx.arc(x+11,y-7,13,0,Math.PI*2);ctx.fill();
}
function drawPine(x,y){
  ctx.fillStyle='#513725';ctx.fillRect(x-4,y+18,8,22);ctx.fillStyle='#1d4d31';
  for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(x,y-30+i*18);ctx.lineTo(x-27+i*3,y+10+i*14);ctx.lineTo(x+27-i*3,y+10+i*14);ctx.closePath();ctx.fill()}
}
function drawBush(x,y){ctx.fillStyle='#2d6b3a';for(const [dx,dy,r] of [[-11,2,12],[10,2,13],[0,-7,15]]){ctx.beginPath();ctx.arc(x+dx,y+dy,r,0,Math.PI*2);ctx.fill()}}
function drawRock(x,y,scale=1){ctx.fillStyle='#77736b';ctx.beginPath();ctx.moveTo(x-14*scale,y+9*scale);ctx.lineTo(x-8*scale,y-10*scale);ctx.lineTo(x+8*scale,y-14*scale);ctx.lineTo(x+17*scale,y+6*scale);ctx.lineTo(x+2*scale,y+15*scale);ctx.closePath();ctx.fill();ctx.strokeStyle='#a8a39a';ctx.lineWidth=2;ctx.stroke()}
function drawFlowers(x,y){for(let i=0;i<5;i++){const dx=(i%3)*10-10,dy=Math.floor(i/3)*10-5;ctx.fillStyle=i%2?'#f7d56b':'#e89acd';ctx.fillRect(x+dx,y+dy,4,4);ctx.fillStyle='#dff0c3';ctx.fillRect(x+dx+1,y+dy+4,2,5)}}
function drawStump(x,y){ctx.fillStyle='#5f4128';ctx.fillRect(x-11,y-3,22,18);ctx.fillStyle='#9b7047';ctx.beginPath();ctx.ellipse(x,y-4,12,7,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#5f4128';ctx.stroke()}
function drawMushroom(x,y){ctx.fillStyle='#e6d7bc';ctx.fillRect(x-3,y,6,12);ctx.fillStyle='#bd4869';ctx.beginPath();ctx.arc(x,y,11,Math.PI,Math.PI*2);ctx.fill();ctx.fillStyle='#f7e8d8';ctx.fillRect(x-5,y-4,3,3);ctx.fillRect(x+4,y-7,3,3)}
function drawReed(x,y){ctx.strokeStyle='#405e31';ctx.lineWidth=3;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(x+i*5,y+12);ctx.lineTo(x+i*4,y-14-(i%2)*5);ctx.stroke()}ctx.fillStyle='#786b31';ctx.fillRect(x-11,y-17,4,8);ctx.fillRect(x+7,y-20,4,9)}
function drawBridge(s){
  ctx.save();ctx.translate(s.x,s.y);if(s.dir==='v')ctx.rotate(Math.PI/2);
  ctx.fillStyle='#5d3d25';ctx.fillRect(-s.w/2,-s.h/2,s.w,s.h);
  ctx.strokeStyle='#a37546';ctx.lineWidth=3;for(let x=-s.w/2+8;x<s.w/2;x+=16){ctx.beginPath();ctx.moveTo(x,-s.h/2);ctx.lineTo(x,s.h/2);ctx.stroke()}
  ctx.strokeStyle='#3d2a1b';ctx.lineWidth=4;ctx.strokeRect(-s.w/2,-s.h/2,s.w,s.h);ctx.restore();
}
function drawBrokenBridge(s){
  ctx.save();ctx.translate(s.x,s.y);ctx.fillStyle='#654226';ctx.fillRect(-s.w/2,-s.h/2,s.w*.34,s.h);ctx.fillRect(s.w*.18,-s.h/2,s.w*.32,s.h);
  ctx.strokeStyle='#a06e3e';ctx.lineWidth=3;for(let x=-s.w/2+8;x<-s.w*.15;x+=14){ctx.beginPath();ctx.moveTo(x,-s.h/2);ctx.lineTo(x,s.h/2);ctx.stroke()}
  for(let x=s.w*.2;x<s.w/2;x+=14){ctx.beginPath();ctx.moveTo(x,-s.h/2);ctx.lineTo(x,s.h/2);ctx.stroke()}ctx.restore();
}
function drawHut(x,y){
  ctx.fillStyle='#66452b';roundedRect(x-30,y-10,60,42,6);ctx.fill();ctx.fillStyle='#8a5d34';ctx.beginPath();ctx.moveTo(x-38,y-8);ctx.lineTo(x,y-38);ctx.lineTo(x+38,y-8);ctx.closePath();ctx.fill();ctx.fillStyle='#2f241b';ctx.fillRect(x-8,y+8,16,24);ctx.fillStyle='#e6b85e';ctx.fillRect(x+15,y+2,10,9)
}
function drawFence(x,y,w){ctx.strokeStyle='#745234';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y);ctx.stroke();for(let px=x;px<=x+w;px+=24){ctx.beginPath();ctx.moveTo(px,y-10);ctx.lineTo(px,y+12);ctx.stroke()}}
function drawCrate(x,y){ctx.fillStyle='#7a522f';ctx.fillRect(x-12,y-12,24,24);ctx.strokeStyle='#b07942';ctx.lineWidth=3;ctx.strokeRect(x-12,y-12,24,24);ctx.beginPath();ctx.moveTo(x-10,y-10);ctx.lineTo(x+10,y+10);ctx.moveTo(x+10,y-10);ctx.lineTo(x-10,y+10);ctx.stroke()}
function drawLantern(x,y){ctx.strokeStyle='#4e3b28';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y+18);ctx.lineTo(x,y-15);ctx.stroke();ctx.fillStyle='#f5c65c';ctx.shadowBlur=12;ctx.shadowColor='#f3ba4f';ctx.fillRect(x-6,y-17,12,13);ctx.shadowBlur=0}
function drawPillar(x,y){ctx.fillStyle='#85877a';ctx.fillRect(x-9,y-24,18,48);ctx.fillStyle='#a4a697';ctx.fillRect(x-13,y-26,26,7);ctx.fillRect(x-13,y+18,26,7);ctx.fillStyle='#53584f';ctx.fillRect(x-3,y-14,3,26)}
function drawRune(x,y){ctx.strokeStyle='#8cf0b3';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,14,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x-8,y+8);ctx.lineTo(x,y-9);ctx.lineTo(x+8,y+8);ctx.stroke()}
function drawShrine(x,y){ctx.fillStyle='#72776b';ctx.fillRect(x-34,y-5,68,35);ctx.fillStyle='#8e9384';ctx.fillRect(x-24,y-22,48,18);ctx.fillStyle='#39483e';ctx.fillRect(x-9,y-13,18,43);ctx.fillStyle='#9af0aa';ctx.shadowBlur=12;ctx.shadowColor='#77dc8b';ctx.fillRect(x-4,y-8,8,17);ctx.shadowBlur=0}
function drawLily(x,y){ctx.fillStyle='#4e8b4b';ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fill();ctx.fillStyle='#d98fb6';ctx.fillRect(x-2,y-3,5,5)}
function drawWillow(x,y){ctx.fillStyle='#5c4329';ctx.fillRect(x-6,y,12,30);ctx.strokeStyle='#467a45';ctx.lineWidth=5;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(x,y-18);ctx.quadraticCurveTo(x+i*14,y,x+i*15,y+28);ctx.stroke()}}
function drawDeadTree(x,y){ctx.strokeStyle='#3b2e34';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x,y+28);ctx.lineTo(x,y-20);ctx.lineTo(x-18,y-36);ctx.moveTo(x,y-12);ctx.lineTo(x+21,y-29);ctx.moveTo(x-4,y);ctx.lineTo(x-23,y-10);ctx.stroke()}
function drawThorn(x,y){ctx.strokeStyle='#3e2146';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x-24,y+14);ctx.quadraticCurveTo(x,y-20,x+25,y+10);ctx.stroke();ctx.fillStyle='#a750bb';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(x+i*10,y);ctx.lineTo(x+i*10+4,y-10);ctx.lineTo(x+i*10+7,y+2);ctx.fill()}}
function drawVoidCrystal(x,y){ctx.fillStyle='#9e54c9';ctx.shadowBlur=12;ctx.shadowColor='#a154d3';ctx.beginPath();ctx.moveTo(x,y-22);ctx.lineTo(x+11,y+10);ctx.lineTo(x,y+19);ctx.lineTo(x-10,y+9);ctx.closePath();ctx.fill();ctx.shadowBlur=0}
function drawWall(x,y,w,h){ctx.fillStyle='#6f7369';ctx.fillRect(x-w/2,y-h/2,w,h);ctx.strokeStyle='#4e524b';ctx.lineWidth=3;for(let xx=x-w/2+18;xx<x+w/2;xx+=34){ctx.beginPath();ctx.moveTo(xx,y-h/2);ctx.lineTo(xx,y+h/2);ctx.stroke()}}
function drawStatue(x,y){ctx.fillStyle='#777b72';ctx.fillRect(x-13,y-8,26,34);ctx.beginPath();ctx.arc(x,y-17,12,0,Math.PI*2);ctx.fill();ctx.fillStyle='#4f554e';ctx.fillRect(x-19,y+25,38,8)}
function drawBrokenWall(x,y,w){ctx.fillStyle='#696e65';for(let i=0;i<5;i++){const xx=x-w/2+i*(w/5);ctx.fillRect(xx,y-(i%2?9:14),w/5-4,i%2?18:28)}}
function drawBoulder(x,y){drawRock(x,y,1.8);ctx.fillStyle='#514336';ctx.fillRect(x-5,y-8,7,4)}
function drawDryBush(x,y){ctx.strokeStyle='#6b4e31';ctx.lineWidth=3;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(x,y+12);ctx.lineTo(x+i*8,y-10);ctx.lineTo(x+i*12,y-16);ctx.stroke()}}
function drawBones(x,y){ctx.strokeStyle='#d6c7a9';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x-14,y-7);ctx.lineTo(x+15,y+8);ctx.moveTo(x-12,y+9);ctx.lineTo(x+14,y-9);ctx.stroke();for(const [dx,dy] of [[-15,-8],[15,8],[-13,10],[14,-10]]){ctx.beginPath();ctx.arc(x+dx,y+dy,4,0,Math.PI*2);ctx.stroke()}}
function drawCaveCrystal(x,y){ctx.fillStyle='#6c53b7';ctx.shadowBlur=12;ctx.shadowColor='#8469dc';for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(x+i*9,y-28-Math.abs(i)*7);ctx.lineTo(x+i*9+7,y+14);ctx.lineTo(x+i*9-7,y+14);ctx.closePath();ctx.fill()}ctx.shadowBlur=0}
function drawTorch(x,y){ctx.fillStyle='#493327';ctx.fillRect(x-3,y,6,22);ctx.fillStyle='#ff983e';ctx.shadowBlur=14;ctx.shadowColor='#ff8b35';ctx.beginPath();ctx.arc(x,y-3,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffe070';ctx.beginPath();ctx.arc(x,y-5,4,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}
function drawStalagmite(x,y){ctx.fillStyle='#5d5960';ctx.beginPath();ctx.moveTo(x-15,y+18);ctx.lineTo(x,y-28);ctx.lineTo(x+15,y+18);ctx.closePath();ctx.fill();ctx.fillStyle='#79737c';ctx.beginPath();ctx.moveTo(x-5,y+12);ctx.lineTo(x,y-20);ctx.lineTo(x+4,y+12);ctx.closePath();ctx.fill()}
function drawScenery(level){
  (level.scenery||[]).forEach(s=>{
    if(['river','water','corruption','cavePool','cliff'].includes(s.kind))return;
    if(s.kind==='tree')drawTree(s.x,s.y);
    else if(s.kind==='pine')drawPine(s.x,s.y);
    else if(s.kind==='bush')drawBush(s.x,s.y);
    else if(s.kind==='rock'||s.kind==='dustRock')drawRock(s.x,s.y);
    else if(s.kind==='flowers')drawFlowers(s.x,s.y);
    else if(s.kind==='stump')drawStump(s.x,s.y);
    else if(s.kind==='mushroom')drawMushroom(s.x,s.y);
    else if(s.kind==='reed')drawReed(s.x,s.y);
    else if(s.kind==='bridge')drawBridge(s);
    else if(s.kind==='brokenBridge')drawBrokenBridge(s);
    else if(s.kind==='hut')drawHut(s.x,s.y);
    else if(s.kind==='fence')drawFence(s.x,s.y,s.w);
    else if(s.kind==='crate')drawCrate(s.x,s.y);
    else if(s.kind==='lantern')drawLantern(s.x,s.y);
    else if(s.kind==='pillar')drawPillar(s.x,s.y);
    else if(s.kind==='rune')drawRune(s.x,s.y);
    else if(s.kind==='shrine')drawShrine(s.x,s.y);
    else if(s.kind==='lily')drawLily(s.x,s.y);
    else if(s.kind==='willow')drawWillow(s.x,s.y);
    else if(s.kind==='deadTree')drawDeadTree(s.x,s.y);
    else if(s.kind==='thorn')drawThorn(s.x,s.y);
    else if(s.kind==='voidCrystal')drawVoidCrystal(s.x,s.y);
    else if(s.kind==='wall')drawWall(s.x,s.y,s.w,s.h);
    else if(s.kind==='statue')drawStatue(s.x,s.y);
    else if(s.kind==='brokenWall')drawBrokenWall(s.x,s.y,s.w);
    else if(s.kind==='boulder')drawBoulder(s.x,s.y);
    else if(s.kind==='dryBush')drawDryBush(s.x,s.y);
    else if(s.kind==='bones')drawBones(s.x,s.y);
    else if(s.kind==='caveCrystal')drawCaveCrystal(s.x,s.y);
    else if(s.kind==='torch')drawTorch(s.x,s.y);
    else if(s.kind==='stalagmite')drawStalagmite(s.x,s.y);
  });
}
function drawCore(){
  const end=path[path.length-1],x=Math.min(canvas.width-62,end.x),y=end.y;
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle='#1d3b2b';ctx.beginPath();ctx.arc(0,0,48,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=currentLevel.theme==='den'?'#8a64d8':'#8bca75';ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,38,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=currentLevel.theme==='den'?'#aa7cf0':'#e2d36f';ctx.shadowBlur=18;ctx.shadowColor=ctx.fillStyle;
  ctx.beginPath();ctx.moveTo(0,-28);ctx.lineTo(18,0);ctx.lineTo(0,28);ctx.lineTo(-18,0);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.restore();
}
function blockedByScenery(x,y){
  return (currentLevel.scenery||[]).some(s=>{
    if(!s.block)return false;
    if(['river','water','cliff','wall'].includes(s.kind))return x>=s.x-(s.kind==='wall'?s.w/2:0)&&x<=s.x+(s.kind==='wall'?s.w/2:s.w)&&y>=s.y-(s.kind==='wall'?s.h/2:0)&&y<=s.y+(s.kind==='wall'?s.h/2:s.h);
    if(['corruption','cavePool'].includes(s.kind)){const dx=(x-s.x)/(s.rx||1),dy=(y-s.y)/(s.ry||1);return dx*dx+dy*dy<1}
    if(s.kind==='hut')return Math.abs(x-s.x)<42&&Math.abs(y-s.y)<45;
    if(s.kind==='shrine')return Math.abs(x-s.x)<46&&Math.abs(y-s.y)<48;
    if(s.kind==='statue')return Math.abs(x-s.x)<28&&Math.abs(y-s.y)<38;
    if(s.kind==='boulder')return Math.hypot(x-s.x,y-s.y)<34;
    if(s.kind==='stalagmite')return Math.hypot(x-s.x,y-s.y)<28;
    return false;
  });
}
function drawStageLabel(){
  ctx.save();ctx.globalAlpha=.92;ctx.fillStyle='#0e1812cc';roundedRect(18,18,205,48,10);ctx.fill();
  ctx.strokeStyle='#ffffff18';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='#e9ce72';ctx.font='bold 13px Georgia,serif';ctx.fillText('1-'+currentLevel.id+'  '+currentLevel.name,31,39);
  ctx.fillStyle='#b9c6bd';ctx.font='10px sans-serif';ctx.fillText(currentLevel.theme.toUpperCase()+' • '+currentLevel.waves+' WAVES',31,55);ctx.restore();
}
function draw(){
  ctx.imageSmoothingEnabled=false;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawGround(currentLevel);
  drawUnderScenery(currentLevel);
  drawPath(currentLevel);
  drawScenery(currentLevel);
  drawCore();
  drawStageLabel();

  towers.forEach(t=>{
    ctx.save();ctx.globalAlpha=.24;ctx.fillStyle='#07110c';ctx.beginPath();ctx.ellipse(t.x,t.y+29,27,8,0,0,Math.PI*2);ctx.fill();ctx.restore();
    if(t===selectedTower){
      ctx.strokeStyle='#ffe17b';ctx.lineWidth=3;const r=39,l=12;
      ctx.beginPath();ctx.moveTo(t.x-r,t.y-r+l);ctx.lineTo(t.x-r,t.y-r);ctx.lineTo(t.x-r+l,t.y-r);
      ctx.moveTo(t.x+r-l,t.y-r);ctx.lineTo(t.x+r,t.y-r);ctx.lineTo(t.x+r,t.y-r+l);
      ctx.moveTo(t.x-r,t.y+r-l);ctx.lineTo(t.x-r,t.y+r);ctx.lineTo(t.x-r+l,t.y+r);
      ctx.moveTo(t.x+r-l,t.y+r);ctx.lineTo(t.x+r,t.y+r);ctx.lineTo(t.x+r,t.y+r-l);ctx.stroke();
    }
    const stage=evolutionStage(t.b.id),img=spriteImgs[t.b.id];
    if(img&&img.complete)ctx.drawImage(img,t.x-39,t.y-39,78,78);
    if(stage>1){const overlay=evolutionOverlayImgs[t.b.id]?.[stage];if(overlay&&overlay.complete)ctx.drawImage(overlay,t.x-42,t.y-42,84,84)}
  });

  enemies.forEach(e=>{
    const img=enemyImgs[e.type]||enemyImgs.raider,size=e.size||18,drawSize=size*2.45;
    ctx.save();ctx.globalAlpha=.25;ctx.fillStyle='#07110c';ctx.beginPath();ctx.ellipse(e.x,e.y+size*.72,size*.85,size*.28,0,0,Math.PI*2);ctx.fill();ctx.restore();
    if(img&&img.complete)ctx.drawImage(img,e.x-drawSize/2,e.y-drawSize/2,drawSize,drawSize);
    else{ctx.fillStyle=e.boss?'#6d2738':'#49382b';ctx.beginPath();ctx.arc(e.x,e.y,size,0,Math.PI*2);ctx.fill()}
    const barW=e.boss?70:44,barY=e.y-size-13;
    ctx.fillStyle='#171717';ctx.fillRect(e.x-barW/2,barY,barW,6);
    ctx.fillStyle=e.boss?'#b84a68':'#d95252';ctx.fillRect(e.x-barW/2,barY,barW*(Math.max(0,e.hp)/e.max),6);
  });
  projectiles.forEach(p=>{p.spin=(p.spin||0)+.2;ctx.save();ctx.translate(p.x,p.y);if(p.type==='Fire'){ctx.shadowBlur=16;ctx.shadowColor='#ff6a2b';ctx.fillStyle='#ff9d3d';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(-2,-2,4,0,Math.PI*2);ctx.fill()}else if(p.type==='Nature'){ctx.strokeStyle='#77d66a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-10,6);ctx.lineTo(0,-8);ctx.lineTo(10,6);ctx.stroke()}else if(p.type==='Water'){ctx.fillStyle='#68cfff';ctx.beginPath();ctx.ellipse(0,0,9,6,p.spin,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#d8f6ff';ctx.stroke()}else if(p.type==='Electric'){ctx.strokeStyle='#fff36c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-9,-5);ctx.lineTo(-2,1);ctx.lineTo(1,-5);ctx.lineTo(8,5);ctx.stroke()}else if(p.type==='Rock'){ctx.rotate(p.spin);ctx.fillStyle='#9a8b7d';ctx.fillRect(-8,-8,16,16);ctx.strokeStyle='#e0d2c2';ctx.strokeRect(-8,-8,16,16)}else if(p.type==='Wind'){ctx.strokeStyle='#d8ffe7';ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,10,-1.1,1.1);ctx.stroke()}else if(p.type==='Poison'){ctx.fillStyle='#d66ae6';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#a7ff83';ctx.beginPath();ctx.arc(3,-3,2,0,Math.PI*2);ctx.fill()}else if(p.type==='Ice'){ctx.rotate(p.spin);ctx.strokeStyle='#d9fbff';ctx.lineWidth=3;for(let a=0;a<3;a++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(-9,0);ctx.lineTo(9,0);ctx.stroke()}}else if(p.type==='Dark'){ctx.rotate(-.6);ctx.fillStyle='#7f67bb';ctx.beginPath();ctx.moveTo(-12,0);ctx.quadraticCurveTo(0,-8,12,0);ctx.quadraticCurveTo(0,5,-12,0);ctx.fill()}else if(p.type==='Light'){ctx.shadowBlur=18;ctx.shadowColor='#fff5a8';ctx.fillStyle='#fff6b3';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill()}else{ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(0,0,5,0,Math.PI*2);ctx.fill()}ctx.restore()});
  effects.forEach(e=>{const a=Math.max(0,e.life/e.maxLife);ctx.save();ctx.globalAlpha=a;if(e.kind==='burst'||e.kind==='splash'||e.kind==='freeze'||e.kind==='poison'||e.kind==='dust'||e.kind==='wind'||e.kind==='light'||e.kind==='zap'||e.kind==='apex'){ctx.strokeStyle=e.color;ctx.lineWidth=e.kind==='freeze'?4:3;ctx.beginPath();ctx.arc(e.x,e.y,(e.size||40)*(1-a+.25),0,Math.PI*2);ctx.stroke()}if(e.kind==='roots'){ctx.strokeStyle=e.color;ctx.lineWidth=4;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(e.x,e.y+12);ctx.quadraticCurveTo(e.x+(i-2)*9,e.y-8,e.x+(i-2)*12,e.y-22);ctx.stroke()}}if(e.kind==='particle'){ctx.fillStyle=e.color;ctx.beginPath();ctx.arc(e.x,e.y,(e.size||4)*a,0,Math.PI*2);ctx.fill()}if(e.kind==='lightning'){ctx.strokeStyle=e.color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x,e.y);let mx=(e.x+e.x2)/2,my=(e.y+e.y2)/2;ctx.lineTo(mx+8,my-8);ctx.lineTo(mx-5,my+5);ctx.lineTo(e.x2,e.y2);ctx.stroke()}if(e.kind==='crit'){ctx.fillStyle=e.color;ctx.font='bold 18px sans-serif';ctx.fillText('CRIT!',e.x-22,e.y-24*(1-a)-18)}ctx.restore()});
}
function loop(ts){
  if(!$('#gameScreen').classList.contains('active'))return;
  const dt=Math.min(.033,(ts-last)/1000||0);last=ts;
  update(dt*speed);draw();requestAnimationFrame(loop);
}
renderStarters();updateHub();renderSaveSlots();applyMotionSetting();setSpeed(1);renderCampaignMap();