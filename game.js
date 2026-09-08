const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll('.screen')];
function show(id){ screens.forEach(s=>s.classList.toggle('active',s.id===id)); }

const beasts = {
  embercub:{name:'Embercub',emoji:'🔥',type:'Fire',role:'Damage',cost:140,range:135,rate:0.65,damage:22,color:'#ff7a3d',evo20:'Pyrelion',evo30:'Infernalion',level:1,xp:0},
  sprigpaw:{name:'Sprigpaw',emoji:'🌿',type:'Nature',role:'Control',cost:150,range:125,rate:0.85,damage:16,color:'#62c96b',evo20:'Thornmaw',evo30:'Elderfang',level:1,xp:0},
  bubblit:{name:'Bubblit',emoji:'💧',type:'Water',role:'Slow',cost:145,range:130,rate:0.75,damage:18,color:'#55a8ff',evo20:'Tiderex',evo30:'Abyssara',level:1,xp:0},
};
let save = JSON.parse(localStorage.getItem('beastward-save')||'null') || {starter:null,essence:0,wardenLevel:1,unlocked:[]};
function persist(){ localStorage.setItem('beastward-save',JSON.stringify(save)); updateHub(); }
function updateHub(){ $('#essenceTotal').textContent=save.essence; $('#wardenLevel').textContent=save.wardenLevel; }

function enterFromTitle(target='hub'){
  if(!save.starter){ show('starterScreen'); return; }
  updateHub();
  if(target==='beasts'){ renderCollection(); show('beastsScreen'); return; }
  if(target==='hatchery'){ alert('The Hatchery is next: Common, Rare, Epic, Legendary and Ancient eggs will live here.'); show('hubScreen'); return; }
  show('hubScreen');
}
$('#newGameBtn').onclick=()=>enterFromTitle('hub');
$('#titleBeastDenBtn').onclick=()=>enterFromTitle('beasts');
$('#titleHatcheryBtn').onclick=()=>enterFromTitle('hatchery');
document.querySelectorAll('.starter-card').forEach(btn=>btn.onclick=()=>{save.starter=btn.dataset.beast;save.unlocked=[btn.dataset.beast];persist();show('hubScreen');});
$('#campaignBtn').onclick=()=>show('campaignScreen');
$('#beastsBtn').onclick=()=>{renderCollection();show('beastsScreen');};
$('#hatcheryBtn').onclick=()=>alert('The Hatchery is next: Common, Rare, Epic, Legendary and Ancient eggs will live here.');
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>show(b.dataset.back));

function renderCollection(){
  const wrap=$('#beastCollection');wrap.innerHTML='';
  save.unlocked.forEach(id=>{const b=beasts[id];const lvl=b.level||1;const current=lvl>=30?b.evo30:lvl>=20?b.evo20:b.name;wrap.insertAdjacentHTML('beforeend',`<div class="beast-card"><div class="emoji">${b.emoji}</div><h3>${current}</h3><div>${b.type} • ${b.role}</div><div>Level ${lvl}/30</div><div class="xpbar"><div style="width:${Math.min(100,(b.xp||0)%100)}%"></div></div><small>Lv20: ${b.evo20} • Lv30: ${b.evo30}</small></div>`);});
}

