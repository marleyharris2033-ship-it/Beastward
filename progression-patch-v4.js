// Beastward stage stars + sequential Warden quest chains v4
(() => {
  let soldThisBattle=0;

  const questSeries=[
    {id:'campaign',name:'Campaign Defender',icon:'⚔',kind:'clears',goals:[1,5,10,20,50],labels:['First Defence','Seasoned Defender','Veteran Defender','Master Defender','Legendary Defender'],desc:n=>`Clear ${n} campaign stage${n===1?'':'s'}.`,rewards:[{xp:60,essence:75},{xp:120,essence:150},{xp:200,egg:'common'},{xp:350,egg:'rare'},{xp:600,egg:'epic'}]},
    {id:'hunter',name:'Enemy Hunter',icon:'☠',kind:'kills',goals:[100,500,1000,2500,5000],labels:['Battle Hardened','Path Cleaner','Enemy Breaker','Beastward Vanguard','Path of Ruin'],desc:n=>`Defeat ${n.toLocaleString()} enemies across campaign battles.`,rewards:[{xp:100,essence:100},{xp:180,essence:200},{xp:275,egg:'common'},{xp:425,egg:'rare'},{xp:700,egg:'epic'}]},
    {id:'stars',name:'Star Warden',icon:'★',kind:'perfects',goals:[1,5,10,20,50],labels:['Perfect Warden','Golden Path','Constellation','Starforged','Celestial Warden'],desc:n=>`Earn all 3 stars in ${n} stage run${n===1?'':'s'}.`,rewards:[{xp:100,egg:'common'},{xp:200,essence:200},{xp:300,egg:'rare'},{xp:450,essence:500},{xp:750,egg:'epic'}]},
    {id:'synergy',name:'Synergy Trials',icon:'✦',kind:'synergyWins',goals:[1,5,10,20,50],labels:['Synergy Master','Primal Harmony','Resonant Warden','Perfect Resonance','Wild Convergence'],desc:n=>`Win ${n} stage${n===1?'':'s'} with at least 2 active team synergies.`,rewards:[{xp:120,essence:100},{xp:220,egg:'common'},{xp:325,essence:300},{xp:475,egg:'rare'},{xp:800,egg:'epic'}]},
    {id:'boss',name:'Boss Hunter',icon:'◆',kind:'bosses',goals:[1,3,5,10,20],labels:['Regional Guardian','Alpha Breaker','Boss Hunter','Apex Warden','Worldbreaker'],desc:n=>`Defeat regional bosses ${n} time${n===1?'':'s'}.`,rewards:[{xp:180,egg:'common'},{xp:300,essence:300},{xp:425,egg:'rare'},{xp:600,essence:600},{xp:900,egg:'epic'}]},
    {id:'lone',name:'Lone Guardian',icon:'♞',kind:'oneBeastPerfects',goals:[1,3,5,10,20],labels:['One Beast Army','Solitary Warden','Lone Champion','Legend Alone','The Last Warden'],desc:n=>`3-star ${n} stage run${n===1?'':'s'} using only 1 beast.`,rewards:[{xp:180,essence:150},{xp:300,egg:'common'},{xp:450,essence:400},{xp:650,egg:'rare'},{xp:1000,egg:'epic'}]},
    {id:'flawless',name:'Untouchable Core',icon:'◇',kind:'flawlessWins',goals:[1,5,10,20,50],labels:['Untouched','Perfect Defence','Unbreakable Core','Core Sentinel','Immortal Bastion'],desc:n=>`Win ${n} stage${n===1?'':'s'} without losing a single life.`,rewards:[{xp:120,essence:125},{xp:225,egg:'common'},{xp:350,essence:350},{xp:525,egg:'rare'},{xp:850,egg:'epic'}]},
    {id:'hard',name:'Hard Mode Trials',icon:'!',kind:'hardWins',goals:[1,5,10,20,50],labels:['Into the Wild','Hard March','Iron Warden','Unbound Warden','Master of Hard Mode'],desc:n=>`Clear ${n} Hard Mode stage${n===1?'':'s'}.`,rewards:[{xp:180,essence:200},{xp:300,egg:'common'},{xp:450,essence:450},{xp:650,egg:'rare'},{xp:1000,egg:'epic'}]},
    {id:'hardstars',name:'Hard Perfection',icon:'✹',kind:'hardPerfects',goals:[1,3,5,10,20],labels:['Hard Perfection','Steel Stars','Diamond Defence','Perfect Under Pressure','Warden Unbound'],desc:n=>`Earn all 3 stars in ${n} Hard Mode run${n===1?'':'s'}.`,rewards:[{xp:220,essence:200},{xp:350,egg:'common'},{xp:500,essence:500},{xp:750,egg:'rare'},{xp:1100,egg:'epic'}]}
  ];

  function ensureProgression(){
    save.stageStars=save.stageStars||{};
    save.questStats=save.questStats||{};
    ['kills','clears','perfects','synergyWins','bosses','oneBeastPerfects','flawlessWins','hardWins','hardPerfects'].forEach(k=>{if(save.questStats[k]===undefined)save.questStats[k]=0});
    save.questChains=save.questChains||{};
    save.claimedQuests=save.claimedQuests||[];
    // Migrate the old first quest completions into the new chain system where possible.
    const legacy={campaign:['first-defence','defender-ii','defender-iii'],hunter:['battle-hardened','hunter-ii','hunter-iii'],stars:['perfect-warden','star-warden-ii','star-warden-iii'],synergy:['synergy-master','synergy-ii','synergy-iii'],boss:['regional-guardian','boss-hunter-ii','boss-hunter-iii'],lone:['lone-guardian-i','lone-guardian-ii','lone-guardian-iii'],flawless:['untouched-i','untouched-ii','untouched-iii'],hard:['hard-trial-i'],hardstars:['hard-trial-ii','hard-trial-iii']};
    Object.entries(legacy).forEach(([series,ids])=>{
      if(save.questChains[series]!==undefined)return;
      let count=0;ids.forEach(id=>{if(save.claimedQuests.includes(id))count++});save.questChains[series]=count;
    });
    questSeries.forEach(s=>{if(save.questChains[s.id]===undefined)save.questChains[s.id]=0});
    return save;
  }
  ensureProgression();

  const style=document.createElement('style');
  style.textContent=`
    .stage-stars{margin-top:5px;font-size:12px;letter-spacing:2px;color:#56665b}.stage-stars .earned{color:#f1cf61;text-shadow:0 0 7px #d7ad3955}
    .stage-objectives{margin:8px 0 10px;padding:10px;border-radius:10px;background:#101d17;border:1px solid #ffffff14}.stage-objectives>b{display:block;color:#e9d16f;font-size:11px;letter-spacing:.1em;margin-bottom:7px}.objective-row{display:flex;gap:6px;flex-wrap:wrap}.objective-chip{padding:5px 7px;border-radius:7px;background:#ffffff08;color:#9fb0a5;font-size:9px;border:1px solid #ffffff0c}.objective-chip.earned{color:#e6e89d;background:#32431f;border-color:#d0c45344}
    .quests-card{grid-column:3;grid-row:2;background:linear-gradient(145deg,#263f32,#172a21)!important;position:relative}.quests-card .quest-hub-icon{font-size:48px;color:#efd36d}.quests-card .quest-ready-badge{position:absolute;right:18px;top:18px;min-width:28px;height:28px;padding:0 8px;border-radius:99px;display:grid;place-items:center;background:#e7c75c;color:#172017;font-size:12px;font-weight:900;box-shadow:0 0 18px #e7c75c44}.quests-card .quest-ready-badge.zero{background:#30473a;color:#a9b7ad;box-shadow:none}
    .quest-modal{position:fixed;inset:0;z-index:80;background:#020805d9;display:grid;place-items:center;padding:18px}.quest-modal.hidden{display:none}.quest-shell{width:min(1000px,96vw);max-height:90vh;overflow:auto;border:1px solid #566f5d;border-radius:22px;padding:24px;background:linear-gradient(145deg,#1d3427,#0d1d15);box-shadow:0 28px 80px #000c;position:relative}.quest-close{position:absolute;right:18px;top:16px;width:38px;height:38px;border-radius:50%;border:1px solid #6c826f;background:#15261d;color:#f2dc86;font-size:22px;cursor:pointer}.quest-screen-head{text-align:center;margin-bottom:18px}.quest-screen-head .quest-crest{font-size:34px;color:#ead06d}.quest-screen-head h2{font-family:Georgia,serif;color:#efd36d;margin:5px 0}.quest-screen-head p{color:#aebbb2;margin:0}.quest-overview{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0 20px}.quest-overview>div{padding:10px;border-radius:10px;background:#ffffff08;text-align:center}.quest-overview small{display:block;color:#9fb0a5;font-size:9px}.quest-overview b{display:block;color:#efd36d;font-size:19px;margin-top:2px}
    .quest-current-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.quest-chain-card{padding:13px;border-radius:13px;background:#0b1912;border:1px solid #ffffff14;position:relative}.quest-chain-card.ready{border-color:#d6b75566;background:#182719}.quest-chain-card.finished{opacity:.6}.quest-chain-head{display:flex;gap:9px;align-items:center;margin-bottom:8px}.quest-chain-head>span{font-size:22px}.quest-chain-head b{color:#ead279;font-size:13px}.quest-chain-head small{display:block;color:#8fa196;font-size:9px;margin-top:2px}.quest-tier-path{display:flex;gap:5px;margin-left:auto}.quest-tier-dot{width:9px;height:9px;border-radius:50%;background:#2d4034;border:1px solid #4c6253}.quest-tier-dot.done{background:#e1c45d;border-color:#f6dc7e}.quest-tier-dot.current{box-shadow:0 0 0 2px #e1c45d55}.quest-chain-card h3{margin:4px 0;color:#e9e2bd;font-size:16px}.quest-chain-card p{color:#aab8ae;font-size:11px;line-height:1.4;min-height:31px}.quest-progress{height:7px;border-radius:7px;background:#06100a;overflow:hidden;margin:8px 0}.quest-progress>span{display:block;height:100%;background:#d6b755}.quest-footer{display:flex;justify-content:space-between;align-items:center;gap:8px}.quest-footer small{color:#dfc96c;font-size:10px}.quest-claim{border:0;border-radius:8px;padding:7px 11px;background:#d7bd5d;color:#182017;font-weight:800;font-size:10px;cursor:pointer}.quest-claim:disabled{background:#27372e;color:#87978c;cursor:default}
    .result-stars{margin:12px 0;padding:10px;border-radius:10px;background:#0b1711;border:1px solid #ffffff18;text-align:center}.result-stars b{display:block;color:#f0d374;margin-bottom:6px}.result-star-row{font-size:24px;letter-spacing:7px;color:#405047}.result-star-row .earned{color:#f2cf58;text-shadow:0 0 10px #f2cf5866}.result-objectives{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:6px}.result-objectives span{font-size:9px;padding:4px 6px;border-radius:6px;background:#ffffff09;color:#9eada3}.result-objectives span.done{color:#dfe99b;background:#35461f}
    @media(max-width:760px){.quests-card{grid-column:auto;grid-row:auto}.quest-current-grid{grid-template-columns:1fr}.quest-overview{grid-template-columns:1fr 1fr}.quest-shell{padding:18px 12px;max-height:92vh}.quest-chain-card p{min-height:0}}
  `;
  document.head.appendChild(style);

  function starKey(level=currentLevel,mode=battleMode){return mode+':'+level.id}
  function starState(level=currentLevel,mode=battleMode){ensureProgression();return save.stageStars[starKey(level,mode)]||[false,false,false]}
  function starCount(level=currentLevel,mode=battleMode){return starState(level,mode).filter(Boolean).length}
  function totalStars(){return Object.values(save.stageStars||{}).reduce((n,s)=>n+(Array.isArray(s)?s.filter(Boolean).length:0),0)}
  function chainIndex(series){ensureProgression();return Math.min(series.goals.length,Number(save.questChains[series.id]||0))}
  function currentQuest(series){const i=chainIndex(series);if(i>=series.goals.length)return null;return {series,index:i,goal:series.goals[i],name:series.labels[i],reward:series.rewards[i]}}
  function rewardText(r){const parts=[];if(r.xp)parts.push(r.xp+' XP to every beast');if(r.essence)parts.push(r.essence+' Essence');if(r.egg)parts.push(r.egg[0].toUpperCase()+r.egg.slice(1)+' Egg');return parts.join(' • ')}
  function questValue(series){return Number(save.questStats?.[series.kind]||0)}
  function questReady(series){const q=currentQuest(series);return !!q&&questValue(series)>=q.goal}
  function completedChainSteps(){return questSeries.reduce((n,s)=>n+chainIndex(s),0)}
  function totalChainSteps(){return questSeries.reduce((n,s)=>n+s.goals.length,0)}

  function ensureQuestHubCard(){
    const grid=document.querySelector('.hub-grid');if(!grid)return null;let card=document.querySelector('#questsHubBtn');
    if(!card){card=document.createElement('button');card.id='questsHubBtn';card.className='hub-card quests-card';const den=document.querySelector('.den-card');if(den)den.insertAdjacentElement('afterend',card);else grid.appendChild(card);card.onclick=()=>openQuestModal()}
    return card;
  }
  function renderQuestHubCard(){
    const card=ensureQuestHubCard();if(!card)return;const ready=questSeries.filter(questReady).length,complete=completedChainSteps();
    card.innerHTML=`<span class="quest-hub-icon">☑</span><span class="quest-ready-badge ${ready?'':'zero'}">${ready}</span><b>Quests</b><small>${ready?ready+' reward'+(ready===1?'':'s')+' ready to claim':complete+'/'+totalChainSteps()+' quest steps complete'}</small>`;
  }
  function ensureQuestModal(){
    let modal=document.querySelector('#questModal');if(modal)return modal;modal=document.createElement('div');modal.id='questModal';modal.className='quest-modal hidden';modal.innerHTML=`<div class="quest-shell"><button id="questCloseBtn" class="quest-close">×</button><div class="quest-screen-head"><div class="quest-crest">☑</div><h2>Warden Quests</h2><p>Each completed quest advances into a tougher version. XP rewards are granted to every beast you own.</p></div><div id="questOverview" class="quest-overview"></div><div id="questFullList" class="quest-current-grid"></div></div>`;document.body.appendChild(modal);modal.querySelector('#questCloseBtn').onclick=()=>closeQuestModal();modal.addEventListener('pointerdown',e=>{if(e.target===modal)closeQuestModal()});return modal;
  }
  function openQuestModal(){renderQuests();ensureQuestModal().classList.remove('hidden')}
  function closeQuestModal(){document.querySelector('#questModal')?.classList.add('hidden')}

  function renderQuests(){
    ensureProgression();const modal=ensureQuestModal(),overview=modal.querySelector('#questOverview'),list=modal.querySelector('#questFullList'),ready=questSeries.filter(questReady).length;
    overview.innerHTML=`<div><small>TOTAL STARS</small><b>${totalStars()}</b></div><div><small>REWARDS READY</small><b>${ready}</b></div><div><small>QUEST STEPS</small><b>${completedChainSteps()}/${totalChainSteps()}</b></div>`;
    list.innerHTML=questSeries.map(series=>{
      const q=currentQuest(series),idx=chainIndex(series),dots=series.goals.map((_,i)=>`<span class="quest-tier-dot ${i<idx?'done':i===idx?'current':''}"></span>`).join('');
      if(!q)return `<div class="quest-chain-card finished"><div class="quest-chain-head"><span>${series.icon}</span><div><b>${series.name}</b><small>CHAIN COMPLETE</small></div><div class="quest-tier-path">${dots}</div></div><h3>Mastered</h3><p>Every challenge in this quest chain has been completed.</p></div>`;
      const value=Math.min(q.goal,questValue(series)),done=value>=q.goal,pct=Math.round(value/q.goal*100),rtext=rewardText(q.reward);
      return `<div class="quest-chain-card ${done?'ready':''}"><div class="quest-chain-head"><span>${series.icon}</span><div><b>${series.name}</b><small>STEP ${idx+1} OF ${series.goals.length}</small></div><div class="quest-tier-path">${dots}</div></div><h3>${q.name}</h3><p>${series.desc(q.goal)}</p><div class="quest-progress"><span style="width:${pct}%"></span></div><div class="quest-footer"><small>${value.toLocaleString()}/${q.goal.toLocaleString()} • ${rtext}</small><button class="quest-claim" data-series="${series.id}" ${done?'':'disabled'}>${done?'CLAIM & ADVANCE':'IN PROGRESS'}</button></div></div>`;
    }).join('');
    list.querySelectorAll('.quest-claim:not(:disabled)').forEach(btn=>btn.onclick=()=>claimQuest(btn.dataset.series));renderQuestHubCard();
  }

  function showQuestEggReward(result){if(!result)return;const {id,isNew,tier='Common'}=result,b=beasts[id];$('#eggResultTitle').textContent='Quest Reward • '+tier+' Egg';$('#eggResultSprite').src=b.sprite;$('#eggResultName').textContent=b.name;const a=ascension(id),need=ascensionNeed(id),held=copies(id);$('#eggResultText').textContent=isNew?b.name+' hatched from your quest reward and joined your Beast Vault.':b.name+' duplicate hatched. You now have '+held+(a<3?'/'+need:'')+' copies towards the next Ascension.';$('#eggModal').classList.remove('hidden')}
  function claimQuest(seriesId){
    ensureProgression();const series=questSeries.find(s=>s.id===seriesId),q=series&&currentQuest(series);if(!series||!q||questValue(series)<q.goal)return;
    const owned=(save.unlocked||[]).filter(id=>beasts[id]);if(q.reward.xp&&owned.length)addXP(owned,q.reward.xp);if(q.reward.essence)save.essence+=q.reward.essence;
    let egg=null;if(q.reward.egg==='common')egg=rollRewardEgg(commonPool,'Common');if(q.reward.egg==='rare')egg=rollRewardEgg(rarePool,'Rare');if(q.reward.egg==='epic')egg=rollRewardEgg(epicPool,'Epic');
    save.questChains[series.id]=q.index+1;persist();renderQuests();renderQuestHubCard();const next=currentQuest(series);showProgressToast(next?'QUEST ADVANCED':'QUEST CHAIN COMPLETE',next?series.name+' • Next: '+series.desc(next.goal):series.name+' mastered!','levelup');if(egg){closeQuestModal();setTimeout(()=>showQuestEggReward(egg),320)}
  }

  const baseUpdateHub=updateHub;updateHub=function(){const result=baseUpdateHub();renderQuestHubCard();return result};
  const baseRenderCampaignMap=renderCampaignMap;renderCampaignMap=function(){ensureProgression();const result=baseRenderCampaignMap();const rows=[...document.querySelectorAll('.campaign-map .map-stage-row')],visible=levels.filter(l=>levelWorld(l)===campaignWorld);rows.forEach((row,i)=>{const lvl=visible[i],node=row.querySelector('.map-node');if(!lvl||!node)return;let stars=node.querySelector('.stage-stars');if(!stars){stars=document.createElement('div');stars.className='stage-stars';node.appendChild(stars)}const state=save.stageStars[(campaignMode||'normal')+':'+lvl.id]||[false,false,false];stars.innerHTML=state.map(v=>`<span class="${v?'earned':''}">★</span>`).join('')});renderQuestHubCard();return result};

  function renderObjectivePreview(){const shell=document.querySelector('.loadout-card-shell');if(!shell||!pendingLevelId)return;let box=document.querySelector('#stageObjectivePreview');if(!box){box=document.createElement('div');box.id='stageObjectivePreview';box.className='stage-objectives';const grid=document.querySelector('#loadoutGrid');shell.insertBefore(box,grid)}const lvl=levels.find(x=>x.id===pendingLevelId),mode=pendingMode||campaignMode||'normal',state=lvl?(save.stageStars[mode+':'+lvl.id]||[false,false,false]):[false,false,false];box.innerHTML=`<b>3-STAR OBJECTIVES</b><div class="objective-row"><span class="objective-chip ${state[0]?'earned':''}">${state[0]?'★':'☆'} Clear the stage</span><span class="objective-chip ${state[1]?'earned':''}">${state[1]?'★':'☆'} Finish with 15+ lives</span><span class="objective-chip ${state[2]?'earned':''}">${state[2]?'★':'☆'} No beasts sold</span></div>`}
  const baseRenderLoadoutPicker=renderLoadoutPicker;renderLoadoutPicker=function(){const result=baseRenderLoadoutPicker();renderObjectivePreview();return result};
  const baseReset=reset;reset=function(){soldThisBattle=0;return baseReset()};
  const sellBtn=document.querySelector('#sellTowerBtn');if(sellBtn)sellBtn.addEventListener('pointerdown',()=>{if(selectedTower&&towers.includes(selectedTower))soldThisBattle++},{capture:true});
  function activeSynergyCount(){try{return window.BeastwardSynergies?.active?.().length||0}catch(_){return 0}}
  function awardStageStars(){ensureProgression();const key=starKey(),previous=save.stageStars[key]||[false,false,false],earned=[true,lives>=15,soldThisBattle===0],merged=previous.map((v,i)=>v||earned[i]);save.stageStars[key]=merged;return {earned,merged,newStars:merged.filter((v,i)=>v&&!previous[i]).length}}

  const baseFinish=finish;finish=function(win){
    const killsBefore=battleReport?.kills||0,bossBefore=!!battleReport?.bossDefeated,synergyCount=activeSynergyCount(),teamSize=(battleLoadout||[]).length,modeBefore=battleMode;const result=baseFinish(win);ensureProgression();save.questStats.kills=(save.questStats.kills||0)+killsBefore;let starResult=null;
    if(win){save.questStats.clears++;starResult=awardStageStars();if(starResult.earned.every(Boolean))save.questStats.perfects++;if(synergyCount>=2)save.questStats.synergyWins++;if(bossBefore)save.questStats.bosses++;if(teamSize===1&&starResult.earned.every(Boolean))save.questStats.oneBeastPerfects++;if(lives===20)save.questStats.flawlessWins++;if(modeBefore==='hard'){save.questStats.hardWins++;if(starResult.earned.every(Boolean))save.questStats.hardPerfects++}}
    persist();renderCampaignMap();renderQuestHubCard();const card=document.querySelector('.result-report-card');if(card){let stars=card.querySelector('#resultStars');if(!stars){stars=document.createElement('div');stars.id='resultStars';stars.className='result-stars';const summary=document.querySelector('#battleSummary');card.insertBefore(stars,summary)}if(win&&starResult){stars.style.display='block';stars.innerHTML=`<b>${starCount()}/3 STAGE STARS${starResult.newStars?' • +'+starResult.newStars+' NEW':''}</b><div class="result-star-row">${starResult.merged.map(v=>`<span class="${v?'earned':''}">★</span>`).join('')}</div><div class="result-objectives"><span class="done">✓ Clear the stage</span><span class="${lives>=15?'done':''}">${lives>=15?'✓':'○'} Finish with 15+ lives</span><span class="${soldThisBattle===0?'done':''}">${soldThisBattle===0?'✓':'○'} No beasts sold</span>${teamSize===1&&starResult.earned.every(Boolean)?'<span class="done">♞ Lone Guardian challenge complete</span>':''}</div>`}else stars.style.display='none'}
    const ready=questSeries.filter(questReady).length;if(ready)setTimeout(()=>showProgressToast('QUEST REWARD READY',ready+' quest chain'+(ready===1?' has':'s have')+' a reward ready.','evolution'),500);return result;
  };

  ensureQuestHubCard();ensureQuestModal();renderQuestHubCard();renderCampaignMap();
})();