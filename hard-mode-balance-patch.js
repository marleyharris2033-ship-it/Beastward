// Beastward Hard Mode balance pass v2
// Hard Mode is post-region endgame. Hard 1-1 should punish under-levelled teams.
(() => {
  const HARD_HP = 9.0;
  const HARD_SPEED = 1.28;
  const HARD_COUNT = 1.40;

  // Normal 1-1 is deliberately accessible. Hard 1-1 is tuned around a developed
  // Lv50 team; low-30 teams should no longer be able to brute-force it.
  modeDifficulty = function(mode=battleMode){ return mode==='hard' ? HARD_HP : 1; };

  const normalWaveEnemyCount = waveEnemyCount;
  waveEnemyCount = function(w){
    const base = normalWaveEnemyCount(w);
    return battleMode==='hard' ? Math.ceil(base * HARD_COUNT) : base;
  };

  // game-core already adds 1.12x speed in hard mode. Scale stage speed so the
  // resulting normal-enemy speed is approximately 1.28x.
  const hardStageSpeedFactor = HARD_SPEED / 1.12;
  const normalBeginSelectedLevel = beginSelectedLevel;
  beginSelectedLevel = function(){
    const requestedMode = pendingMode;
    const requestedId = pendingLevelId;
    normalBeginSelectedLevel();
    if(requestedMode==='hard' && currentLevel && currentLevel.id===requestedId){
      currentLevel = {...currentLevel, speed: currentLevel.speed * hardStageSpeedFactor};
      path = currentLevel.path;
      updateNextWavePreview();
      ui();
    }
  };
  const loadoutStart=document.querySelector('#loadoutStartBtn');
  if(loadoutStart) loadoutStart.onclick=()=>beginSelectedLevel();

  const normalRenderCampaignMap = renderCampaignMap;
  renderCampaignMap = function(){
    normalRenderCampaignMap();
    const hard = campaignMode==='hard';
    const hardBtn=document.querySelector('#campaignHardBtn');
    const hint=document.querySelector('#campaignModeHint');
    if(hardBtn && hardModeUnlocked(campaignWorld)) hardBtn.textContent='HARD • 9×';
    if(hard && hint) hint.textContent='Endgame challenge • 9× enemy health • +28% speed • +40% enemies. Verdant 1-1 targets a developed Lv50 team.';
    if(hard){
      document.querySelectorAll('.map-node').forEach((node,i)=>{
        const small=node.querySelector('.map-node-copy small');
        if(small && !small.textContent.includes('Target Lv')) small.textContent += ` • Target Lv ${50+i*4}`;
      });
    }
  };

  const normalRenderLoadoutPicker = renderLoadoutPicker;
  renderLoadoutPicker = function(){
    normalRenderLoadoutPicker();
    if(pendingMode==='hard' && pendingLevelId){
      const lvl=levels.find(x=>x.id===pendingLevelId);
      const local=lvl?localLevelNumber(lvl):1;
      const title=document.querySelector('#loadoutLevelName');
      if(title) title.textContent=`HARD • ${levelCode(lvl)} • ${lvl.name} • Target Lv ${50+(local-1)*4} • 9× HP`;
    }
  };

  const normalUpdateNextWavePreview = updateNextWavePreview;
  updateNextWavePreview = function(){
    normalUpdateNextWavePreview();
    const el=document.querySelector('#nextWaveInfo');
    if(el && battleMode==='hard') el.textContent=el.textContent.replace('HARD 2× HP • +12% speed','HARD 9× HP • +28% speed • +40% enemies');
  };

  const normalUi=ui;
  ui=function(){
    normalUi();
    const badge=document.querySelector('#battleModeBadge');
    if(badge && battleMode==='hard') badge.textContent='HARD • 9× HP';
  };
})();
