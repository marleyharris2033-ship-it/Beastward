// Beastward balance pass v1 — crowd-control sanity caps
// Loaded after the existing combat patches. Keeps each beast's identity while preventing
// fast Water/Ice/control builds from effectively stopping whole waves.
(() => {
  const V='20260916-balance-pass-2';

  // Slow strength is capped centrally because Water/Ice can currently receive status
  // from the base elemental hit, species talent and combat-identity passive together.
  // Repeated hits can refresh control, but can no longer make it progressively stronger.
  const NORMAL_SLOW_FLOOR=.48; // enemies retain at least 48% movement speed
  const BOSS_SLOW_FLOOR=.72;   // bosses retain at least 72% movement speed
  const NORMAL_SLOW_TIME=3.0;
  const BOSS_SLOW_TIME=1.35;
  const NORMAL_STUN_TIME=.85;
  const BOSS_STUN_TIME=.30;
  const NORMAL_ROOT_TIME=1.05;
  const BOSS_ROOT_TIME=.34;

  function sanitiseEnemy(e){
    if(!e||e.hp<=0)return;
    const boss=!!e.boss;
    if((e.slow||0)>0){
      e.slow=Math.min(e.slow,boss?BOSS_SLOW_TIME:NORMAL_SLOW_TIME);
      e.slowFactor=Math.max(Number(e.slowFactor)||1,boss?BOSS_SLOW_FLOOR:NORMAL_SLOW_FLOOR);
    }else if(e.slowFactor!==undefined){e.slowFactor=1;}
    if((e.stun||0)>0)e.stun=Math.min(e.stun,boss?BOSS_STUN_TIME:NORMAL_STUN_TIME);
    if((e.root||0)>0)e.root=Math.min(e.root,boss?BOSS_ROOT_TIME:NORMAL_ROOT_TIME);
  }
  function sanitiseAll(){try{enemies.forEach(sanitiseEnemy)}catch(_){}}

  // All existing damage/passive calculations happen first. The clamp then normalises
  // their final CC result without changing damage, poison, burn, crit or AoE behaviour.
  const priorHit=hitProjectile;
  hitProjectile=function(p){priorHit(p);sanitiseAll();};

  // Level-100 ultimates can apply control outside hitProjectile.
  const priorAttack=attack;
  attack=function(t,dt){priorAttack(t,dt);sanitiseAll();};

  // Warden status-duration investment still has value, but cannot bypass these limits.
  // Damage-over-time duration is deliberately unaffected.
  window.BEASTWARD_BALANCE={version:V,normalSlowFloor:NORMAL_SLOW_FLOOR,bossSlowFloor:BOSS_SLOW_FLOOR};
  console.info('[Beastward] balance pass active',V);
})();
