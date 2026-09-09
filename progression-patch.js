// Beastward stage stars + quests v1
(() => {
  let soldThisBattle=0;

  const quests=[
    {id:'first-defence',name:'First Defence',desc:'Clear any campaign stage.',kind:'clears',goal:1,reward:{xp:60,essence:75},rewardText:'60 Team XP • 75 Essence'},
    {id:'perfect-warden',name:'Perfect Warden',desc:'Earn all 3 stars on any stage.',kind:'perfects',goal:1,reward:{egg:'common'},rewardText:'Common Egg'},
    {id:'battle-hardened',name:'Battle Hardened',desc:'Defeat 100 enemies across campaign battles.',kind:'kills',goal:100,reward:{xp:150,essence:150},rewardText:'150 Team XP • 150 Essence'},
    {id:'synergy-master',name:'Synergy Master',desc:'Win a stage with at least 2 team synergies active.',kind:'synergyWins',goal:1,reward:{egg:'rare'},rewardText:'Rare Egg'},
    {id:'regional-guardian',name:'Regional Guardian',desc:'Defeat a regional boss.',kind:'bosses',goal:1,reward:{xp:250,egg:'rare'},rewardText:'250 Team XP • Rare Egg'}
  ];

  function ensureProgression(){
    save.stageStars=save.stageStars||{};
    save.questStats=save.questStats||{kills:0,clears:0,perfects:0,synergyWins:0,bosses:0};
    save.claimedQuests=save.claimedQuests||[];
    return save;
  }
  ensureProgression();

  const style=document.createElement('style');
  style.textContent=`
    .stage-stars{margin-top:5px;font-size:12px;letter-spacing:2px;color:#56665b}.stage-stars .earned{color:#f1cf61;text-shadow:0 0 7px #d7ad3955}
    .quest-board{margin:14px 0 18px;padding:14px;border-radius:14px;background:#0a1812cc;border:1px solid #ffffff18}
    .quest-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.quest-head b{color:#ead279;letter-spacing:.12em;font-size:13px}.quest-head small{color:#9daf9f}
    .quest-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.quest-card{padding:10px;border-radius:10px;background:#12251b;border:1px solid #ffffff12}
    .quest-card.complete{border-color:#d6b75566;background:#182719}.quest-card.claimed{opacity:.55}.quest-card b{display:block;color:#e9e2bd;font-size:12px}.quest-card p{margin:4px 0;color:#aab8ae;font-size:10px;line-height:1.35}.quest-progress{height:6px;border-radius:6px;background:#07100b;overflow:hidden;margin:7px 0}.quest-progress>span{display:block;height:100%;background:#d6b755}
    .quest-footer{display:flex;justify-content:space-between;align-items:center;gap:8px}.quest-footer small{color:#dfc96c;font-size:9px}.quest-claim{border:0;border-radius:7px;padding:6px 9px;background:#d7bd5d;color:#182017;font-weight:800;font-size:9px;cursor:pointer}.quest-claim:disabled{background:#27372e;color:#87978c;cursor:default}
    .result-stars{margin:12px 0;padding:10px;border-radius:10px;background:#0b1711;border:1px solid #ffffff18;text-align:center}.result-stars b{display:block;color:#f0d374;margin-bottom:6px}.result-star-row{font-size:24px;letter-spacing:7px;color:#405047}.result-star-row .earned{color:#f2cf58;text-shadow:0 0 10px #f2cf5866}.result-objectives{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:6px}.result-objectives span{font-size:9px;padding:4px 6px;border-radius:6px;background:#ffffff09;color:#9eada3}.result-objectives span.done{color:#dfe99b;background:#35461f}
    @media(max-width:760px){.quest-list{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  function starKey(level=currentLevel,mode=battleMode){return mode+':'+level.id}
  function starState(level=currentLevel,mode=battleMode){ensureProgression();return save.stageStars[starKey(level,mode)]||[false,false,false]}
  function starCount(level=currentLevel,mode=battleMode){return starState(level,mode).filter(Boolean).length}

  function renderStars(count){return [0,1,2].map(i=>`<span class="${i<count?'earned':''}">★</span>`).join('')}

  function ensureQuestBoard(){
    const panel=document.querySelector('.campaign-panel');
    if(!panel)return null;
    let board=document.querySelector('#questBoard');
    if(!board){
      board=document.createElement('div');board.id='questBoard';board.className='quest-board';
      const map=document.querySelector('.campaign-map');panel.insertBefore(board,map);
    }
    return board;
  }

  function questValue(q){ensureProgression();return Math.min(q.goal,Number(save.questStats[q.kind]||0))}
  function renderQuests(){
    const board=ensureQuestBoard();if(!board)return;
    const completed=quests.filter(q=>questValue(q)>=q.goal).length;
    board.innerHTML=`<div class="quest-head"><b>WARDEN QUESTS</b><small>${completed}/${quests.length} completed</small></div><div class="quest-list">${quests.map(q=>{
      const value=questValue(q),done=value>=q.goal,claimed=save.claimedQuests.includes(q.id),pct=Math.round(value/q.goal*100);
      return `<div class="quest-card ${done?'complete':''} ${claimed?'claimed':''}"><b>${claimed?'✓ ':''}${q.name}</b><p>${q.desc}</p><div class="quest-progress"><span style="width:${pct}%"></span></div><div class="quest-footer"><small>${value}/${q.goal} • ${q.rewardText}</small><button class="quest-claim" data-quest="${q.id}" ${!done||claimed?'disabled':''}>${claimed?'CLAIMED':done?'CLAIM':'IN PROGRESS'}</button></div></div>`;
    }).join('')}</div>`;
    board.querySelectorAll('.quest-claim:not(:disabled)').forEach(btn=>btn.onclick=()=>claimQuest(btn.dataset.quest));
  }

  function teamForReward(){return (save.lastLoadout||[]).filter(id=>save.unlocked.includes(id)).slice(0,4)}
  function claimQuest(id){
    ensureProgression();const q=quests.find(x=>x.id===id);if(!q||save.claimedQuests.includes(id)||questValue(q)<q.goal)return;
    save.claimedQuests.push(id);
    const team=teamForReward();
    if(q.reward.xp&&team.length)addXP(team,q.reward.xp);
    if(q.reward.essence)save.essence+=q.reward.essence;
    let egg=null;
    if(q.reward.egg==='common')egg=rollRewardEgg(commonPool,'Common');
    if(q.reward.egg==='rare')egg=rollRewardEgg(rarePool,'Rare');
    persist();renderQuests();
    showProgressToast('QUEST COMPLETE',q.name+' • '+q.rewardText,'levelup');
    if(egg)setTimeout(()=>showBossEggReward(egg),320);
  }

  const baseRenderCampaignMap=renderCampaignMap;
  renderCampaignMap=function(){
    ensureProgression();const result=baseRenderCampaignMap();
    const rows=[...document.querySelectorAll('.campaign-map .map-stage-row')];
    const visible=levels.filter(l=>levelWorld(l)===campaignWorld);
    rows.forEach((row,i)=>{
      const lvl=visible[i],node=row.querySelector('.map-node');if(!lvl||!node)return;
      let stars=node.querySelector('.stage-stars');if(!stars){stars=document.createElement('div');stars.className='stage-stars';node.appendChild(stars)}
      const state=save.stageStars[(campaignMode||'normal')+':'+lvl.id]||[false,false,false];
      stars.innerHTML=state.map(v=>`<span class="${v?'earned':''}">★</span>`).join('');
    });
    renderQuests();return result;
  };

  const baseReset=reset;
  reset=function(){soldThisBattle=0;return baseReset()};

  const sellBtn=document.querySelector('#sellTowerBtn');
  if(sellBtn)sellBtn.addEventListener('pointerdown',()=>{if(selectedTower&&towers.includes(selectedTower))soldThisBattle++},{capture:true});

  function activeSynergyCount(){
    try{return window.BeastwardSynergies?.active?.().length||0}catch(_){return 0}
  }

  function awardStageStars(){
    ensureProgression();const key=starKey(),previous=save.stageStars[key]||[false,false,false];
    const earned=[true,lives>=15,soldThisBattle===0];
    const merged=previous.map((v,i)=>v||earned[i]);
    save.stageStars[key]=merged;
    return {earned,merged,newStars:merged.filter((v,i)=>v&&!previous[i]).length};
  }

  const baseFinish=finish;
  finish=function(win){
    const killsBefore=battleReport?.kills||0;
    const bossBefore=!!battleReport?.bossDefeated;
    const synergyCount=activeSynergyCount();
    const result=baseFinish(win);
    ensureProgression();
    save.questStats.kills=(save.questStats.kills||0)+killsBefore;
    let starResult=null;
    if(win){
      save.questStats.clears=(save.questStats.clears||0)+1;
      starResult=awardStageStars();
      if(starResult.merged.every(Boolean))save.questStats.perfects=Math.max(1,save.questStats.perfects||0);
      if(synergyCount>=2)save.questStats.synergyWins=(save.questStats.synergyWins||0)+1;
      if(bossBefore)save.questStats.bosses=(save.questStats.bosses||0)+1;
    }
    persist();renderCampaignMap();
    const card=document.querySelector('.result-report-card');
    if(card){
      let stars=card.querySelector('#resultStars');if(!stars){stars=document.createElement('div');stars.id='resultStars';stars.className='result-stars';const summary=document.querySelector('#battleSummary');card.insertBefore(stars,summary)}
      if(win&&starResult){
        stars.style.display='block';stars.innerHTML=`<b>${starCount()}/3 STAGE STARS</b><div class="result-star-row">${starResult.merged.map(v=>`<span class="${v?'earned':''}">★</span>`).join('')}</div><div class="result-objectives"><span class="done">✓ Clear the stage</span><span class="${lives>=15?'done':''}">${lives>=15?'✓':'○'} Finish with 15+ lives</span><span class="${soldThisBattle===0?'done':''}">${soldThisBattle===0?'✓':'○'} No beasts sold</span></div>`;
      }else stars.style.display='none';
    }
    renderQuests();return result;
  };

  renderCampaignMap();
})();
