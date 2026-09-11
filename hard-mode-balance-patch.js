// Beastward Hard Mode balance pass v1
// Hard Mode is intended as post-region endgame, not a slightly tougher replay.
(() => {
  const HARD_HP = 5.0;
  const HARD_SPEED = 1.20;
  const HARD_COUNT = 1.22;

  // Raise the core health multiplier from 2x to 5x. A freshly unlocked
  // Verdant Hard 1-1 is aimed at roughly a Lv45-55 developed team.
  modeDifficulty = function(mode=battleMode){ return mode==='hard' ? HARD_HP : 1; };

  // Add more bodies as well as health so crowd-control and path coverage matter.
  const normalWaveEnemyCount = waveEnemyCount;
  waveEnemyCount = function(w){
    const base = normalWaveEnemyCount(w);
    return battleMode==='hard' ? Math.ceil(base * HARD_COUNT) : base;
  };

  // The core spawner applies a 1.12 hard speed multiplier. Compensate the
  // stage speed in Hard Mode so the effective target is ~1.20x.
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
  if(document.querySelector('#loadoutStartBtn')) document.querySelector('#loadoutStartBtn').onclick=()=>beginSelectedLevel();

  // Make the intended challenge visible instead of still advertising the old 2x mode.
  const normalRenderCampaignMap = renderCampaignMap;
  renderCampaignMap = function(){
    normalRenderCampaignMap();
    const hard = campaignMode==='hard';
    const hardBtn=document.querySelector('#campaignHardBtn');
    const hint=document.querySelector('#campaignModeHint');
    if(hardBtn && hardModeUnlocked(campaignWorld)) hardBtn.textContent=hard?'HARD • 5×':'HARD • 5×';
    if(hard && hint) hint.textContent='Endgame challenge • 5× enemy health • +20% speed • +22% enemies. Verdant 1-1 targets roughly Lv45–55 teams.';
    if(hard){
      document.querySelectorAll('.map-node').forEach((node,i)=>{
        const small=node.querySelector('.map-node-copy small');
        if(small && !small.textContent.includes('Target Lv')) small.textContent += ` • Target Lv ${50+i*3}`;
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
      if(title) title.textContent=`HARD • ${levelCode(lvl)} • ${lvl.name} • Target Lv ${50+(local-1)*3} • 5× HP`;
    }
  };

  const normalUpdateNextWavePreview = updateNextWavePreview;
  updateNextWavePreview = function(){
    normalUpdateNextWavePreview();
    const el=document.querySelector('#nextWaveInfo');
    if(el && battleMode==='hard') el.textContent=el.textContent.replace('HARD 2× HP • +12% speed','HARD 5× HP • +20% speed • +22% enemies');
  };

  const normalUi=ui;
  ui=function(){
    normalUi();
    const badge=document.querySelector('#battleModeBadge');
    if(badge && battleMode==='hard') badge.textContent='HARD • 5× HP';
  };
})();
