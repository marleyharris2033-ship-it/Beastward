// Beastward enemy archetypes + strategic wave identities v1
(()=>{
const V='20260914-enemy-archetypes-1';
const ARCH={
  runner:{name:'Runner',tag:'R',color:'#ffcc66',counter:'Slow / Root',desc:'Fast but fragile. Control effects are the cleanest answer.',hp:.80,speed:1.24,reward:1.00},
  armoured:{name:'Armoured',tag:'A',color:'#b8c0c8',counter:'Rock / Dark',desc:'Takes reduced ordinary projectile damage. Rock and Dark bypass its plating.',hp:1.28,speed:.92,reward:1.18},
  regenerator:{name:'Regenerator',tag:'G',color:'#79e58d',counter:'Fire / Poison',desc:'Regains health while not burning or poisoned.',hp:1.14,speed:.97,reward:1.16},
  support:{name:'Support',tag:'S',color:'#75d9ff',counter:'Priority target',desc:'Speeds nearby enemies. Removing it quickly weakens the whole pack.',hp:.98,speed:1.02,reward:1.20},
  phase:{name:'Phase',tag:'P',color:'#be8dff',counter:'Electric / Wind / Light',desc:'Periodically surges forward and partially resists ordinary single-target damage.',hp:.93,speed:1.08,reward:1.20},
  warded:{name:'Warded',tag:'W',color:'#78f1ff',counter:'Electric multi-hit',desc:'Starts behind a ward that breaks after repeated hits. Electric attacks strip it faster.',hp:1.12,speed:.98,reward:1.22},
  elite:{name:'Elite',tag:'E',color:'#ff6f91',counter:'Pebblum / Mosshell control',desc:'A dangerous enhanced enemy with more health and partial control resistance.',hp:1.52,speed:1.05,reward:1.55}
};
const WORLD_NAMES={1:'Verdant Valley',2:'Frostfall Expanse',3:'Sunscar Desert',4:'Embercrag Peaks',5:'Mireveil Marsh',6:'Stormspire Isles',7:'Moonshadow Wilds',8:'Crystaldeep',9:'Astral Ruins',10:'The Wildheart'};
const MIX={
  1:[['raider'],['raider','hound'],['raider','thornling','hound'],['wisp','raider','glimmer'],['shellback','raider','brute'],['wisp','hound','thornling','glimmer'],['brute','shellback','hound'],['wisp','shellback','glimmer','thornling'],['brute','hound','wisp','shellback','glimmer'],['brute','shellback','hound','wisp','thornling','glimmer','raider']],
  2:[['frostling'],['frostling','snowstalker'],['frostling','shardwisp'],['snowstalker','shardwisp','frostling'],['icegolem','frostling'],['shardwisp','snowstalker','frostling'],['icegolem','snowstalker','frostling'],['icegolem','shardwisp','snowstalker'],['icegolem','snowstalker','shardwisp','frostling'],['icegolem','snowstalker','shardwisp','frostling']],
  3:[['hound','raider'],['hound','thornling'],['hound','glimmer','raider'],['thornling','hound','glimmer'],['brute','hound','shellback'],['hound','glimmer','thornling'],['brute','hound','thornling'],['glimmer','hound','shellback','raider'],['brute','glimmer','hound','thornling'],['brute','hound','glimmer','shellback','thornling']],
  4:[['shellback','raider'],['shellback','brute'],['brute','shellback','raider'],['shellback','brute','thornling'],['brute','shellback'],['brute','shellback','hound'],['brute','brute','shellback','wisp'],['shellback','brute','glimmer'],['brute','shellback','hound','wisp'],['brute','shellback','thornling','glimmer']],
  5:[['wisp','thornling'],['wisp','raider','wisp'],['thornling','wisp','glimmer'],['shellback','wisp','thornling'],['wisp','wisp','brute'],['glimmer','wisp','thornling'],['shellback','wisp','wisp','hound'],['brute','wisp','glimmer','thornling'],['shellback','wisp','thornling','glimmer'],['brute','shellback','wisp','wisp','thornling','glimmer']],
  6:[['glimmer','hound'],['hound','glimmer','raider'],['glimmer','wisp','hound'],['hound','thornling','glimmer'],['shellback','glimmer','hound'],['glimmer','hound','wisp'],['brute','glimmer','hound'],['glimmer','hound','thornling','wisp'],['shellback','glimmer','hound','wisp'],['brute','glimmer','hound','thornling','wisp']],
  7:[['wisp','hound'],['thornling','wisp'],['hound','glimmer','wisp'],['shellback','thornling','wisp'],['brute','wisp','hound'],['glimmer','thornling','shellback'],['brute','hound','wisp'],['shellback','glimmer','wisp','hound'],['brute','thornling','glimmer','wisp'],['brute','shellback','hound','wisp','glimmer']],
  8:[['shellback','wisp'],['shellback','raider'],['brute','wisp','shellback'],['shellback','glimmer','wisp'],['brute','shellback'],['shellback','thornling','wisp'],['brute','shellback','glimmer'],['shellback','brute','wisp','glimmer'],['brute','shellback','thornling','wisp'],['brute','shellback','shellback','glimmer','wisp']],
  9:[['wisp','glimmer'],['brute','raider'],['hound','hound','thornling'],['shellback','wisp','glimmer'],['brute','hound','wisp'],['glimmer','glimmer','thornling'],['brute','shellback','hound'],['wisp','hound','shellback','glimmer'],['brute','thornling','wisp','glimmer'],['brute','shellback','hound','wisp','glimmer','thornling']],
 10:[['raider','hound','wisp'],['shellback','glimmer','thornling'],['brute','hound','wisp'],['frostling','snowstalker','shardwisp'],['brute','shellback','glimmer'],['icegolem','hound','wisp'],['shellback','snowstalker','thornling','glimmer'],['brute','icegolem','wisp','shardwisp'],['brute','shellback','hound','snowstalker','glimmer'],['brute','icegolem','shellback','hound','wisp','glimmer','shardwisp']]
};
const ARCH_PLAN={
  1:{early:[null,'runner',null],mid:['runner','support',null,'armoured'],late:['regenerator','support','runner','armoured'],final:['elite','warded','support','runner','regenerator']},
  2:{early:[null,'runner','phase'],mid:['runner','armoured','phase',null],late:['armoured','warded','runner','phase'],final:['elite','warded','armoured','phase']},
  3:{early:['runner',null,'runner'],mid:['runner','support',null,'armoured'],late:['runner','support','warded','armoured'],final:['elite','runner','support','warded']},
  4:{early:['armoured',null,'armoured'],mid:['armoured','regenerator',null],late:['armoured','regenerator','warded','support'],final:['elite','armoured','regenerator','warded']},
  5:{early:[null,'regenerator','runner'],mid:['regenerator','support',null,'runner'],late:['regenerator','support','phase','armoured'],final:['elite','regenerator','support','phase']},
  6:{early:['runner','phase',null],mid:['runner','phase','support'],late:['runner','phase','support','warded'],final:['elite','runner','phase','support']},
  7:{early:['phase',null,'runner'],mid:['phase','regenerator','support'],late:['phase','regenerator','warded','support'],final:['elite','phase','warded','regenerator']},
  8:{early:['armoured','warded',null],mid:['armoured','warded','support'],late:['warded','armoured','support','phase'],final:['elite','warded','armoured','support']},
  9:{early:['phase','runner',null],mid:['phase','warded','regenerator'],late:['phase','warded','regenerator','support'],final:['elite','phase','warded','regenerator','support']},
 10:{early:['runner','armoured','phase'],mid:['support','regenerator','warded','runner'],late:['armoured','phase','support','regenerator','warded'],final:['elite','warded','phase','support','regenerator','armoured','runner']}
};
function worldOf(){return Math.max(1,Math.min(10,currentLevel?.world||Math.ceil((currentLevel?.id||1)/10)))}
function phaseFor(w){return w<=3?'early':w<=6?'mid':w<=9?'late':'final'}
function groupFor(type){
  if(['brute','shellback','icegolem'].includes(type))return 'heavy';
  if(['hound','snowstalker','glimmer'].includes(type))return 'fast';
  if(['wisp','shardwisp'].includes(type))return 'swarm';
  return 'base';
}
function allowed(group,a){
  if(!a)return true;
  if(group==='heavy')return ['armoured','warded','regenerator','support','elite'].includes(a);
  if(group==='fast')return ['runner','phase','support','warded','elite'].includes(a);
  if(group==='swarm')return ['runner','phase','support','warded'].includes(a);
  return true;
}
function archetypeFor(world,w,index,type){
  if(w<=1&&index%3!==1)return null;
  const plan=ARCH_PLAN[world]?.[phaseFor(w)]||[null];
  for(let n=0;n<plan.length;n++){
    const a=plan[(index+world+w+n)%plan.length];
    if(allowed(groupFor(type),a))return a;
  }
  return null;
}
const previousWaveMix=waveEnemyMix;
waveEnemyMix=function(w){
  const world=worldOf(),set=MIX[world],mix=set?.[Math.max(0,Math.min(9,(w||1)-1))];
  return mix?.length?mix.slice():previousWaveMix.apply(this,arguments);
};
function tuneSpawn(s,a){
  if(!a||!ARCH[a]||s.boss)return;
  const d=ARCH[a];s.archetype=a;s.hp*=d.hp;s.speed*=d.speed;s.reward=Math.max(1,Math.round(s.reward*d.reward));
}
function applyQueuePlan(){
  const world=worldOf(),w=wave,normal=queue.filter(s=>!s.boss);
  normal.forEach((s,i)=>tuneSpawn(s,archetypeFor(world,w,i,s.type)));
  if(!currentLevel?.boss&&(w===5||w===10)&&normal.length){
    const heavies=normal.filter(s=>['brute','shellback','icegolem','raider','frostling'].includes(s.type));
    const target=heavies[Math.floor(heavies.length/2)]||normal[Math.floor(normal.length/2)];
    if(target){
      if(target.archetype&&ARCH[target.archetype]){const old=ARCH[target.archetype];target.hp/=old.hp;target.speed/=old.speed;target.reward=Math.max(1,Math.round(target.reward/old.reward));}
      target.archetype=null;tuneSpawn(target,'elite');
    }
  }
  if((w===5||w===10)&&typeof showProgressToast==='function'){
    const title=w===10?'FINAL WAVE PRESSURE':'ELITE PRESSURE';
    showProgressToast(title,`${WORLD_NAMES[world]} is mixing specialist enemies into this wave. Read the badges and counter them.`,'boss');
  }
}
const startBtn=document.querySelector('#startWaveBtn');
if(startBtn&&typeof startBtn.onclick==='function'){
  const baseStart=startBtn.onclick;
  startBtn.onclick=function(ev){
    const before=wave,ret=baseStart.call(this,ev);
    if(wave!==before&&running&&queue?.length){applyQueuePlan();updateEnemyIntel();}
    return ret;
  };
}
const baseSpawn=spawn;
spawn=function(s){
  const before=enemies.length;const ret=baseSpawn.apply(this,arguments);const e=enemies[enemies.length-1];
  if(enemies.length>before&&e){
    e.archetype=s.archetype||null;e.rawSpeed=e.speed;e.phaseClock=(Math.random()*3.5);e.wardHits=0;e.wardBroken=false;e.wardRecharge=0;
  }
  return ret;
};
const baseHitProjectile=hitProjectile;
hitProjectile=function(p){
  const t=p?.target;if(!t||t.boss||!t.archetype)return baseHitProjectile.apply(this,arguments);
  const original=p.damage;let mult=1;
  if(t.archetype==='armoured'&&!['Rock','Dark'].includes(p.type))mult*=.80;
  if(t.archetype==='phase'&&!['Electric','Wind','Light'].includes(p.type))mult*=.86;
  if(t.archetype==='warded'&&!t.wardBroken){
    const electric=p.type==='Electric';mult*=electric?.92:.72;t.wardHits+=(electric?2:1);t.wardRecharge=5;
    if(t.wardHits>=4){t.wardBroken=true;t.wardRecharge=5;if(typeof fx==='function')fx('burst',t.x,t.y,ARCH.warded.color,{size:72});}
  }
  const pre={slow:t.slow||0,root:t.root||0,stun:t.stun||0};
  p.damage=original*mult;
  const ret=baseHitProjectile.apply(this,arguments);
  p.damage=original;
  if(t.archetype==='elite'&&!['pebblum','mosshell'].includes(p.beastId)){
    t.slow=pre.slow+Math.max(0,(t.slow||0)-pre.slow)*.72;
    t.root=pre.root+Math.max(0,(t.root||0)-pre.root)*.72;
    t.stun=pre.stun+Math.max(0,(t.stun||0)-pre.stun)*.72;
  }
  return ret;
};
const baseUpdate=update;
update=function(dt){
  const support=enemies.filter(e=>e.archetype==='support'&&e.hp>0);
  enemies.forEach(e=>{
    if(!e.rawSpeed)e.rawSpeed=e.speed;
    let boost=1;
    if(e.archetype==='regenerator'&&(e.burn||0)<=0&&(e.poison||0)<=0&&e.hp>0)e.hp=Math.min(e.max,e.hp+e.max*.008*dt);
    if(support.some(s=>s!==e&&Math.hypot(s.x-e.x,s.y-e.y)<105))boost*=1.12;
    if(e.archetype==='phase'){
      e.phaseClock=(e.phaseClock||0)+dt;const surge=(e.phaseClock%4)<1.15;if(surge){boost*=1.24;e.slow=Math.max(0,(e.slow||0)-dt*.35);}
    }
    if(e.archetype==='warded'&&e.wardBroken){
      e.wardRecharge=Math.max(0,(e.wardRecharge||0)-dt);
      if(e.wardRecharge<=0&&(e.burn||0)<=0&&(e.poison||0)<=0){e.wardBroken=false;e.wardHits=0;if(typeof fx==='function')fx('light',e.x,e.y,ARCH.warded.color,{size:58});}
    }
    e.speed=e.rawSpeed*boost;
  });
  const ret=baseUpdate.apply(this,arguments);
  enemies.forEach(e=>{if(e.rawSpeed)e.speed=e.rawSpeed});
  return ret;
};
const baseDraw=draw;
draw=function(){
  const ret=baseDraw.apply(this,arguments);ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 10px system-ui';
  enemies.forEach(e=>{
    if(!e.archetype||e.boss)return;const a=ARCH[e.archetype],size=e.size||18,y=e.y-size-32;
    if(e.archetype==='support'){
      ctx.save();ctx.globalAlpha=.22;ctx.strokeStyle=a.color;ctx.lineWidth=2;ctx.setLineDash([4,5]);ctx.beginPath();ctx.arc(e.x,e.y,54,0,Math.PI*2);ctx.stroke();ctx.restore();
    }
    if(e.archetype==='warded'&&!e.wardBroken){ctx.save();ctx.globalAlpha=.58;ctx.strokeStyle=a.color;ctx.lineWidth=2;ctx.beginPath();ctx.arc(e.x,e.y,size*1.45,0,Math.PI*2);ctx.stroke();ctx.restore();}
    ctx.fillStyle='#07110de8';ctx.beginPath();ctx.arc(e.x,y,9,0,Math.PI*2);ctx.fill();ctx.strokeStyle=a.color;ctx.lineWidth=2;ctx.stroke();ctx.fillStyle=a.color;ctx.fillText(a.tag,e.x,y+.5);
  });
  ctx.restore();return ret;
};
function plannedArchetypes(w){
  const world=worldOf(),mix=waveEnemyMix(w),n=Math.min(12,typeof waveEnemyCount==='function'?waveEnemyCount(w):12),set=[];
  for(let i=0;i<n;i++){const a=archetypeFor(world,w,i,mix[i%mix.length]);if(a&&!set.includes(a))set.push(a)}
  if(!currentLevel?.boss&&(w===5||w===10)&&!set.includes('elite'))set.push('elite');
  return set;
}
function ensureIntel(){
  const next=document.querySelector('#nextWaveInfo');if(!next||document.querySelector('#enemyArchetypeIntel'))return;
  const el=document.createElement('div');el.id='enemyArchetypeIntel';el.className='enemy-archetype-intel';next.insertAdjacentElement('afterend',el);
}
function updateEnemyIntel(){
  ensureIntel();const el=document.querySelector('#enemyArchetypeIntel');if(!el)return;
  const w=Math.min(10,(wave||0)+1),items=plannedArchetypes(w);
  el.innerHTML=items.length?`<small>NEXT WAVE SPECIALISTS</small><div>${items.map(id=>{const a=ARCH[id];return `<span style="--arch:${a.color}"><b>${a.tag}</b>${a.name}<em>${a.counter}</em></span>`}).join('')}</div>`:`<small>NEXT WAVE</small><div><span class="plain">Standard enemies — no specialist modifier yet.</span></div>`;
}
const baseNextPreview=updateNextWavePreview;
updateNextWavePreview=function(){const r=baseNextPreview.apply(this,arguments);updateEnemyIntel();return r};
const baseBegin=beginSelectedLevel;
beginSelectedLevel=function(){const r=baseBegin.apply(this,arguments);setTimeout(updateEnemyIntel,50);return r};
const style=document.createElement('style');style.textContent=`
.enemy-archetype-intel{margin-top:7px;padding:8px 9px;border:1px solid #ffffff18;border-radius:10px;background:#08130fbd;color:#d6e1d9}.enemy-archetype-intel small{display:block;margin-bottom:5px;font-size:8px;letter-spacing:.13em;color:#90a398}.enemy-archetype-intel>div{display:flex;gap:5px;flex-wrap:wrap}.enemy-archetype-intel span{display:grid;grid-template-columns:18px auto;grid-template-rows:auto auto;column-gap:5px;align-items:center;padding:4px 6px;border:1px solid color-mix(in srgb,var(--arch) 45%,transparent);border-radius:8px;background:#0003;font-size:9px}.enemy-archetype-intel span b{grid-row:1/3;width:16px;height:16px;display:grid;place-items:center;border:1px solid var(--arch);border-radius:50%;color:var(--arch);font-size:8px}.enemy-archetype-intel span em{font-style:normal;font-size:7px;color:#9db0a3}.enemy-archetype-intel span.plain{display:block;border-color:#ffffff14;color:#9db0a3}.enemy-archetype-intel span.plain:before{display:none}
`;
document.head.appendChild(style);
Object.assign(window,{BEASTWARD_ENEMY_ARCHETYPES:ARCH});
try{updateEnemyIntel()}catch(e){}
document.documentElement.dataset.enemyArchetypes=V;
})();