// Beastward campaign progression rebalance v1
// Normal campaign = full Lv1-100 journey. Hard Mode unlocks only after 10-10.
(()=>{
  const VERSION='20260911-progression-v1';

  // ---- XP curve ----
  // ~193k XP from Lv1->100. Early levels move quickly, later levels become meaningful.
  xpNeeded=function(level){
    level=Math.max(1,Math.min(99,Math.floor(level||1)));
    return Math.round(60 + 8*level + 0.45*level*level);
  };

  function totalXpToLevel(level){
    let total=0;
    for(let l=1;l<Math.max(1,Math.min(100,level));l++) total+=xpNeeded(l);
    return total;
  }
  function targetLevelAfterStage(id){
    id=Math.max(0,Math.min(100,id||0));
    if(id===0)return 1;
    if(id<=10)return 1 + (14*id/10);          // Region 1 ends ~Lv15
    if(id<=90)return 15 + (id-10);            // Regions 2-9 add ~10 levels each
    return 95 + ((id-90)*0.5);                // Region 10 ends at Lv100
  }
  function totalXpAtFractionalLevel(level){
    if(level<=1)return 0;
    if(level>=100)return totalXpToLevel(100);
    const whole=Math.floor(level),fraction=level-whole;
    return totalXpToLevel(whole)+Math.round(xpNeeded(whole)*fraction);
  }
  function stageFirstClearXp(id){
    const a=totalXpAtFractionalLevel(targetLevelAfterStage(id-1));
    const b=totalXpAtFractionalLevel(targetLevelAfterStage(id));
    return Math.max(40,b-a);
  }

  // ---- Player power curve ----
  // Levels help, but no longer multiply tower damage so aggressively that content becomes trivial.
  levelMultiplier=function(id){
    const l=progress(id).level,a=ascension(id);
    const levelGrowth=(l-1)*0.0075;
    const evolutionBonus=(l>=FIRST_EVOLUTION_LEVEL?.08:0)+(l>=SECOND_EVOLUTION_LEVEL?.12:0);
    return (1+levelGrowth+evolutionBonus)*(1+a*.06);
  };

  // ---- Campaign difficulty curve ----
  // Rebuild all 100 normal stages around their intended campaign level instead of separate ad-hoc HP jumps.
  levels.forEach(lvl=>{
    const target=targetLevelAfterStage(lvl.id);
    const centre=Math.max(1,Math.min(100,Math.round(target)));
    lvl.expectedLevel=[Math.max(1,centre-2),Math.min(100,centre+2)];
    // Smooth HP curve: 1-1 remains approachable, 10-10 is an endgame check without absurd sponge HP.
    lvl.hp=lvl.id===1?1:Math.round((1 + (target-1)*0.22)*100)/100;
    lvl.speed=Math.round((1 + Math.min(.46,(target-1)*.0047))*1000)/1000;
  });

  // ---- Battle XP ----
  // XP belongs to the selected party. New content is best; farming old maps is deliberately inefficient.
  const oldCompleteWave=completeWave;
  completeWave=function(){
    const hard=battleMode==='hard';
    const completed=hard?save.hardCompletedLevels:save.completedLevels;
    const replay=completed.includes(currentLevel.id);
    const firstClearTotal=stageFirstClearXp(currentLevel.id);
    const modifier=hard?0.40:(replay?0.25:1);
    const amount=Math.max(1,Math.round((firstClearTotal/Math.max(1,currentLevel.waves||10))*modifier));
    const bonus=24+wave*4;
    gold+=bonus;
    battleReport.wavesCleared=Math.max(battleReport.wavesCleared,wave);
    ui();
    const recipients=(battleLoadout||[]).filter(id=>beasts[id]);
    recipients.forEach(id=>battleReport.xpByBeast[id]=(battleReport.xpByBeast[id]||0)+amount);
    const ups=addXP(recipients,amount);
    const notice=document.querySelector('#waveXpNotice');
    if(notice)notice.textContent=`Wave ${wave} clear • +${amount} XP to party • +${bonus} gold${replay&&!hard?' • Replay XP 25%':''}`;
    if(ups&&ups.length)showProgressToast('LEVEL UP',ups.join(' • '),'levelup');
  };

  // Quest XP caused collection-wide level inflation. Convert legacy quest XP into Essence instead.
  const rawAddXP=addXP;
  addXP=function(ids,amount){
    const stack=(new Error()).stack||'';
    if(stack.includes('claimQuest')){
      save.essence=(save.essence||0)+Math.max(1,Math.round((amount||0)*0.75));
      persist();
      return [];
    }
    return rawAddXP(ids,amount);
  };

  // ---- Endgame Hard Mode ----
  // Hard is a post-campaign feature. Finishing any individual region no longer unlocks it early.
  hardModeUnlocked=function(){return (save.completedLevels||[]).includes(100);};
  modeDifficulty=function(mode=battleMode){return mode==='hard'?3.5:1;};

  // Bypass the older 9x-count wrapper and use a cleaner endgame density increase.
  waveEnemyCount=function(w){
    const base=4+w*2+Math.floor((currentLevel.id-1)*.5);
    const normal=Math.ceil(base*1.5);
    return battleMode==='hard'?Math.ceil(normal*1.25):normal;
  };

  // Campaign copy/UI: show the intended level journey and make Hard's endgame requirement explicit.
  Object.values(worldMeta||{}).forEach((meta,index)=>{
    if(!meta)return;
    const w=index;
    const endId=w*10;
    if(w>=1&&w<=10){
      const startTarget=Math.round(targetLevelAfterStage((w-1)*10+1));
      const endTarget=Math.round(targetLevelAfterStage(endId));
      meta.subtitle=(meta.subtitle||'')+` • Recommended roughly Lv${startTarget}–${endTarget}.`;
    }
  });

  const oldRenderCampaignMap=renderCampaignMap;
  renderCampaignMap=function(){
    oldRenderCampaignMap();
    const hardBtn=document.querySelector('#campaignHardBtn');
    const hint=document.querySelector('#campaignModeHint');
    const unlocked=hardModeUnlocked();
    if(hardBtn){
      hardBtn.disabled=!unlocked;
      hardBtn.textContent=unlocked?'HARD • ENDGAME':'HARD • COMPLETE 10-10';
      hardBtn.title=unlocked?'Endgame campaign for developed teams.':'Complete the full Normal campaign to unlock Hard Mode.';
    }
    if(campaignMode==='hard'&&hint)hint.textContent='ENDGAME • 3.5× enemy health • +28% speed • +25% enemies • Normal campaign completion required.';
    document.querySelectorAll('.map-node').forEach(node=>{
      const label=node.querySelector('.map-node-copy span')?.textContent||node.querySelector('span')?.textContent||'';
      const match=label.match(/(?:HARD\s+)?(\d+)-(\d+)/);
      if(!match)return;
      const id=(Number(match[1])-1)*10+Number(match[2]);
      const lvl=levels.find(x=>x.id===id);
      const small=node.querySelector('.map-node-copy small');
      if(!lvl||!small)return;
      small.textContent=small.textContent.replace(/\s*•\s*Lv\s*\d+[^•]*/g,'').replace(/\s*•\s*Target Lv\s*\d+/g,'');
      if(campaignMode==='hard')small.textContent += ' • Endgame Lv100';
      else small.textContent += ` • Lv ${lvl.expectedLevel[0]}–${lvl.expectedLevel[1]}`;
    });
  };

  const oldSetCampaignMode=setCampaignMode;
  setCampaignMode=function(mode){
    if(mode==='hard'&&!hardModeUnlocked()){
      campaignMode='normal';
      renderCampaignMap();
      try{showProgressToast('HARD MODE LOCKED','Complete Region 10 stage 10 to unlock the endgame campaign.','levelup')}catch(e){}
      return;
    }
    return oldSetCampaignMode(mode);
  };

  const oldRenderLoadoutPicker=renderLoadoutPicker;
  renderLoadoutPicker=function(){
    oldRenderLoadoutPicker();
    if(!pendingLevelId)return;
    const lvl=levels.find(x=>x.id===pendingLevelId),title=document.querySelector('#loadoutLevelName');
    if(!lvl||!title)return;
    title.textContent=pendingMode==='hard'
      ?`HARD ENDGAME • ${levelCode(lvl)} • ${lvl.name} • Lv100 recommended`
      :`${levelCode(lvl)} • ${lvl.name} • Recommended Lv ${lvl.expectedLevel[0]}–${lvl.expectedLevel[1]}`;
  };

  // Explain the new economy anywhere old quest copy is visible.
  const observer=new MutationObserver(()=>{
    document.querySelectorAll('.quest-screen-head p,.quest-footer small').forEach(el=>{
      if(el.textContent.includes('XP rewards are granted to every beast'))el.textContent='Quest progression now rewards Essence and eggs; battle XP comes from your selected party.';
      if(el.textContent.includes('XP to every beast'))el.textContent=el.textContent.replace(/\d+ XP to every beast\s*•?\s*/,'');
    });
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});

  try{renderCampaignMap();}catch(e){}
  document.documentElement.dataset.progressionBalance=VERSION;
})();