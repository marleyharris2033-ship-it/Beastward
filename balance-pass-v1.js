// Beastward balance pass v1 — combat value + crowd-control sanity caps
// Loaded after the existing combat patches. Keeps beast identities while preventing
// fast Water/Ice/control builds from effectively stopping whole waves.
(() => {
  const V='20260916-balance-pass-1';

  // Small base-stat corrections. AoE/chain/long-range beasts pay for their utility;
  // focused single-target beasts retain stronger direct damage efficiency.
  const tuning={
    embercub:{damage:23,cost:140}, sprigpaw:{damage:20,cost:150}, bubblit:{damage:18,cost:145},
    sparkit:{damage:19,cost:150}, pebblum:{damage:35,cost:165}, gustwing:{damage:21,cost:155},
    toxip:{damage:20,cost:150}, frostkit:{damage:23,cost:175}, shadepup:{damage:27,cost:185},
    lumpling:{damage:24,cost:185}, voltwing:{damage:23,cost:195}, scorchick:{damage:15,cost:135},
    mosshell:{damage:34,cost:160}, drizzlet:{damage:14,cost:145}, zapmoth:{damage:14,cost:150},
    cindrake:{damage:38,cost:240}, sporeling:{damage:30,cost:225}, drakeling:{damage:30,cost:235},
    voidling:{damage:36,cost:245}
  };
  Object.entries(tuning).forEach(([id,v])=>{if(!beasts[id])return;beasts[id].damage=v.damage;beasts[id].cost=v.cost;});

  // CC rules: slows refresh but never stack below the floor. Bosses are substantially
  // more resistant. This is deliberately applied centrally so old/new skill layers
  // cannot combine into near-permanent immobilisation.
  const NORMAL_SLOW_FLOOR=.48; // max 52% slow
  const BOSS_SLOW_FLOOR=.72;   // max 28% slow
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

  // Existing hit layers all run first; then clamp the final combined result.
  const priorHit=hitProjectile;
  hitProjectile=function(p){priorHit(p);sanitiseAll();};

  // Ultimates can apply CC outside hitProjectile, so clamp immediately after attacks too.
  const priorAttack=attack;
  attack=function(t,dt){priorAttack(t,dt);sanitiseAll();};

  // Preserve Water as the premier slow identity without letting attack speed turn it
  // into a freeze. Ice retains stronger momentary control but shorter hard CC.
  try{
    if(typeof IDENTITIES!=='undefined'){
      // IDENTITIES may be closure-scoped in older builds; central clamps above remain authoritative.
    }
  }catch(_){}

  // Warden status-duration investment remains useful, but control duration cannot bypass
  // the caps above. Damage-over-time effects are intentionally unaffected.
  window.BEASTWARD_BALANCE={version:V,normalSlowFloor:NORMAL_SLOW_FLOOR,bossSlowFloor:BOSS_SLOW_FLOOR};
  console.info('[Beastward] balance pass active',V);
})();
