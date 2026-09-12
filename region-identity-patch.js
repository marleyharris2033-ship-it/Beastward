// Beastward regional identity v1
// Gives Regions 1-10 distinct enemy pressure using the existing stable enemy roster.
(()=>{
const V='20260912-region-identity-v1';
const profiles={
  1:{name:'Verdant Valley',trait:'Balanced Wilds',desc:'Mixed enemy packs test every part of your defence.',waves:[['raider'],['raider','hound'],['raider','wisp'],['thornling','raider','hound'],['shellback','raider'],['wisp','thornling','raider'],['brute','hound','raider'],['wisp','shellback','glimmer'],['brute','hound','wisp','shellback','glimmer'],['brute','hound','wisp','thornling','shellback','glimmer','raider']]},
  2:{name:'Frostfall Expanse',trait:'Frozen Hunt',desc:'Fast stalkers screen slow ice golems while shard wisps swarm.',waves:[['frostling'],['frostling','snowstalker'],['frostling','shardwisp'],['snowstalker','frostling','shardwisp'],['icegolem','frostling'],['shardwisp','snowstalker','frostling'],['icegolem','snowstalker','frostling'],['shardwisp','icegolem','snowstalker'],['icegolem','snowstalker','shardwisp','frostling'],['icegolem','snowstalker','shardwisp','frostling']]},
  3:{name:'Sunscar Desert',trait:'Heat Rush',desc:'Fast hunters and skirmishers surge between tougher desert packs.',waves:[['hound','raider'],['hound','thornling'],['glimmer','hound','raider'],['thornling','hound','shellback'],['brute','hound'],['glimmer','thornling','hound'],['brute','hound','thornling'],['glimmer','hound','shellback'],['brute','glimmer','hound','thornling'],['brute','hound','glimmer','shellback']]},
  4:{name:'Embercrag Peaks',trait:'Molten Armour',desc:'Heavy brutes and shellbacks dominate the volcanic approaches.',waves:[['shellback','raider'],['shellback','brute'],['brute','raider','wisp'],['shellback','brute','thornling'],['brute','shellback'],['brute','shellback','hound'],['brute','brute','shellback','wisp'],['shellback','brute','glimmer'],['brute','shellback','hound','wisp'],['brute','shellback','thornling','glimmer']]},
  5:{name:'Mireveil Marsh',trait:'Swarm Bloom',desc:'Dense wisps and thornlings hide heavier threats inside the marsh.',waves:[['wisp','thornling'],['wisp','wisp','raider'],['thornling','wisp','glimmer'],['shellback','wisp','thornling'],['wisp','wisp','brute'],['glimmer','wisp','thornling'],['shellback','wisp','wisp','hound'],['brute','wisp','glimmer','thornling'],['shellback','wisp','thornling','glimmer'],['brute','shellback','wisp','wisp','thornling']]},
  6:{name:'Stormspire Isles',trait:'Stormfront',desc:'The Isles favour relentless speed: hounds, glimmers and wisps arrive quickly.',waves:[['glimmer','hound'],['hound','glimmer','raider'],['glimmer','wisp','hound'],['hound','thornling','glimmer'],['shellback','glimmer','hound'],['glimmer','hound','wisp'],['brute','glimmer','hound'],['glimmer','hound','thornling','wisp'],['shellback','glimmer','hound','wisp'],['brute','glimmer','hound','thornling','wisp']]},
  7:{name:'Moonshadow Wilds',trait:'Night Pack',desc:'Unpredictable packs alternate fragile spirits with sudden heavy pressure.',waves:[['wisp','hound'],['thornling','wisp'],['hound','glimmer','wisp'],['shellback','thornling','wisp'],['brute','wisp','hound'],['glimmer','thornling','shellback'],['brute','hound','wisp'],['shellback','glimmer','wisp','hound'],['brute','thornling','glimmer','wisp'],['brute','shellback','hound','wisp','glimmer']]},
  8:{name:'Crystaldeep',trait:'Crystal Bulwark',desc:'Armoured enemies anchor each wave while shard-like swarms fill the gaps.',waves:[['shellback','wisp'],['shellback','raider'],['brute','wisp','shellback'],['shellback','glimmer','wisp'],['brute','shellback'],['shellback','thornling','wisp'],['brute','shellback','glimmer'],['shellback','brute','wisp','glimmer'],['brute','shellback','thornling','wisp'],['brute','shellback','shellback','glimmer','wisp']]},
  9:{name:'Astral Ruins',trait:'Rift Flux',desc:'Enemy composition shifts sharply from wave to wave, rewarding flexible teams.',waves:[['wisp','glimmer'],['brute','raider'],['hound','hound','thornling'],['shellback','wisp','glimmer'],['brute','hound','wisp'],['glimmer','glimmer','thornling'],['brute','shellback','hound'],['wisp','hound','shellback','glimmer'],['brute','thornling','wisp','glimmer'],['brute','shellback','hound','wisp','glimmer','thornling']]},
 10:{name:'The Wildheart',trait:'Elemental Convergence',desc:'Every enemy archetype returns in changing combinations for the final region.',waves:[['raider','hound','wisp'],['shellback','glimmer','thornling'],['brute','hound','wisp'],['frostling','snowstalker','shardwisp'],['brute','shellback','glimmer'],['icegolem','hound','wisp'],['shellback','snowstalker','thornling','glimmer'],['brute','icegolem','wisp','shardwisp'],['brute','shellback','hound','snowstalker','glimmer'],['brute','icegolem','shellback','hound','wisp','glimmer','shardwisp']]}
};
function profile(){const w=typeof levelWorld==='function'?levelWorld(currentLevel):Math.max(1,Math.ceil((currentLevel?.id||1)/10));return profiles[w]||profiles[1]}
const baseWaveEnemyMix=waveEnemyMix;
waveEnemyMix=function(w){
  const p=profile(),mix=p.waves[Math.max(0,Math.min(9,(w||1)-1))];
  return mix&&mix.length?mix.slice():baseWaveEnemyMix.apply(this,arguments);
};
function addTraitToMap(){
  const p=profiles[campaignWorld];if(!p)return;
  const map=document.querySelector('.campaign-map');if(!map)return;
  let badge=map.querySelector('.region-trait-card');
  if(!badge){badge=document.createElement('div');badge.className='region-trait-card';map.prepend(badge)}
  badge.innerHTML=`<small>REGIONAL TRAIT</small><b>${p.trait}</b><span>${p.desc}</span>`;
}
const baseRenderCampaignMap=renderCampaignMap;
renderCampaignMap=function(){const r=baseRenderCampaignMap.apply(this,arguments);addTraitToMap();return r};
const baseBeginSelectedLevel=beginSelectedLevel;
beginSelectedLevel=function(){
  const r=baseBeginSelectedLevel.apply(this,arguments);
  try{const p=profile();setTimeout(()=>showProgressToast(p.trait.toUpperCase(),p.desc,'region'),180)}catch(e){}
  return r;
};
const style=document.createElement('style');style.textContent=`
.region-trait-card{margin:0 0 10px;padding:10px 12px;border:1px solid #ffffff1f;border-radius:12px;background:#07110cb8;display:grid;grid-template-columns:auto 1fr;gap:2px 10px;align-items:center;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
.region-trait-card small{grid-column:1;font-size:8px;letter-spacing:.14em;color:#91a399}.region-trait-card b{grid-column:1;font-size:12px;color:#f0d36d}.region-trait-card span{grid-column:2;grid-row:1/3;font-size:10px;line-height:1.35;color:#bdc9c0}
@media(max-width:520px){.region-trait-card{grid-template-columns:1fr}.region-trait-card span{grid-column:1;grid-row:auto;margin-top:3px}}
`;document.head.appendChild(style);
try{addTraitToMap()}catch(e){}
document.documentElement.dataset.regionIdentity=V;
})();