// Beastward stage stars + Warden quests v3
(() => {
  let soldThisBattle=0;

  const questSeries=[
    {name:'Campaign Defender',icon:'⚔',quests:[
      {id:'first-defence',tier:'I',name:'First Defence',desc:'Clear 1 campaign stage.',kind:'clears',goal:1,reward:{xp:60,essence:75},rewardText:'60 Team XP • 75 Essence'},
      {id:'defender-ii',tier:'II',name:'Seasoned Defender',desc:'Clear 5 campaign stages.',kind:'clears',goal:5,reward:{xp:140,essence:175},rewardText:'140 Team XP • 175 Essence'},
      {id:'defender-iii',tier:'III',name:'Veteran Defender',desc:'Clear 15 campaign stages.',kind:'clears',goal:15,reward:{xp:250,egg:'rare'},rewardText:'250 Team XP • Rare Egg'}
    ]},
    {name:'Enemy Hunter',icon:'☠',quests:[
      {id:'battle-hardened',tier:'I',name:'Battle Hardened',desc:'Defeat 100 enemies across campaign battles.',kind:'kills',goal:100,reward:{xp:150,essence:150},rewardText:'150 Team XP • 150 Essence'},
      {id:'hunter-ii',tier:'II',name:'Path Cleaner',desc:'Defeat 500 enemies.',kind:'kills',goal:500,reward:{xp:250,egg:'common'},rewardText:'250 Team XP • Common Egg'},
      {id:'hunter-iii',tier:'III',name:'Beastward Vanguard',desc:'Defeat 1,500 enemies.',kind:'kills',goal:1500,reward:{xp:400,egg:'rare'},rewardText:'400 Team XP • Rare Egg'}
    ]},
    {name:'Star Warden',icon:'★',quests:[
      {id:'perfect-warden',tier:'I',name:'Perfect Warden',desc:'Earn all 3 stars on 1 stage.',kind:'perfects',goal:1,reward:{egg:'common'},rewardText:'Common Egg'},
      {id:'star-warden-ii',tier:'II',name:'Golden Path',desc:'3-star 5 different stage clears.',kind:'perfects',goal:5,reward:{xp:250,essence:250},rewardText:'250 Team XP • 250 Essence'},
      {id:'star-warden-iii',tier:'III',name:'Constellation',desc:'3-star 12 different stage clears.',kind:'perfects',goal:12,reward:{xp:400,egg:'epic'},rewardText:'400 Team XP • Epic Egg'}
    ]},
    {name:'Synergy Trials',icon:'✦',quests:[
      {id:'synergy-master',tier:'I',name:'Synergy Master',desc:'Win 1 stage with at least 2 team synergies active.',kind:'synergyWins',goal:1,reward:{egg:'rare'},rewardText:'Rare Egg'},
      {id:'synergy-ii',tier:'II',name:'Primal Harmony',desc:'Win 5 stages with at least 2 synergies active.',kind:'synergyWins',goal:5,reward:{xp:300,essence:250},rewardText:'300 Team XP • 250 Essence'},
      {id:'synergy-iii',tier:'III',name:'Perfect Resonance',desc:'Win 12 stages with at least 2 synergies active.',kind:'synergyWins',goal:12,reward:{xp:450,egg:'epic'},rewardText:'450 Team XP • Epic Egg'}
    ]},
    {name:'Boss Hunter',icon:'◆',quests:[
      {id:'regional-guardian',tier:'I',name:'Regional Guardian',desc:'Defeat a regional boss.',kind:'bosses',goal:1,reward:{xp:250,egg:'rare'},rewardText:'250 Team XP • Rare Egg'},
      {id:'boss-hunter-ii',tier:'II',name:'Alpha Breaker',desc:'Defeat regional bosses 3 times.',kind:'bosses',goal:3,reward:{xp:350,essence:350},rewardText:'350 Team XP • 350 Essence'},
      {id:'boss-hunter-iii',tier:'III',name:'Apex Warden',desc:'Defeat regional bosses 6 times.',kind:'bosses',goal:6,reward:{xp:500,egg:'epic'},rewardText:'500 Team XP • Epic Egg'}
    ]},
    {name:'Lone Guardian',icon:'♞',quests:[
      {id:'lone-guardian-i',tier:'I',name:'One Beast Army',desc:'Earn all 3 stars in a single run using only 1 beast.',kind:'oneBeastPerfects',goal:1,reward:{xp:300,egg:'rare'},rewardText:'300 Team XP • Rare Egg'},
      {id:'lone-guardian-ii',tier:'II',name:'Solitary Warden',desc:'3-star 3 runs using only 1 beast.',kind:'oneBeastPerfects',goal:3,reward:{xp:450,essence:400},rewardText:'450 Team XP • 400 Essence'},
      {id:'lone-guardian-iii',tier:'III',name:'Legend Alone',desc:'3-star 7 runs using only 1 beast.',kind:'oneBeastPerfects',goal:7,reward:{xp:650,egg:'epic'},rewardText:'650 Team XP • Epic Egg'}
    ]},
    {name:'Untouchable Core',icon:'◇',quests:[
      {id:'untouched-i',tier:'I',name:'Untouched',desc:'Win a stage without losing a single life.',kind:'flawlessWins',goal:1,reward:{xp:180,essence:150},rewardText:'180 Team XP • 150 Essence'},
      {id:'untouched-ii',tier:'II',name:'Perfect Defence',desc:'Win 3 stages without losing a life.',kind:'flawlessWins',goal:3,reward:{xp:300,egg:'rare'},rewardText:'300 Team XP • Rare Egg'},
      {id:'untouched-iii',tier:'III',name:'Unbreakable Core',desc:'Win 8 stages without losing a life.',kind:'flawlessWins',goal:8,reward:{xp:500,egg:'epic'},rewardText:'500 Team XP • Epic Egg'}
    ]},
    {name:'Hard Mode Trials',icon:'!',quests:[
      {id:'hard-trial-i',tier:'I',name:'Into the Wild',desc:'Clear 1 Hard Mode stage.',kind:'hardWins',goal:1,reward:{xp:250,essence:250},rewardText:'250 Team XP • 250 Essence'},
      {id:'hard-trial-ii',tier:'II',name:'Hard Perfection',desc:'Earn all 3 stars in a single Hard Mode run.',kind:'hardPerfects',goal:1,reward:{xp:400,egg:'rare'},rewardText:'400 Team XP • Rare Egg'},
      {id:'hard-trial-iii',tier:'III',name:'Warden Unbound',desc:'3-star 5 Hard Mode runs.',kind:'hardPerfects',goal:5,reward:{xp:700,egg:'epic'},rewardText:'700 Team XP • Epic Egg'}
    ]}
  ];
  const quests=questSeries.flatMap(s=>s.quests.map(q=>({...q,series:s.name,seriesIcon:s.icon})));

  function ensureProgression(){
    save.stageStars=save.stageStars||{};
    save.questStats=save.questStats||{};
    ['kills','clears','perfects','synergyWins','bosses','oneBeastPerfects','flawlessWins','hardWins','hardPerfects'].forEach(k=>{if(save.questStats[k]===undefined)save.questStats[k]=0});
    save.claimedQuests=save.claimedQuests||[];
    return save;
  }
  ensureProgression();

  const style=document.createElement('style');
  style.textContent=`
    .stage-stars{margin-top:5px;font-size:12px;letter-spacing:2px;color:#56665b}.stage-stars .earned{color:#f1cf61;text-shadow:0 0 7px #d7ad3955}
    .stage-objectives{margin:8px 0 10px;padding:10px;border-radius:10px;background:#101d17;border:1px solid #ffffff14}.stage-objectives>b{display:block;color:#e9d16f;font-size:11px;letter-spacing:.1em;margin-bottom:7px}.objective-row{display:flex;gap:6px;flex-wrap:wrap}.objective-chip{padding:5px 7px;border-radius:7px;background:#ffffff08;color:#9fb0a5;font-size:9px;border:1px solid #ffffff0c}.objective-chip.earned{color:#e6e89d;background:#32431f;border-color:#d0c45344}
    .quests-card{grid-column:3;grid-row:2;background:linear-gradient(145deg,#263f32,#172a21)!important;position:relative}.quests-card .quest-hub-icon{font-size:48px;color:#efd36d}.quests-card .quest-ready-badge{position:absolute;right:18px;top:18px;min-width:28px;height:28px;padding:0 8px;border-radius:99px;display:grid;place-items:center;background:#e7c75c;color:#172017;font-size:12px;font-weight:900;box-shadow:0 0 18px #e7c75c44}.quests-card .quest-ready-badge.zero{background:#30473a;color:#a9b7ad;box-shadow:none}
    .quest-modal{position:fixed;inset:0;z-index:80;background:#020805d9;display:grid;place-items:center;padding:18px}.quest-modal.hidden{display:none}.quest-shell{width:min(1050px,96vw);max-height:90vh;overflow:auto;border:1px solid #566f5d;border-radius:22px;padding:24px;background:linear-gradient(145deg,#1d3427,#0d1d15);box-shadow:0 28px 80px #000c;position:relative}.quest-close{position:absolute;right:18px;top:16px;width:38px;height:38px;border-radius:50%;border:1px solid #6c826f;background:#15261d;color:#f2dc86;font-size:22px;cursor:pointer}.quest-screen-head{text-align:center;margin-bottom:18px}.quest-screen-head .quest-crest{font-size:34px;color:#ead06d}.quest-screen-head h2{font-family:Georgia,serif;color:#efd36d;margin:5px 0}.quest-screen-head p{color:#aebbb2;margin:0}.quest-overview{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0 20px}.quest-overview>div{padding:10px;border-radius:10px;background:#ffffff08;text-align:center}.quest-overview small{display:block;color:#9fb0a5;font-size:9px}.quest-overview b{display:block;color:#efd36d;font-size:19px;margin-top:2px}
    .quest-series{margin:0 0 14px;padding:12px;border-radius:14px;background:#08150fcc;border:1px solid #ffffff12}.quest-series-head{display:flex;align-items:center;gap:9px;margin-bottom:9px}.quest-series-head span{font-size:20px}.quest-series-head b{color:#e9d275;font-size:13px;letter-spacing:.08em}.quest-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.quest-card{padding:10px;border-radius:10px;background:#12251b;border:1px solid #ffffff12;position:relative}.quest-card.locked-tier{opacity:.48}.quest-card.complete{border-color:#d6b75566;background:#182719}.quest-card.claimed{opacity:.55}.quest-card b{display:block;color:#e9e2bd;font-size:12px;padding-right:34px}.quest-card .tier-badge{position:absolute;right:8px;top:8px;padding:3px 6px;border-radius:6px;background:#273c2f;color:#d9c66e;font-size:9px;font-weight:900}.quest-card p{margin:4px 0;color:#aab8ae;font-size:10px;line-height:1.35;min-height:28px}.quest-progress{height:6px;border-radius:6px;background:#07100b;overflow:hidden;margin:7px 0}.quest-progress>span{display:block;height:100%;background:#d6b755}.quest-footer{display:flex;justify-content:space-between;align-items:center;gap:8px}.quest-footer small{color:#dfc96c;font-size:9px}.quest-claim{border:0;border-radius:7px;padding:6px 9px;background:#d7bd5d;color:#182017;font-weight:800;font-size:9px;cursor:pointer}.quest-claim:disabled{background:#27372e;color:#87978c;cursor:default}
    .result-stars{margin:12px 0;padding:10px;border-radius:10px;background:#0b1711;border:1px solid #ffffff18;text-align:center}.result-stars b{display:block;color:#f0d374;margin-bottom:6px}.result-star-row{font-size:24px;letter-spacing:7px;color:#405047}.result-star-row .earned{color:#f2cf58;text-shadow:0 0 10px #f2cf5866}.result-objectives{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:6px}.result-objectives span{font-size:9px;padding:4px 6px;border-radius:6px;background:#ffffff09;color:#9eada3}.result-objectives span.done{color:#dfe99b;background:#35461f}
    @media(max-width:760px){.quests-card{grid-column:auto;grid-row:auto}.quest-list{grid-template-columns:1fr}.quest-overview{grid-template-columns:1fr 1fr}.quest-shell{padding:18px 12px;max-height:92vh}.quest-card p{min-height:0}}
  `;
  document.head.appendChild(style);

  function starKey(level=currentLevel,mode=battleMode){return mode+':'+level.id}
  function starState(level=currentLevel,mode=battleMode){ensureProgression();return save.stageStars[starKey(level,mode)]||[false,false,false]}
  function starCount(level=currentLevel,mode=battleMode){return starState(level,mode).filter(Boolean).length}
  function totalStars(){ensureProgression();return Object.values(save.stageStars).reduce((n,s)=>n+(Array.isArray(s)?s.filter(Boolean).length:0),0)}
  function questValue(q){ensureProgression();return Math.min(q.goal,Number(save.questStats[q.kind]||0))}
  function questDone(q){return questValue(q)>=q.goal}
  function questClaimable(q){return questDone(q)&&!save.claimedQuests.includes(q.id)}
  function tierUnlocked(series,index){return index===0||save.claimedQuests.includes(series.quests[index-1].id)}

  function ensureQuestHubCard(){
    const grid=document.querySelector('.hub-grid');if(!grid)return null;
    let card=document.querySelector('#questsHubBtn');
    if(!card){
      card=document.createElement('button');card.id='questsHubBtn';card.className='hub-card quests-card';
      const den=document.querySelector('.den-card');if(den)den.insertAdjacentElement('afterend',card);else grid.appendChild(card);
      card.onclick=()=>openQuestModal();
    }
    return card;
  }
  function renderQuestHubCard(){
    ensureProgression();const card=ensureQuestHubCard();if(!card)return;
    const ready=quests.filter(questClaimable).length,claimed=save.claimedQuests.filter(id=>quests.some(q=>q.id===id)).length;
    card.innerHTML=`<span class="quest-hub-icon">☑</span><span class="quest-ready-badge ${ready?'':'zero'}">${ready}</span><b>Quests</b><small>${ready?ready+' reward'+(ready===1?'':'s')+' ready to claim':claimed+'/'+quests.length+' rewards claimed'}</small>`;
  }

  function ensureQuestModal(){
    let modal=document.querySelector('#questModal');if(modal)return modal;
    modal=document.createElement('div');modal.id='questModal';modal.className='quest-modal hidden';
    modal.innerHTML=`<div class="quest-shell"><button id="questCloseBtn" class="quest-close">×</button><div class="quest-screen-head"><div class="quest-crest">☑</div><h2>Warden Quests</h2><p>Complete trials, master stages and earn Beast XP, Essence and Eggs.</p></div><div id="questOverview" class="quest-overview"></div><div id="questFullList"></div></div>`;
    document.body.appendChild(modal);modal.querySelector('#questCloseBtn').onclick=()=>closeQuestModal();modal.addEventListener('pointerdown',e=>{if(e.target===modal)closeQuestModal()});return modal;
  }
  function openQuestModal(){renderQuests();ensureQuestModal().classList.remove('hidden')}
  function closeQuestModal(){document.querySelector('#questModal')?.classList.add('hidden')}

  function renderQuests(){
    ensureProgression();const modal=ensureQuestModal(),overview=modal.querySelector('#questOverview'),list=modal.querySelector('#questFullList');
    const ready=quests.filter(questClaimable).length,claimed=save.claimedQuests.filter(id=>quests.some(q=>q.id===id)).length;
    overview.innerHTML=`<div><small>TOTAL STARS</small><b>${totalStars()}</b></div><div><small>REWARDS READY</small><b>${ready}</b></div><div><small>QUESTS CLAIMED</small><b>${claimed}/${quests.length}</b></div>`;
    list.innerHTML=questSeries.map(series=>`<section class="quest-series"><div class="quest-series-head"><span>${series.icon}</span><b>${series.name.toUpperCase()}</b></div><div class="quest-list">${series.quests.map((q,index)=>{
      const value=questValue(q),done=value>=q.goal,claimedQ=save.claimedQuests.includes(q.id),unlocked=tierUnlocked(series,index),pct=Math.round(value/q.goal*100);
      return `<div class="quest-card ${done?'complete':''} ${claimedQ?'claimed':''} ${unlocked?'':'locked-tier'}"><span class="tier-badge">TIER ${q.tier}</span><b>${claimedQ?'✓ ':''}${q.name}</b><p>${q.desc}</p><div class="quest-progress"><span style="width:${pct}%"></span></div><div class="quest-footer"><small>${value}/${q.goal} • ${q.rewardText}</small><button class="quest-claim" data-quest="${q.id}" ${!done||claimedQ||!unlocked?'disabled':''}>${claimedQ?'CLAIMED':!unlocked?'LOCKED':done?'CLAIM':'IN PROGRESS'}</button></div></div>`;
    }).join('')}</div></section>`).join('');
    list.querySelectorAll('.quest-claim:not(:disabled)').forEach(btn=>btn.onclick=()=>claimQuest(btn.dataset.quest));renderQuestHubCard();
  }

  function showQuestEggReward(result){
    if(!result)return;const {id,isNew,tier='Common'}=result,b=beasts[id];
    $('#eggResultTitle').textContent='Quest Reward • '+tier+' Egg';$('#eggResultSprite').src=b.sprite;$('#eggResultName').textContent=b.name;
    const a=ascension(id),need=ascensionNeed(id),held=copies(id);$('#eggResultText').textContent=isNew?b.name+' hatched from your quest reward and joined your Beast Vault.':b.name+' duplicate hatched. You now have '+held+(a<3?'/'+need:'')+' copies towards the next Ascension.';$('#eggModal').classList.remove('hidden');
  }
  function teamForReward(){const last=(save.lastLoadout||[]).filter(id=>save.unlocked.includes(id)).slice(0,4);return last.length?last:save.unlocked.slice(0,4)}
  function claimQuest(id){
    ensureProgression();const q=quests.find(x=>x.id===id);if(!q||save.claimedQuests.includes(id)||!questDone(q))return;
    const series=questSeries.find(s=>s.quests.some(x=>x.id===id)),index=series?.quests.findIndex(x=>x.id===id)??0;if(series&&!tierUnlocked(series,index))return;
    save.claimedQuests.push(id);const team=teamForReward();if(q.reward.xp&&team.length)addXP(team,q.reward.xp);if(q.reward.essence)save.essence+=q.reward.essence;
    let egg=null;if(q.reward.egg==='common')egg=rollRewardEgg(commonPool,'Common');if(q.reward.egg==='rare')egg=rollRewardEgg(rarePool,'Rare');if(q.reward.egg==='epic')egg=rollRewardEgg(epicPool,'Epic');
    persist();renderQuests();showProgressToast('QUEST REWARD CLAIMED',q.name+' • '+q.rewardText,'levelup');if(egg){closeQuestModal();setTimeout(()=>showQuestEggReward(egg),320)}
  }

  const baseUpdateHub=updateHub;updateHub=function(){const result=baseUpdateHub();renderQuestHubCard();return result};

  const baseRenderCampaignMap=renderCampaignMap;
  renderCampaignMap=function(){
    ensureProgression();const result=baseRenderCampaignMap();const rows=[...document.querySelectorAll('.campaign-map .map-stage-row')],visible=levels.filter(l=>levelWorld(l)===campaignWorld);
    rows.forEach((row,i)=>{const lvl=visible[i],node=row.querySelector('.map-node');if(!lvl||!node)return;let stars=node.querySelector('.stage-stars');if(!stars){stars=document.createElement('div');stars.className='stage-stars';node.appendChild(stars)}const state=save.stageStars[(campaignMode||'normal')+':'+lvl.id]||[false,false,false];stars.innerHTML=state.map(v=>`<span class="${v?'earned':''}">★</span>`).join('')});
    renderQuestHubCard();return result;
  };

  function renderObjectivePreview(){
    const shell=document.querySelector('.loadout-card-shell');if(!shell||!pendingLevelId)return;let box=document.querySelector('#stageObjectivePreview');if(!box){box=document.createElement('div');box.id='stageObjectivePreview';box.className='stage-objectives';const grid=document.querySelector('#loadoutGrid');shell.insertBefore(box,grid)}
    const lvl=levels.find(x=>x.id===pendingLevelId),mode=pendingMode||campaignMode||'normal',state=lvl?(save.stageStars[mode+':'+lvl.id]||[false,false,false]):[false,false,false];box.innerHTML=`<b>3-STAR OBJECTIVES</b><div class="objective-row"><span class="objective-chip ${state[0]?'earned':''}">${state[0]?'★':'☆'} Clear the stage</span><span class="objective-chip ${state[1]?'earned':''}">${state[1]?'★':'☆'} Finish with 15+ lives</span><span class="objective-chip ${state[2]?'earned':''}">${state[2]?'★':'☆'} No beasts sold</span></div>`;
  }
  const baseRenderLoadoutPicker=renderLoadoutPicker;renderLoadoutPicker=function(){const result=baseRenderLoadoutPicker();renderObjectivePreview();return result};

  const baseReset=reset;reset=function(){soldThisBattle=0;return baseReset()};
  const sellBtn=document.querySelector('#sellTowerBtn');if(sellBtn)sellBtn.addEventListener('pointerdown',()=>{if(selectedTower&&towers.includes(selectedTower))soldThisBattle++},{capture:true});
  function activeSynergyCount(){try{return window.BeastwardSynergies?.active?.().length||0}catch(_){return 0}}
  function awardStageStars(){ensureProgression();const key=starKey(),previous=save.stageStars[key]||[false,false,false],earned=[true,lives>=15,soldThisBattle===0],merged=previous.map((v,i)=>v||earned[i]);save.stageStars[key]=merged;return {earned,merged,newStars:merged.filter((v,i)=>v&&!previous[i]).length}}

  const baseFinish=finish;
  finish=function(win){
    const killsBefore=battleReport?.kills||0,bossBefore=!!battleReport?.bossDefeated,synergyCount=activeSynergyCount(),teamSize=(battleLoadout||[]).length,modeBefore=battleMode;const result=baseFinish(win);ensureProgression();save.questStats.kills=(save.questStats.kills||0)+killsBefore;let starResult=null;
    if(win){
      save.questStats.clears++;starResult=awardStageStars();
      if(starResult.earned.every(Boolean))save.questStats.perfects++;
      if(synergyCount>=2)save.questStats.synergyWins++;
      if(bossBefore)save.questStats.bosses++;
      if(teamSize===1&&starResult.earned.every(Boolean))save.questStats.oneBeastPerfects++;
      if(lives===20)save.questStats.flawlessWins++;
      if(modeBefore==='hard'){save.questStats.hardWins++;if(starResult.earned.every(Boolean))save.questStats.hardPerfects++}
    }
    persist();renderCampaignMap();renderQuestHubCard();const card=document.querySelector('.result-report-card');
    if(card){let stars=card.querySelector('#resultStars');if(!stars){stars=document.createElement('div');stars.id='resultStars';stars.className='result-stars';const summary=document.querySelector('#battleSummary');card.insertBefore(stars,summary)}if(win&&starResult){stars.style.display='block';stars.innerHTML=`<b>${starCount()}/3 STAGE STARS${starResult.newStars?' • +'+starResult.newStars+' NEW':''}</b><div class="result-star-row">${starResult.merged.map(v=>`<span class="${v?'earned':''}">★</span>`).join('')}</div><div class="result-objectives"><span class="done">✓ Clear the stage</span><span class="${lives>=15?'done':''}">${lives>=15?'✓':'○'} Finish with 15+ lives</span><span class="${soldThisBattle===0?'done':''}">${soldThisBattle===0?'✓':'○'} No beasts sold</span>${teamSize===1&&starResult.earned.every(Boolean)?'<span class="done">♞ Lone Guardian challenge complete</span>':''}</div>`}else stars.style.display='none'}
    const ready=quests.filter(questClaimable).length;if(ready)setTimeout(()=>showProgressToast('QUEST REWARD READY',ready+' quest reward'+(ready===1?' is':'s are')+' ready in the Sanctuary.','evolution'),500);return result;
  };

  ensureQuestHubCard();ensureQuestModal();renderQuestHubCard();renderCampaignMap();
})();
