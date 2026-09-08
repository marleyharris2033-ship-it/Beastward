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
voltwing:{id:'voltwing',name:'Voltwing',type:'Electric',role:'Chain+',cost:190,range:165,rate:.7,damage:21,color:'#fff277',evo20:'Thunderoc',evo30:'Stormra',sprite:'assets/sprites/voltwing.svg'}
};

const starters=['embercub','sprigpaw','bubblit'];
const commonPool=['sparkit','pebblum','gustwing','toxip'];
const rarePool=['frostkit','shadepup','lumpling','voltwing'];
const commonCost=100,rareCost=300;
const spriteImgs={};
Object.values(beasts).forEach(b=>{const i=new Image();i.src=b.sprite;spriteImgs[b.id]=i});

function blankSave(){return {starter:null,essence:0,wardenLevel:1,unlocked:[],freeCommonClaimed:false,beastProgress:{},createdAt:Date.now(),lastPlayed:Date.now()}}
function normaliseSave(s){s=s||blankSave();s.unlocked=s.unlocked||[];s.beastProgress=s.beastProgress||{};if(s.freeCommonClaimed===undefined)s.freeCommonClaimed=false;if(!s.wardenLevel)s.wardenLevel=1;if(s.essence===undefined)s.essence=0;return s}
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
function nameFor(id){const b=beasts[id],l=progress(id).level;return l>=30?b.evo30:l>=20?b.evo20:b.name}
function levelMultiplier(id){const l=progress(id).level;return 1+(l-1)*.03+(l>=20?.15:0)+(l>=30?.2:0)}
function rangeMultiplier(id){return 1+(progress(id).level-1)*.005}
function persist(){if(!activeSlot)return;save.lastPlayed=Date.now();localStorage.setItem('beastward-save-'+activeSlot,JSON.stringify(save));localStorage.setItem('beastward-active-slot',String(activeSlot));updateHub()}
function updateHub(){
  if($('#essenceTotal'))$('#essenceTotal').textContent=save.essence;
  if($('#wardenLevel'))$('#wardenLevel').textContent=save.wardenLevel;
  if($('#commonEggCost'))$('#commonEggCost').textContent=save.freeCommonClaimed?commonCost+' Essence':'Free';
  if($('#rareEggCost'))$('#rareEggCost').textContent=rareCost+' Essence';
}

function renderStarters(){
  const w=$('#starterGrid');w.innerHTML='';
  starters.forEach(id=>{
    const b=beasts[id],el=document.createElement('button');
    el.className='starter-card';
    el.innerHTML=`<div class="sprite-wrap"><img src="${b.sprite}"></div><h3>${b.name}</h3><span>${b.type} • ${b.role}</span><p>${id==='embercub'?'Burn enemies over time.':id==='sprigpaw'?'Poison and crowd control.':'Slow groups and splash damage.'}</p><div class="tiny">Lv20 ${b.evo20} • Lv30 ${b.evo30}</div>`;
    el.onclick=()=>{save.starter=id;addBeast(id);persist();show('hubScreen')};
    w.appendChild(el);
  });
}
function renderCollection(){
  const w=$('#beastCollection');w.innerHTML='';
  save.unlocked.forEach(id=>{
    const b=beasts[id],p=progress(id),need=xpNeeded(p.level);
    w.insertAdjacentHTML('beforeend',`<div class="beast-card"><div class="sprite-wrap"><img src="${b.sprite}"></div><h3>${nameFor(id)}</h3><div class="beast-meta">${b.type} • ${b.role}</div><p>Level ${p.level}/30</p><div class="xpbar"><div style="width:${p.level>=30?100:Math.min(100,p.xp/need*100)}%"></div></div><div class="tiny">${p.level>=30?'MAX LEVEL':p.xp+' / '+need+' XP'} • Damage bonus +${Math.round((levelMultiplier(id)-1)*100)}%</div><div class="tiny">Lv20 ${b.evo20} • Lv30 ${b.evo30}</div></div>`);
  });
}
function slotData(slot){try{return normaliseSave(JSON.parse(localStorage.getItem('beastward-save-'+slot)||'null'))}catch(e){return null}}
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
  else show('hubScreen');
}