const canvas=$('#gameCanvas'),ctx=canvas.getContext('2d');
const path=[{x:0,y:300},{x:180,y:300},{x:180,y:150},{x:430,y:150},{x:430,y:420},{x:700,y:420},{x:700,y:250},{x:1000,y:250}];
let towers=[],enemies=[],projectiles=[],selectedBeast=null,gold=350,lives=20,wave=0,waveRunning=false,last=0,spawnQueue=[];
const owned=()=> save.unlocked.map(id=>({id,...beasts[id]}));
function resetGame(){towers=[];enemies=[];projectiles=[];selectedBeast=null;gold=350;lives=20;wave=0;waveRunning=false;spawnQueue=[];updateGameUI();renderChoices();}
function updateGameUI(){ $('#gold').textContent=Math.floor(gold);$('#lives').textContent=lives;$('#wave').textContent=wave; }
function renderChoices(){const w=$('#towerChoices');w.innerHTML='';owned().forEach(b=>{const el=document.createElement('button');el.className='tower-choice';el.innerHTML=`${b.emoji} <b>${b.name}</b><small>${b.role} • ${b.cost} gold</small>`;el.onclick=()=>{selectedBeast=b.id;document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');};w.appendChild(el);});}
$('#level1Btn').onclick=()=>{resetGame();show('gameScreen');last=performance.now();requestAnimationFrame(loop);};
$('#exitLevelBtn').onclick=()=>show('campaignScreen');
$('#startWaveBtn').onclick=startWave;
function startWave(){if(waveRunning||wave>=10)return;wave++;waveRunning=true;const count=5+wave*2;spawnQueue=[];for(let i=0;i<count;i++)spawnQueue.push({delay:i*700,hp:55+wave*20,speed:45+wave*2,reward:12+wave});if(wave===10)spawnQueue.push({delay:count*700+600,hp:900,speed:28,reward:180,boss:true});updateGameUI();}

canvas.addEventListener('pointerdown',e=>{if(!selectedBeast)return;const r=canvas.getBoundingClientRect();const x=(e.clientX-r.left)*(canvas.width/r.width),y=(e.clientY-r.top)*(canvas.height/r.height);const b=beasts[selectedBeast];if(gold<b.cost)return;if(distanceToPath(x,y)<55)return;if(towers.some(t=>Math.hypot(t.x-x,t.y-y)<45))return;towers.push({x,y,b:{...b},cool:0,tier:1});gold-=b.cost;updateGameUI();});
function distanceToPath(x,y){let best=1e9;for(let i=0;i<path.length-1;i++){const a=path[i],b=path[i+1],vx=b.x-a.x,vy=b.y-a.y,wx=x-a.x,wy=y-a.y,c1=vx*wx+vy*wy,c2=vx*vx+vy*vy,t=Math.max(0,Math.min(1,c1/c2));best=Math.min(best,Math.hypot(x-(a.x+t*vx),y-(a.y+t*vy)));}return best;}
function spawnEnemy(s){enemies.push({x:path[0].x,y:path[0].y,seg:0,hp:s.hp,max:s.hp,speed:s.speed,reward:s.reward,boss:!!s.boss,slow:0});}
function moveEnemy(e,dt){let target=path[e.seg+1];if(!target)return false;let sp=e.speed*(e.slow>0?.58:1);e.slow=Math.max(0,e.slow-dt);let dx=target.x-e.x,dy=target.y-e.y,d=Math.hypot(dx,dy);if(d<sp*dt){e.x=target.x;e.y=target.y;e.seg++;if(e.seg>=path.length-1)return false;}else{e.x+=dx/d*sp*dt;e.y+=dy/d*sp*dt;}return true;}
function attack(t,dt){t.cool-=dt;if(t.cool>0)return;let target=enemies.filter(e=>Math.hypot(e.x-t.x,e.y-t.y)<=t.b.range).sort((a,b)=>b.seg-a.seg)[0];if(!target)return;t.cool=t.b.rate;projectiles.push({x:t.x,y:t.y,target,damage:t.b.damage,type:t.b.type,color:t.b.color,speed:420});}
function update(dt){if(waveRunning&&spawnQueue.length){for(const s of spawnQueue)s.delay-=dt*1000;while(spawnQueue[0]&&spawnQueue[0].delay<=0)spawnEnemy(spawnQueue.shift());}
  for(let i=enemies.length-1;i>=0;i--){const e=enemies[i];if(!moveEnemy(e,dt)){enemies.splice(i,1);lives-=e.boss?5:1;updateGameUI();if(lives<=0)return finish(false);}}
  towers.forEach(t=>attack(t,dt));
  for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];if(!enemies.includes(p.target)){projectiles.splice(i,1);continue;}let dx=p.target.x-p.x,dy=p.target.y-p.y,d=Math.hypot(dx,dy);if(d<p.speed*dt+8){p.target.hp-=p.damage;if(p.type==='Water')p.target.slow=1.6;if(p.type==='Nature')p.target.hp-=6;if(p.type==='Fire')p.target.hp-=5;projectiles.splice(i,1);if(p.target.hp<=0){gold+=p.target.reward;enemies.splice(enemies.indexOf(p.target),1);updateGameUI();}continue;}p.x+=dx/d*p.speed*dt;p.y+=dy/d*p.speed*dt;}
  if(waveRunning&&!spawnQueue.length&&!enemies.length){waveRunning=false;if(wave>=10)finish(true);}
}
function finish(win){waveRunning=false;spawnQueue=[];$('#resultModal').classList.remove('hidden');$('#resultTitle').textContent=win?'Victory!':'The Core Has Fallen';if(win){const reward=120;save.essence+=reward;save.wardenLevel=Math.max(save.wardenLevel,2);persist();$('#resultText').textContent=`Keeper's Path defended. You earned ${reward} Essence.`;}else $('#resultText').textContent='Strengthen your defence and try again.';}
$('#resultContinue').onclick=()=>{$('#resultModal').classList.add('hidden');show('hubScreen');};

function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#4f824d';ctx.fillRect(0,0,canvas.width,canvas.height);for(let x=0;x<canvas.width;x+=50){for(let y=0;y<canvas.height;y+=50){if((x+y)%100===0){ctx.fillStyle='#5c8f56';ctx.fillRect(x,y,50,50);}}}
  ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#8e7652';ctx.lineWidth=76;ctx.beginPath();ctx.moveTo(path[0].x,path[0].y);path.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();ctx.strokeStyle='#b39a6a';ctx.lineWidth=58;ctx.stroke();
  ctx.fillStyle='#71b65e';ctx.beginPath();ctx.arc(925,250,52,0,Math.PI*2);ctx.fill();ctx.fillStyle='#e2d36f';ctx.beginPath();ctx.arc(925,250,27,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff8';ctx.font='bold 15px sans-serif';ctx.fillText('BEAST CORE',868,320);
  towers.forEach(t=>{ctx.fillStyle='#1b2a20';ctx.beginPath();ctx.arc(t.x,t.y,24,0,Math.PI*2);ctx.fill();ctx.font='30px sans-serif';ctx.textAlign='center';ctx.fillText(t.b.emoji,t.x,t.y+10);ctx.textAlign='start';});
  enemies.forEach(e=>{ctx.fillStyle=e.boss?'#6d2738':'#49382b';ctx.beginPath();ctx.arc(e.x,e.y,e.boss?24:16,0,Math.PI*2);ctx.fill();ctx.fillStyle='#171717';ctx.fillRect(e.x-22,e.y-(e.boss?34:26),44,6);ctx.fillStyle='#d95252';ctx.fillRect(e.x-22,e.y-(e.boss?34:26),44*(e.hp/e.max),6);if(e.boss){ctx.fillStyle='white';ctx.font='20px sans-serif';ctx.fillText('☠',e.x-9,e.y+7);}});
  projectiles.forEach(p=>{ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();});
}
function loop(ts){if(!$('#gameScreen').classList.contains('active'))return;const dt=Math.min(.033,(ts-last)/1000||0);last=ts;update(dt);draw();requestAnimationFrame(loop);}
updateHub();