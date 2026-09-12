// Beastward Warden Trials endgame goals v1
// Lightweight replayable goals built on the existing campaign, Hard Mode, Beast Den and Training Treat systems.
(()=>{
const V='20260912-warden-trials-v1';
const trials=[
 {id:'campaign',name:'Worldward',desc:'Complete Normal stage 10-10.',reward:'1,000 Essence',check:()=>save.completedLevels?.includes(100),give:()=>save.essence=(save.essence||0)+1000},
 {id:'hard3',name:'Elite Hunter',desc:'Defeat 3 regional bosses in Hard Mode.',reward:'1× Greater Training Treat',check:()=>bossHardCount()>=3,give:()=>giveTreat('greater',1)},
 {id:'hard10',name:'Alpha Breaker',desc:'Defeat all 10 regional bosses in Hard Mode.',reward:'1× Master Training Treat',check:()=>bossHardCount()>=10,give:()=>giveTreat('master',1)},
 {id:'level100',name:'Perfect Bond',desc:'Raise any individual beast to Level 100.',reward:'1,500 Essence',check:()=>instances().some(i=>(i.level||1)>=100),give:()=>save.essence=(save.essence||0)+1500},
 {id:'collector',name:'Beastkeeper',desc:'Own 12 individual beasts.',reward:'1× Greater Training Treat',check:()=>instances().length>=12,give:()=>giveTreat('greater',1)},
 {id:'veterans',name:'Veteran Pack',desc:'Raise 6 individual beasts to Level 60 or higher.',reward:'2,000 Essence',check:()=>instances().filter(i=>(i.level||1)>=60).length>=6,give:()=>save.essence=(save.essence||0)+2000}
];
function instances(){return(save.beastInstances||[]).filter(Boolean)}
function bossHardCount(){return Array.from({length:10},(_,n)=>(n+1)*10).filter(id=>save.hardCompletedLevels?.includes(id)).length}
function ensure(){save.wardenTrialsClaims=save.wardenTrialsClaims||[];save.trainingTreats=save.trainingTreats||{};return save.wardenTrialsClaims}
function giveTreat(key,n){save.trainingTreats[key]=(save.trainingTreats[key]||0)+n}
function unlocked(){return !!save.completedLevels?.includes(100)}
function claim(id){const t=trials.find(x=>x.id===id),claims=ensure();if(!t||claims.includes(id)||!t.check())return;t.give();claims.push(id);persist();render();try{showProgressToast('WARDEN TRIAL COMPLETE',`${t.name} • ${t.reward}`,'levelup')}catch(e){}}
function render(){
 const hub=document.querySelector('#hubScreen');if(!hub)return;
 let panel=hub.querySelector('#wardenTrialsPanel');if(!panel){panel=document.createElement('section');panel.id='wardenTrialsPanel';panel.className='warden-trials-panel';const anchor=hub.querySelector('.hub-grid')||hub.lastElementChild;anchor?.insertAdjacentElement('afterend',panel)}
 if(!panel)return;
 const claims=ensure(),isOpen=unlocked();
 if(!isOpen){panel.innerHTML=`<div class="warden-trials-lock"><small>ENDGAME</small><b>Warden Trials</b><span>Complete stage 10-10 to unlock long-term mastery goals.</span></div>`;return}
 const complete=trials.filter(t=>claims.includes(t.id)).length;
 panel.innerHTML=`<header><div><small>ENDGAME • WARDEN TRIALS</small><h3>Master Beastward</h3><p>Replay Hard bosses, develop your roster and complete permanent mastery goals.</p></div><strong>${complete}/${trials.length}</strong></header><div class="warden-trials-grid">${trials.map(t=>{const done=claims.includes(t.id),ready=!done&&t.check();return `<article class="warden-trial ${done?'done':ready?'ready':''}"><span>${done?'✓':ready?'!':'◇'}</span><div><b>${t.name}</b><small>${t.desc}</small><em>${t.reward}</em></div><button data-trial="${t.id}" ${ready?'':'disabled'}>${done?'CLAIMED':ready?'CLAIM':'IN PROGRESS'}</button></article>`}).join('')}</div>`;
 panel.querySelectorAll('button[data-trial]').forEach(b=>b.onclick=()=>claim(b.dataset.trial));
}
const baseUpdateHub=updateHub;updateHub=function(){const r=baseUpdateHub.apply(this,arguments);setTimeout(render,0);return r};
const baseFinish=finish;finish=function(){const r=baseFinish.apply(this,arguments);setTimeout(render,0);return r};
const style=document.createElement('style');style.textContent=`
.warden-trials-panel{margin:16px auto 28px;width:min(980px,94%);padding:15px;border-radius:18px;border:1px solid #c5a84935;background:linear-gradient(145deg,#17291f,#0c1711);box-shadow:0 16px 40px #0003}.warden-trials-panel header{display:flex;justify-content:space-between;gap:15px;align-items:flex-start}.warden-trials-panel header small,.warden-trials-lock small{font-size:9px;letter-spacing:.16em;color:#91a399}.warden-trials-panel h3{margin:3px 0;color:#f0d36d;font:700 22px Georgia,serif}.warden-trials-panel header p{margin:0;color:#acb9b0;font-size:11px}.warden-trials-panel header strong{font-size:18px;color:#f0d36d}.warden-trials-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px}.warden-trial{display:grid;grid-template-columns:30px 1fr auto;gap:9px;align-items:center;padding:10px;border-radius:12px;background:#101b15;border:1px solid #ffffff12}.warden-trial>span{font-size:18px;color:#718077}.warden-trial b,.warden-trial small,.warden-trial em{display:block}.warden-trial b{font-size:12px;color:#e6d17d}.warden-trial small{font-size:9px;color:#a7b5ab;margin:2px 0}.warden-trial em{font-size:9px;font-style:normal;color:#87b995}.warden-trial button{min-height:34px;border-radius:8px;border:1px solid #536c59;background:#18281f;color:#91a399;font-size:9px;font-weight:900;padding:6px 8px}.warden-trial.ready{border-color:#79ce874f;background:#153421}.warden-trial.ready button{border-color:#77cf86;background:#245233;color:#d9ffe0}.warden-trial.done{opacity:.68}.warden-trial.done>span{color:#8ee39b}.warden-trials-lock{display:grid;gap:3px}.warden-trials-lock b{font-size:17px;color:#e5d078}.warden-trials-lock span{font-size:10px;color:#aeb9b1}@media(max-width:640px){.warden-trials-grid{grid-template-columns:1fr}.warden-trial{grid-template-columns:26px 1fr}.warden-trial button{grid-column:2;justify-self:start}.warden-trials-panel{width:94%;padding:12px}}
`;document.head.appendChild(style);
ensure();try{render()}catch(e){}
document.documentElement.dataset.wardenTrials=V;
})();