$('#newGameBtn').onclick=()=>openSaveSelect('hub');
$('#titleBeastDenBtn').onclick=()=>openSaveSelect('beasts');
$('#titleHatcheryBtn').onclick=()=>openSaveSelect('hatchery');
$('#switchSaveBtn').onclick=()=>openSaveSelect('hub');
$('#campaignBtn').onclick=()=>show('campaignScreen');
$('#beastsBtn').onclick=()=>{renderCollection();show('beastsScreen')};
$('#hatcheryBtn').onclick=()=>show('hatcheryScreen');
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>show(b.dataset.back));

function hatch(pool,cost,isFreeCommon=false){
  const free=isFreeCommon&&!save.freeCommonClaimed;
  if(!free&&save.essence<cost){alert("Not enough Essence yet. Beat Keeper's Path to earn more.");return}
  if(free)save.freeCommonClaimed=true;else save.essence-=cost;
  const id=pool[Math.floor(Math.random()*pool.length)],isNew=!save.unlocked.includes(id);
  if(isNew)addBeast(id);else save.essence+=Math.floor(cost*.2);
  persist();
  $('#eggResultTitle').textContent=isNew?'New Beast Hatched!':'Duplicate Hatched';
  $('#eggResultSprite').src=beasts[id].sprite;
  $('#eggResultName').textContent=beasts[id].name;
  $('#eggResultText').textContent=isNew?`${beasts[id].name} joined your Beast Den.`:`${beasts[id].name} was already unlocked, so you received ${Math.floor(cost*.2)} Essence back.`;
  $('#eggModal').classList.remove('hidden');
}
$('#openCommonEggBtn').onclick=()=>hatch(commonPool,commonCost,true);
$('#openRareEggBtn').onclick=()=>hatch(rarePool,rareCost,false);
$('#eggResultContinue').onclick=()=>$('#eggModal').classList.add('hidden');

const canvas=$('#gameCanvas'),ctx=canvas.getContext('2d');
const path=[{x:0,y:300},{x:180,y:300},{x:180,y:150},{x:430,y:150},{x:430,y:420},{x:700,y:420},{x:700,y:250},{x:1000,y:250}];
let towers=[],enemies=[],projectiles=[],selectedSpecies=null,selectedTower=null,gold=350,lives=20,wave=0,running=false,last=0,queue=[],speed=1,waveParticipants=new Set();

