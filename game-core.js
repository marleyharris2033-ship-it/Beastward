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
embercub:{power:7,speed:8,range:6,special:7},sprigpaw:{power:5,speed:6,range:6,special:9},bubblit:{power:6,speed:7,range:6,special:8},sparkit:{power:6,speed:8,range:6,special:8},pebblum:{power:9,speed:4,range:5,special:6},gustwing:{power:5,speed:8,range:9,special:6},toxip:{power:5,speed:6,range:6,special:9},frostkit:{power:6,speed:6,range:7,special:9},shadepup:{power:9,speed:9,range:5,special:7},lumpling:{power:7,speed:6,range:8,special:8},voltwing:{power:8,speed:9,range:9,special:9},scorchick:{power:5,speed:10,range:5,special:7},mosshell:{power:8,speed:4,range:4,special:7},drizzlet:{power:5,speed:9,range:7,special:7},zapmoth:{power:5,speed:10,range:8,special:8},cindrake:{power:10,speed:6,range:8,special:9},sporeling:{power:8,speed:7,range:8,special:10},drakeling:{power:8,speed:9,range:10,special:9},voidling:{power:10,speed:8,range:8,special:10}};
function evolutionStage(id){const l=progress(id).level;return l>=SECOND_EVOLUTION_LEVEL?3:l>=FIRST_EVOLUTION_LEVEL?2:1}
function stageStatsAt(id,stage){const base=beastRatings[id],cap=stage*10;return{stage,cap,power:Math.min(cap,base.power*stage),speed:Math.min(cap,base.speed*stage),range:Math.min(cap,base.range*stage),special:Math.min(cap,base.special*stage)}}
function stageStats(id){return stageStatsAt(id,evolutionStage(id))}
function statBars(id){const s=stageStats(id);return `<div class="stat-grid"><div><span>Power</span><b>${s.power}/${s.cap}</b></div><div><span>Speed</span><b>${s.speed}/${s.cap}</b></div><div><span>Range</span><b>${s.range}/${s.cap}</b></div><div><span>Special</span><b>${s.special}/${s.cap}</b></div></div>`}
function nameForStage(id,stage){const b=beasts[id];return stage===3?b.evo30:stage===2?b.evo20:b.name}
function spritePathForStage(id,stage=1){return stage===3?`assets/pixel/evolved/${id}_3.svg?v=63`:stage===2?`assets/pixel/evolved/${id}_2.svg?v=63`:beasts[id].sprite}
function currentSprite(id){return spritePathForStage(id,evolutionStage(id))}
function stageSpriteMarkup(id,stage=evolutionStage(id),extra='',unseen=false){const b=beasts[id],name=nameForStage(id,stage),src=spritePathForStage(id,stage);return `<span class="stage-sprite stage-${stage} type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}"><img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}"></span>`}
const spriteImgs={},evolutionSpriteImgs={};
Object.values(beasts).forEach(b=>{const base=new Image();base.onerror=()=>{if(!base.dataset.fallback){base.dataset.fallback='1';base.src='assets/sprites/'+b.id+'.svg'}};base.src=b.sprite;spriteImgs[b.id]=base;evolutionSpriteImgs[b.id]={};[2,3].forEach(stage=>{const img=new Image();img.onerror=()=>{img.src=b.sprite};img.src=spritePathForStage(b.id,stage);evolutionSpriteImgs[b.id][stage]=img})});
document.addEventListener('error',e=>{const img=e.target;if(!img||img.tagName!=='IMG'||img.dataset.spriteFallback)return;const src=img.src||'',file=src.split('/').pop()||'';if(src.includes('/assets/pixel/evolved/')){const match=src.match(/\/evolved\/([a-z]+)_[23]\.svg/);if(match&&beasts[match[1]]){img.dataset.spriteFallback='1';img.src=beasts[match[1]].sprite}return}if(src.includes('/assets/pixel/')){const id=file.split('?')[0].replace('_tower.png','').replace('.png','');img.dataset.spriteFallback='1';img.src='assets/sprites/'+id+'.svg'}},true);

const BEAST_LEVEL_CAP=100;
const FIRST_EVOLUTION_LEVEL=30;
const SECOND_EVOLUTION_LEVEL=60;

"+"