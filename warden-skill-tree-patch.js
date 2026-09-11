// Beastward Warden progression + three-branch skill tree
(() => {
  const WARDEN_LEVEL_CAP = 50;
  const TREE_META = {
    bond:{name:'Beast Bond',icon:'◆',tagline:'Strength through companionship.',className:'bond'},
    battle:{name:'Battlecraft',icon:'⚔',tagline:'Victory through strategy.',className:'battle'},
    wild:{name:'Wildkeeper',icon:'✦',tagline:'Mastery through collection.',className:'wild'}
  };
  const SKILLS = {
    naturalStrength:{tree:'bond',tier:1,name:'Natural Strength',max:5,desc:r=>`+${r}% Beast damage.`,effect:'Beast damage +1% per rank'},
    bondedLearning:{tree:'bond',tier:1,name:'Bonded Learning',max:5,desc:r=>`+${r*2}% Beast XP earned.`,effect:'Beast XP +2% per rank'},
    quickInstincts:{tree:'bond',tier:2,name:'Quick Instincts',max:4,desc:r=>`+${r}% attack speed.`,effect:'Attack speed +1% per rank'},
    huntersEye:{tree:'bond',tier:2,name:"Hunter's Eye",max:3,desc:r=>`+${r}% combat range.`,effect:'Range +1% per rank'},
    elementalAffinity:{tree:'bond',tier:3,name:'Elemental Affinity',max:4,desc:r=>`+${r*2}% status duration.`,effect:'Burn, poison, slow, freeze, root & stun duration +2% per rank'},
    evolutionBond:{tree:'bond',tier:3,name:'Evolution Bond',max:1,desc:r=>r?'Stage II: +2% damage/speed • Stage III: +3% damage/speed.':'Evolved beasts gain a small combat bonus.',effect:'Evolved beasts become slightly stronger'},
    ascendedSpirit:{tree:'bond',tier:4,name:'Ascended Spirit',max:3,desc:r=>`+${(r*.5).toFixed(1)}% damage per Ascension star.`,effect:'+0.5% damage per Ascension star per rank'},
    protectiveBond:{tree:'bond',tier:4,name:'Protective Bond',max:1,desc:r=>r?'Clean wave: +2% attack speed next wave.':'Clean waves empower your deployed beasts.',effect:'No-life-loss wave grants +2% attack speed next wave'},
    perfectBond:{tree:'bond',tier:5,name:'Perfect Bond',max:1,keystone:true,desc:r=>r?'Stage III: +2% range and +3% status duration.':'Perfect the bond with fully evolved beasts.',effect:'Stage III beasts gain +2% range & +3% status duration'},
    warChest:{tree:'battle',tier:1,name:'War Chest',max:5,desc:r=>`+${r*15} starting Gold.`,effect:'+15 starting Gold per rank'},
    fieldSalvage:{tree:'battle',tier:1,name:'Field Salvage',max:5,desc:r=>`${80+r}% tower sell refund.`,effect:'Sell refund +1% per rank'},
    efficientDeployment:{tree:'battle',tier:2,name:'Efficient Deployment',max:4,desc:r=>`-${r}% Beast placement cost.`,effect:'Placement cost -1% per rank'},
    wardenEngineering:{tree:'battle',tier:2,name:'Warden Engineering',max:5,desc:r=>`-${r}% in-level upgrade cost.`,effect:'Upgrade cost -1% per rank'},
    preparedDefence:{tree:'battle',tier:3,name:'Prepared Defence',max:1,desc:r=>r?'First Beast each level costs 8% less.':'Begin each battle with an efficient first deployment.',effect:'First Beast placement costs 8% less'},
    waveEconomy:{tree:'battle',tier:3,name:'Wave Economy',max:5,desc:r=>`+${r*2} Gold after every cleared wave.`,effect:'+2 wave-clear Gold per rank'},
    perfectDefence:{tree:'battle',tier:4,name:'Perfect Defence',max:1,desc:r=>r?'3 clean waves in a row: +25 Gold.':'Reward flawless defensive streaks.',effect:'Every 3 no-life-loss waves grants +25 Gold'},
    rapidReinforcement:{tree:'battle',tier:4,name:'Rapid Reinforcement',max:3,desc:r=>`New placements gain +${r*3}% attack speed for 10s.`,effect:'+3% temporary attack speed per rank'},
    masterStrategist:{tree:'battle',tier:5,name:'Master Strategist',max:1,keystone:true,desc:r=>r?'First upgrade on each placed Beast costs 15% less.':'Make every new defender easier to specialise.',effect:'First upgrade per placed Beast costs 15% less'},
    essenceSeeker:{tree:'wild',tier:1,name:'Essence Seeker',max:5,desc:r=>`+${r*2}% campaign Essence.`,effect:'Campaign Essence +2% per rank'},
    beastScholar:{tree:'wild',tier:1,name:'Beast Scholar',max:5,desc:r=>`+${r*2}% Warden XP from stage clears.`,effect:'Stage-clear Warden XP +2% per rank'},
    eggkeeper:{tree:'wild',tier:2,name:'Eggkeeper',max:5,desc:r=>`-${r}% paid Egg cost.`,effect:'Paid Egg cost -1% per rank'},
    sharedExperience:{tree:'wild',tier:2,name:'Shared Experience',max:3,desc:r=>`Duplicates grant +${r*5} Beast XP.`,effect:'Duplicates grant +5 Beast XP per rank'},
    keepersFortune:{tree:'wild',tier:3,name:"Keeper's Fortune",max:1,desc:r=>r?'Every 10th paid Egg refunds 20%.':'Long hatching streaks return some Essence.',effect:'Every 10th paid Egg refunds 20% of its price'},
    firstDiscovery:{tree:'wild',tier:3,name:'First Discovery',max:1,desc:r=>r?'New species discovered: +25 Essence.':'Reward additions to your Beast Vault.',effect:'First acquisition of a species grants +25 Essence'},
    ascensionMastery:{tree:'wild',tier:4,name:'Ascension Mastery',max:3,desc:r=>`Ascension grants +${r*25} Beast XP.`,effect:'Ascension grants +25 Beast XP per rank'},
    excessBond:{tree:'wild',tier:4,name:'Excess Bond',max:1,desc:r=>r?'Duplicates of ★★★ beasts convert to Essence.':'Fully ascended duplicates are no longer wasted.',effect:'Max-Ascension duplicate converts to 20% of Egg tier cost'},
    sanctuaryMaster:{tree:'wild',tier:5,name:'Sanctuary Master',max:1,keystone:true,desc:r=>r?'Every 5th paid Egg receives 10% off.':'Master the rhythms of the Hatchery.',effect:'Every 5th paid Egg costs 10% less'}
  };
  const TIER_REQ = {
    1:{level:1,points:0,label:'TIER I'},
    2:{level:5,points:5,label:'TIER II'},
    3:{level:10,points:10,label:'TIER III'},
    4:{level:20,points:15,label:'TIER IV'},
    5:{level:30,points:20,label:'KEYSTONE'}
  };

  const baseCosts={};
  Object.keys(beasts).forEach(id=>baseCosts[id]=beasts[id].cost);
  let activeTree='bond';
  let cleanWaveStreak=0;
  let lastWaveLives=20;

  function cumulativeXpForLevel(level){
    let total=0;
    for(let l=1;l<Math.max(1,level);l++)total+=wardenXpNeeded(l);
    return total;
  }
  function wardenXpNeeded(level){return 70+(Math.max(1,level)-1)*12;}
  function ensureWardenData(s=save){
    if(!s)return s;
    s.wardenLevel=Math.max(1,Math.min(WARDEN_LEVEL_CAP,Number(s.wardenLevel)||1));
    if(s.wardenXP===undefined||s.wardenXP===null)s.wardenXP=cumulativeXpForLevel(s.wardenLevel);
    s.wardenXP=Math.max(Number(s.wardenXP)||0,cumulativeXpForLevel(s.wardenLevel));
    s.wardenSkills=s.wardenSkills||{};
    s.wardenResets=Number(s.wardenResets)||0;
    s.wardenPaidEggs=Number(s.wardenPaidEggs)||0;
    s.wardenMilestones=s.wardenMilestones||[];
    return s;
  }
  function rank(id){ensureWardenData();return Math.max(0,Math.min(SKILLS[id]?.max||0,Number(save.wardenSkills[id])||0));}
  function treePoints(tree){return Object.keys(SKILLS).filter(k=>SKILLS[k].tree===tree).reduce((n,k)=>n+rank(k),0);}
  function spentPoints(){return Object.keys(SKILLS).reduce((n,k)=>n+rank(k),0);}
  function availablePoints(){ensureWardenData();return Math.max(0,(save.wardenLevel-1)-spentPoints());}
  function nextWardenThreshold(){return cumulativeXpForLevel(Math.min(WARDEN_LEVEL_CAP,save.wardenLevel+1));}
  function currentWardenFloor(){return cumulativeXpForLevel(save.wardenLevel);}
  function addWardenXP(amount,source='Warden XP'){
    ensureWardenData();
    if(save.wardenLevel>=WARDEN_LEVEL_CAP)return 0;
    const before=save.wardenLevel;
    save.wardenXP+=Math.max(0,Math.round(amount));
    while(save.wardenLevel<WARDEN_LEVEL_CAP&&save.wardenXP>=cumulativeXpForLevel(save.wardenLevel+1))save.wardenLevel++;
    if(save.wardenLevel>before){
      const gained=save.wardenLevel-before;
      try{showProgressToast('WARDEN LEVEL '+save.wardenLevel,`+${gained} Skill Point${gained===1?'':'s'} • ${source}`,'levelup');}catch(e){}
    }
    persist();
    return save.wardenLevel-before;
  }
  function tierUnlocked(skill){
    const req=TIER_REQ[skill.tier]||TIER_REQ[1];
    return save.wardenLevel>=req.level&&treePoints(skill.tree)>=req.points;
  }
  function canBuy(id){
    const s=SKILLS[id];
    return !!s&&rank(id)<s.max&&availablePoints()>0&&tierUnlocked(s);
  }
  function buySkill(id){
    if(!canBuy(id))return;
    save.wardenSkills[id]=rank(id)+1;
    applyDeploymentCosts();
    persist();renderWardenScreen();
  }
  function applyDeploymentCosts(){
    const reduction=rank('efficientDeployment')*.01;
    Object.keys(baseCosts).forEach(id=>{if(beasts[id])beasts[id].cost=Math.max(1,Math.round(baseCosts[id]*(1-reduction)));});
    try{choices();}catch(e){}
  }
  function resetSkills(){
    ensureWardenData();
    const cost=save.wardenResets===0?0:250;
    if(cost>save.essence){alert('You need 250 Essence to reset your Warden skills.');return;}
    if(!confirm(cost?`Reset every Warden skill for ${cost} Essence? All Skill Points will be refunded.`:'Use your free Warden skill reset? All Skill Points will be refunded.'))return;
    if(cost)save.essence-=cost;
    save.wardenSkills={};save.wardenResets++;
    applyDeploymentCosts();persist();renderWardenScreen();
  }

  const originalBlankSave=blankSave;
  blankSave=function(){return ensureWardenData(originalBlankSave());};
  const originalNormaliseSave=normaliseSave;
  normaliseSave=function(s){return ensureWardenData(originalNormaliseSave(s));};
  ensureWardenData();

  show=function(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));if(id==='wardenScreen')renderWardenScreen();};

  function injectStyles(){
    if(document.getElementById('wardenSkillTreeStyles'))return;
    const style=document.createElement('style');style.id='wardenSkillTreeStyles';style.textContent=`
      .warden-hub-card{grid-column:1/-1;min-height:138px;position:relative;overflow:hidden;background:linear-gradient(135deg,#142d23,#1d4735 55%,#4c4324)!important;border-color:#c8ab58!important}
      .warden-hub-card:after{content:'✦';position:absolute;right:24px;top:-18px;font-size:120px;color:#e5c65a12;transform:rotate(12deg)}
      .warden-hub-card .warden-mini-progress{display:flex;gap:12px;align-items:center;margin-top:10px;font-style:normal;color:#ead47c;font-size:12px;letter-spacing:.08em}
      .warden-screen-shell{min-height:100%;padding:18px max(16px,env(safe-area-inset-left)) 48px;background:radial-gradient(circle at 50% 5%,#244b38 0,#10271d 30%,#07150f 72%);color:#f5f1df}
      .warden-top{max-width:1180px;margin:0 auto}.warden-back{border:1px solid #68806e;background:#10251b;color:#f4e6ad;border-radius:999px;padding:10px 16px;font-weight:800}
      .warden-hero{margin:16px 0 18px;padding:22px;border:1px solid #8c7d48;border-radius:24px;background:linear-gradient(145deg,#183a2b,#0f261b 65%,#312d19);box-shadow:0 18px 50px #0005;display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}
      .warden-kicker{font-size:11px;letter-spacing:.28em;color:#d9bd62;font-weight:900}.warden-hero h2{font-family:Georgia,serif;font-size:clamp(38px,7vw,68px);line-height:.95;margin:7px 0;color:#f2d56f}.warden-hero p{margin:4px 0;color:#c9d2c7;max-width:650px}
      .warden-level-orb{width:130px;height:130px;border-radius:50%;border:2px solid #d8bc60;background:radial-gradient(circle,#315b42,#10271c 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 0 36px #e7ca5b20}.warden-level-orb small{letter-spacing:.18em;color:#c8d2c7}.warden-level-orb b{font-size:44px;color:#f5da78}.warden-level-orb span{font-size:11px;color:#d8bd62}
      .warden-xp{grid-column:1/-1}.warden-xp-line{display:flex;justify-content:space-between;font-size:12px;color:#cbd4ca;margin-bottom:7px}.warden-xpbar{height:10px;background:#07130e;border-radius:99px;overflow:hidden;border:1px solid #53685a}.warden-xpbar>i{display:block;height:100%;background:linear-gradient(90deg,#ba9740,#f0d56d);border-radius:99px}
      .warden-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}.warden-summary>div{border:1px solid #526a59;background:#0c2017cc;border-radius:16px;padding:14px;text-align:center}.warden-summary small{display:block;color:#93a89b;letter-spacing:.12em}.warden-summary b{display:block;color:#f2d56f;font-size:23px;margin-top:4px}
      .warden-tree-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0 16px}.warden-tree-tab{padding:13px 10px;border:1px solid #536d5b;border-radius:14px;background:#0c2017;color:#d2dbd0;font-weight:900}.warden-tree-tab.active{border-color:#e0c25e;color:#f4d977;background:#1b392b}.warden-tree-tab small{display:block;font-weight:500;opacity:.72;margin-top:3px}
      .warden-tree-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;max-width:1180px;margin:0 auto}.warden-tree{border:1px solid #536c5a;border-radius:22px;background:#0b1f16e8;overflow:hidden;box-shadow:0 14px 40px #0003}.warden-tree-head{padding:18px;border-bottom:1px solid #405548;background:linear-gradient(135deg,#163226,#10231a)}.warden-tree-head h3{font-family:Georgia,serif;font-size:27px;color:#f0d16b;margin:0 0 3px}.warden-tree-head p{margin:0;color:#aebdb1;font-size:13px}.warden-tree-points{float:right;border:1px solid #8b7a46;border-radius:99px;padding:6px 9px;color:#e5c968;font-size:12px}
      .warden-tier{padding:14px 14px 4px;position:relative}.warden-tier+.warden-tier:before{content:'';position:absolute;left:29px;top:-6px;height:13px;width:2px;background:#5b755f}.warden-tier-label{display:flex;justify-content:space-between;align-items:center;color:#899c8e;font-size:10px;letter-spacing:.16em;font-weight:900;margin:0 4px 8px}.warden-tier-label span:last-child{letter-spacing:0;color:#728477;font-weight:600}
      .warden-node{position:relative;width:100%;text-align:left;border:1px solid #41574a;background:#0d2419;color:#eff3eb;border-radius:15px;padding:13px 14px 13px 52px;margin:0 0 9px;min-height:76px}.warden-node:before{content:'';position:absolute;left:18px;top:23px;width:17px;height:17px;border-radius:50%;border:2px solid #657b69;background:#10261b;box-shadow:0 0 0 5px #10261b}.warden-node b{display:block;font-size:15px;color:#f2eee0}.warden-node small{display:block;color:#9fb0a3;margin-top:4px;line-height:1.3}.warden-node em{display:block;color:#d1b95f;font-size:11px;font-style:normal;margin-top:5px}.warden-node .rank{position:absolute;right:11px;top:10px;font-size:11px;color:#aebcaf}.warden-node.available{border-color:#9f8b49;box-shadow:0 0 0 1px #d6b95725 inset}.warden-node.available:before{border-color:#e5c75f;box-shadow:0 0 15px #e5c75f55}.warden-node.owned{background:linear-gradient(135deg,#173728,#10291d);border-color:#d4b855}.warden-node.owned:before{background:#e4c65d;border-color:#f7de83;box-shadow:0 0 16px #e6c85b88}.warden-node.maxed{border-color:#e8ca60}.warden-node.locked{opacity:.48}.warden-node.keystone{border-color:#806c3e;background:linear-gradient(135deg,#2a321f,#12251a)}.warden-node.keystone b:after{content:'  ✦';color:#e6c95f}
      .warden-actions{max-width:1180px;margin:16px auto 0;display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #465c4d;background:#0b1e15;border-radius:16px;padding:14px}.warden-reset{border:1px solid #856e48;background:#231f16;color:#efd37a;border-radius:12px;padding:11px 15px;font-weight:900}.warden-actions small{color:#9baca0}
      @media(max-width:760px){.warden-screen-shell{padding-top:12px}.warden-hero{grid-template-columns:1fr auto;padding:16px}.warden-level-orb{width:88px;height:88px}.warden-level-orb b{font-size:31px}.warden-summary{grid-template-columns:repeat(2,1fr)}.warden-tree-grid{display:block}.warden-tree{display:none}.warden-tree.mobile-active{display:block}.warden-tree-tabs{position:sticky;top:8px;z-index:8;background:#0a1b13dd;padding:6px;border-radius:16px;backdrop-filter:blur(10px)}.warden-tree-tab{font-size:12px;padding:10px 5px}.warden-tree-tab small{display:none}.warden-actions{align-items:flex-start;flex-direction:column}.warden-reset{width:100%}}
    `;document.head.appendChild(style);
  }

  function injectScreen(){
    if(document.getElementById('wardenScreen'))return;
    const section=document.createElement('section');section.id='wardenScreen';section.className='screen';section.innerHTML=`<div class="warden-screen-shell"><div class="warden-top"><button id="wardenBackBtn" class="warden-back">← Sanctuary</button><div id="wardenScreenBody"></div></div></div>`;
    document.getElementById('app').appendChild(section);
    section.querySelector('#wardenBackBtn').onclick=()=>show('hubScreen');
    const hubGrid=document.querySelector('.hub-grid');
    if(hubGrid&&!document.getElementById('wardenBtn')){
      const btn=document.createElement('button');btn.id='wardenBtn';btn.className='hub-card warden-hub-card';
      btn.innerHTML=`<span class="hub-icon">✦</span><b>Warden</b><small>Spend Skill Points across Beast Bond, Battlecraft and Wildkeeper.</small><div class="warden-mini-progress"><span id="wardenHubLevel">Level 1</span><span id="wardenHubPoints">0 Skill Points</span></div><em>Open Skill Tree ›</em>`;
      btn.onclick=()=>{renderWardenScreen();show('wardenScreen');};hubGrid.appendChild(btn);
    }
  }

  function skillNode(id){
    const s=SKILLS[id],r=rank(id),req=TIER_REQ[s.tier],unlocked=tierUnlocked(s),buyable=canBuy(id);
    let cls='warden-node '+(s.keystone?'keystone ':'')+(r>=s.max?'owned maxed':r>0?'owned':buyable?'available':'locked');
    const requirement=!unlocked?`Requires Warden Lv ${req.level} • ${req.points} points in ${TREE_META[s.tree].name}`:(r>=s.max?'Mastered':availablePoints()?'Tap to invest 1 Skill Point':'No Skill Points available');
    return `<button class="${cls}" data-skill="${id}" ${buyable?'':'disabled'}><span class="rank">${r}/${s.max}</span><b>${s.name}</b><small>${r?s.desc(r):s.effect}</small><em>${requirement}</em></button>`;
  }
  function renderTree(tree){
    const meta=TREE_META[tree],points=treePoints(tree);
    let html=`<div class="warden-tree ${tree===activeTree?'mobile-active':''}" data-tree="${tree}"><div class="warden-tree-head"><span class="warden-tree-points">${points} pts</span><h3>${meta.icon} ${meta.name}</h3><p>${meta.tagline}</p></div>`;
    [1,2,3,4,5].forEach(tier=>{
      const ids=Object.keys(SKILLS).filter(id=>SKILLS[id].tree===tree&&SKILLS[id].tier===tier);if(!ids.length)return;
      const req=TIER_REQ[tier];
      html+=`<div class="warden-tier"><div class="warden-tier-label"><span>${req.label}</span><span>${tier===1?'Open':`Lv ${req.level} • ${req.points} tree pts`}</span></div>${ids.map(skillNode).join('')}</div>`;
    });
    return html+'</div>';
  }
  function renderWardenScreen(){
    ensureWardenData();injectStyles();injectScreen();
    const body=document.getElementById('wardenScreenBody');if(!body)return;
    const floor=currentWardenFloor(),ceil=save.wardenLevel>=WARDEN_LEVEL_CAP?floor:nextWardenThreshold();
    const pct=save.wardenLevel>=WARDEN_LEVEL_CAP?100:Math.max(0,Math.min(100,(save.wardenXP-floor)/Math.max(1,ceil-floor)*100));
    body.innerHTML=`
      <div class="warden-hero"><div><span class="warden-kicker">WARDEN MASTERY</span><h2>Warden Skill Tree</h2><p>Your Warden Level now shapes the entire Sanctuary. Invest modest permanent bonuses, specialise your playstyle, and respec whenever you want to try another path.</p></div><div class="warden-level-orb"><small>WARDEN</small><b>${save.wardenLevel}</b><span>LEVEL</span></div><div class="warden-xp"><div class="warden-xp-line"><span>${save.wardenLevel>=WARDEN_LEVEL_CAP?'MAXIMUM WARDEN LEVEL':'WARDEN XP'}</span><span>${save.wardenLevel>=WARDEN_LEVEL_CAP?'MAX':`${save.wardenXP-floor} / ${ceil-floor}`}</span></div><div class="warden-xpbar"><i style="width:${pct}%"></i></div></div></div>
      <div class="warden-summary"><div><small>SKILL POINTS</small><b>${availablePoints()}</b></div><div><small>BEAST BOND</small><b>${treePoints('bond')}</b></div><div><small>BATTLECRAFT</small><b>${treePoints('battle')}</b></div><div><small>WILDKEEPER</small><b>${treePoints('wild')}</b></div></div>
      <div class="warden-tree-tabs">${Object.entries(TREE_META).map(([key,m])=>`<button class="warden-tree-tab ${key===activeTree?'active':''}" data-tree-tab="${key}">${m.icon} ${m.name}<small>${treePoints(key)} points invested</small></button>`).join('')}</div>
      <div class="warden-tree-grid">${renderTree('bond')}${renderTree('battle')}${renderTree('wild')}</div>
      <div class="warden-actions"><div><b>Reset Skills</b><small>${save.wardenResets===0?'Your first reset is free.':'Future resets cost 250 Essence.'} Current Essence: ${save.essence}</small></div><button id="wardenResetBtn" class="warden-reset">${save.wardenResets===0?'FREE RESET':'RESET • 250 ESSENCE'}</button></div>`;
    body.querySelectorAll('[data-skill]').forEach(btn=>btn.onclick=()=>buySkill(btn.dataset.skill));
    body.querySelectorAll('[data-tree-tab]').forEach(btn=>btn.onclick=()=>{activeTree=btn.dataset.treeTab;renderWardenScreen();});
    const reset=body.querySelector('#wardenResetBtn');if(reset)reset.onclick=resetSkills;
    updateWardenHubBits();
  }
  function updateWardenHubBits(){
    ensureWardenData();
    const l=document.getElementById('wardenHubLevel'),p=document.getElementById('wardenHubPoints');
    if(l)l.textContent='Level '+save.wardenLevel;if(p)p.textContent=availablePoints()+' Skill Point'+(availablePoints()===1?'':'s');
  }

  injectStyles();injectScreen();

  const originalUpdateHub=updateHub;
  updateHub=function(){ensureWardenData();originalUpdateHub();updateWardenHubBits();if(document.getElementById('wardenScreen')?.classList.contains('active'))renderWardenScreen();};

  const originalBattleStats=battleStats;
  battleStats=function(id){
    let out=originalBattleStats(id),stage=evolutionStage(id),damage=1+rank('naturalStrength')*.01,speed=rank('quickInstincts')*.01,range=1+rank('huntersEye')*.01;
    if(rank('evolutionBond')&&stage>=2){const b=stage>=3?.03:.02;damage+=b;speed+=b;}
    damage+=ascension(id)*rank('ascendedSpirit')*.005;
    if(rank('perfectBond')&&stage>=3)range*=1.02;
    return {...out,damage:out.damage*damage,rate:out.rate/(1+speed),range:Math.min(290,out.range*range)};
  };
  const originalAddXP=addXP;
  addXP=function(ids,amount){
    const before={};ids.forEach(id=>before[id]=progress(id).level);
    const boosted=Math.max(1,Math.round(amount*(1+rank('bondedLearning')*.02)));
    const result=originalAddXP(ids,boosted);
    ids.forEach(id=>{
      const prev=before[id]||1,now=progress(id).level;
      if(prev<FIRST_EVOLUTION_LEVEL&&now>=FIRST_EVOLUTION_LEVEL&&!save.wardenMilestones.includes(id+':evo2')){save.wardenMilestones.push(id+':evo2');addWardenXP(20,'First Evolution');}
      if(prev<SECOND_EVOLUTION_LEVEL&&now>=SECOND_EVOLUTION_LEVEL&&!save.wardenMilestones.includes(id+':evo3')){save.wardenMilestones.push(id+':evo3');addWardenXP(40,'Final Evolution');}
    });
    return result;
  };
  const originalHitProjectile=hitProjectile;
  hitProjectile=function(p){
    const t=p?.target,keys=['burn','poison','slow','root','stun'],before={};if(t)keys.forEach(k=>before[k]=Number(t[k])||0);
    const result=originalHitProjectile(p);
    if(t&&p?.beastId){let factor=1+rank('elementalAffinity')*.02;if(rank('perfectBond')&&evolutionStage(p.beastId)>=3)factor+=.03;if(factor>1)keys.forEach(k=>{const now=Number(t[k])||0;if(now>before[k])t[k]=before[k]+(now-before[k])*factor;});}
    return result;
  };

  const originalReset=reset;
  reset=function(){const r=originalReset();gold+=rank('warChest')*15;cleanWaveStreak=0;lastWaveLives=lives;ui();return r;};
  const originalUpgradeCost=upgradeCost;
  upgradeCost=function(t,path){let c=originalUpgradeCost(t,path);c*=1-rank('wardenEngineering')*.01;if(rank('masterStrategist')&&((t.powerTier||0)+(t.specialTier||0)+(t.skillTier||0)===0))c*=.85;return Math.max(1,Math.round(c));};
  const sellBtn=document.getElementById('sellTowerBtn');
  if(sellBtn)sellBtn.onclick=()=>{if(!selectedTower)return;const idx=towers.indexOf(selectedTower);if(idx<0)return;const refund=Math.floor(selectedTower.spent*(.80+rank('fieldSalvage')*.01));gold+=refund;towers.splice(idx,1);closeTowerModal();ui();};
  canvas.addEventListener('pointerdown',()=>{
    const before=towers.length;
    setTimeout(()=>{
      if(towers.length<=before)return;
      const t=towers[towers.length-1];
      if(before===0&&rank('preparedDefence')){const refund=Math.max(1,Math.round((t.baseCost||0)*.08));gold+=refund;ui();try{showProgressToast('PREPARED DEFENCE','First deployment refund • +'+refund+' Gold','normal');}catch(e){}}
      const rr=rank('rapidReinforcement');if(rr&&t){const originalRate=t.b.rate;t.b.rate=originalRate/(1+rr*.03);setTimeout(()=>{if(towers.includes(t)){try{recalcTower(t);}catch(e){t.b.rate=originalRate;}}},10000);}
    },0);
  });
  const originalCompleteWave=completeWave;
  completeWave=function(){
    const livesBefore=lastWaveLives;const r=originalCompleteWave();
    const waveBonus=rank('waveEconomy')*2;if(waveBonus){gold+=waveBonus;ui();if($('#waveXpNotice'))$('#waveXpNotice').textContent+=' • +'+waveBonus+' Warden Gold';}
    if(rank('perfectDefence')){if(lives===livesBefore)cleanWaveStreak++;else cleanWaveStreak=0;if(cleanWaveStreak>=3){cleanWaveStreak=0;gold+=25;ui();try{showProgressToast('PERFECT DEFENCE','Three clean waves • +25 Gold','normal');}catch(e){}}}
    lastWaveLives=lives;
    if(rank('protectiveBond')&&lives===livesBefore){towers.forEach(t=>{t.b.rate/=1.02;setTimeout(()=>{if(towers.includes(t))try{recalcTower(t);}catch(e){}},7000);});}
    addWardenXP(2+Math.ceil(wave/3),'Wave '+wave+' cleared');
    return r;
  };

  const originalHatch=hatch;
  hatch=function(pool,cost,isFreeCommon=false){
    ensureWardenData();
    const free=isFreeCommon&&!save.freeCommonClaimed;
    const beforeUnlocked=[...save.unlocked],beforeCopies={...save.beastCopies},beforeEssence=save.essence;
    let effectiveCost=cost;
    if(!free){
      effectiveCost=Math.max(1,Math.round(cost*(1-rank('eggkeeper')*.01)));
      const next=save.wardenPaidEggs+1;if(rank('sanctuaryMaster')&&next%5===0)effectiveCost=Math.max(1,Math.round(effectiveCost*.9));
    }
    const r=originalHatch(pool,effectiveCost,isFreeCommon);
    const newId=save.unlocked.find(id=>!beforeUnlocked.includes(id));
    let duplicateId=null;Object.keys(save.beastCopies).some(id=>{if((save.beastCopies[id]||0)>(beforeCopies[id]||0)){duplicateId=id;return true;}return false;});
    if(!free&&save.essence<beforeEssence){
      save.wardenPaidEggs++;
      if(rank('keepersFortune')&&save.wardenPaidEggs%10===0){const refund=Math.max(1,Math.round(effectiveCost*.20));save.essence+=refund;try{showProgressToast("KEEPER'S FORTUNE",'10th paid Egg • +'+refund+' Essence refunded','normal');}catch(e){}}
    }
    if(newId&&rank('firstDiscovery')){save.essence+=25;addWardenXP(15,'New Beast discovered');}
    if(duplicateId){
      const sxp=rank('sharedExperience')*5;if(sxp)originalAddXP([duplicateId],sxp);
      if(rank('excessBond')&&ascension(duplicateId)>=3){save.beastCopies[duplicateId]=Math.max(0,(save.beastCopies[duplicateId]||0)-1);const tierCost=pool===epicPool?epicCost:pool===rarePool?rareCost:commonCost;save.essence+=Math.round(tierCost*.20);}
    }
    persist();updateHatcheryCosts();return r;
  };
  const originalAscendBeast=ascendBeast;
  ascendBeast=function(id){const before=ascension(id);const r=originalAscendBeast(id);if(ascension(id)>before){const bonus=rank('ascensionMastery')*25;if(bonus)originalAddXP([id],bonus);addWardenXP(15,'Beast Ascended');persist();}return r;};
  function updateHatcheryCosts(){
    const discount=rank('eggkeeper')*.01;
    if($('#commonEggCost'))$('#commonEggCost').textContent=save.freeCommonClaimed?Math.round(commonCost*(1-discount))+' Essence':'Free';
    if($('#rareEggCost'))$('#rareEggCost').textContent=Math.round(rareCost*(1-discount))+' Essence';
    if($('#epicEggCost'))$('#epicEggCost').textContent=Math.round(epicCost*(1-discount))+' Essence';
  }

  const originalFinish=finish;
  finish=function(win){
    const beforeEssence=save.essence,beforeLevel=save.wardenLevel;const r=originalFinish(win);
    ensureWardenData();
    if(win){
      if(save.wardenLevel>beforeLevel)save.wardenXP=Math.max(save.wardenXP,cumulativeXpForLevel(save.wardenLevel));
      const baseGain=Math.max(0,save.essence-beforeEssence),essenceBonus=Math.round(baseGain*rank('essenceSeeker')*.02);
      if(essenceBonus)save.essence+=essenceBonus;
      let wxp=25+(currentLevel?.id||1)*3;if(currentLevel?.boss&&battleReport?.bossDefeated)wxp+=25;wxp=Math.round(wxp*(1+rank('beastScholar')*.02));
      addWardenXP(wxp,'Stage cleared');persist();
      const text=$('#resultText');if(text&&essenceBonus)text.textContent+=' Wildkeeper bonus: +'+essenceBonus+' Essence.';
    }
    return r;
  };

  const originalPersist=persist;
  persist=function(){ensureWardenData();const r=originalPersist();updateWardenHubBits();return r;};

  applyDeploymentCosts();updateWardenHubBits();updateHatcheryCosts();
  document.documentElement.dataset.wardenSkillTree='ready';
})();