function ui(){$('#gold').textContent=Math.floor(gold);$('#lives').textContent=lives;$('#wave').textContent=wave}
function battleStats(id){
  const b=beasts[id];
  return {...b,damage:b.damage*levelMultiplier(id),range:b.range*rangeMultiplier(id)};
}
function choices(){
  const w=$('#towerChoices');w.innerHTML='';
  save.unlocked.forEach(id=>{
    const b=beasts[id],el=document.createElement('button');
    el.className='tower-choice';
    el.innerHTML=`<img src="${b.sprite}"><div><b>${nameFor(id)}</b><small>Lv ${progress(id).level} • ${b.role} • ${b.cost} gold</small></div>`;
    el.onclick=()=>{selectedSpecies=id;selectedTower=null;renderSelectedTower();document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')};
    w.appendChild(el);
  });
}
function renderSelectedTower(){
  const p=$('#selectedTowerPanel');
  if(!selectedTower||!towers.includes(selectedTower)){selectedTower=null;p.classList.add('hidden');return}
  p.classList.remove('hidden');
  $('#selectedTowerName').textContent=nameFor(selectedTower.b.id);
  $('#selectedTowerStats').textContent=`Level ${progress(selectedTower.b.id).level} • Sell value ${Math.floor(selectedTower.b.cost*.8)} gold`;
}
function reset(){
  towers=[];enemies=[];projectiles=[];selectedSpecies=null;selectedTower=null;gold=350;lives=20;wave=0;running=false;queue=[];speed=1;waveParticipants=new Set();
  document.querySelectorAll('.speed-control').forEach(b=>b.textContent=b.id==='speedBtn'?'⏩ Speed 1×':'⏩ 1×');$('#waveXpNotice').textContent='';ui();choices();renderSelectedTower();
}
$('#level1Btn').onclick=()=>{reset();show('gameScreen');last=performance.now();requestAnimationFrame(loop)};
$('#exitLevelBtn').onclick=()=>show('campaignScreen');
function cycleSpeed(){speed=speed===1?2:speed===2?3:1;document.querySelectorAll('.speed-control').forEach(b=>b.textContent=b.id==='speedBtn'?'⏩ Speed '+speed+'×':'⏩ '+speed+'×')}
document.querySelectorAll('.speed-control').forEach(b=>b.onclick=cycleSpeed);
$('#startWaveBtn').onclick=()=>{
  if(running||wave>=10)return;
  wave++;running=true;waveParticipants=new Set(towers.map(t=>t.b.id));
  const n=5+wave*2;queue=[];
  for(let i=0;i<n;i++)queue.push({delay:i*700,hp:55+wave*20,speed:45+wave*2,reward:12+wave});
  if(wave===10)queue.push({delay:n*700+600,hp:900,speed:28,reward:180,boss:true});
  ui();
};

$('#sellTowerBtn').onclick=()=>{
  if(!selectedTower)return;
  const idx=towers.indexOf(selectedTower);if(idx<0)return;
  const refund=Math.floor(selectedTower.b.cost*.8);
  gold+=refund;towers.splice(idx,1);selectedTower=null;renderSelectedTower();ui();
};

canvas.addEventListener('pointerdown',e=>{
  const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;
  const hit=towers.find(t=>Math.hypot(t.x-x,t.y-y)<=30);
  if(hit){selectedTower=hit;selectedSpecies=null;document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));renderSelectedTower();return}
  if(!selectedSpecies)return;
  const b=beasts[selectedSpecies];
  if(gold<b.cost||distPath(x,y)<55||towers.some(t=>Math.hypot(t.x-x,t.y-y)<45))return;
  towers.push({x,y,b:battleStats(selectedSpecies),cool:0});
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
  t.cool=t.b.rate;projectiles.push({x:t.x,y:t.y,target,damage:t.b.damage,type:t.b.type,color:t.b.color,speed:420});
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
function hitProjectile(p){
  let damage=p.damage;
  if(p.type==='Dark'&&Math.random()<.22)damage*=2;
  p.target.hp-=damage;
  if(p.type==='Water')p.target.slow=Math.max(p.target.slow,1.6);
  if(p.type==='Ice')p.target.slow=Math.max(p.target.slow,2.4);
  if(p.type==='Fire'||p.type==='Nature'||p.type==='Poison')p.target.hp-=5;
  if(p.type==='Electric'){
    const chainDamage=p.damage*(p.damage>20?.45:.3);
    enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<65).slice(0,p.damage>20?3:2).forEach(e=>e.hp-=chainDamage);
  }
  if(p.type==='Light'){
    enemies.filter(e=>e!==p.target&&Math.hypot(e.x-p.target.x,e.y-p.target.y)<55).forEach(e=>e.hp-=p.damage*.35);
  }
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
    save.essence+=120;save.wardenLevel=Math.max(save.wardenLevel,2);persist();
    $('#resultText').textContent="Keeper's Path defended. You earned 120 Essence. XP was awarded after every completed wave.";
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
  projectiles.forEach(p=>{ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill()});
}
function loop(ts){
  if(!$('#gameScreen').classList.contains('active'))return;
  const dt=Math.min(.033,(ts-last)/1000||0);last=ts;
  update(dt*speed);draw();requestAnimationFrame(loop);
}
renderStarters();updateHub();renderSaveSlots();