// Beastward temporary QA unlock mode v2
// Activates ONLY with ?testunlock=1. Uses a disposable in-memory save and never writes over a real Warden save.
(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('testunlock')!=='1')return;

  // Isolate QA from the player's real save slot before changing anything.
  activeSlot=0;
  save=normaliseSave(blankSave());

  const ids=Object.keys(beasts||{});
  save.starter=ids[0]||'embercub';
  save.unlocked=[...ids];
  save.completedLevels=Array.from({length:100},(_,i)=>i+1);
  save.hardCompletedLevels=Array.from({length:100},(_,i)=>i+1);
  save.bossEggRewards=[10,20,30,40,50,60,70,80,90,100];
  save.essence=999999;
  save.wardenLevel=50;
  save.freeCommonClaimed=true;
  save.trainingTreats={small:99,training:99,greater:99,master:99};
  save.wardenTrialsClaims=[];
  save.beastProgress={};
  save.beastCopies={};
  save.ascensions={};
  save.seenBeastStages=[];

  ids.forEach(id=>{
    save.beastProgress[id]={level:100,xp:0};
    save.beastCopies[id]=10;
    save.ascensions[id]=3;
    [1,2,3,4].forEach(stage=>save.seenBeastStages.push(id+':'+stage));
  });

  // Give every species a max-level individual beast so Den/loadout/combat systems are all testable.
  save.beastInstances=ids.map((species,n)=>({
    uid:'qa-'+species+'-'+n,
    species,
    level:100,
    xp:0,
    ascension:3,
    stats:{power:20,speed:20,range:20,focus:20,instinct:20},
    resetUsed:false,
    createdAt:Date.now()+n
  }));
  save.lastLoadout=save.beastInstances.slice(0,6).map(x=>x.uid);

  // Reveal every Bestiary beast form as part of QA mode as well.
  if(typeof bestiaryBeastEntries==='function'){
    const qaEntries=bestiaryBeastEntries;
    bestiaryBeastEntries=function(){return qaEntries().map(entry=>({...entry,seen:true}))};
  }

  function refreshQA(){
    try{updateHub()}catch(e){}
    try{renderCollection()}catch(e){}
    try{renderCampaignMap()}catch(e){}
    try{renderBestiary()}catch(e){}
    try{show('hubScreen')}catch(e){}

    if(!document.getElementById('qaUnlockBadge')){
      const badge=document.createElement('div');
      badge.id='qaUnlockBadge';
      badge.textContent='QA TEST MODE • EVERYTHING UNLOCKED';
      badge.style.cssText='position:fixed;z-index:99999;left:50%;top:8px;transform:translateX(-50%);padding:7px 12px;border-radius:999px;background:#24163f;color:#fff;font:700 11px system-ui;letter-spacing:.08em;box-shadow:0 3px 12px #0008;pointer-events:none;white-space:nowrap';
      document.body.appendChild(badge);
    }
  }

  // Run once now and once after the current script stack/UI setup has settled.
  refreshQA();
  setTimeout(refreshQA,150);
})();