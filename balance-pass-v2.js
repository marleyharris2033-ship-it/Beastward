// Beastward balance pass v2 — roster efficiency, scaling and anti-chain abuse
// Purpose: keep species identities while reducing extreme value from AoE + speed + passive stacking.
(() => {
 const V='20260916-balance-v2-1';
 // Multipliers are intentionally modest: confirmed CC fix remains in balance-pass-v1.
 // High-utility AoE/chain beasts pay a small direct-damage tax; focused attackers gain slightly.
 const tune={
  embercub:{d:1.05,c:1.00},sprigpaw:{d:1.04,c:.98},bubblit:{d:.96,c:1.00},sparkit:{d:1.02,c:1.00},
  pebblum:{d:1.04,c:1.00},gustwing:{d:1.02,c:1.00},toxip:{d:1.03,c:1.00},frostkit:{d:.96,c:1.02},
  shadepup:{d:1.00,c:1.03},lumpling:{d:1.02,c:1.00},voltwing:{d:.92,c:1.04},scorchick:{d:1.03,c:.98},
  mosshell:{d:1.03,c:1.00},drizzlet:{d:.95,c:1.00},zapmoth:{d:.92,c:1.03},cindrake:{d:.90,c:1.05},
  sporeling:{d:.93,c:1.04},drakeling:{d:.90,c:1.05},voidling:{d:.94,c:1.05}
 };
 Object.entries(tune).forEach(([id,x])=>{const b=beasts[id];if(!b)return;b.damage=Math.max(1,Math.round(b.damage*x.d*10)/10);b.cost=Math.max(1,Math.round(b.cost*x.c/5)*5);});

 // Training scaling: Speed used to be unusually valuable because it also increased passive,
 // crit and status proc frequency. Flatten the extreme end while keeping Speed builds useful.
 const oldBattleStats=battleStats;
 battleStats=function(id){
  const out=oldBattleStats(id);if(!out)return out;
  const s=typeof stageStats==='function'?stageStats(id):null;
  if(s){
   const natural=beastRatings[id]||{};
   const naturalSpeed=Math.min(30,Math.max(1,Math.round((natural.speed||5)*3)));
   const trained=Math.max(0,(s.speed||naturalSpeed)-naturalSpeed);
   // Undo a portion of excessive late-game rate compression: max training remains powerful,
   // but no longer multiplies every secondary mechanic as aggressively.
   if(trained>35){const excess=trained-35;out.rate*=1+Math.min(.20,excess*.003);}
  }
  // Keep universal stat crit below a sensible ceiling; species crit identity remains separate.
  if(out.beastStatCrit!=null)out.beastStatCrit=Math.min(.25,out.beastStatCrit);
  return out;
 };

 // Repeated hard CC receives temporary diminishing returns. This complements v1's absolute
 // caps and stops several control beasts alternating roots/stuns indefinitely.
 function diminishCC(e){
  if(!e||e.hp<=0)return;
  const now=performance.now();
  if((e.stun||0)>0){if(e._bwStunSeen&&now-e._bwStunSeen<3500)e.stun*=.55;e._bwStunSeen=now;}
  if((e.root||0)>0){if(e._bwRootSeen&&now-e._bwRootSeen<4000)e.root*=.60;e._bwRootSeen=now;}
 }
 const oldHit=hitProjectile;
 hitProjectile=function(p){const r=oldHit(p);try{enemies.forEach(diminishCC)}catch(_){}return r;};

 // Expose a lightweight internal balance score for future tuning/testing. Not player-facing.
 // DPS is adjusted for range and utility so raw damage is not mistaken for total combat value.
 function score(id){const b=beasts[id];if(!b)return null;const dps=(b.damage||0)/Math.max(.2,b.rate||1);const range=Math.max(80,b.range||120);const utility={Water:1.20,Ice:1.22,Nature:1.14,Rock:1.10,Electric:1.20,Poison:1.16,Wind:1.14,Fire:1.12,Dark:1.13,Light:1.10}[b.type]||1;const reach=1+Math.max(0,range-140)/700;return {id,dps:+dps.toFixed(2),cost:b.cost||0,score:+((dps*utility*reach)/Math.max(1,b.cost||1)*100).toFixed(2)};}
 window.BEASTWARD_BALANCE_V2={version:V,scores:Object.keys(beasts).map(score).filter(Boolean)};
 console.info('[Beastward] balance v2 active',V,window.BEASTWARD_BALANCE_V2.scores);
})();
