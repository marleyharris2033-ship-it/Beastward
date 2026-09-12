// Beastward Training Treats v1
// Fixed-XP catch-up items earned mainly from replayable boss victories.
(()=>{
const V='20260912-training-treats-v1';
const TREATS={
  small:{name:'Small Training Treat',xp:250,icon:'🟢'},
  standard:{name:'Training Treat',xp:500,icon:'🔵'},
  greater:{name:'Greater Training Treat',xp:1000,icon:'🟣'},
  master:{name:'Master Training Treat',xp:2500,icon:'🟡'}
};
let awardedThisBattle=false;
function ensureTreats(){
  save.trainingTreats=save.trainingTreats||{};
  Object.keys(TREATS).forEach(k=>save.trainingTreats[k]=Math.max(0,Math.floor(save.trainingTreats[k]||0)));
  return save.trainingTreats;
}
function giveTreat(key,count=1){
  ensureTreats();
  save.trainingTreats[key]=(save.trainingTreats[key]||0)+count;
}
function instanceFor(key){
  const list=save.beastInstances||[];
  return list.find(x=>x&&x.uid===key)||list.filter(x=>x&&x.species===key).sort((a,b)=>(b.level||1)-(a.level||1))[0]||null;
}
function useTreat(uid,key){
  const bag=ensureTreats(),def=TREATS[key],i=instanceFor(uid);
  if(!def||!i||i.level>=100||(bag[key]||0)<=0)return;
  bag[key]--;
  const before=i.level;
  addXP([i.uid],def.xp);
  const gained=Math.max(0,i.level-before);
  showProgressToast('TRAINING COMPLETE',`${def.icon} ${def.name} • +${def.xp} XP${gained?` • +${gained} level${gained===1?'':'s'}`:''}`,'levelup');
  openDenBeast(i.uid);
}
function trainingPanel(uid){
  const i=instanceFor(uid),bag=ensureTreats();if(!i)return'';
  const max=i.level>=100;
  return `<section class="training-treat-panel"><div class="training-treat-head"><div><span>TRAINING TREATS</span><h3>Quick Training</h3><small>Use fixed XP treats on this individual beast.</small></div><b>Lv ${i.level}</b></div><div class="training-treat-grid">${Object.entries(TREATS).map(([k,d])=>`<button class="training-treat-btn" data-treat="${k}" ${max||!bag[k]?'disabled':''}><span>${d.icon}</span><b>${d.name}</b><small>+${d.xp.toLocaleString()} XP</small><em>Owned: ${bag[k]||0}</em></button>`).join('')}</div>${max?'<div class="training-treat-max">MAX LEVEL</div>':''}</section>`;
}
ensureTreats();
try{persist()}catch(e){}
const baseOpenDenBeast=openDenBeast;
openDenBeast=function(key){
  const r=baseOpenDenBeast.apply(this,arguments),i=instanceFor(key),body=document.querySelector('#denBeastModalBody');
  if(i&&body){
    const old=body.querySelector('.training-treat-panel');if(old)old.remove();
    body.insertAdjacentHTML('beforeend',trainingPanel(i.uid));
    body.querySelectorAll('.training-treat-btn[data-treat]').forEach(btn=>btn.onclick=()=>useTreat(i.uid,btn.dataset.treat));
  }
  return r;
};
function regionNumber(){
  try{return typeof levelWorld==='function'?Number(levelWorld(currentLevel)||1):Math.max(1,Math.ceil((currentLevel?.id||1)/10))}catch(e){return 1}
}
function bossRewardPlan(hard,region){
  if(hard)return {guaranteed:'greater',chance:'master',chancePct:10,label:'🟣 1,000 XP guaranteed • 10% 🟡 2,500'};
  if(region<=3)return {guaranteed:'small',chance:'standard',chancePct:20,label:'🟢 250 XP guaranteed • 20% 🔵 500'};
  if(region<=6)return {guaranteed:'standard',chance:'greater',chancePct:20,label:'🔵 500 XP guaranteed • 20% 🟣 1,000'};
  return {guaranteed:'standard',chance:'greater',chancePct:35,label:'🔵 500 XP guaranteed • 35% 🟣 1,000'};
}
function rewardBossTreats(hard,region,firstClear){
  const plan=bossRewardPlan(hard,region),won=[];
  giveTreat(plan.guaranteed,1);won.push(plan.guaranteed);
  if(firstClear){giveTreat(plan.guaranteed,1);won.push(plan.guaranteed)}
  if(Math.random()*100<plan.chancePct){giveTreat(plan.chance,1);won.push(plan.chance)}
  persist();
  return won;
}
function rewardText(keys){
  const counts={};keys.forEach(k=>counts[k]=(counts[k]||0)+1);
  return Object.entries(counts).map(([k,n])=>`${TREATS[k].icon} ${n}× ${TREATS[k].name} (+${TREATS[k].xp.toLocaleString()} XP each)`).join(' • ');
}
const baseBeginSelectedLevel=beginSelectedLevel;
beginSelectedLevel=function(){awardedThisBattle=false;return baseBeginSelectedLevel.apply(this,arguments)};
const baseFinish=finish;
finish=function(win){
  let shouldAward=false,hard=false,region=1,firstClear=false;
  try{
    hard=battleMode==='hard';region=regionNumber();
    const completed=hard?save.hardCompletedLevels:save.completedLevels;
    firstClear=!!(currentLevel&&currentLevel.boss&&!completed.includes(currentLevel.id));
    shouldAward=!!(win&&currentLevel&&currentLevel.boss&&battleReport?.bossDefeated&&!awardedThisBattle);
  }catch(e){}
  const r=baseFinish.apply(this,arguments);
  if(shouldAward){
    awardedThisBattle=true;
    const won=rewardBossTreats(hard,region,firstClear);
    const summary=document.querySelector('#resultSummary');
    if(summary)summary.insertAdjacentHTML('beforeend',`<div class="boss-treat-reward"><small>BOSS TRAINING REWARD${firstClear?' • FIRST CLEAR BONUS':''}</small><b>${rewardText(won)}</b></div>`);
  }
  return r;
};
function decorateBossRewards(){
  const hard=typeof campaignMode!=='undefined'&&campaignMode==='hard',region=typeof campaignWorld!=='undefined'?Number(campaignWorld||1):1,plan=bossRewardPlan(hard,region);
  document.querySelectorAll('.campaign-map .boss-node .map-node-copy').forEach(copy=>{
    if(copy.querySelector('.boss-treat-preview'))return;
    const d=document.createElement('em');d.className='boss-treat-preview';d.textContent='TRAINING: '+plan.label;copy.appendChild(d);
  });
}
const baseRenderCampaignMap=renderCampaignMap;
renderCampaignMap=function(){const r=baseRenderCampaignMap.apply(this,arguments);decorateBossRewards();return r};
setTimeout(decorateBossRewards,0);
const style=document.createElement('style');style.textContent=`
.training-treat-panel{margin-top:16px;padding:14px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:rgba(9,18,28,.72)}
.training-treat-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}.training-treat-head span{font-size:10px;letter-spacing:.16em;opacity:.68}.training-treat-head h3{margin:2px 0 1px;font-size:18px}.training-treat-head small{opacity:.7}.training-treat-head>b{font-size:14px;white-space:nowrap}
.training-treat-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.training-treat-btn{display:grid;grid-template-columns:auto 1fr;gap:1px 8px;text-align:left;align-items:center;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.055);color:inherit}.training-treat-btn>span{font-size:18px;grid-row:1/4}.training-treat-btn b{font-size:12px}.training-treat-btn small{font-size:11px;opacity:.78}.training-treat-btn em{font-size:10px;opacity:.62;font-style:normal}.training-treat-btn:disabled{opacity:.38}.training-treat-max{text-align:center;margin-top:8px;font-size:11px;font-weight:800;letter-spacing:.12em;opacity:.7}
.boss-treat-reward{margin-top:12px;padding:10px 12px;border-radius:12px;background:rgba(126,87,194,.15);border:1px solid rgba(197,166,255,.32);display:flex;flex-direction:column;gap:4px}.boss-treat-reward small{font-size:10px;letter-spacing:.12em;opacity:.75}.boss-treat-reward b{font-size:12px;line-height:1.35}
.boss-treat-preview{display:block;margin-top:4px;font-size:9px;line-height:1.25;font-style:normal;color:#d7c5ff;opacity:.9}
@media(max-width:520px){.training-treat-grid{grid-template-columns:1fr}.boss-treat-preview{font-size:8px}}
`;document.head.appendChild(style);
document.documentElement.dataset.trainingTreats=V;
})();