// Beastward Endless Training mode v1
(()=>{
 const V='20260916-endless-1';
 let endless=false,bankedXP=0,endlessStartLevels={},lastMilestone=0;
 const baseLevel=()=>levels.find(l=>l.id===1)||levels[0];
 function ensureSave(){save.endlessBest=save.endlessBest||0;}
 function selectedIds(){return (battleLoadout&&battleLoadout.length?battleLoadout:save.unlocked.slice(0,6)).filter(id=>save.unlocked.includes(id)).slice(0,6)}
 function catchup(id,w){const lv=progress(id).level,target=Math.min(100,5+Math.floor(w*1.35));const gap=Math.max(0,target-lv);return 1+Math.min(.75,gap*.025)}
 function addMenu(){
  if(document.getElementById('endlessModeBtn'))return;
  const campaignBtn=[...document.querySelectorAll('button')].find(b=>/campaign/i.test(b.textContent||''));
  if(!campaignBtn)return;
  const b=document.createElement('button');b.id='endlessModeBtn';b.className=campaignBtn.className;b.textContent='∞ Endless Training';
  b.onclick=startEndless;campaignBtn.insertAdjacentElement('afterend',b);
 }
 function startEndless(){
  if(!save?.unlocked?.length)return;
  ensureSave();endless=true;bankedXP=0;lastMilestone=0;endlessStartLevels={};selectedIds().forEach(id=>endlessStartLevels[id]=progress(id).level);
  currentLevel={...baseLevel(),id:1,name:'Endless Training Grounds',boss:false,hp:1,speed:1,waves:999999};battleMode='normal';
  try{reset();show('battleScreen');document.querySelector('#levelTitle')&&(document.querySelector('#levelTitle').textContent='Endless Training Grounds');}catch(e){console.error(e)}
  showProgressToast('ENDLESS TRAINING','Survive as long as possible. Every 10 waves you can retire and bank 100% of your training XP.','levelup');
 }
 const oldPreview=updateNextWavePreview;updateNextWavePreview=function(){if(!endless)return oldPreview.apply(this,arguments);const el=document.querySelector('#nextWaveInfo');if(el)el.textContent=`Next: Endless Wave ${wave+1}${(wave+1)%10===0?' • BOSS MILESTONE':''} • Best ${save.endlessBest||0}`};
 const startBtn=document.querySelector('#startWaveBtn');
 if(startBtn){const old=startBtn.onclick;startBtn.onclick=function(ev){if(!endless)return old.call(this,ev);if(running)return;wave++;running=true;waveParticipants=new Set(towers.map(t=>t.b.id));queue=[];const tier=Math.floor((wave-1)/10),hp=(55+wave*17+wave*wave*.9)*Math.pow(1.18,tier),spd=Math.min(82,43+wave*.7+tier*1.2),n=Math.min(52,6+wave*2),mix=waveEnemyMix(Math.min(10,1+((wave-1)%10))),spacing=Math.max(260,620-wave*4);for(let i=0;i<n;i++){const id=mix[i%mix.length],type=enemyTypes[id];queue.push({delay:i*(id==='wisp'?spacing*.62:spacing),hp:hp*type.hp,speed:spd*type.speed,reward:Math.max(4,Math.round((12+Math.min(8,wave*.15))*type.reward)),type:id});}if(wave%10===0){const bt=wave%20===0?'glaciermaw':'hollowmaw',type=enemyTypes[bt]||enemyTypes.hollowmaw;queue.push({delay:spacing*4,hp:hp*(18+tier*2),speed:Math.min(34,21+tier),reward:85,boss:true,type:bt});showProgressToast('MILESTONE BOSS',`Wave ${wave} • Defeat the boss to secure a full training checkpoint.`,'boss');}queue.sort((a,b)=>a.delay-b.delay);ui();updateNextWavePreview();};}
 const oldComplete=completeWave;completeWave=function(){if(!endless)return oldComplete.apply(this,arguments);const base=7+Math.floor(wave*1.7);gold+=Math.min(70,26+wave*2);battleReport.wavesCleared=Math.max(battleReport.wavesCleared,wave);waveParticipants.forEach(id=>{const xp=Math.round(base*catchup(id,wave));bankedXP+=xp;battleReport.xpByBeast[id]=(battleReport.xpByBeast[id]||0)+xp;addXP(new Set([id]),xp);});ensureSave();save.endlessBest=Math.max(save.endlessBest||0,wave);if(wave%10===0){lastMilestone=wave;showRetire();}document.querySelector('#waveXpNotice').textContent=`Wave ${wave} clear • training XP bank ${bankedXP} • +${Math.min(70,26+wave*2)} gold`;ui();updateNextWavePreview();};
 function showRetire(){let m=document.getElementById('endlessRetireModal');if(!m){m=document.createElement('div');m.id='endlessRetireModal';m.style.cssText='position:fixed;inset:0;z-index:99990;background:#000a;display:grid;place-items:center';m.innerHTML='<div style="max-width:390px;margin:20px;padding:22px;border-radius:18px;background:#18233a;color:white;text-align:center;font-family:system-ui"><h2 style="margin-top:0">Training Checkpoint</h2><p id="endlessRetireText"></p><div style="display:flex;gap:10px;justify-content:center"><button id="endlessContinue">Continue Deeper</button><button id="endlessRetire">Retire & Bank 100%</button></div></div>';document.body.appendChild(m);document.getElementById('endlessContinue').onclick=()=>m.style.display='none';document.getElementById('endlessRetire').onclick=()=>finish(true);}
  document.getElementById('endlessRetireText').textContent=`Wave ${wave} reached • ${bankedXP} training XP earned. Retire safely or risk 25% of this run's training if defeated.`;m.style.display='grid';
 }
 function finish(retired){ensureSave();const kept=retired?bankedXP:Math.round(bankedXP*.75);if(!retired){const lost=bankedXP-kept;selectedIds().forEach(id=>{if(lost<=0)return;});}save.endlessBest=Math.max(save.endlessBest||0,wave);try{saveGame?.()}catch(_){}endless=false;const m=document.getElementById('endlessRetireModal');if(m)m.style.display='none';running=false;queue=[];enemies=[];projectiles=[];effects=[];show('hubScreen');try{updateHub()}catch(_){}showProgressToast(retired?'TRAINING BANKED':'ENDLESS RUN ENDED',`Wave ${wave} • ${retired?'100%':'75%'} reward secured • Best ${save.endlessBest}`,'levelup');}
 const oldExit=confirmExitLevel;confirmExitLevel=function(){if(endless)return finish(true);return oldExit.apply(this,arguments)};
 // If the core defeat screen appears, convert the run to the 75% risk rule.
 const observer=new MutationObserver(()=>{if(!endless)return;const visible=[...document.querySelectorAll('h1,h2,h3,.modal-title')].some(x=>/defeat|core lost|game over/i.test(x.textContent||'')&&x.offsetParent!==null);if(visible)finish(false);});observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
 setTimeout(addMenu,250);setTimeout(addMenu,1000);window.BEASTWARD_ENDLESS={version:V,start:startEndless,get active(){return endless}};
})();