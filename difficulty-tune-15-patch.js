// Beastward difficulty tune: ~15% easier without changing progression/rewards.
(()=>{
  const HP_FACTOR=.85;
  const SPEED_FACTOR=.94;
  if(typeof enemyTypes==='object'&&enemyTypes){
    Object.values(enemyTypes).forEach(e=>{
      if(!e||e._difficulty15)return;
      if(Number.isFinite(e.hp))e.hp*=HP_FACTOR;
      if(Number.isFinite(e.speed))e.speed*=SPEED_FACTOR;
      e._difficulty15=true;
    });
  }
  if(typeof levels!=='undefined'&&Array.isArray(levels)){
    levels.forEach(l=>{
      if(!l||l._difficulty15)return;
      if(Number.isFinite(l.hp))l.hp*=HP_FACTOR;
      // Keep most of the pressure from enemy movement; HP does the bulk of the 15% reduction.
      if(Number.isFinite(l.speed))l.speed*=SPEED_FACTOR;
      l._difficulty15=true;
    });
  }
  document.documentElement.dataset.difficultyTune='minus15';
})();