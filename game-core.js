const $=s=>document.querySelector(s);
const screens=[...document.querySelectorAll('.screen')];
function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id))}

const beasts={
embercub:{id:'embercub',name:'Embercub',type:'Fire',role:'Damage',cost:140,range:138,rate:0.6,damage:22,color:'#ff7a3d',evo20:'Pyrelion',evo30:'Infernalion',sprite:'assets/pixel/embercub.png',towerSprite:'assets/pixel/embercub_tower.png'},
sprigpaw:{id:'sprigpaw',name:'Sprigpaw',type:'Nature',role:'Control',cost:150,range:135,rate:0.68,damage:20,color:'#62c96b',evo20:'Thornmaw',evo30:'Elderfang',sprite:'assets/pixel/sprigpaw.png',towerSprite:'assets/pixel/sprigpaw_tower.png'},
bubblit:{id:'bubblit',name:'Bubblit',type:'Water',role:'Slow',cost:145,range:140,rate:0.62,damage:19,color:'#55a8ff',evo20:'Tiderex',evo30:'Abyssara',sprite:'assets/pixel/bubblit.png',towerSprite:'assets/pixel/bubblit_tower.png'},
sparkit:{id:'sparkit',name:'Sparkit',type:'Electric',role:'Chain',cost:150,range:140,rate:0.66,damage:20,color:'#ffd64e',evo20:'Voltail',evo30:'Stormclaw',sprite:'assets/pixel/sparkit.png',towerSprite:'assets/pixel/sparkit_tower.png'},
pebblum:{id:'pebblum',name:'Pebblum',type:'Rock',role:'Heavy',cost:165,range:125,rate:0.92,damage:34,color:'#a89b8e',evo20:'Boulderback',evo30:'Titanrock',sprite:'assets/pixel/pebblum.png',towerSprite:'assets/pixel/pebblum_tower.png'},
gustwing:{id:'gustwing',name:'Gustwing',type:'Wind',role:'Range',cost:155,range:175,rate:0.62,damage:22,color:'#b6efd0',evo20:'Galehawk',evo30:'Tempestral',sprite:'assets/pixel/gustwing.png',towerSprite:'assets/pixel/gustwing_tower.png'},
toxip:{id:'toxip',name:'Toxip',type:'Poison',role:'Damage over Time',cost:150,range:135,rate:0.7,damage:21,color:'#d46be8',evo20:'Venomane',evo30:'Plaguefang',sprite:'assets/pixel/toxip.png',towerSprite:'assets/pixel/toxip_tower.png'},
frostkit:{id:'frostkit',name:'Frostkit',type:'Ice',role:'Freeze',cost:175,range:145,rate:0.76,damage:25,color:'#9fe8ff',evo20:'Glacifang',evo30:'Cryowyrm',sprite:'assets/pixel/frostkit.png',towerSprite:'assets/pixel/frostkit_tower.png'},
shadepup:{id:'shadepup',name:'Shadepup',type:'Dark',role:'Critical',cost:180,range:135,rate:0.68,damage:27,color:'#8f79cf',evo20:'Dreadfang',evo30:'Nightreaver',sprite:'assets/sprites/shadepup.svg',towerSprite:'assets/sprites/shadepup.svg'},
lumpling:{id:'lumpling',name:'Lumpling',type:'Light',role:'Splash',cost:185,range:155,rate:0.76,damage:26,color:'#fff0a2',evo20:'Radihorn',evo30:'Solarius',sprite:'assets/pixel/lumpling.png',towerSprite:'assets/pixel/lumpling_tower.png'},
voltwing:{id:'voltwing',name:'Voltwing',type:'Electric',role:'Chain+',cost:190,range:175,rate:0.66,damage:26,color:'#fff277',evo20:'Thunderoc',evo30:'Stormra',sprite:'assets/pixel/voltwing.png',towerSprite:'assets/pixel/voltwing_tower.png'},
scorchick:{id:'scorchick',name:'Scorchick',type:'Fire',role:'Rapid Burn',cost:135,range:125,rate:0.42,damage:15,color:'#ff9a3d',evo20:'Flarewing',evo30:'Sunphoenix',sprite:'assets/sprites/scorchick.svg',towerSprite:'assets/sprites/scorchick.svg'},
mosshell:{id:'mosshell',name:'Mosshell',type:'Nature',role:'Stagger',cost:160,range:120,rate:0.92,damage:33,color:'#78b85b',evo20:'Groveshell',evo30:'Worldback',sprite:'assets/pixel/mosshell.png',towerSprite:'assets/pixel/mosshell_tower.png'},
drizzlet:{id:'drizzlet',name:'Drizzlet',type:'Water',role:'Rapid Slow',cost:140,range:145,rate:0.46,damage:15,color:'#6bcce8',evo20:'Rilltail',evo30:'Torrentusk',sprite:'assets/pixel/drizzlet.png',towerSprite:'assets/pixel/drizzlet_tower.png'},
zapmoth:{id:'zapmoth',name:'Zapmoth',type:'Electric',role:'Fast Chain',cost:145,range:150,rate:0.5,damage:16,color:'#ffe55f',evo20:'Voltmoth',evo30:'Tempestwing',sprite:'assets/pixel/zapmoth.png',towerSprite:'assets/pixel/zapmoth_tower.png'},
cindrake:{id:'cindrake',name:'Cindrake',type:'Fire',role:'Meteor',cost:235,range:165,rate:0.78,damage:43,color:'#ff6b35',evo20:'Magmara',evo30:'Vulcanox',sprite:'assets/pixel/cindrake.png',towerSprite:'assets/pixel/cindrake_tower.png'},
sporeling:{id:'sporeling',name:'Sporeling',type:'Poison',role:'Toxic Burst',cost:220,range:160,rate:0.7,damage:33,color:'#d47be3',evo20:'Mycomaw',evo30:'Fungorath',sprite:'assets/pixel/sporeling.png',towerSprite:'assets/pixel/sporeling_tower.png'},
drakeling:{id:'drakeling',name:'Drakeling',type:'Wind',role:'Piercing Gale',cost:230,range:200,rate:0.64,damage:34,color:'#8de6d7',evo20:'Draconis',evo30:'Aetherion',sprite:'assets/pixel/drakeling.png',towerSprite:'assets/pixel/drakeling_tower.png'},
voidling:{id:'voidling',name:'Voidling',type:'Dark',role:'Void Critical',cost:240,range:170,rate:0.7,damage:40,color:'#a675e8',evo20:'Riftbeast',evo30:'Oblivion',sprite:'assets/sprites/voidling.svg',towerSprite:'assets/sprites/voidling.svg'}
};

const starters=['embercub','sprigpaw','bubblit'];
const commonPool=['sparkit','pebblum','gustwing','toxip','scorchick','mosshell','drizzlet','zapmoth'];
const rarePool=['frostkit','shadepup','lumpling','voltwing'];
const epicPool=['cindrake','sporeling','drakeling','voidling'];
const commonCost=100,rareCost=500,epicCost=1000;
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
  return l>=SECOND_EVOLUTION_LEVEL?3:l>=FIRST_EVOLUTION_LEVEL?2:1;
}
function stageStatsAt(id,stage){
  const base=beastRatings[id],cap=stage*10;
  return {
    stage,cap,
    power:Math.min(cap,base.power*stage),
    speed:Math.min(cap,base.speed*stage),
    range:Math.min(cap,base.range*stage),
    special:Math.min(cap,base.special*stage)
  };
}
function stageStats(id){return stageStatsAt(id,evolutionStage(id))}
function statBars(id){
  const s=stageStats(id);
  return `<div class="stat-grid">
    <div><span>Power</span><b>${s.power}/${s.cap}</b></div>
    <div><span>Speed</span><b>${s.speed}/${s.cap}</b></div>
    <div><span>Range</span><b>${s.range}/${s.cap}</b></div>
    <div><span>Special</span><b>${s.special}/${s.cap}</b></div>
  </div>`;
}

function nameForStage(id,stage){
  const b=beasts[id];
  return stage===3?b.evo30:stage===2?b.evo20:b.name;
}
function spritePathForStage(id,stage=1){
  return stage>1?`assets/pixel/evolved/${id}_${stage}.svg?v=48`:beasts[id].sprite;
}
function currentSprite(id){return spritePathForStage(id,evolutionStage(id))}
function stageSpriteMarkup(id,stage=evolutionStage(id),extra='',unseen=false){
  const b=beasts[id],src=spritePathForStage(id,stage),name=nameForStage(id,stage);
  return `<span class="stage-sprite stage-${stage} type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}">
    <img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}">
  </span>`;
}
const spriteImgs={},evolutionSpriteImgs={};
Object.values(beasts).forEach(b=>{
  const base=new Image();
  base.onerror=()=>{if(!base.dataset.fallback){base.dataset.fallback='1';base.src='assets/sprites/'+b.id+'.svg'}};
  base.src=b.sprite;
  spriteImgs[b.id]=base;
  evolutionSpriteImgs[b.id]={};
  [2,3].forEach(stage=>{
    const form=new Image();
    form.onerror=()=>{form.src=b.sprite};
    form.src=spritePathForStage(b.id,stage);
    evolutionSpriteImgs[b.id][stage]=form;
  });
});
document.addEventListener('error',e=>{
  const img=e.target;
  if(!img||img.tagName!=='IMG'||img.dataset.spriteFallback)return;
  const src=img.src||'',file=src.split('/').pop()||'';
  if(src.includes('/assets/pixel/evolved/')){
    const match=src.match(/\/evolved\/([a-z]+)_[23]\.svg/);
    if(match&&beasts[match[1]]){img.dataset.spriteFallback='1';img.src=beasts[match[1]].sprite}
    return;
  }
  if(src.includes('/assets/pixel/')){
    const id=file.split('?')[0].replace('_tower.png','').replace('.png','');
    img.dataset.spriteFallback='1';
    img.src='assets/sprites/'+id+'.svg';
  }
},true);

const BEAST_LEVEL_CAP=100;
const FIRST_EVOLUTION_LEVEL=30;
const SECOND_EVOLUTION_LEVEL=60;

function blankSave(){return {starter:null,essence:0,wardenLevel:1,unlocked:[],freeCommonClaimed:false,beastProgress:{},beastCopies:{},ascensions:{},completedLevels:[],hardCompletedLevels:[],bossEggRewards:[],seenBeastStages:[],lastLoadout:[],createdAt:Date.now(),lastPlayed:Date.now()}}
function normaliseSave(s){
  s=s||blankSave();s.unlocked=s.unlocked||[];s.beastProgress=s.beastProgress||{};s.beastCopies=s.beastCopies||{};s.ascensions=s.ascensions||{};s.completedLevels=s.completedLevels||[];s.hardCompletedLevels=s.hardCompletedLevels||[];s.bossEggRewards=s.bossEggRewards||[];s.seenBeastStages=s.seenBeastStages||[];
  s.unlocked.forEach(id=>{
    const p=s.beastProgress[id]||(s.beastProgress[id]={level:1,xp:0});
    p.level=Math.max(1,Math.min(BEAST_LEVEL_CAP,p.level||1));
    if(p.level>=BEAST_LEVEL_CAP)p.xp=0;
  });
  s.seenBeastStages=s.seenBeastStages.filter(key=>{
    const cut=key.lastIndexOf(':'),id=key.slice(0,cut),stage=Number(key.slice(cut+1)),level=s.beastProgress[id]?.level||1;
    if(!s.unlocked.includes(id))return false;
    return stage===1||(stage===2&&level>=FIRST_EVOLUTION_LEVEL)||(stage===3&&level>=SECOND_EVOLUTION_LEVEL);
  });
  s.unlocked.forEach(id=>{
    const level=s.beastProgress[id]?.level||1;
    [1,...(level>=FIRST_EVOLUTION_LEVEL?[2]:[]),...(level>=SECOND_EVOLUTION_LEVEL?[3]:[])].forEach(stage=>{const key=id+':'+stage;if(!s.seenBeastStages.includes(key))s.seenBeastStages.push(key)});
  });
  s.lastLoadout=(s.lastLoadout||[]).filter(id=>s.unlocked.includes(id)).slice(0,4);if(s.freeCommonClaimed===undefined)s.freeCommonClaimed=false;if(!s.wardenLevel)s.wardenLevel=1;if(s.essence===undefined)s.essence=0;return s
}
const legacy=localStorage.getItem('beastward-save');
if(legacy&&!localStorage.getItem('beastward-save-1')&&!localStorage.getItem('beastward-save-2')&&!localStorage.getItem('beastward-save-3')){
  localStorage.setItem('beastward-save-1',legacy);
}
let activeSlot=Number(localStorage.getItem('beastward-active-slot')||'0');
let save=activeSlot?normaliseSave(JSON.parse(localStorage.getItem('beastward-save-'+activeSlot)||'null')):blankSave();
let pendingSaveTarget='hub';

