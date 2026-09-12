// Beastward combat stat identity patch v1
// Restores meaningful species-to-species differences in range and critical chance.
(()=>{
const previousBattleStats=battleStats;

function naturalRangeStat(id){
  const r=beastRatings[id]?.range??5;
  return Math.min(30,Math.max(1,Math.round(r*3)));
}
function naturalInstinctStat(id){
  const r=beastRatings[id]||{speed:5,special:5};
  return Math.min(30,Math.max(1,Math.round(((r.speed+r.special)/2)*3)));
}
function speciesCritBase(id){
  const r=beastRatings[id]||{speed:5,special:5};
  // Preserve strong identity: slow/basic beasts sit near 4-7%, specialist/fast beasts can naturally reach ~18-20%.
  const identity=Math.max(4,Math.min(10,(r.speed+r.special)/2));
  return .04+((identity-4)/6)*.15;
}

battleStats=function(key){
  const stats=previousBattleStats(key);
  if(!stats)return stats;
  const id=stats.id||key;
  if(!beasts[id])return stats;

  const trained=stageStats(key);
  const rangeInvestment=Math.max(0,(trained?.range||naturalRangeStat(id))-naturalRangeStat(id));
  const instinctInvestment=Math.max(0,(trained?.instinct||naturalInstinctStat(id))-naturalInstinctStat(id));

  // Start from each species' original designed range (roughly 120-200), then allow progression/training to extend it.
  // This keeps short-range bruisers visibly short ranged and dedicated ranged beasts genuinely long ranged.
  const progression=typeof rangeMultiplier==='function'?rangeMultiplier(key):1;
  let variedRange=beasts[id].range*progression+rangeInvestment*1.15;
  variedRange=clampCombatRange(variedRange);

  // Crit is now species-led instead of everyone starting from the same 2.5% baseline.
  // Instinct training adds up to a substantial bonus, capped to avoid runaway crit builds.
  const variedCrit=Math.min(.38,speciesCritBase(id)+instinctInvestment*.0022);

  return {...stats,range:variedRange,beastStatCrit:variedCrit};
};

// Recalculate already-deployed towers if this patch loads during a battle.
try{(towers||[]).forEach(t=>{if(t?.instanceUid&&typeof recalcTower==='function')recalcTower(t)})}catch(e){}
document.documentElement.dataset.combatStatVariation='v1';
})();