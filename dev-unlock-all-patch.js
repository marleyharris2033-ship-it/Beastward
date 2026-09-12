// Beastward temporary QA unlock-all mode v1
// IMPORTANT: snapshots the current active save before changing anything so it can be restored exactly later.
(()=>{
const BACKUP_KEY='beastward-pre-dev-unlock-v1';
try{
  if(!localStorage.getItem(BACKUP_KEY)) localStorage.setItem(BACKUP_KEY,JSON.stringify(save));
}catch(e){window.__beastwardPreDevBackup=window.__beastwardPreDevBackup||JSON.stringify(save)}

const species=Object.keys(beasts||{});
save.unlocked=[...species];
save.wardenLevel=100;
save.essence=999999;
save.freeCommonClaimed=true;
save.starter=save.starter||species[0]||null;
save.beastProgress=save.beastProgress||{};
save.ascensions=save.ascensions||{};
save.beastCopies=save.beastCopies||{};
save.seenBeastStages=[];

species.forEach(id=>{
  try{addBeast(id)}catch(e){}
  save.beastProgress[id]={level:100,xp:0};
  save.ascensions[id]=3;
  [1,2,3,4].forEach(stage=>save.seenBeastStages.push(id+':'+stage));
});

(save.beastInstances||[]).forEach(i=>{
  if(!i||!beasts[i.species])return;
  i.level=100;i.xp=0;i.ascension=3;
  i.stats=i.stats||{power:0,speed:0,range:0,focus:0,instinct:0};
});
species.forEach(id=>save.beastCopies[id]=Math.max(0,(save.beastInstances||[]).filter(i=>i?.species===id).length-1));

try{
  const allIds=(levels||[]).map(l=>l.id);
  save.completedLevels=[...allIds];
  // Leave hard completions empty so every hard stage is available to test rather than shown as already cleared.
  save.hardCompletedLevels=[];
}catch(e){}

try{persist()}catch(e){}
try{renderCollection()}catch(e){}
try{renderCampaign?.()}catch(e){}

if(!document.querySelector('#qaUnlockBadge')){
  const badge=document.createElement('div');badge.id='qaUnlockBadge';badge.textContent='QA • EVERYTHING UNLOCKED';
  badge.style.cssText='position:fixed;left:10px;bottom:10px;z-index:99998;padding:6px 9px;border-radius:8px;background:#7a2630;color:#fff;font:800 10px system-ui;letter-spacing:.08em;box-shadow:0 3px 12px #0008;pointer-events:none';
  document.body.appendChild(badge);
}
document.documentElement.dataset.qaUnlockAll='on';
})();