function xpNeeded(level){
  // Designed around roughly ten regions of Verdant-Valley-sized XP.
  // Early levels stay quick, then the curve settles so Lv30 / Lv60 / Lv100 remain meaningful milestones.
  if(level<20)return 60+(level-1)*15;
  if(level<30)return 330+(level-20)*2;
  if(level<60)return 350+(level-30);
  return 390+Math.floor((level-60)/5)*5;
}
function progress(id){return save.beastProgress[id]||(save.beastProgress[id]={level:1,xp:0})}
function beastStageKey(id,stage){return id+':'+stage}
function stageSeen(id,stage){return (save.seenBeastStages||[]).includes(beastStageKey(id,stage))}
function markStageSeen(id,stage){save.seenBeastStages=save.seenBeastStages||[];const key=beastStageKey(id,stage);if(!save.seenBeastStages.includes(key))save.seenBeastStages.push(key)}
function syncSeenStages(id){const l=progress(id).level;markStageSeen(id,1);if(l>=FIRST_EVOLUTION_LEVEL)markStageSeen(id,2);if(l>=SECOND_EVOLUTION_LEVEL)markStageSeen(id,3)}
function addBeast(id){if(!save.unlocked.includes(id))save.unlocked.push(id);progress(id);markStageSeen(id,1)}
function nameFor(id){const b=beasts[id],l=progress(id).level;return l>=SECOND_EVOLUTION_LEVEL?b.evo30:l>=FIRST_EVOLUTION_LEVEL?b.evo20:b.name}
function ascension(id){return save.ascensions[id]||0}
function copies(id){return save.beastCopies[id]||0}
function ascensionNeed(id){return [2,5,10][ascension(id)]||null}
function levelMultiplier(id){
  const l=progress(id).level,a=ascension(id);
  const early=Math.min(l-1,29)*.038;
  const mid=Math.max(0,Math.min(l-30,30))*.012;
  const late=Math.max(0,l-60)*.01;
  const evolutionBonus=(l>=FIRST_EVOLUTION_LEVEL?.15:0)+(l>=SECOND_EVOLUTION_LEVEL?.20:0);
  return (1+early+mid+late+evolutionBonus)*(1+a*.08);
}
function rangeMultiplier(id){
  // Range grows gently across levels so evolution never makes the battlefield trivial.
  // Levels add gentle range growth through Lv100; Ascension adds 1%, and evolutions add a modest 4% / 8%.
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
let denSelected=null;
function renderCollection(){
  const w=$('#beastCollection');if(!w)return;
  w.innerHTML='';
  const countEl=$('#denCollectedCount');if(countEl)countEl.textContent=save.unlocked.length;
  save.unlocked.forEach(id=>{
    const b=beasts[id],p=progress(id),a=ascension(id);
    const card=document.createElement('button');
    card.className='beast-pc-slot';
    card.dataset.beast=id;
    card.innerHTML=`
      <div class="beast-pc-sprite">${stageSpriteMarkup(id,evolutionStage(id),'pc-sprite')}</div>
      <b>${nameFor(id)}</b>
      <span>Lv ${p.level}</span>
      <small>${b.type} • ${'★'.repeat(a)}${'☆'.repeat(3-a)}</small>
    `;
    card.onclick=()=>openDenBeast(id);
    w.appendChild(card);
  });
}
function openDenBeast(id){
  const modal=$('#denBeastModal'),body=$('#denBeastModalBody');
  if(!modal||!body||!beasts[id])return;
  denSelected=id;
  const b=beasts[id],p=progress(id),need=xpNeeded(p.level),a=ascension(id),held=copies(id),needCopies=ascensionNeed(id);
  const stats=stageStats(id),combat=battleStats(id);
  const ascendLabel=a>=3?'MAX ASCENSION':`Ascend to ★${a+1} • ${held}/${needCopies} copies`;
  const xpText=p.level>=BEAST_LEVEL_CAP?'MAX LEVEL':`${p.xp} / ${need} XP`;
  body.innerHTML=`
    <div class="den-detail-head">
      <div class="den-detail-portrait">${stageSpriteMarkup(id,evolutionStage(id),'den-detail-sprite')}</div>
      <div class="den-detail-copy">
        <span class="den-detail-kicker">BONDED BEAST</span>
        <h2>${nameFor(id)}</h2>
        <div class="den-detail-pills"><span>${b.type}</span><span>${b.role}</span><span>Level ${p.level}/${BEAST_LEVEL_CAP}</span><span>Ascension ${a}/3</span></div>
        <p>${beastLore(id)[1]}</p>
      </div>
    </div>
    <div class="den-xp-wrap">
      <div class="den-xp-row"><b>Beast XP</b><span>${xpText}</span></div>
      <div class="xpbar den-xpbar"><div style="width:${p.level>=BEAST_LEVEL_CAP?100:Math.min(100,p.xp/need*100)}%"></div></div>
    </div>
    <div class="den-stat-grid">
      <div><small>POWER</small><b>${stats.power}/${stats.cap}</b></div>
      <div><small>SPEED</small><b>${stats.speed}/${stats.cap}</b></div>
      <div><small>RANGE</small><b>${stats.range}/${stats.cap}</b></div>
      <div><small>SPECIAL</small><b>${stats.special}/${stats.cap}</b></div>
    </div>
    <div class="den-combat-grid">
      <div><small>ATTACK</small><b>${Math.round(combat.damage)}</b></div>
      <div><small>ATTACK RATE</small><b>${combat.rate.toFixed(2)}s</b></div>
      <div><small>COMBAT RANGE</small><b>${Math.round(combat.range)}</b></div>
      <div><small>COMBAT BONUS</small><b>+${Math.round((levelMultiplier(id)-1)*100)}%</b></div>
    </div>
    <div class="den-evolution-section">
      <b>Evolution Line</b>
      <div class="den-evo-line">
        <div>${stageSpriteMarkup(id,1,'den-evo-sprite')}<small>Lv 1</small><b>${b.name}</b></div>
        <div>${stageSpriteMarkup(id,2,'den-evo-sprite')}<small>Lv ${FIRST_EVOLUTION_LEVEL}</small><b>${b.evo20}</b></div>
        <div>${stageSpriteMarkup(id,3,'den-evo-sprite')}<small>Lv ${SECOND_EVOLUTION_LEVEL}</small><b>${b.evo30}</b></div>
      </div>
    </div>
    <div class="den-ascend-panel">
      <div><b>Ascension ${a}/3</b><small>${a>=3?'Fully ascended':'Duplicate copies strengthen this beast.'}</small></div>
      <button id="denAscendBtn" class="ascend-btn" ${a>=3||held<needCopies?'disabled':''}>${ascendLabel}</button>
    </div>
  `;
  const ascendBtn=$('#denAscendBtn');
  if(ascendBtn)ascendBtn.onclick=()=>{ascendBeast(id);openDenBeast(id)};
  modal.classList.remove('hidden');
}
function closeDenBeast(){
  denSelected=null;
  const modal=$('#denBeastModal');if(modal)modal.classList.add('hidden');
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
if($('#campaignWorld1Btn'))$('#campaignWorld1Btn').onclick=()=>setCampaignWorld(1);
if($('#campaignWorld2Btn'))$('#campaignWorld2Btn').onclick=()=>setCampaignWorld(2);
if($('#campaignNormalBtn'))$('#campaignNormalBtn').onclick=()=>setCampaignMode('normal');
if($('#campaignHardBtn'))$('#campaignHardBtn').onclick=()=>setCampaignMode('hard');
$('#beastsBtn').onclick=()=>{renderCollection();show('beastsScreen')}
if($('#denBeastClose'))$('#denBeastClose').onclick=()=>closeDenBeast();
if($('#denBeastModal'))$('#denBeastModal').addEventListener('pointerdown',e=>{if(e.target.classList.contains('den-beast-backdrop'))closeDenBeast()});;
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
 {title:'Evolution',text:'Every beast can evolve at Level 30 and again at Level 60, with a maximum Beast Level of 100.'}
];
const enemyTypes={
 raider:{id:'raider',name:'Forest Raider',kind:'Common',hp:1,speed:1,reward:1,size:18,sprite:'assets/enemies/forest_raider.svg',text:'The standard Verdant Valley invader. Balanced health and speed.'},
 hound:{id:'hound',name:'Ruin Hound',kind:'Fast',hp:.62,speed:1.55,reward:.85,size:17,sprite:'assets/enemies/ruin_hound.svg',text:'A fast hunter with low health. It punishes defences with poor coverage.'},
 brute:{id:'brute',name:'Stone Brute',kind:'Heavy',hp:2.15,speed:.68,reward:1.75,size:23,sprite:'assets/enemies/stone_brute.svg',text:'Slow, heavily armoured and difficult to bring down before it reaches the Core.'},
 wisp:{id:'wisp',name:'Grove Wisp',kind:'Swarm',hp:.44,speed:1.18,reward:.55,size:15,sprite:'assets/enemies/wisp_swarm.svg',text:'Fragile spirits that arrive in dense groups and overwhelm slow attackers.'},
 thornling:{id:'thornling',name:'Thornling',kind:'Skirmisher',hp:.82,speed:1.28,reward:.95,size:17,sprite:'assets/enemies/thornling.svg',text:'A nimble thorn beast that sits between a Raider and a Hound in speed and toughness.'},
 shellback:{id:'shellback',name:'Moss Shellback',kind:'Armoured',hp:1.62,speed:.82,reward:1.4,size:21,sprite:'assets/enemies/moss_shellback.svg',text:'A plated forest beast with solid health that pressures low-damage defences.'},
 glimmer:{id:'glimmer',name:'Glimmer Moth',kind:'Flutter',hp:.56,speed:1.38,reward:.72,size:16,sprite:'assets/enemies/glimmer_moth.svg',text:'A fragile but erratic flier that reaches the Core quickly if ignored.'},
 frostling:{id:'frostling',name:'Frostling',kind:'Common',hp:1.08,speed:1.04,reward:1.05,size:18,sprite:'assets/enemies/frostling.svg',text:'A hardy snow creature that forms the backbone of Frostfall enemy waves.'},
 snowstalker:{id:'snowstalker',name:'Snow Stalker',kind:'Fast',hp:.72,speed:1.62,reward:.95,size:18,sprite:'assets/enemies/snow_stalker.svg',text:'A white-furred hunter that races through exposed sections of the frozen path.'},
 icegolem:{id:'icegolem',name:'Ice Golem',kind:'Heavy',hp:2.5,speed:.62,reward:1.9,size:25,sprite:'assets/enemies/ice_golem.svg',text:'A massive animated block of ice with extremely high health and low speed.'},
 shardwisp:{id:'shardwisp',name:'Shard Wisp',kind:'Swarm',hp:.5,speed:1.3,reward:.62,size:16,sprite:'assets/enemies/shard_wisp.svg',text:'Small crystalline spirits that attack in dense, fast-moving groups.'},
 hollowmaw:{id:'hollowmaw',name:'Hollowmaw',kind:'Boss',hp:1,speed:1,reward:1,size:42,sprite:'assets/enemies/hollowmaw.svg',text:'A corrupted alpha beast with enormous health. Five lives are lost if it reaches the Core.'},
 glaciermaw:{id:'glaciermaw',name:'Glaciermaw',kind:'Boss',hp:1,speed:1,reward:1,size:46,sprite:'assets/enemies/glaciermaw.svg',text:'The ancient alpha of Frostfall Expanse. Its frozen hide and summoned pack make it a major regional boss.'}
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
function bestiaryBeastEntries(){
  const result=[];
  Object.values(beasts).forEach((b,speciesIndex)=>{
    [1,2,3].forEach(stage=>result.push({
      id:b.id,stage,key:beastStageKey(b.id,stage),number:speciesIndex*3+stage,
      name:nameForStage(b.id,stage),type:b.type,role:b.role,seen:stageSeen(b.id,stage)
    }));
  });
  return result;
}
function bestiaryStageDescription(id,stage){
  const b=beasts[id],base=beastLore(id);
  if(stage===1)return base[1];
  if(stage===2)return `${b.evo20} is ${b.name}'s first evolved form, reached at Level ${FIRST_EVOLUTION_LEVEL}. Its ${b.type.toLowerCase()} abilities become more developed and its body changes into a stronger form.`;
  return `${b.evo30} is the fully evolved form of ${b.name}, reached at Level ${SECOND_EVOLUTION_LEVEL}. It is the strongest known expression of this beast's ${b.type.toLowerCase()} bond.`;
}
function renderBestiary(){
  const list=$('#bestiaryList'),detail=$('#bestiaryDetail'),filters=$('#bestiaryFilters'),search=$('#bestiarySearch');
  const seenCount=(save.seenBeastStages||[]).length,totalEntries=Object.keys(beasts).length*3;
  const bp=$('#bestiaryProgress');if(bp)bp.textContent=`${seenCount} / ${totalEntries} entries logged`;
  if(!list||!detail)return;
  document.querySelectorAll('.bestiary-tab').forEach(b=>b.classList.toggle('active',b.dataset.btab===bestiaryTab));
  filters.innerHTML='';

  if(bestiaryTab==='beasts'){
    ['All',...new Set(Object.values(beasts).map(b=>b.type))].forEach(type=>{
      const btn=document.createElement('button');
      btn.className='best-filter'+(type===bestiaryType?' active':'');
      btn.textContent=type;
      btn.onclick=()=>{bestiaryType=type;bestiarySelected=null;renderBestiary()};
      filters.appendChild(btn);
    });

    const q=(search.value||'').toLowerCase();
    const arr=bestiaryBeastEntries().filter(entry=>{
      const typeMatch=bestiaryType==='All'||entry.type===bestiaryType;
      const searchMatch=!q||(entry.seen&&(entry.name+' '+entry.type+' '+entry.role).toLowerCase().includes(q));
      return typeMatch&&searchMatch;
    });

    if(bestiarySelected&&!arr.some(entry=>entry.key===bestiarySelected))bestiarySelected=null;
    const layout=document.querySelector('.bestiary-layout');
    list.innerHTML='';

    arr.forEach(entry=>{
      const row=document.createElement('button');
      row.className='best-row bestiary-entry'+(entry.key===bestiarySelected?' active':'')+(entry.seen?' seen':' unseen');
      row.innerHTML=`${stageSpriteMarkup(entry.id,entry.stage,'row-sprite',!entry.seen)}<div><h4>${entry.seen?entry.name:'???'}</h4><small>#${String(entry.number).padStart(3,'0')} • ${entry.seen?(entry.stage===1?'Base Form':entry.stage===2?'Evolution I':'Evolution II'):'Not yet encountered'}</small></div><span class="tag">${entry.seen?entry.type:'???'}</span>`;
      row.onclick=()=>{
        bestiarySelected=bestiarySelected===entry.key?null:entry.key;
        renderBestiary();
        if(bestiarySelected&&window.innerWidth<=760)setTimeout(()=>detail.scrollIntoView({behavior:'smooth',block:'start'}),40);
      };
      list.appendChild(row);
    });

    if(!bestiarySelected){
      detail.innerHTML='';
      detail.classList.add('hidden');
      if(layout)layout.classList.add('no-selection');
      return;
    }

    const entry=arr.find(x=>x.key===bestiarySelected);
    if(!entry){bestiarySelected=null;renderBestiary();return}
    detail.classList.remove('hidden');
    if(layout)layout.classList.remove('no-selection');

    if(!entry.seen){
      detail.innerHTML=`<button class="best-detail-close" type="button" aria-label="Close entry">×</button><div class="best-hero undiscovered-entry"><div class="best-portrait silhouette-portrait">${stageSpriteMarkup(entry.id,entry.stage,'portrait-sprite',true)}</div><div class="best-detail-title"><span class="dex-number">#${String(entry.number).padStart(3,'0')}</span><h3>Undiscovered</h3><div class="best-pills"><span class="best-pill">No data recorded</span></div><p>This Beastiary entry has not been encountered yet. Hatch and train this species to reveal the form permanently.</p></div></div>`;
    }else{
      const b=beasts[entry.id],stats=stageStatsAt(entry.id,entry.stage);
      const requirement=entry.stage===1?'Base form':entry.stage===2?`Evolves at Level ${FIRST_EVOLUTION_LEVEL}`:`Evolves at Level ${SECOND_EVOLUTION_LEVEL}`;
      const prev=entry.stage===1?null:nameForStage(entry.id,entry.stage-1);
      detail.innerHTML=`<button class="best-detail-close" type="button" aria-label="Close entry">×</button><div class="best-hero"><div class="best-portrait">${stageSpriteMarkup(entry.id,entry.stage,'portrait-sprite')}</div><div class="best-detail-title"><span class="dex-number">#${String(entry.number).padStart(3,'0')}</span><h3>${entry.name}</h3><div class="best-pills"><span class="best-pill">${b.type}</span><span class="best-pill">${b.role}</span><span class="best-pill">${requirement}</span><span class="best-pill">Logged</span></div><p>${bestiaryStageDescription(entry.id,entry.stage)}</p></div></div><div class="stat-grid dex-stat-grid"><div><span>Power</span><b>${stats.power}/${stats.cap}</b></div><div><span>Speed</span><b>${stats.speed}/${stats.cap}</b></div><div><span>Range</span><b>${stats.range}/${stats.cap}</b></div><div><span>Special</span><b>${stats.special}/${stats.cap}</b></div></div><div class="best-section"><b>Evolution record</b><p>${entry.stage===1?`${entry.name} is the first known form of this species.`:`${entry.name} evolves from ${prev}.`}</p></div>`;
    }

    const close=detail.querySelector('.best-detail-close');
    if(close)close.onclick=()=>{bestiarySelected=null;renderBestiary()};
  }else if(bestiaryTab==='enemies'){
    filters.innerHTML='';list.innerHTML='';
    bestiaryEnemies.forEach((e,i)=>{
      const row=document.createElement('button');
      row.className='best-row'+(bestiarySelected===i?' active':'');
      row.innerHTML=`<img src="${e.sprite}" alt="${e.name}"><div><h4>${e.name}</h4><small>${e.kind}</small></div><span class="tag">Enemy</span>`;
      row.onclick=()=>{bestiarySelected=i;renderBestiary()};
      list.appendChild(row);
    });
    if(typeof bestiarySelected!=='number')bestiarySelected=0;
    const e=bestiaryEnemies[bestiarySelected]||bestiaryEnemies[0];
    detail.classList.remove('hidden');
    detail.innerHTML=`<div class="best-hero"><div class="best-portrait"><img src="${e.sprite}" alt="${e.name}"></div><div class="best-detail-title"><h3>${e.name}</h3><div class="best-pills"><span class="best-pill">${e.kind}</span><span class="best-pill">Enemy</span></div><p>${e.text}</p></div></div><div class="best-section"><b>Warden advice</b><p>${e.kind==='Fast'?'Use slows, freezes and good path coverage.':e.kind==='Heavy'?'High damage, poison and boss-style single-target builds work well.':e.kind==='Swarm'?'Splash, chain lightning and rapid attackers are ideal.':e.kind==='Boss'?'Use upgraded beasts and combine damage with control effects.':'A balanced defence handles these reliably.'}</p></div>`;
  }else{
    filters.innerHTML='';
    list.innerHTML='<div class="lore-list">'+bestiaryLore.map(x=>`<div class="lore-card"><h3>${x.title}</h3><p>${x.text}</p></div>`).join('')+'</div>';
    detail.classList.remove('hidden');
    detail.innerHTML='<div class="lore-card"><h3>Beastward</h3><p>The world is bound by living magic. Stronger beasts make a brighter tomorrow.</p></div>';
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
 id:5,name:"Ancient Shrine",theme:"shrine",waves:10,reward:185,hp:1.58,speed:1.08,
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
},
{
 id:11,world:2,name:"Snowbound Trail",theme:"snowfield",waves:10,reward:390,hp:3.2,speed:1.19,
 pathWidth:72,pathEdge:"#8ba7b4",pathFill:"#dbeaf0",
 path:[{x:-30,y:455},{x:150,y:455},{x:245,y:315},{x:390,y:315},{x:500,y:155},{x:650,y:155},{x:745,y:340},{x:930,y:340}],
 scenery:[
  {kind:"snowPine",x:95,y:115},{kind:"snowPine",x:315,y:505},{kind:"snowPine",x:830,y:105},
  {kind:"snowdrift",x:520,y:500},{kind:"iceRock",x:120,y:300},{kind:"iceRock",x:690,y:510},
  {kind:"iceCrystal",x:560,y:95},{kind:"iceCrystal",x:855,y:455}
 ]
},
{
 id:12,world:2,name:"Whitepine Woods",theme:"frostforest",waves:10,reward:420,hp:3.5,speed:1.2,
 pathWidth:68,pathEdge:"#718b98",pathFill:"#cfdee5",
 path:[{x:-30,y:115},{x:205,y:115},{x:205,y:470},{x:420,y:470},{x:420,y:210},{x:675,y:210},{x:675,y:500},{x:850,y:500},{x:850,y:295},{x:930,y:295}],
 scenery:[
  {kind:"snowPine",x:80,y:95},{kind:"snowPine",x:310,y:125},{kind:"snowPine",x:545,y:110},{kind:"snowPine",x:785,y:105},
  {kind:"snowPine",x:105,y:510},{kind:"snowPine",x:535,y:505},{kind:"iceRock",x:310,y:330},
  {kind:"snowdrift",x:770,y:360},{kind:"iceCrystal",x:540,y:325}
 ]
},
{
 id:13,world:2,name:"Frozen Crossing",theme:"frozenriver",waves:10,reward:455,hp:3.8,speed:1.21,
 pathWidth:66,pathEdge:"#78939f",pathFill:"#d7e6eb",
 path:[{x:-30,y:500},{x:165,y:500},{x:300,y:390},{x:420,y:300},{x:520,y:300},{x:625,y:205},{x:770,y:115},{x:930,y:190}],
 scenery:[
  {kind:"frozenLake",x:430,y:0,w:150,h:600,block:true},{kind:"iceBridge",x:505,y:300,w:160,h:54,dir:"h"},
  {kind:"snowPine",x:100,y:115},{kind:"snowPine",x:830,y:475},{kind:"iceCrystal",x:390,y:90},
  {kind:"iceCrystal",x:615,y:500},{kind:"snowdrift",x:150,y:310}
 ]
},
{
 id:14,world:2,name:"Frosthaven Outpost",theme:"snowvillage",waves:10,reward:490,hp:4.15,speed:1.22,
 pathWidth:70,pathEdge:"#8399a2",pathFill:"#dce8ec",
 path:[{x:-30,y:170},{x:185,y:170},{x:185,y:485},{x:370,y:485},{x:370,y:330},{x:570,y:330},{x:570,y:100},{x:760,y:100},{x:760,y:430},{x:930,y:430}],
 scenery:[
  {kind:"snowHut",x:90,y:105,block:true},{kind:"snowHut",x:300,y:110,block:true},{kind:"snowHut",x:845,y:125,block:true},
  {kind:"snowHut",x:845,y:520,block:true},{kind:"snowPine",x:485,y:105},{kind:"iceRock",x:285,y:360},
  {kind:"frostRune",x:520,y:480},{kind:"snowdrift",x:660,y:470}
 ]
},
{
 id:15,world:2,name:"Crystal Basin",theme:"crystal",waves:10,reward:530,hp:4.5,speed:1.23,
 pathWidth:68,pathEdge:"#708e9d",pathFill:"#d4e7ee",
 path:[{x:-30,y:310},{x:150,y:125},{x:335,y:305},{x:515,y:115},{x:700,y:310},{x:525,y:500},{x:345,y:370},{x:790,y:370},{x:930,y:235}],
 scenery:[
  {kind:"iceCrystal",x:105,y:485},{kind:"iceCrystal",x:300,y:95},{kind:"iceCrystal",x:555,y:520},
  {kind:"iceCrystal",x:860,y:110},{kind:"icePillar",x:470,y:285},{kind:"icePillar",x:610,y:300},
  {kind:"snowdrift",x:800,y:500},{kind:"iceRock",x:120,y:250}
 ]
},
{
 id:16,world:2,name:"Blizzard Ridge",theme:"blizzard",waves:10,reward:570,hp:4.9,speed:1.25,
 pathWidth:64,pathEdge:"#768c96",pathFill:"#d5e2e7",
 path:[{x:-30,y:95},{x:235,y:95},{x:345,y:245},{x:205,y:415},{x:465,y:510},{x:610,y:345},{x:500,y:185},{x:770,y:80},{x:930,y:245}],
 scenery:[
  {kind:"iceCliff",x:0,y:0,w:1000,h:55,block:true},{kind:"iceCliff",x:0,y:545,w:1000,h:55,block:true},
  {kind:"snowPine",x:95,y:475},{kind:"iceRock",x:300,y:90},{kind:"iceRock",x:840,y:170},
  {kind:"snowdrift",x:550,y:255},{kind:"iceCrystal",x:805,y:390}
 ]
},
{
 id:17,world:2,name:"Shattered Glacier",theme:"glacier",waves:10,reward:615,hp:5.3,speed:1.26,
 pathWidth:66,pathEdge:"#668593",pathFill:"#cce1e9",
 path:[{x:-30,y:520},{x:135,y:520},{x:135,y:375},{x:310,y:375},{x:310,y:230},{x:485,y:230},{x:485,y:95},{x:660,y:95},{x:660,y:300},{x:815,y:300},{x:815,y:150},{x:930,y:150}],
 scenery:[
  {kind:"frozenLake",x:20,y:120,w:185,h:145,block:true},{kind:"frozenLake",x:690,y:390,w:210,h:145,block:true},
  {kind:"iceBridge",x:225,y:375,w:120,h:48,dir:"h"},{kind:"iceCrystal",x:420,y:500},
  {kind:"iceCrystal",x:560,y:365},{kind:"iceRock",x:860,y:500}
 ]
},
{
 id:18,world:2,name:"Icebound Ruins",theme:"frostruins",waves:10,reward:660,hp:5.7,speed:1.28,
 pathWidth:68,pathEdge:"#71838e",pathFill:"#d0dce3",
 path:[{x:-30,y:505},{x:120,y:505},{x:120,y:395},{x:285,y:395},{x:285,y:255},{x:455,y:255},{x:455,y:125},{x:650,y:125},{x:650,y:285},{x:820,y:285},{x:820,y:455},{x:930,y:455}],
 scenery:[
  {kind:"iceWall",x:160,y:90,w:185,h:30,block:true},{kind:"iceWall",x:675,y:520,w:210,h:28,block:true},
  {kind:"icePillar",x:405,y:95},{kind:"icePillar",x:705,y:310},{kind:"frostRune",x:500,y:390},
  {kind:"iceCrystal",x:880,y:115},{kind:"snowPine",x:80,y:105}
 ]
},
{
 id:19,world:2,name:"Summit Pass",theme:"mountain",waves:10,reward:710,hp:6.15,speed:1.3,
 pathWidth:62,pathEdge:"#6f8793",pathFill:"#d2e0e6",
 path:[{x:-30,y:130},{x:170,y:130},{x:280,y:300},{x:150,y:475},{x:425,y:475},{x:535,y:285},{x:420,y:105},{x:720,y:105},{x:800,y:330},{x:930,y:330}],
 scenery:[
  {kind:"iceCliff",x:0,y:0,w:1000,h:50,block:true},{kind:"iceCliff",x:0,y:550,w:1000,h:50,block:true},
  {kind:"iceRock",x:90,y:500},{kind:"iceRock",x:315,y:105},{kind:"iceRock",x:850,y:130},
  {kind:"iceCrystal",x:570,y:490},{kind:"snowdrift",x:735,y:500}
 ]
},
{
 id:20,world:2,name:"Glaciermaw's Lair",theme:"frostden",waves:10,reward:800,hp:6.7,speed:1.32,boss:true,bossType:"glaciermaw",bossName:"Glaciermaw",bossReward:"rare",
 pathWidth:64,pathEdge:"#536f7e",pathFill:"#b9d4df",
 path:[{x:-30,y:295},{x:115,y:295},{x:115,y:80},{x:875,y:80},{x:875,y:520},{x:220,y:520},{x:220,y:185},{x:760,y:185},{x:760,y:405},{x:360,y:405},{x:360,y:285},{x:625,y:285},{x:625,y:350},{x:930,y:350}],
 scenery:[
  {kind:"frozenLake",x:250,y:315,w:150,h:115,block:true},{kind:"frozenLake",x:735,y:470,w:145,h:90,block:true},
  {kind:"iceCrystal",x:70,y:485},{kind:"iceCrystal",x:520,y:100},{kind:"iceCrystal",x:900,y:125},
  {kind:"icePillar",x:285,y:105},{kind:"icePillar",x:770,y:215},{kind:"frostRune",x:520,y:430},
  {kind:"iceRock",x:900,y:510}
 ]
}
];
let currentLevel=levels[0],path=currentLevel.path;
let campaignMode='normal',battleMode='normal',pendingMode='normal',campaignWorld=1;
const worldMeta={
  1:{name:'Verdant Valley',subtitle:'The first region of Beastward.',label:'REGION I',boss:'Hollowmaw'},
  2:{name:'Frostfall Expanse',subtitle:'A frozen wilderness of snow, ice and ancient ruins.',label:'REGION II',boss:'Glaciermaw'}
};
function levelWorld(lvl){return lvl.world||1}
function localLevelNumber(lvl){return ((lvl.id-1)%10)+1}
function levelCode(lvl){return levelWorld(lvl)+'-'+localLevelNumber(lvl)}
function worldUnlocked(world){
  if(world===1)return true;
  return save.completedLevels.includes((world-1)*10);
}
function hardModeUnlocked(world=campaignWorld){
  return save.completedLevels.includes(world*10);
}
function modeDifficulty(mode=battleMode){return mode==='hard'?2:1}
function levelUnlocked(id,mode=campaignMode){
  const lvl=levels.find(x=>x.id===id);if(!lvl)return false;
  const world=levelWorld(lvl),startId=(world-1)*10+1;
  if(!worldUnlocked(world))return false;
  if(mode==='hard'){
    if(!hardModeUnlocked(world))return false;
    return id===startId||save.hardCompletedLevels.includes(id-1);
  }
  return id===startId||save.completedLevels.includes(id-1);
}
function setCampaignWorld(world){
  if(!worldUnlocked(world))return;
  campaignWorld=world;
  if(campaignMode==='hard'&&!hardModeUnlocked(world))campaignMode='normal';
  renderCampaignMap();
}
function setCampaignMode(mode){
  if(mode==='hard'&&!hardModeUnlocked(campaignWorld))return;
  campaignMode=mode;
  renderCampaignMap();
}
function renderCampaignMap(){
 const map=$('.campaign-map');if(!map)return;
 const meta=worldMeta[campaignWorld],hard=campaignMode==='hard',completed=hard?save.hardCompletedLevels:save.completedLevels;
 const world1Btn=$('#campaignWorld1Btn'),world2Btn=$('#campaignWorld2Btn');
 if(world1Btn)world1Btn.classList.toggle('active',campaignWorld===1);
 if(world2Btn){world2Btn.disabled=!worldUnlocked(2);world2Btn.classList.toggle('active',campaignWorld===2);world2Btn.textContent=worldUnlocked(2)?'REGION 2 • FROSTFALL':'REGION 2 • LOCKED'}
 const title=$('#campaignWorldTitle'),sub=$('#campaignWorldSubtitle'),region=$('#campaignRegionLabel');
 if(title)title.textContent=meta.name;if(sub)sub.textContent=meta.subtitle;if(region)region.textContent=meta.label;
 const normalBtn=$('#campaignNormalBtn'),hardBtn=$('#campaignHardBtn'),hint=$('#campaignModeHint');
 if(normalBtn)normalBtn.classList.toggle('active',!hard);
 if(hardBtn){hardBtn.disabled=!hardModeUnlocked(campaignWorld);hardBtn.classList.toggle('active',hard);hardBtn.textContent=hardModeUnlocked(campaignWorld)?'HARD • 2×':'HARD • LOCKED'}
 if(hint)hint.textContent=hard?'Enemies have 2× health and move 12% faster. Hard Mode has its own stage progression.':hardModeUnlocked(campaignWorld)?'Hard Mode unlocked — switch modes whenever you are ready.':'Defeat '+meta.boss+' on '+campaignWorld+'-10 to unlock this world\'s Hard Mode.';
 map.classList.toggle('hard-map',hard);map.classList.toggle('snow-map',campaignWorld===2);
 map.innerHTML='<div class="map-route-line"></div><div class="map-start-label">'+(hard?meta.name.toUpperCase()+' • HARD MODE':meta.name.toUpperCase())+'</div>';
 levels.filter(lvl=>levelWorld(lvl)===campaignWorld).forEach((lvl,i)=>{
   const unlocked=levelUnlocked(lvl.id,campaignMode),done=completed.includes(lvl.id);
   const row=document.createElement('div');row.className='map-stage-row '+(i%2===0?'left':'right');
   const el=document.createElement(unlocked?'button':'div');
   el.className='map-node '+(unlocked?'unlocked':'locked')+(lvl.boss?' boss-node':'')+(done?' completed':'')+(hard?' hard-node':'')+(campaignWorld===2?' snow-node':'');
   const marker=lvl.boss?'◆':done?'✓':unlocked?'✦':'•';
   el.innerHTML=`<span class="map-marker">${marker}</span><div class="map-node-copy"><span>${hard?'HARD ':''}${levelCode(lvl)}</span><b>${lvl.name}</b><small>${done?'Cleared':unlocked?lvl.waves+' waves':'Locked'}</small></div>`;
   if(unlocked)el.onclick=()=>startLevel(lvl.id);
   row.appendChild(el);map.appendChild(row);
 });
}
let pendingLevelId=null,loadoutDraft=[],battleLoadout=[];
function renderLoadoutPicker(){
  const grid=$('#loadoutGrid'),count=$('#loadoutCount'),start=$('#loadoutStartBtn'),title=$('#loadoutLevelName');
  if(!grid)return;
  if(title&&pendingLevelId){const lvl=levels.find(x=>x.id===pendingLevelId);title.textContent=(pendingMode==='hard'?'HARD • ':'')+levelCode(lvl)+' • '+lvl.name+(pendingMode==='hard'?' • 2× HP • +12% speed':'')}
  grid.innerHTML='';
  save.unlocked.forEach(id=>{
    const b=beasts[id],selected=loadoutDraft.includes(id),card=document.createElement('button'),ss=stageStats(id);
    card.className='loadout-card'+(selected?' selected':'');
    card.innerHTML=stageSpriteMarkup(id,evolutionStage(id),'loadout-sprite')+'<div class="loadout-card-copy"><b>'+nameFor(id)+'</b><small>Lv '+progress(id).level+' • '+b.type+' • '+b.role+'</small><small>POW '+ss.power+'/'+ss.cap+' • SPD '+ss.speed+'/'+ss.cap+' • RNG '+ss.range+'/'+ss.cap+'</small></div><span class="loadout-check">'+(selected?'✓':'+')+'</span>';
    card.onclick=()=>{const i=loadoutDraft.indexOf(id);if(i>=0)loadoutDraft.splice(i,1);else if(loadoutDraft.length<4)loadoutDraft.push(id);renderLoadoutPicker()};
    grid.appendChild(card);
  });
  if(count)count.textContent=loadoutDraft.length+' / 4 selected';
  if(start){start.disabled=loadoutDraft.length<1;start.textContent=loadoutDraft.length?'DEFEND WITH '+loadoutDraft.length:'SELECT AT LEAST 1'}
}
function openLoadoutPicker(id){
  pendingLevelId=id;pendingMode=campaignMode;
  const valid=(save.lastLoadout||[]).filter(x=>save.unlocked.includes(x)).slice(0,4);
  loadoutDraft=valid.length?valid:save.unlocked.slice(0,Math.min(4,save.unlocked.length));
  renderLoadoutPicker();$('#loadoutModal').classList.remove('hidden');
}
function closeLoadoutPicker(){$('#loadoutModal').classList.add('hidden');pendingLevelId=null}
function startLevel(id){openLoadoutPicker(id)}
function beginSelectedLevel(){
  if(!pendingLevelId||!loadoutDraft.length)return;
  battleLoadout=[...loadoutDraft].slice(0,4);save.lastLoadout=[...battleLoadout];persist();
  currentLevel=levels.find(x=>x.id===pendingLevelId);path=currentLevel.path;battleMode=pendingMode;$('#loadoutModal').classList.add('hidden');pendingLevelId=null;
  reset();show('gameScreen');last=performance.now();requestAnimationFrame(loop);
}
if($('#loadoutStartBtn'))$('#loadoutStartBtn').onclick=()=>beginSelectedLevel();
if($('#loadoutCancelBtn'))$('#loadoutCancelBtn').onclick=()=>closeLoadoutPicker();
if($('#loadoutModal'))$('#loadoutModal').addEventListener('pointerdown',e=>{if(e.target.classList.contains('loadout-backdrop'))closeLoadoutPicker()});
let towers=[],enemies=[],projectiles=[],effects=[],selectedSpecies=null,selectedTower=null,gold=400,lives=20,wave=0,running=false,last=0,queue=[],speed=1,waveParticipants=new Set();
let battleReport={kills:0,damageByBeast:{},xpByBeast:{},wavesCleared:0,bossDefeated:false};

function ui(){$('#gold').textContent=Math.floor(gold);$('#lives').textContent=lives;$('#wave').textContent=wave;const badge=$('#battleModeBadge');if(badge){badge.textContent=battleMode==='hard'?'HARD • 2× HP':'NORMAL';badge.classList.toggle('hard',battleMode==='hard')}if(selectedTower)renderUpgradeButtons()}
const upgradeDefs={
 power:[
  {name:'Sharpened Instinct',desc:'+20% damage',mult:.65},
  {name:'Hunter Reach',desc:'+18% range and +10% damage',mult:1.0},
  {name:'Apex Force',desc:'+35% damage and empowered projectiles',mult:1.6},
  {name:'Mythic Instinct',desc:'Huge damage and extra reach',mult:3.0},
  {name:"Warden's Wrath",desc:'ULTIMATE: devastating damage, extra reach and a shockwave on every hit',mult:4.5}
 ],
 special:[
  {name:'Quickened Spirit',desc:'12% faster attacks',mult:.55},
  {name:'Elemental Mastery',desc:'Stronger elemental status effects',mult:.9},
  {name:'Primal Surge',desc:'Unlocks a powerful type-specific effect',mult:1.5},
  {name:'Ancestral Awakening',desc:'Far faster attacks and empowered elemental effects',mult:2.8},
  {name:'Primal Ascendance',desc:'ULTIMATE: extreme attack speed and overflowing elemental power',mult:4.3}
 ]
};
const beastSkills={
 embercub:{name:'Flameheart',desc:['Burn damage +25%','Burn lasts longer and splashes','Inferno: burning targets erupt','Cataclysm Flame: burns and eruptions surge dramatically','Solar Inferno: every strike detonates a blazing inferno'],mult:[.55,.9,1.45,2.7,4.7]},
 sprigpaw:{name:'Verdant Snare',desc:['Root chance +15%','Roots last longer','Wild Growth: roots spread nearby','Elderwood Bind: roots become far more frequent and spread wider','Worldroot: roots surge through whole enemy clusters'],mult:[.5,.85,1.4,2.6,4.7]},
 bubblit:{name:'Tidal Pulse',desc:['Slow strength increased','Slow lasts longer','Riptide: hits splash strong slow','Tsunami Pulse: massive slow field and stronger splash control','Leviathan Tide: crushing waves lock down entire groups'],mult:[.5,.85,1.4,2.6,4.7]},
 sparkit:{name:'Overcharge',desc:['Chain +1 target','Chain damage +20%','Supercell: chains can stun','Stormbreak: many more chains with stronger stun pressure','Heavenbolt: lightning cascades through huge chains'],mult:[.55,.9,1.45,2.7,4.7]},
 pebblum:{name:'Seismic Slam',desc:['Stun lasts longer','Hits splash nearby','Earthshatter: huge area stagger','Worldbreaker: crushing boss damage and wide area stun','Continental Break: seismic hits crush bosses and crowds'],mult:[.6,.95,1.5,2.8,4.7]},
 gustwing:{name:'Tailwind',desc:['Wind pierces +1 target','+12% range','Cyclone: pierces a wide group','Tempest Crown: greatly increased piercing and reach','Eye of the Storm: relentless piercing gales sweep the path'],mult:[.5,.9,1.45,2.7,4.7]},
 toxip:{name:'Virulent Venom',desc:['Poison damage +30%','Poison lasts longer','Plague Cloud: poison spreads','Black Venom: extreme poison damage and spreading plague','Extinction Venom: toxic damage spreads explosively'],mult:[.55,.9,1.45,2.7,4.7]},
 frostkit:{name:'Deep Freeze',desc:['Freeze chance +12%','Freeze lasts longer','Absolute Zero: freezes nearby enemies','Absolute Zero+: frequent freezes and stronger area control','Eternal Winter: repeated freezes engulf nearby enemies'],mult:[.6,.95,1.5,2.8,4.7]},
 shadepup:{name:'Night Hunt',desc:['Critical chance +12%','Critical damage increased','Execution: brutal low-health crits','Nightmare Hunt: devastating critical bursts','Death Hunt: critical strikes become brutally lethal'],mult:[.6,.95,1.55,2.9,4.7]},
 lumpling:{name:'Radiant Nova',desc:['Splash radius +20%','Splash damage +25%','Sunburst: massive radiant explosion','Solar Collapse: huge radiant splash damage','Supernova: radiant blasts engulf a huge area'],mult:[.6,.95,1.5,2.8,4.7]},
 voltwing:{name:'Storm Relay',desc:['Chain +1 target','Chain damage +25%','Thunderweb: farther chains can stun','Thunder Dominion: enormous chain coverage and stun chance','Godstorm: massive lightning chains dominate the battlefield'],mult:[.65,1,1.55,2.9,4.7]},
 scorchick:{name:'Ember Rush',desc:['+10% attack speed','Burn damage +25%','Firestorm: rapid hits explode','Phoenix Rush: extreme attack speed and explosive burn','Phoenix Ascension: blistering speed creates constant explosions'],mult:[.45,.8,1.35,2.6,4.7]},
 mosshell:{name:'Ancient Shell',desc:['Stagger lasts longer','+20% boss damage','Quake Shell: attacks stagger an area','Worldshell Quake: major boss damage and area stagger','Titan Quake: enormous stagger and boss-breaking force'],mult:[.55,.9,1.45,2.7,4.7]},
 drizzlet:{name:'Flash Flood',desc:['Slow strength increased','+10% attack speed','Downpour: splash slow nearby','Deluge: rapid attacks with overwhelming slow coverage','Oceanfall: relentless floods overwhelm enemy movement'],mult:[.45,.8,1.35,2.6,4.7]},
 zapmoth:{name:'Static Swarm',desc:['Chain +1 target','+10% attack speed','Arc Swarm: rapid crowd chaining','Living Storm: extreme chain count and attack speed','Infinite Circuit: lightning jumps rapidly through large groups'],mult:[.5,.85,1.4,2.7,4.7]},
 cindrake:{name:'Meteor Core',desc:['Meteor splash +25%','Burning splash +30%','Cataclysm: enormous blast','Extinction Meteor: gigantic impact and burn explosion','Worldfire Meteor: colossal impacts devastate whole packs'],mult:[.7,1.1,1.7,3.1,4.7]},
 sporeling:{name:'Spore Colony',desc:['Poison duration +30%','Burst spreads farther','Bloom: infected enemies spread poison','Endless Bloom: devastating poison spread through crowds','Final Bloom: poison propagates through nearly everything nearby'],mult:[.65,1.05,1.65,3,4.7]},
 drakeling:{name:'Skybreaker',desc:['Wind pierces +1 target','+15% range','Tempest Lance: tears through groups','Sky Rend: extreme piercing with extended range','Heaven Rend: colossal piercing gales tear through the path'],mult:[.65,1.05,1.65,3,4.7]},
 voidling:{name:'Rift Hunger',desc:['Critical chance +15%','Crits splash void damage','Singularity: crits tear nearby enemies','Event Horizon: huge crit bursts with wide void splash','Black Horizon: void criticals collapse enemies around the target'],mult:[.7,1.1,1.7,3.06,4.7]}
};
function upgradeCost(t,path){
 const tier=t[path+'Tier']||0;
 if(path==='skill'){
   const skill=beastSkills[t.b.id],mult=skill?.mult?.[tier];
   return mult?Math.ceil(t.baseCost*mult*1.12/5)*5:null;
 }
 const def=upgradeDefs[path][tier];
 return def?Math.ceil(t.baseCost*def.mult*1.12/5)*5:null;
}
function recalcTower(t){
 const base=battleStats(t.b.id),p=t.powerTier||0,s=t.specialTier||0,k=t.skillTier||0,id=t.b.id;
 const powerDamage=[1,1.2,1.32,1.782,2.85,4.15][p]||1;
 const powerRange=[1,1,1.18,1.18,1.36,1.48][p]||1;
 const specialRate=[1,.88,.88,.88,.68,.52][s]||1;
 let skillDamage=1,skillRange=1,skillRate=1;
 if(id==='gustwing'&&k>=2)skillRange*=1.12;
 if(id==='drakeling'&&k>=2)skillRange*=1.15;
 if(id==='scorchick'&&k>=1)skillRate*=k>=2?.82:.90;
 if(id==='drizzlet'&&k>=2)skillRate*=.90;
 if(id==='zapmoth'&&k>=2)skillRate*=.90;
 if(id==='mosshell'&&k>=2)skillDamage*=1.08;
 if(k>=4){skillDamage*=1.35;skillRate*=.82;skillRange*=1.08}
 if(k>=5){skillDamage*=1.28;skillRate*=.88;skillRange*=1.06}
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
  const available=(battleLoadout&&battleLoadout.length?battleLoadout:save.unlocked.slice(0,4)).filter(id=>save.unlocked.includes(id));
  available.forEach(id=>{
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
  const targetSelect=$('#targetModeSelect');if(targetSelect)targetSelect.value=selectedTower.targetMode||'first';
  renderUpgradeButtons();
}
function towerUltimatePath(t){
  if((t.powerTier||0)>=5)return 'power';
  if((t.specialTier||0)>=5)return 'special';
  if((t.skillTier||0)>=5)return 'skill';
  return null;
}
function renderUpgradeButtons(){
 if(!selectedTower)return;
 const claimed=towerUltimatePath(selectedTower);
 ['power','special'].forEach(path=>{
   const tier=selectedTower[path+'Tier']||0;
   const btn=$('#'+path+'UpgradeBtn'),desc=$('#'+path+'UpgradeDesc');
   if(!btn||!desc)return;
   if(tier>=5){btn.textContent='ULTIMATE MASTERED';btn.disabled=true;desc.textContent='Tier V Ultimate active.';btn.classList.add('ultimate-owned');return}
   btn.classList.remove('ultimate-owned');
   const locked=tier===4&&claimed&&claimed!==path,cost=upgradeCost(selectedTower,path),def=upgradeDefs[path][tier];
   btn.disabled=!!locked||gold<cost;
   btn.textContent=locked?'ULTIMATE CLAIMED BY '+claimed.toUpperCase():(tier===4?`Tier V • ULTIMATE • ${def.name} • ${cost}g`:`Tier ${tier+1} • ${def.name} • ${cost}g`);
   desc.textContent=locked?'Only one of the three upgrade paths can claim Tier V.':def.desc;
 });
 const skill=beastSkills[selectedTower.b.id],tier=selectedTower.skillTier||0,btn=$('#skillUpgradeBtn'),desc=$('#skillUpgradeDesc'),title=$('#skillPathName');
 if(title)title.textContent=skill?.name||'Beast Talent';
 if(btn&&desc&&skill){
   if(tier>=5){btn.textContent='ULTIMATE MASTERED';btn.disabled=true;desc.textContent='Tier V species Ultimate active.';btn.classList.add('ultimate-owned')}
   else{
     btn.classList.remove('ultimate-owned');
     const locked=tier===4&&claimed&&claimed!=='skill',cost=upgradeCost(selectedTower,'skill');
     btn.disabled=!!locked||gold<cost;
     btn.textContent=locked?'ULTIMATE CLAIMED BY '+claimed.toUpperCase():(tier===4?`Tier V • ULTIMATE • ${cost}g`:`Tier ${tier+1} • ${cost}g`);
     desc.textContent=locked?'Only one of the three upgrade paths can claim Tier V.':skill.desc[tier];
   }
 }
}
function buyTowerUpgrade(path){
 if(!selectedTower)return;
 const tier=selectedTower[path+'Tier']||0,claimed=towerUltimatePath(selectedTower);
 if(tier>=5)return;
 if(tier===4&&claimed&&claimed!==path)return;
 const cost=upgradeCost(selectedTower,path);if(gold<cost)return;
 gold-=cost;selectedTower[path+'Tier']=tier+1;selectedTower.spent+=cost;recalcTower(selectedTower);ui();renderSelectedTower();
 if(tier===4)showProgressToast('ULTIMATE UNLOCKED',(path==='power'?"Warden's Wrath":path==='special'?'Primal Ascendance':beastSkills[selectedTower.b.id].name+' Ultimate')+' is now active.','evolution');
}
$('#powerUpgradeBtn').onclick=()=>buyTowerUpgrade('power');
$('#specialUpgradeBtn').onclick=()=>buyTowerUpgrade('special');
$('#skillUpgradeBtn').onclick=()=>buyTowerUpgrade('skill');
if($('#targetModeSelect'))$('#targetModeSelect').onchange=e=>{if(selectedTower)selectedTower.targetMode=e.target.value};
if($('#closeTowerModalBtn'))$('#closeTowerModalBtn').onclick=()=>closeTowerModal();
if($('#selectedTowerModal')){
  $('#selectedTowerModal').addEventListener('pointerdown',e=>{
    if(e.target.classList.contains('tower-modal-backdrop'))closeTowerModal();
  });
}
function reset(){
  towers=[];enemies=[];projectiles=[];effects=[];selectedSpecies=null;selectedTower=null;gold=400;lives=20;wave=0;running=false;queue=[];speed=1;waveParticipants=new Set();
  battleReport={kills:0,damageByBeast:{},xpByBeast:{},wavesCleared:0,bossDefeated:false};
  document.querySelectorAll('.speed-choice').forEach(b=>b.classList.toggle('active',Number(b.dataset.speed)===1));$('#waveXpNotice').textContent='';ui();choices();renderSelectedTower();updateNextWavePreview();
}
let exitResumeSpeed=1;
function openExitConfirmation(){
  const modal=$('#exitConfirmModal');if(!modal)return;
  exitResumeSpeed=speed||1;speed=0;modal.classList.remove('hidden');
}
function closeExitConfirmation(){
  const modal=$('#exitConfirmModal');if(modal)modal.classList.add('hidden');
  speed=exitResumeSpeed||1;
}
function confirmExitLevel(){
  const modal=$('#exitConfirmModal');if(modal)modal.classList.add('hidden');
  running=false;queue=[];enemies=[];projectiles=[];effects=[];speed=1;selectedTower=null;renderCampaignMap();show('campaignScreen');
}
$('#exitLevelBtn').onclick=()=>openExitConfirmation();
if($('#exitStayBtn'))$('#exitStayBtn').onclick=()=>closeExitConfirmation();
if($('#exitConfirmBtn'))$('#exitConfirmBtn').onclick=()=>confirmExitLevel();
if($('#exitConfirmModal'))$('#exitConfirmModal').addEventListener('pointerdown',e=>{if(e.target.classList.contains('exit-confirm-backdrop'))closeExitConfirmation()});
function setSpeed(next){speed=next;document.querySelectorAll('.speed-choice').forEach(b=>b.classList.toggle('active',Number(b.dataset.speed)===speed))}
document.querySelectorAll('.speed-choice').forEach(b=>b.onclick=()=>setSpeed(Number(b.dataset.speed)));
function waveEnemyMix(w){
  if(levelWorld(currentLevel)===2){
    if(w===1)return ['frostling'];
    if(w===2)return ['frostling','snowstalker'];
    if(w===3)return ['frostling','snowstalker','shardwisp'];
    if(w===4)return ['frostling','shardwisp','snowstalker'];
    if(w===5)return ['icegolem','frostling'];
    if(w===6)return ['shardwisp','snowstalker','frostling'];
    if(w===7)return ['icegolem','snowstalker','frostling'];
    if(w===8)return ['shardwisp','icegolem','snowstalker'];
    if(w===9)return ['icegolem','snowstalker','shardwisp','frostling'];
    return ['icegolem','snowstalker','shardwisp','frostling'];
  }
  if(w===1)return ['raider'];
  if(w===2)return ['raider','thornling'];
  if(w===3)return ['raider','hound','thornling'];
  if(w===4)return ['raider','wisp','glimmer'];
  if(w===5)return ['brute','shellback','raider'];
  if(w===6)return ['wisp','hound','glimmer','thornling'];
  if(w===7)return ['brute','hound','shellback','raider'];
  if(w===8)return ['wisp','shellback','glimmer','thornling'];
  if(w===9)return ['brute','hound','wisp','shellback','glimmer'];
  return ['brute','hound','wisp','thornling','shellback','glimmer','raider'];
}
function bossTypeForLevel(){return currentLevel.bossType||'hollowmaw'}
function bossNameForLevel(){return currentLevel.bossName||enemyTypes[bossTypeForLevel()]?.name||'Boss'}
function waveEnemyCount(w){
  const base=4+w*2+Math.floor((currentLevel.id-1)*.5);
  return Math.ceil(base*1.5);
}
function waveComposition(w){
  const n=waveEnemyCount(w),mix=waveEnemyMix(Math.min(10,w)),counts={};
  for(let i=0;i<n;i++){const id=mix[i%mix.length];counts[id]=(counts[id]||0)+1}
  if(w===10&&currentLevel.boss)counts[bossTypeForLevel()]=1;
  return counts;
}
function wavePreviewText(w){
  const counts=waveComposition(Math.min(10,w));
  return Object.entries(counts).map(([id,count])=>count+'× '+enemyTypes[id].name).join(' • ');
}
function updateNextWavePreview(){
  const el=$('#nextWaveInfo');
  if(!el)return;
  if(wave>=10){el.textContent='Final wave complete';return}
  el.textContent='Next: '+wavePreviewText(wave+1)+(battleMode==='hard'?' • HARD 2× HP • +12% speed':'');
}
$('#startWaveBtn').onclick=()=>{
  if(running||wave>=10)return;
  wave++;running=true;waveParticipants=new Set(towers.map(t=>t.b.id));queue=[];
  const difficulty=modeDifficulty();
  const waveHp=(48+wave*16+wave*wave*.7)*currentLevel.hp*difficulty;
  const waveSpeed=(42+wave*1.6)*currentLevel.speed*(battleMode==='hard'?1.12:1);
  const spacing=Math.max(390,690-currentLevel.id*18);
  const n=waveEnemyCount(wave),mix=waveEnemyMix(wave);

  if(wave===10&&currentLevel.boss){
    const bossHp=6400*currentLevel.hp*difficulty;
    const bossSpacing=Math.max(360,spacing*.78);

    // The finale now starts with normal pressure, then Hollowmaw enters while
    // the full 1.5x-sized enemy wave continues streaming in around it.
    for(let i=0;i<n;i++){
      const id=mix[i%mix.length],type=enemyTypes[id];
      const delay=i*bossSpacing;
      queue.push({
        delay,
        hp:waveHp*type.hp,
        speed:waveSpeed*type.speed,
        reward:Math.max(8,Math.round((16+wave)*type.reward)),
        type:id
      });
    }
    queue.push({delay:bossSpacing*5,hp:bossHp,speed:20*currentLevel.speed*(battleMode==='hard'?1.08:1),reward:500,boss:true,type:bossTypeForLevel()});
    queue.sort((a,b)=>a.delay-b.delay);
    showProgressToast(bossNameForLevel().toUpperCase()+' APPROACHES',`Boss Wave • ${bossNameForLevel()} enters alongside ${n} normal enemies. Hold the line.`,'boss');
  }else{
    for(let i=0;i<n;i++){
      const id=mix[i%mix.length],type=enemyTypes[id];
      queue.push({delay:i*(id==='wisp'?spacing*.62:spacing),hp:waveHp*type.hp,speed:waveSpeed*type.speed,reward:Math.max(5,Math.round((13+wave+Math.floor(currentLevel.id/2))*type.reward)),type:id});
    }
  }
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
  const placed={x,y,b:battleStats(selectedSpecies),cool:0,baseCost:b.cost,spent:b.cost,powerTier:0,specialTier:0,skillTier:0,targetMode:'first'};
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
  enemies.push({x:path[0].x,y:path[0].y,seg:0,hp:s.hp,max:s.hp,speed:s.speed,baseSpeed:s.speed,reward:s.reward,boss:!!s.boss,type:type.id,size:type.size,slow:0,slowFactor:.62,root:0,stun:0,burn:0,burnDps:0,poison:0,poisonDps:0,boss70:false,boss45:false,boss20:false})
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
function defeatEnemy(e){const i=enemies.indexOf(e);if(i<0)return false;gold+=e.reward;battleReport.kills++;if(e.boss){battleReport.bossDefeated=true;showProgressToast(bossNameForLevel().toUpperCase()+' DEFEATED','The regional alpha has fallen. The path to the Beast Core is safe.','boss-win')}enemies.splice(i,1);ui();return true;}
function updateBossPhases(e){
  if(!e||!e.boss||e.hp<=0)return;
  const ratio=e.hp/e.max,name=bossNameForLevel(),snow=levelWorld(currentLevel)===2;
  if(ratio<=.70&&!e.boss70){
    e.boss70=true;towers.forEach(t=>t.cool=Math.max(t.cool||0,snow?1.35:1.15));
    fx('bossPulse',e.x,e.y,snow?'#9eeaff':'#d279ff',{size:snow?138:120,life:.9,maxLife:.9});
    showProgressToast(snow?'WHITEOUT ROAR':'DREAD ROAR',name+' staggers every Beast for a moment.','boss');
  }
  if(ratio<=.45&&!e.boss45){
    e.boss45=true;
    const hp=(48+wave*16+wave*wave*.7)*currentLevel.hp*modeDifficulty();
    const addType=snow?'snowstalker':'hound',type=enemyTypes[addType];
    [0,300,600,900,1200,1500].forEach(delay=>queue.push({delay,hp:hp*type.hp,speed:(42+wave*1.6)*currentLevel.speed*type.speed,reward:snow?22:18,type:addType}));
    queue.sort((a,b)=>a.delay-b.delay);
    fx('bossPulse',e.x,e.y,snow?'#bdefff':'#9f62ff',{size:snow?160:145,life:.9,maxLife:.9});
    showProgressToast(snow?'FROZEN PACK':'PACK CALL',name+' summons a pack of '+(snow?'Snow Stalkers':'Ruin Hounds')+'.','boss');
  }
  if(ratio<=.20&&!e.boss20){
    e.boss20=true;e.speed=e.baseSpeed*(snow?1.65:1.55);
    fx('bossPulse',e.x,e.y,snow?'#e9fbff':'#ff556f',{size:snow?180:165,life:1,maxLife:1});
    showProgressToast(name.toUpperCase()+' ENRAGES','Below 20% health '+name+' moves much faster. Finish it now!','boss-danger');
  }
}
function pathProgress(e){
  const a=path[e.seg],b=path[e.seg+1];if(!a||!b)return e.seg;
  const full=Math.max(1,Math.hypot(b.x-a.x,b.y-a.y)),left=Math.hypot(b.x-e.x,b.y-e.y);
  return e.seg+(1-left/full);
}
function pickTarget(t,candidates){
  const mode=t.targetMode||'first';
  if(mode==='last')return candidates.sort((a,b)=>pathProgress(a)-pathProgress(b))[0];
  if(mode==='strongest')return candidates.sort((a,b)=>b.hp-a.hp)[0];
  if(mode==='weakest')return candidates.sort((a,b)=>a.hp-b.hp)[0];
  if(mode==='fastest')return candidates.sort((a,b)=>b.speed-a.speed)[0];
  return candidates.sort((a,b)=>pathProgress(b)-pathProgress(a))[0];
}
function projectileVisual(beastId,type){
  const visuals={
    embercub:'fireball',
    sprigpaw:'thorn_leaf',
    bubblit:'bubble',
    sparkit:'spark_bolt',
    pebblum:'rock_chunk',
    gustwing:'gale_arc',
    toxip:'venom_blob',
    frostkit:'ice_shard',
    shadepup:'shadow_claw',
    lumpling:'radiant_orb',
    voltwing:'thunder_orb',
    scorchick:'ember_streak',
    mosshell:'seed_stone',
    drizzlet:'water_dart',
    zapmoth:'static_dart',
    cindrake:'meteor',
    sporeling:'spore_orb',
    drakeling:'sky_lance',
    voidling:'void_orb'
  };
  return visuals[beastId]||type.toLowerCase();
}
function attack(t,dt){
  t.cool-=dt;if(t.cool>0)return;
  const target=pickTarget(t,enemies.filter(e=>Math.hypot(e.x-t.x,e.y-t.y)<=t.b.range));
  if(!target)return;
  t.cool=t.b.rate;projectiles.push({x:t.x,y:t.y,target,damage:t.b.damage,type:t.b.type,color:t.b.color,beastId:t.b.id,visual:projectileVisual(t.b.id,t.b.type),speed:t.b.type==='Rock'?300:t.b.type==='Wind'?520:420,fromX:t.x,fromY:t.y,spin:0,powerTier:t.powerTier||0,specialTier:t.specialTier||0,skillTier:t.skillTier||0});
}
function addXP(ids,amount){
  const levelUps=[];
  ids.forEach(id=>{
    const p=progress(id);if(p.level>=BEAST_LEVEL_CAP){syncSeenStages(id);return}
    p.xp+=amount;
    while(p.level<BEAST_LEVEL_CAP&&p.xp>=xpNeeded(p.level)){
      p.xp-=xpNeeded(p.level);p.level++;syncSeenStages(id);levelUps.push(nameFor(id)+' reached Level '+p.level);
    }
    syncSeenStages(id);
    if(p.level>=BEAST_LEVEL_CAP)p.xp=0;
  });
  persist();
  return levelUps;
}
function showProgressToast(title,text,kind='normal'){
  const toast=$('#progressToast');if(!toast)return;
  toast.className='progress-toast '+kind;
  $('#progressToastTitle').textContent=title;
  $('#progressToastText').textContent=text;
  toast.classList.remove('hidden');
  clearTimeout(showProgressToast.timer);
  showProgressToast.timer=setTimeout(()=>toast.classList.add('hidden'),2400);
}
function completeWave(){
  const amount=5+wave*5,bonus=24+wave*4;
  gold+=bonus;battleReport.wavesCleared=Math.max(battleReport.wavesCleared,wave);ui();
  waveParticipants.forEach(id=>battleReport.xpByBeast[id]=(battleReport.xpByBeast[id]||0)+amount);
  const ups=addXP(waveParticipants,amount);
  $('#waveXpNotice').textContent=`Wave ${wave} clear • +${amount} XP • +${bonus} gold`;
  if(ups.length){
    const evolution=ups.find(x=>x.includes('Level '+FIRST_EVOLUTION_LEVEL)||x.includes('Level '+SECOND_EVOLUTION_LEVEL));
    showProgressToast(evolution?'EVOLUTION READY':'BEAST LEVEL UP',ups.join(' • '),evolution?'evolution':'levelup');
  }
  setTimeout(()=>{if($('#waveXpNotice'))$('#waveXpNotice').textContent=''},1800);
}
function fx(kind,x,y,color='#fff',extra={}){effects.push({kind,x,y,color,life:1,maxLife:1,...extra})}
function spawnImpactEffect(p,t){
  if(!p||!t)return;
  const style=p.visual||projectileVisual(p.beastId,p.type);
  const colors={
    fireball:'#ffb13b',ember_streak:'#ffd45a',meteor:'#ff7438',
    thorn_leaf:'#8ee879',seed_stone:'#a5cf72',
    bubble:'#8fe6ff',water_dart:'#5fd3ff',
    spark_bolt:'#fff36c',static_dart:'#ffe45f',thunder_orb:'#fff08a',
    rock_chunk:'#d0bba4',gale_arc:'#d8ffe7',sky_lance:'#bdfcef',
    venom_blob:'#e581f3',spore_orb:'#e3a1f0',ice_shard:'#d9fbff',
    shadow_claw:'#c39dff',void_orb:'#e3a0ff',radiant_orb:'#fff6b3'
  };
  const size=style==='void_orb'?78:(style==='meteor'?72:(style==='thunder_orb'||style==='radiant_orb'?64:54));
  fx('impact',t.x,t.y,colors[style]||p.color||'#fff',{style,size,life:.62,maxLife:.62});
  const particleStyles=['fireball','ember_streak','meteor','spark_bolt','static_dart','thunder_orb','venom_blob','spore_orb','void_orb','radiant_orb'];
  if(particleStyles.includes(style)){
    const count=style==='void_orb'?8:(style==='meteor'?7:5);
    for(let i=0;i<count;i++)fx('particle',t.x,t.y,colors[style]||p.color||'#fff',{vx:(Math.random()-.5)*120,vy:(Math.random()-.5)*120,size:style==='void_orb'?4.5:3.5,life:.5,maxLife:.5});
  }
}
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
  const mastery=p.specialTier>=2,primal=p.specialTier>=3,awakened=p.specialTier>=4,ascendant=p.specialTier>=5,apex=p.powerTier>=3,mythic=p.powerTier>=4,wrath=p.powerTier>=5,talentUltimate=p.skillTier>=5,t=p.target;
  spawnImpactEffect(p,t);
  let damage=p.damage;
  if(awakened)damage*=1.35;
  if(ascendant)damage*=1.18;
  if(mythic)damage*=1.18;
  if(wrath)damage*=1.32;
  let critChance=0,critMult=2;
  if(p.type==='Dark'){
    critChance=(p.beastId==='voidling'?.40:.28)+(mastery?.10:0)+(primal?.17:0);
    critMult=p.beastId==='voidling'?(primal?2.85:mastery?2.45:2.25):(primal?2.6:mastery?2.2:2);
    if(Math.random()<critChance){damage*=critMult;fx('crit',t.x,t.y,'#ff79ff')}
  }
  t.hp-=damage;
  battleReport.damageByBeast[p.beastId]=(battleReport.damageByBeast[p.beastId]||0)+Math.max(0,damage);

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
  if(wrath){
    enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<72).forEach(e=>e.hp-=p.damage*.32);
    fx('apex',t.x,t.y,'#ffd46f',{size:105});
  }
  if(ascendant){
    t.slow=Math.max(t.slow||0,.7);
    enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<65).slice(0,4).forEach(e=>e.hp-=p.damage*.18);
    fx('apex',t.x,t.y,p.color,{size:98});
  }
  if(talentUltimate){
    enemies.filter(e=>e!==t&&Math.hypot(e.x-t.x,e.y-t.y)<88).slice(0,5).forEach(e=>e.hp-=p.damage*.22);
    fx('apex',t.x,t.y,'#f1b4ff',{size:112});
  }
  if(t.boss){
    t.stun=Math.min(t.stun||0,.32);
    t.root=Math.min(t.root||0,.18);
    t.slowFactor=Math.max(t.slowFactor||1,.72);
  }
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
    if(e.boss)updateBossPhases(e);
    if(!move(e,dt)){
      if(e.boss){enemies.splice(i,1);lives=Math.max(0,lives-5);ui();showProgressToast('THE CORE IS BREACHED',bossNameForLevel()+' reached the Beast Core.','boss-danger');return finish(false)}
      lives-=1;enemies.splice(i,1);ui();if(lives<=0)return finish(false)
    }
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
    if(wave>=10){
      if(currentLevel.boss&&!battleReport.bossDefeated)return finish(false);
      finish(true);
    }
  }
}
let pendingBossEggReward=null;
function rollRewardEgg(pool,tier='Common'){
  const id=pool[Math.floor(Math.random()*pool.length)],isNew=!save.unlocked.includes(id);
  if(isNew)addBeast(id);else save.beastCopies[id]=(save.beastCopies[id]||0)+1;
  return {id,isNew,tier};
}
function showBossEggReward(result){
  if(!result)return;
  const {id,isNew,tier='Common'}=result,b=beasts[id];
  $('#eggResultTitle').textContent='Boss Reward • '+tier+' Egg';
  $('#eggResultSprite').src=b.sprite;
  $('#eggResultName').textContent=b.name;
  const a=ascension(id),need=ascensionNeed(id),held=copies(id);
  $('#eggResultText').textContent=isNew?b.name+' hatched from the regional boss reward egg and joined your Beast Vault.':b.name+' duplicate hatched. You now have '+held+(a<3?'/'+need:'')+' copies towards the next Ascension.';
  $('#eggModal').classList.remove('hidden');
}
function finish(win){
  running=false;queue=[];
  $('#resultModal').classList.remove('hidden');
  $('#resultTitle').textContent=win?'Victory!':'The Core Has Fallen';
  if(win){
    const hard=battleMode==='hard',region=levelWorld(currentLevel),local=localLevelNumber(currentLevel),meta=worldMeta[region];
    const completed=hard?save.hardCompletedLevels:save.completedLevels;
    const replay=completed.includes(currentLevel.id);
    const baseReward=Math.round(currentLevel.reward*(hard?1.75:1));
    const reward=Math.max(1,Math.round(baseReward*(replay?.5:1)));
    const bossEgg=!hard&&currentLevel.boss&&battleReport.bossDefeated&&!save.bossEggRewards.includes(currentLevel.id);
    save.essence+=reward;
    if(!replay)completed.push(currentLevel.id);
    if(bossEgg){
      save.bossEggRewards.push(currentLevel.id);
      const rare=currentLevel.bossReward==='rare';
      pendingBossEggReward=rollRewardEgg(rare?rarePool:commonPool,rare?'Rare':'Common');
    }
    save.wardenLevel=Math.max(save.wardenLevel,1+Math.ceil(currentLevel.id/2));persist();
    let unlockText='Replay reward • 50% Essence.';
    if(!replay){
      if(local<10)unlockText=(hard?'Hard ':'')+region+'-'+(local+1)+' unlocked.';
      else if(hard)unlockText=meta.name+' Hard Mode complete!';
      else if(region===1)unlockText='Verdant Valley complete! Region 2 • Frostfall Expanse unlocked!';
      else unlockText=meta.name+' complete! Hard Mode unlocked!';
    }
    $('#resultText').textContent=(hard?'HARD • ':'')+currentLevel.name+' defended. You earned '+reward+' Essence. '+unlockText+(bossEgg?' Boss reward: '+(currentLevel.bossReward==='rare'?'Rare':'Common')+' Egg earned!':'');
  }else $('#resultText').textContent=currentLevel.boss&&!battleReport.bossDefeated?bossNameForLevel()+' was not defeated. Rebuild your defence and face the boss again.':'Strengthen your defence and try again.';

  const summary=$('#battleSummary');
  if(summary){
    const damageEntries=Object.entries(battleReport.damageByBeast).sort((a,b)=>b[1]-a[1]);
    const best=damageEntries[0],bestName=best?nameFor(best[0]):'—',bestDamage=best?Math.round(best[1]):0;
    const xpRows=Object.entries(battleReport.xpByBeast).sort((a,b)=>b[1]-a[1]).map(([id,xp])=>'<span><b>'+nameFor(id)+'</b><em>+'+xp+' XP</em></span>').join('');
    summary.innerHTML='<div class="summary-stat"><small>ENEMIES DEFEATED</small><b>'+battleReport.kills+'</b></div>'+
      '<div class="summary-stat"><small>WAVES CLEARED</small><b>'+battleReport.wavesCleared+'/10</b></div>'+
      '<div class="summary-stat standout"><small>TOP DAMAGE</small><b>'+bestName+'</b><em>'+bestDamage+' dmg</em></div>'+
      '<div class="summary-xp"><small>BEAST XP EARNED</small>'+ (xpRows||'<span><b>No XP earned</b></span>') +'</div>';
  }
}
$('#resultContinue').onclick=()=>{const reward=pendingBossEggReward;pendingBossEggReward=null;$('#resultModal').classList.add('hidden');renderCampaignMap();show('hubScreen');if(reward)setTimeout(()=>showBossEggReward(reward),120)};


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
    den:["#27272f","#303039","#202028"],
    snowfield:["#d7e5e9","#e7f0f2","#c7d9df"],
    frostforest:["#b8cdd3","#cadbe0","#a9c0c7"],
    frozenriver:["#c9dce3","#dce9ed","#b5cbd4"],
    snowvillage:["#c7d7dc","#d9e4e7","#b4c8cf"],
    crystal:["#b8d7e5","#d5e9f0","#a7c8d7"],
    blizzard:["#b2c4cc","#cbd8dd","#9eb4be"],
    glacier:["#a9cbd9","#cce2ea","#94b7c7"],
    frostruins:["#b7c9d1","#cedbe0","#9fb4bd"],
    mountain:["#afc1c8","#c8d5da","#98adb7"],
    frostden:["#9dbbc9","#b9d2dc","#829fac"]
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
  if(levelWorld(level)===2){
    ctx.fillStyle='#ffffff75';
    for(let x=18;x<1000;x+=56)for(let y=22;y<600;y+=64){const off=((x+y+level.id*7)%17);ctx.beginPath();ctx.arc(x+off,y+(off%9),1.6,0,Math.PI*2);ctx.fill()}
    if(level.theme==='blizzard'){ctx.strokeStyle='#ffffff66';ctx.lineWidth=2;for(let y=35;y<600;y+=55){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(1000,y-85);ctx.stroke()}}
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
    if(s.kind==='frozenLake'){
      ctx.fillStyle='#8fc7da';ctx.fillRect(s.x,s.y,s.w,s.h);ctx.fillStyle='#dff7ff88';
      for(let y=s.y+12;y<s.y+s.h;y+=30)for(let x=s.x+8;x<s.x+s.w;x+=70){ctx.fillRect(x,y,28,3)}
      ctx.strokeStyle='#ecfbff99';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(s.x+12,s.y+15);ctx.lineTo(s.x+s.w-18,s.y+s.h-22);ctx.moveTo(s.x+s.w*.7,s.y+5);ctx.lineTo(s.x+s.w*.35,s.y+s.h-8);ctx.stroke();
    }
    if(s.kind==='iceCliff'){
      ctx.fillStyle='#7899a8';ctx.fillRect(s.x,s.y,s.w,s.h);ctx.fillStyle='#d4eef7';
      for(let x=s.x;x<s.x+s.w;x+=52){ctx.beginPath();ctx.moveTo(x,s.y+s.h);ctx.lineTo(x+18,s.y+s.h+18);ctx.lineTo(x+34,s.y+s.h);ctx.fill()}
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
function drawSnowPine(x,y){
  ctx.fillStyle='#5b4a40';ctx.fillRect(x-4,y+18,8,24);
  for(let i=0;i<3;i++){ctx.fillStyle=i===0?'#eaf7fa':'#c5dfe5';ctx.beginPath();ctx.moveTo(x,y-34+i*19);ctx.lineTo(x-29+i*3,y+10+i*14);ctx.lineTo(x+29-i*3,y+10+i*14);ctx.closePath();ctx.fill();ctx.strokeStyle='#6c8d91';ctx.lineWidth=2;ctx.stroke()}
}
function drawIceRock(x,y,scale=1){ctx.fillStyle='#7ea7b6';ctx.beginPath();ctx.moveTo(x-16*scale,y+10*scale);ctx.lineTo(x-9*scale,y-12*scale);ctx.lineTo(x+8*scale,y-16*scale);ctx.lineTo(x+18*scale,y+7*scale);ctx.lineTo(x+2*scale,y+16*scale);ctx.closePath();ctx.fill();ctx.strokeStyle='#d8f1f8';ctx.lineWidth=2;ctx.stroke()}
function drawIceCrystal(x,y){ctx.fillStyle='#78d8f4';ctx.shadowBlur=14;ctx.shadowColor='#9feaff';ctx.beginPath();ctx.moveTo(x,y-27);ctx.lineTo(x+13,y+9);ctx.lineTo(x+3,y+23);ctx.lineTo(x-12,y+10);ctx.closePath();ctx.fill();ctx.fillStyle='#d9f8ff';ctx.beginPath();ctx.moveTo(x,y-22);ctx.lineTo(x+4,y+8);ctx.lineTo(x,y+13);ctx.closePath();ctx.fill();ctx.shadowBlur=0}
function drawSnowHut(x,y){ctx.fillStyle='#6a5444';roundedRect(x-31,y-8,62,41,6);ctx.fill();ctx.fillStyle='#eef7f8';ctx.beginPath();ctx.moveTo(x-40,y-7);ctx.lineTo(x,y-39);ctx.lineTo(x+40,y-7);ctx.closePath();ctx.fill();ctx.strokeStyle='#91a9ae';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#31414a';ctx.fillRect(x-8,y+8,16,25);ctx.fillStyle='#ffe7a0';ctx.fillRect(x+15,y+3,10,9)}
function drawSnowdrift(x,y){ctx.fillStyle='#f2f8fa';ctx.beginPath();ctx.ellipse(x,y,28,10,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#cfe2e8';ctx.beginPath();ctx.ellipse(x+8,y+2,18,6,0,0,Math.PI*2);ctx.fill()}
function drawIcePillar(x,y){ctx.fillStyle='#84b9ca';ctx.beginPath();ctx.moveTo(x-11,y+26);ctx.lineTo(x-8,y-23);ctx.lineTo(x,y-34);ctx.lineTo(x+10,y-22);ctx.lineTo(x+12,y+26);ctx.closePath();ctx.fill();ctx.strokeStyle='#d9f6ff';ctx.lineWidth=3;ctx.stroke()}
function drawFrostRune(x,y){ctx.strokeStyle='#bff6ff';ctx.shadowBlur=10;ctx.shadowColor='#9beaff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,15,0,Math.PI*2);ctx.stroke();for(let i=0;i<6;i++){ctx.save();ctx.translate(x,y);ctx.rotate(i*Math.PI/3);ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(0,-18);ctx.stroke();ctx.restore()}ctx.shadowBlur=0}
function drawIceWall(x,y,w,h){ctx.fillStyle='#739bab';ctx.fillRect(x-w/2,y-h/2,w,h);ctx.strokeStyle='#d8f3f8';ctx.lineWidth=3;for(let xx=x-w/2+18;xx<x+w/2;xx+=34){ctx.beginPath();ctx.moveTo(xx,y-h/2);ctx.lineTo(xx,y+h/2);ctx.stroke()}}
function drawIceBridge(s){ctx.save();ctx.translate(s.x,s.y);if(s.dir==='v')ctx.rotate(Math.PI/2);ctx.fillStyle='#8ec7d8';ctx.fillRect(-s.w/2,-s.h/2,s.w,s.h);ctx.strokeStyle='#e9fbff';ctx.lineWidth=3;for(let x=-s.w/2+8;x<s.w/2;x+=18){ctx.beginPath();ctx.moveTo(x,-s.h/2);ctx.lineTo(x,s.h/2);ctx.stroke()}ctx.strokeStyle='#5e8796';ctx.strokeRect(-s.w/2,-s.h/2,s.w,s.h);ctx.restore()}
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
    if(['river','water','corruption','cavePool','cliff','frozenLake','iceCliff'].includes(s.kind))return;
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
    else if(s.kind==='snowPine')drawSnowPine(s.x,s.y);
    else if(s.kind==='iceRock')drawIceRock(s.x,s.y);
    else if(s.kind==='iceCrystal')drawIceCrystal(s.x,s.y);
    else if(s.kind==='snowHut')drawSnowHut(s.x,s.y);
    else if(s.kind==='snowdrift')drawSnowdrift(s.x,s.y);
    else if(s.kind==='icePillar')drawIcePillar(s.x,s.y);
    else if(s.kind==='frostRune')drawFrostRune(s.x,s.y);
    else if(s.kind==='iceWall')drawIceWall(s.x,s.y,s.w,s.h);
    else if(s.kind==='iceBridge')drawIceBridge(s);
  });
}
function drawCore(){
  const end=path[path.length-1],x=Math.min(canvas.width-62,end.x),y=end.y;
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle='#1d3b2b';ctx.beginPath();ctx.arc(0,0,48,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=currentLevel.theme==='den'?'#8a64d8':levelWorld(currentLevel)===2?'#9ee8ff':'#8bca75';ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,38,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=currentLevel.theme==='den'?'#aa7cf0':levelWorld(currentLevel)===2?'#d9f8ff':'#e2d36f';ctx.shadowBlur=18;ctx.shadowColor=ctx.fillStyle;
  ctx.beginPath();ctx.moveTo(0,-28);ctx.lineTo(18,0);ctx.lineTo(0,28);ctx.lineTo(-18,0);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.restore();
}
function blockedByScenery(x,y){
  return (currentLevel.scenery||[]).some(s=>{
    if(!s.block)return false;
    if(['river','water','cliff','frozenLake','iceCliff'].includes(s.kind))return x>=s.x&&x<=s.x+s.w&&y>=s.y&&y<=s.y+s.h;
    if(['wall','iceWall'].includes(s.kind))return x>=s.x-s.w/2&&x<=s.x+s.w/2&&y>=s.y-s.h/2&&y<=s.y+s.h/2;
    if(['corruption','cavePool'].includes(s.kind)){const dx=(x-s.x)/(s.rx||1),dy=(y-s.y)/(s.ry||1);return dx*dx+dy*dy<1}
    if(s.kind==='hut'||s.kind==='snowHut')return Math.abs(x-s.x)<42&&Math.abs(y-s.y)<45;
    if(s.kind==='shrine')return Math.abs(x-s.x)<46&&Math.abs(y-s.y)<48;
    if(s.kind==='statue')return Math.abs(x-s.x)<28&&Math.abs(y-s.y)<38;
    if(s.kind==='boulder')return Math.hypot(x-s.x,y-s.y)<34;
    if(s.kind==='stalagmite'||s.kind==='iceCrystal'||s.kind==='icePillar')return Math.hypot(x-s.x,y-s.y)<30;
    return false;
  });
}
function drawStageLabel(){
  ctx.save();ctx.globalAlpha=.92;ctx.fillStyle='#0e1812cc';roundedRect(18,18,205,48,10);ctx.fill();
  ctx.strokeStyle='#ffffff18';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle=levelWorld(currentLevel)===2?'#c9f4ff':'#e9ce72';ctx.font='bold 13px Georgia,serif';ctx.fillText(levelCode(currentLevel)+'  '+currentLevel.name,31,39);
  ctx.fillStyle='#b9c6bd';ctx.font='10px sans-serif';ctx.fillText(currentLevel.theme.toUpperCase()+' • '+currentLevel.waves+' WAVES',31,55);ctx.restore();
}
function drawProjectileVisual(p){
  p.spin=(p.spin||0)+.2;
  const v=p.visual||projectileVisual(p.beastId,p.type);
  const visibility=v==='void_orb'?1.48:(v==='meteor'||v==='thunder_orb'||v==='radiant_orb'?1.32:1.22);
  ctx.save();
  ctx.translate(p.x,p.y);
  ctx.scale(visibility,visibility);
  ctx.shadowBlur=10;
  ctx.shadowColor=p.color||'#ffffff';

  if(v==='fireball'){
    ctx.shadowBlur=16;ctx.shadowColor='#ff6a2b';
    ctx.fillStyle='#ff8a2f';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ffe477';ctx.beginPath();ctx.arc(-2,-2,4,0,Math.PI*2);ctx.fill();
  }else if(v==='ember_streak'){
    ctx.rotate(-.45);ctx.shadowBlur=12;ctx.shadowColor='#ff7b28';
    ctx.fillStyle='#ffd45a';ctx.beginPath();ctx.ellipse(4,0,6,4,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ff6a2a';ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(-3,-5);ctx.lineTo(-3,5);ctx.closePath();ctx.fill();
  }else if(v==='meteor'){
    ctx.rotate(p.spin*.35);ctx.shadowBlur=20;ctx.shadowColor='#ff4f20';
    ctx.fillStyle='#5a2b24';ctx.beginPath();ctx.arc(0,0,10,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#ff9b31';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-18,7);ctx.lineTo(-6,2);ctx.stroke();
    ctx.strokeStyle='#ffd65f';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-21,1);ctx.lineTo(-7,-1);ctx.stroke();
  }else if(v==='thorn_leaf'){
    ctx.rotate(p.spin*.45);ctx.fillStyle='#75ce62';
    ctx.beginPath();ctx.moveTo(0,-10);ctx.quadraticCurveTo(11,0,0,10);ctx.quadraticCurveTo(-7,0,0,-10);ctx.fill();
    ctx.strokeStyle='#d5f39d';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(0,7);ctx.stroke();
  }else if(v==='seed_stone'){
    ctx.rotate(p.spin);ctx.fillStyle='#6f7f4d';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#a9cf6f';ctx.lineWidth=3;ctx.beginPath();ctx.arc(-2,-2,5,.1,2.8);ctx.stroke();
  }else if(v==='bubble'){
    ctx.fillStyle='#68cfff66';ctx.strokeStyle='#d7f7ff';ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(0,0,9,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle='#fff';ctx.globalAlpha=.8;ctx.beginPath();ctx.arc(-3,-3,2,0,Math.PI*2);ctx.fill();
  }else if(v==='water_dart'){
    ctx.rotate(-.25);ctx.fillStyle='#65cfff';
    ctx.beginPath();ctx.moveTo(9,0);ctx.quadraticCurveTo(-2,-7,-11,0);ctx.quadraticCurveTo(-2,7,9,0);ctx.fill();
    ctx.strokeStyle='#c9f3ff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-12,0);ctx.lineTo(-19,0);ctx.stroke();
  }else if(v==='spark_bolt'){
    ctx.strokeStyle='#fff36c';ctx.lineWidth=3;ctx.shadowBlur=10;ctx.shadowColor='#ffe348';
    ctx.beginPath();ctx.moveTo(-10,-5);ctx.lineTo(-3,1);ctx.lineTo(1,-5);ctx.lineTo(9,6);ctx.stroke();
  }else if(v==='static_dart'){
    ctx.rotate(-.25);ctx.fillStyle='#ffe35a';ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(-3,-5);ctx.lineTo(-1,0);ctx.lineTo(-10,5);ctx.lineTo(1,3);ctx.closePath();ctx.fill();
  }else if(v==='thunder_orb'){
    ctx.shadowBlur=18;ctx.shadowColor='#fff066';ctx.fillStyle='#ffe95b';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#fff9b0';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,12,0,Math.PI*2);ctx.stroke();
  }else if(v==='rock_chunk'){
    ctx.rotate(p.spin);ctx.fillStyle='#8f8174';ctx.beginPath();ctx.moveTo(-9,-5);ctx.lineTo(-2,-10);ctx.lineTo(9,-4);ctx.lineTo(8,7);ctx.lineTo(-4,9);ctx.lineTo(-10,3);ctx.closePath();ctx.fill();
    ctx.strokeStyle='#d8ccbd';ctx.lineWidth=2;ctx.stroke();
  }else if(v==='gale_arc'){
    ctx.rotate(p.spin*.25);ctx.strokeStyle='#d8ffe7';ctx.lineWidth=4;ctx.beginPath();ctx.arc(-2,0,11,-1.15,1.15);ctx.stroke();
    ctx.strokeStyle='#8de6d7';ctx.lineWidth=2;ctx.beginPath();ctx.arc(2,0,7,-1.05,1.05);ctx.stroke();
  }else if(v==='sky_lance'){
    ctx.rotate(-.1);ctx.strokeStyle='#bdfcef';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-13,0);ctx.lineTo(13,0);ctx.stroke();
    ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(4,-4);ctx.lineTo(13,0);ctx.lineTo(4,4);ctx.stroke();
  }else if(v==='venom_blob'){
    ctx.fillStyle='#cf62df';ctx.shadowBlur=10;ctx.shadowColor='#b949cf';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#a8ff7f';ctx.beginPath();ctx.arc(3,-3,2,0,Math.PI*2);ctx.fill();
  }else if(v==='spore_orb'){
    ctx.fillStyle='#c56bdd';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#e8bcf4';for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-4+i*4,(i%2?3:-3),1.7,0,Math.PI*2);ctx.fill();}
  }else if(v==='ice_shard'){
    ctx.rotate(p.spin*.55);ctx.fillStyle='#bceeff';ctx.strokeStyle='#ecfdff';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(0,-11);ctx.lineTo(6,0);ctx.lineTo(0,11);ctx.lineTo(-6,0);ctx.closePath();ctx.fill();ctx.stroke();
  }else if(v==='shadow_claw'){
    ctx.rotate(-.45);ctx.strokeStyle='#d2b7ff';ctx.lineWidth=3.6;ctx.shadowBlur=18;ctx.shadowColor='#9b62ff';
    for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(-8+i*4,-8);ctx.quadraticCurveTo(-2+i*4,0,6+i*3,8);ctx.stroke();}
  }else if(v==='void_orb'){
    ctx.shadowBlur=32;ctx.shadowColor='#c75cff';
    const g=ctx.createRadialGradient(-2,-2,1,0,0,11);g.addColorStop(0,'#ffffff');g.addColorStop(.18,'#f6c8ff');g.addColorStop(.48,'#cf69ff');g.addColorStop(1,'#39105f');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,11,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#f0b2ff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,16,0,Math.PI*2);ctx.stroke();
    ctx.rotate(p.spin*.5);ctx.fillStyle='#f5c1ff';for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(18,0,2.5,0,Math.PI*2);ctx.fill();ctx.rotate(Math.PI/2);}
  }else if(v==='radiant_orb'){
    ctx.shadowBlur=20;ctx.shadowColor='#fff5a8';ctx.fillStyle='#fff6b3';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#ffe681';ctx.lineWidth=2;for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(15,0);ctx.stroke();}
  }else{
    ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(0,0,6,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}
function drawEffect(e){
  const a=Math.max(0,e.life/e.maxLife);
  ctx.save();
  ctx.globalAlpha=a;
  if(e.kind==='burst'||e.kind==='splash'||e.kind==='freeze'||e.kind==='poison'||e.kind==='dust'||e.kind==='wind'||e.kind==='light'||e.kind==='zap'||e.kind==='apex'){
    ctx.strokeStyle=e.color;ctx.lineWidth=e.kind==='freeze'?4:3;
    ctx.beginPath();ctx.arc(e.x,e.y,(e.size||40)*(1-a+.25),0,Math.PI*2);ctx.stroke();
  }
  if(e.kind==='roots'){
    ctx.strokeStyle=e.color;ctx.lineWidth=4;
    for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(e.x,e.y+12);ctx.quadraticCurveTo(e.x+(i-2)*9,e.y-8,e.x+(i-2)*12,e.y-22);ctx.stroke();}
  }
  if(e.kind==='particle'){
    ctx.shadowBlur=9;ctx.shadowColor=e.color;ctx.fillStyle=e.color;
    ctx.beginPath();ctx.arc(e.x,e.y,(e.size||4)*a,0,Math.PI*2);ctx.fill();
  }
  if(e.kind==='lightning'){
    ctx.strokeStyle=e.color;ctx.lineWidth=3;ctx.shadowBlur=10;ctx.shadowColor=e.color;
    ctx.beginPath();ctx.moveTo(e.x,e.y);let mx=(e.x+e.x2)/2,my=(e.y+e.y2)/2;ctx.lineTo(mx+8,my-8);ctx.lineTo(mx-5,my+5);ctx.lineTo(e.x2,e.y2);ctx.stroke();
  }
  if(e.kind==='crit'){
    ctx.fillStyle=e.color;ctx.shadowBlur=12;ctx.shadowColor=e.color;ctx.font='bold 18px sans-serif';ctx.fillText('CRIT!',e.x-22,e.y-24*(1-a)-18);
  }
  if(e.kind==='bossPulse'){
    const r=(e.size||120)*(1-a*.65);ctx.strokeStyle=e.color;ctx.lineWidth=5;ctx.shadowBlur=22;ctx.shadowColor=e.color;
    ctx.beginPath();ctx.arc(e.x,e.y,r,0,Math.PI*2);ctx.stroke();
    ctx.globalAlpha=a*.45;ctx.beginPath();ctx.arc(e.x,e.y,r*.68,0,Math.PI*2);ctx.stroke();
  }
  if(e.kind==='impact'){
    const r=(e.size||54)*(1-a*.55);
    ctx.translate(e.x,e.y);ctx.shadowBlur=18;ctx.shadowColor=e.color;ctx.strokeStyle=e.color;ctx.fillStyle=e.color;
    const style=e.style||'';
    if(style==='fireball'||style==='ember_streak'){
      ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,r*.42,0,Math.PI*2);ctx.stroke();
      for(let i=0;i<5;i++){ctx.rotate(Math.PI*2/5);ctx.beginPath();ctx.moveTo(r*.18,0);ctx.lineTo(r*.55,0);ctx.stroke();}
    }else if(style==='meteor'){
      ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,r*.48,0,Math.PI*2);ctx.stroke();
      ctx.globalAlpha=a*.7;ctx.beginPath();ctx.arc(0,0,r*.72,0,Math.PI*2);ctx.stroke();
    }else if(style==='thorn_leaf'){
      ctx.lineWidth=3;for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(r*.25,-r*.18,r*.48,0);ctx.stroke();}
    }else if(style==='seed_stone'||style==='rock_chunk'){
      ctx.lineWidth=4;for(let i=0;i<6;i++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(r*.18,0);ctx.lineTo(r*.5,0);ctx.stroke();}
    }else if(style==='bubble'||style==='water_dart'){
      ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r*.38,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*.6,0,Math.PI*2);ctx.stroke();
    }else if(style==='spark_bolt'||style==='static_dart'||style==='thunder_orb'){
      ctx.lineWidth=3.5;for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(r*.25,-r*.12);ctx.lineTo(r*.55,0);ctx.stroke();}
    }else if(style==='gale_arc'||style==='sky_lance'){
      ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,r*.48,-1.15,1.15);ctx.stroke();ctx.rotate(Math.PI);ctx.beginPath();ctx.arc(0,0,r*.32,-1.15,1.15);ctx.stroke();
    }else if(style==='venom_blob'||style==='spore_orb'){
      ctx.globalAlpha=a*.55;ctx.beginPath();ctx.arc(0,0,r*.42,0,Math.PI*2);ctx.fill();ctx.globalAlpha=a;for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.beginPath();ctx.arc(r*.5,0,4,0,Math.PI*2);ctx.fill();}
    }else if(style==='ice_shard'){
      ctx.lineWidth=3;for(let i=0;i<4;i++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(r*.58,0);ctx.stroke();}
    }else if(style==='shadow_claw'){
      ctx.lineWidth=4;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(-r*.4,i*7-r*.12);ctx.quadraticCurveTo(0,i*5,r*.45,i*7+r*.12);ctx.stroke();}
    }else if(style==='void_orb'){
      ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,r*.38,0,Math.PI*2);ctx.stroke();
      ctx.globalAlpha=a*.65;ctx.beginPath();ctx.arc(0,0,r*.62,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=a;
      for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.beginPath();ctx.arc(r*.55,0,4.5,0,Math.PI*2);ctx.fill();}
    }else if(style==='radiant_orb'){
      ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,r*.35,0,Math.PI*2);ctx.stroke();for(let i=0;i<8;i++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.moveTo(r*.38,0);ctx.lineTo(r*.62,0);ctx.stroke();}
    }else{
      ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r*.45,0,Math.PI*2);ctx.stroke();
    }
  }
  ctx.restore();
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
    const stage=evolutionStage(t.b.id),img=stage>1?(evolutionSpriteImgs[t.b.id]?.[stage]||spriteImgs[t.b.id]):spriteImgs[t.b.id];
    if(img&&img.complete){const size=stage===3?88:stage===2?83:78;ctx.drawImage(img,t.x-size/2,t.y-size/2,size,size)}
  });

  enemies.forEach(e=>{
    const img=enemyImgs[e.type]||enemyImgs.raider,size=e.size||18,drawSize=e.boss?size*3.15:size*2.45;
    ctx.save();ctx.globalAlpha=e.boss?.38:.25;ctx.fillStyle='#07110c';ctx.beginPath();ctx.ellipse(e.x,e.y+size*.82,e.boss?size*1.2:size*.85,e.boss?size*.38:size*.28,0,0,Math.PI*2);ctx.fill();ctx.restore();
    if(e.boss){ctx.save();ctx.strokeStyle=e.boss20?'#ff536f':'#b96aff';ctx.globalAlpha=.75;ctx.lineWidth=4;ctx.shadowBlur=18;ctx.shadowColor=e.boss20?'#ff536f':'#b96aff';ctx.beginPath();ctx.arc(e.x,e.y,size*1.55,0,Math.PI*2);ctx.stroke();ctx.restore()}
    if(img&&img.complete)ctx.drawImage(img,e.x-drawSize/2,e.y-drawSize/2,drawSize,drawSize);
    else{ctx.fillStyle=e.boss?'#6d2738':'#49382b';ctx.beginPath();ctx.arc(e.x,e.y,size,0,Math.PI*2);ctx.fill()}
    const barW=e.boss?92:44,barY=e.y-size-18;
    ctx.fillStyle='#171717';ctx.fillRect(e.x-barW/2,barY,barW,6);
    ctx.fillStyle=e.boss?'#b84a68':'#d95252';ctx.fillRect(e.x-barW/2,barY,barW*(Math.max(0,e.hp)/e.max),6);
  });
  const activeBoss=enemies.find(e=>e.boss);
  if(activeBoss){
    const bw=430,bh=24,bx=(canvas.width-bw)/2,by=20,ratio=Math.max(0,activeBoss.hp/activeBoss.max);
    ctx.save();
    ctx.fillStyle='#09080dcc';roundedRect(bx-8,by-8,bw+16,54,12);ctx.fill();
    ctx.strokeStyle='#7f4b91';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle='#f1d7ff';ctx.font='bold 14px Georgia,serif';ctx.textAlign='center';ctx.fillText(activeBoss.boss20?bossNameForLevel().toUpperCase()+' • ENRAGED':bossNameForLevel().toUpperCase(),canvas.width/2,by+8);
    ctx.fillStyle='#241529';roundedRect(bx,by+16,bw,bh,7);ctx.fill();
    ctx.fillStyle=activeBoss.boss20?'#ef4c69':levelWorld(currentLevel)===2?'#62b8d4':'#9d55c7';roundedRect(bx,by+16,bw*ratio,bh,7);ctx.fill();
    ctx.strokeStyle='#e2b2f4';ctx.lineWidth=1;roundedRect(bx,by+16,bw,bh,7);ctx.stroke();
    ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.fillText(Math.ceil(activeBoss.hp)+' / '+Math.ceil(activeBoss.max)+' HP',canvas.width/2,by+32);
    ctx.restore();
  }
  projectiles.forEach(drawProjectileVisual);
  effects.forEach(drawEffect);
}
function loop(ts){
  if(!$('#gameScreen').classList.contains('active'))return;
  const dt=Math.min(.033,(ts-last)/1000||0);last=ts;
  update(dt*speed);draw();requestAnimationFrame(loop);
}
renderStarters();updateHub();renderSaveSlots();applyMotionSetting();setSpeed(1);renderCampaignMap();