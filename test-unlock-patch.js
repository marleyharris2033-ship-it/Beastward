// Beastward temporary QA unlock mode v1
// Activates ONLY when the URL contains ?testunlock=1. Normal saves/gameplay are untouched.
(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('testunlock')!=='1')return;
  const ids=Object.keys(beasts||{});
  save.unlocked=[...ids];
  save.completedLevels=Array.from({length:100},(_,i)=>i+1);
  save.hardCompletedLevels=Array.from({length:100},(_,i)=>i+1);
  save.bossEggRewards=[10,20,30,40,50,60,70,80,90,100];
  save.essence=Math.max(save.essence||0,999999);
  save.wardenLevel=Math.max(save.wardenLevel||1,100);
  save.freeCommonClaimed=true;
  save.trainingTreats={small:99,training:99,greater:99,master:99};
  save.beastProgress=save.beastProgress||{};
  save.beastCopies=save.beastCopies||{};
  save.ascensions=save.ascensions||{};
  save.seenBeastStages=save.seenBeastStages||[];
  ids.forEach(id=>{
    save.beastProgress[id]={level:100,xp:0};
    save.beastCopies[id]=Math.max(save.beastCopies[id]||0,10);
    save.ascensions[id]=3;
    [1,2,3].forEach(stage=>{const key=id+':'+stage;if(!save.seenBeastStages.includes(key))save.seenBeastStages.push(key)});
  });
  // Rebuild individual beasts for QA without persisting this temporary state.
  save.beastInstances=ids.map((species,n)=>({uid:'qa-'+species+'-'+n,species,level:100,xp:0,ascension:3,stats:{power:20,speed:20,range:20,focus:20,instinct:20},resetUsed:false,createdAt:Date.now()+n}));
  save.lastLoadout=save.beastInstances.slice(0,6).map(x=>x.uid);
  try{updateHub();renderCollection();renderCampaignMap()}catch(e){console.warn('QA unlock refresh:',e)}
  const badge=document.createElement('div');
  badge.textContent='QA TEST MODE • EVERYTHING UNLOCKED';
  badge.style.cssText='position:fixed;z-index:99999;left:50%;top:8px;transform:translateX(-50%);padding:7px 12px;border-radius:999px;background:#24163f;color:#fff;font:700 11px system-ui;letter-spacing:.08em;box-shadow:0 3px 12px #0008;pointer-events:none';
  document.body.appendChild(badge);
})();