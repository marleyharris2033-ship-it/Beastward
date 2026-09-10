// Beastward Region III — Sunscar Desert
(() => {
  if(!window.__beastbornLandscapeLoader){
    window.__beastbornLandscapeLoader=true;
    const landscape=document.createElement('script');
    landscape.src='battle-landscape-patch.js?v=20260910-3';
    document.head.appendChild(landscape);
  }
  if(levels.some(l=>l.world===3))return;
  const desert=[
    {id:21,world:3,name:'Sunscar Approach',theme:'canyon',waves:10,reward:850,hp:7.0,speed:1.31,pathWidth:70,pathEdge:'#8b6238',pathFill:'#d5ad70',path:[{x:-30,y:470},{x:155,y:470},{x:155,y:300},{x:350,y:300},{x:350,y:125},{x:570,y:125},{x:570,y:410},{x:760,y:410},{x:760,y:235},{x:930,y:235}],scenery:[{kind:'dryBush',x:90,y:120},{kind:'boulder',x:250,y:500,block:true},{kind:'bones',x:470,y:475},{kind:'dustRock',x:690,y:110},{kind:'dryBush',x:850,y:510}]},
    {id:22,world:3,name:'Scorpion Run',theme:'canyon',waves:10,reward:900,hp:7.4,speed:1.33,pathWidth:64,pathEdge:'#805932',pathFill:'#d0a363',path:[{x:-30,y:120},{x:220,y:120},{x:300,y:280},{x:175,y:450},{x:430,y:500},{x:535,y:325},{x:455,y:165},{x:735,y:105},{x:825,y:310},{x:930,y:310}],scenery:[{kind:'cliff',x:0,y:0,w:1000,h:48,block:true},{kind:'boulder',x:90,y:510,block:true},{kind:'bones',x:340,y:90},{kind:'dryBush',x:620,y:500},{kind:'dustRock',x:840,y:150}]},
    {id:23,world:3,name:'Oasis Crossing',theme:'canyon',waves:10,reward:950,hp:7.8,speed:1.34,pathWidth:68,pathEdge:'#8a633a',pathFill:'#d8b477',path:[{x:-30,y:500},{x:180,y:500},{x:270,y:365},{x:430,y:365},{x:520,y:190},{x:690,y:190},{x:770,y:360},{x:930,y:360}],scenery:[{kind:'cavePool',x:500,y:500,rx:100,ry:55,block:true},{kind:'tree',x:445,y:485},{kind:'tree',x:575,y:485},{kind:'dryBush',x:100,y:180},{kind:'boulder',x:820,y:110,block:true}]},
    {id:24,world:3,name:'Dune Serpent',theme:'canyon',waves:10,reward:1010,hp:8.3,speed:1.35,pathWidth:62,pathEdge:'#865d35',pathFill:'#d7ac68',path:[{x:-30,y:300},{x:130,y:150},{x:300,y:300},{x:455,y:465},{x:610,y:300},{x:760,y:145},{x:930,y:300}],scenery:[{kind:'dryBush',x:80,y:500},{kind:'bones',x:250,y:115},{kind:'dustRock',x:480,y:100},{kind:'boulder',x:660,y:500,block:true},{kind:'bones',x:850,y:480}]},
    {id:25,world:3,name:'Buried Temple',theme:'ruins',waves:10,reward:1070,hp:8.8,speed:1.36,pathWidth:66,pathEdge:'#82623d',pathFill:'#caa56b',path:[{x:-30,y:520},{x:125,y:520},{x:125,y:390},{x:300,y:390},{x:300,y:240},{x:485,y:240},{x:485,y:95},{x:680,y:95},{x:680,y:315},{x:840,y:315},{x:840,y:160},{x:930,y:160}],scenery:[{kind:'wall',x:145,y:90,w:170,h:28,block:true},{kind:'pillar',x:420,y:100},{kind:'pillar',x:455,y:100},{kind:'statue',x:760,y:500,block:true},{kind:'rune',x:545,y:430},{kind:'brokenWall',x:650,y:500,w:120}]},
    {id:26,world:3,name:'Mirage Flats',theme:'canyon',waves:10,reward:1140,hp:9.4,speed:1.38,pathWidth:72,pathEdge:'#91683e',pathFill:'#dfbd7e',path:[{x:-30,y:100},{x:190,y:100},{x:190,y:500},{x:390,y:500},{x:390,y:175},{x:600,y:175},{x:600,y:470},{x:800,y:470},{x:800,y:260},{x:930,y:260}],scenery:[{kind:'dryBush',x:90,y:300},{kind:'dustRock',x:300,y:100},{kind:'bones',x:500,y:500},{kind:'boulder',x:700,y:110,block:true},{kind:'dryBush',x:875,y:500}]},
    {id:27,world:3,name:'Redstone Gorge',theme:'canyon',waves:10,reward:1210,hp:10.0,speed:1.39,pathWidth:60,pathEdge:'#70482d',pathFill:'#b97c4d',path:[{x:-30,y:510},{x:150,y:510},{x:260,y:390},{x:155,y:250},{x:330,y:105},{x:510,y:250},{x:420,y:430},{x:650,y:500},{x:760,y:315},{x:650,y:145},{x:930,y:95}],scenery:[{kind:'cliff',x:0,y:0,w:1000,h:45,block:true},{kind:'cliff',x:0,y:555,w:1000,h:45,block:true},{kind:'boulder',x:100,y:100,block:true},{kind:'boulder',x:850,y:500,block:true},{kind:'bones',x:535,y:100}]},
    {id:28,world:3,name:'Sunken Ruins',theme:'ruins',waves:10,reward:1290,hp:10.7,speed:1.4,pathWidth:64,pathEdge:'#80613d',pathFill:'#c8a36c',path:[{x:-30,y:110},{x:145,y:110},{x:145,y:410},{x:315,y:410},{x:315,y:205},{x:510,y:205},{x:510,y:485},{x:700,y:485},{x:700,y:275},{x:930,y:275}],scenery:[{kind:'wall',x:235,y:85,w:180,h:28,block:true},{kind:'pillar',x:445,y:500},{kind:'statue',x:600,y:100,block:true},{kind:'brokenWall',x:745,y:100,w:130},{kind:'bones',x:850,y:500},{kind:'rune',x:420,y:340}]},
    {id:29,world:3,name:'Ashwind Pass',theme:'canyon',waves:10,reward:1380,hp:11.5,speed:1.42,pathWidth:60,pathEdge:'#694a34',pathFill:'#a97b55',path:[{x:-30,y:300},{x:120,y:300},{x:120,y:90},{x:360,y:90},{x:360,y:500},{x:590,y:500},{x:590,y:185},{x:800,y:185},{x:800,y:420},{x:930,y:420}],scenery:[{kind:'cliff',x:0,y:0,w:1000,h:45,block:true},{kind:'boulder',x:230,y:500,block:true},{kind:'dustRock',x:480,y:100},{kind:'bones',x:700,y:500},{kind:'dryBush',x:890,y:100}]},
    {id:30,world:3,name:"Sandwyrm's Tomb",theme:'den',waves:10,reward:1550,hp:12.5,speed:1.43,boss:true,bossName:'Sandwyrm',bossReward:'epic',pathWidth:64,pathEdge:'#5d4937',pathFill:'#a98b65',path:[{x:-30,y:300},{x:115,y:300},{x:115,y:80},{x:875,y:80},{x:875,y:520},{x:225,y:520},{x:225,y:185},{x:760,y:185},{x:760,y:405},{x:365,y:405},{x:365,y:285},{x:625,y:285},{x:625,y:350},{x:930,y:350}],scenery:[{kind:'cavePool',x:250,y:315,rx:85,ry:60,block:true},{kind:'bones',x:80,y:490},{kind:'bones',x:520,y:100},{kind:'stalagmite',x:900,y:500,block:true},{kind:'torch',x:285,y:100},{kind:'torch',x:770,y:215},{kind:'rune',x:520,y:430}]}
  ];
  levels.push(...desert);
  worldMeta[3]={name:'Sunscar Desert',subtitle:'A scorched land of dunes, buried temples and ancient predators.',label:'REGION III',boss:'Sandwyrm'};
  function ensureButton(){
    if(document.querySelector('#campaignWorld3Btn'))return;
    const b=document.createElement('button');b.id='campaignWorld3Btn';b.className='campaign-world-btn';b.textContent='REGION 3 • LOCKED';
    const b2=document.querySelector('#campaignWorld2Btn');
    if(b2)b2.insertAdjacentElement('afterend',b); else document.querySelector('#campaignWorld1Btn')?.parentElement?.appendChild(b);
    b.onclick=()=>setCampaignWorld(3);
  }
  const baseRender=renderCampaignMap;
  renderCampaignMap=function(){
    ensureButton();baseRender();
    const b=document.querySelector('#campaignWorld3Btn');
    if(b){b.disabled=!worldUnlocked(3);b.classList.toggle('active',campaignWorld===3);b.textContent=worldUnlocked(3)?'REGION 3 • SUNSCAR':'REGION 3 • LOCKED';}
    const map=document.querySelector('.campaign-map');if(map){map.classList.toggle('desert-map',campaignWorld===3);}
  };
  const style=document.createElement('style');style.textContent=`
    .campaign-map.desert-map{background:radial-gradient(circle at 75% 15%,#e6b75b22,transparent 28%),linear-gradient(180deg,#3b2a18,#21170f)!important;border-color:#9b7042!important}
    .campaign-map.desert-map .map-route-line{border-color:#b98a4c55!important}
    .campaign-map.desert-map .map-node{background:linear-gradient(145deg,#4b3420,#2d2117)!important;border-color:#9a7045!important}
    .campaign-map.desert-map .map-node.completed{box-shadow:0 0 16px #d89c4540!important}
    .campaign-map.desert-map .map-marker{color:#e5b75f!important}
  `;document.head.appendChild(style);
})();