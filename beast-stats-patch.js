// BeastBorn beast stat progression v1
(() => {
  const STAT_KEYS=['power','speed','range','focus','instinct'];
  const STAT_INFO={
    power:{label:'Power',desc:'Raises attack damage.',icon:'⚔'},
    speed:{label:'Speed',desc:'Reduces time between attacks.',icon:'»'},
    range:{label:'Range',desc:'Extends attack radius.',icon:'◎'},
    focus:{label:'Focus',desc:'Strengthens elemental damage.',icon:'✦'},
    instinct:{label:'Instinct',desc:'Adds a chance to land a primal critical hit.',icon:'◆'}
  };

  function ensureStatData(){
    save.beastStatAlloc=save.beastStatAlloc||{};
    save.beastStatResetUsed=save.beastStatResetUsed||{};
    (save.unlocked||[]).forEach(id=>{
      const a=save.beastStatAlloc[id]||(save.beastStatAlloc[id]={});
      STAT_KEYS.forEach(k=>a[k]=Math.max(0,Math.floor(a[k]||0)));
    });
  }

  function baseStats(id){
    const b=beastRatings[id]||{power:5,speed:5,range:5,special:5};
    return {
      power:b.power,
      speed:b.speed,
      range:b.range,
      focus:b.special,
      instinct:Math.max(4,Math.min(10,Math.round((b.speed+b.special)/2)))
    };
  }

  function statCap(id){
    const level=progress(id).level;
    return level>=SECOND_EVOLUTION_LEVEL?30:level>=FIRST_EVOLUTION_LEVEL?20:10;
  }

  function earnedSkillPoints(id){
    const level=progress(id).level;
    return Math.max(0,level-1)+(level>=FIRST_EVOLUTION_LEVEL?5:0)+(level>=SECOND_EVOLUTION_LEVEL?10:0);
  }

  function statAlloc(id){
    ensureStatData();
    return save.beastStatAlloc[id]||(save.beastStatAlloc[id]={power:0,speed:0,range:0,focus:0,instinct:0});
  }

  function usedSkillPoints(id){return STAT_KEYS.reduce((n,k)=>n+(statAlloc(id)[k]||0),0)}
  function availableSkillPoints(id){return Math.max(0,earnedSkillPoints(id)-usedSkillPoints(id))}

  function trainedStats(id){
    const base=baseStats(id),a=statAlloc(id),cap=statCap(id),out={cap,stage:evolutionStage(id)};
    STAT_KEYS.forEach(k=>out[k]=Math.min(cap,base[k]+(a[k]||0)));
    return out;
  }

  // Make the existing stat readout use the player's trained build instead of auto-scaling with evolution.
  stageStats=function(id){
    const s=trainedStats(id);
    return {stage:s.stage,cap:s.cap,power:s.power,speed:s.speed,range:s.range,special:s.focus,focus:s.focus,instinct:s.instinct};
  };

  const previousBattleStats=battleStats;
  battleStats=function(id){
    const b=previousBattleStats(id),s=trainedStats(id),base=baseStats(id);
    const powerGain=Math.max(0,s.power-base.power);
    const speedGain=Math.max(0,s.speed-base.speed);
    const rangeGain=Math.max(0,s.range-base.range);
    const focusGain=Math.max(0,s.focus-base.focus);
    const instinctGain=Math.max(0,s.instinct-base.instinct);
    return {
      ...b,
      damage:b.damage*(1+powerGain*.032)*(1+focusGain*.012),
      rate:Math.max(.22,b.rate*(1-speedGain*.018)),
      range:clampCombatRange(b.range+rangeGain*3),
      beastStatFocus:focusGain,
      beastStatCrit:.025+instinctGain*.012
    };
  };

  // Instinct applies to real projectiles without touching the species-specific combat code.
  const previousHitProjectile=hitProjectile;
  hitProjectile=function(p){
    if(p&&p.beastId&&beasts[p.beastId]){
      const bs=battleStats(p.beastId);
      if(Math.random()<(bs.beastStatCrit||0)){
        p.damage*=1.5;
        try{fx('crit',p.target.x,p.target.y,'#f2d36b')}catch(e){}
      }
    }
    return previousHitProjectile(p);
  };

  function allocatePoint(id,key){
    if(!STAT_KEYS.includes(key)||availableSkillPoints(id)<=0)return false;
    const a=statAlloc(id),s=trainedStats(id);
    if(s[key]>=s.cap)return false;
    a[key]=(a[key]||0)+1;
    persist();
    return true;
  }

  function resetStats(id){
    const a=statAlloc(id);
    if(!usedSkillPoints(id))return true;
    const free=!save.beastStatResetUsed[id];
    const cost=free?0:100;
    if((save.essence||0)<cost)return false;
    if(cost)save.essence-=cost;
    STAT_KEYS.forEach(k=>a[k]=0);
    save.beastStatResetUsed[id]=true;
    persist();
    const essence=document.querySelector('#essenceTotal');
    if(essence)essence.textContent=save.essence||0;
    return true;
  }

  function statPreview(id,key){
    const s=trainedStats(id),base=baseStats(id),added=Math.max(0,s[key]-base[key]);
    if(key==='power')return `+${Math.round(added*3.2)}% damage`;
    if(key==='speed')return `~${Math.round(added*1.8)}% faster`;
    if(key==='range')return `+${added*3}px range`;
    if(key==='focus')return `+${Math.round(added*1.2)}% elemental damage`;
    return `${Math.round((2.5+added*1.2)*10)/10}% critical chance`;
  }

  function renderStatTraining(id){
    ensureStatData();
    const body=document.querySelector('#denBeastModalBody');
    if(!body||!beasts[id])return;
    body.querySelector('.beast-training-panel')?.remove();
    const s=trainedStats(id),base=baseStats(id),points=availableSkillPoints(id),used=usedSkillPoints(id),earned=earnedSkillPoints(id);
    const stageName=s.stage===1?'Stage I':s.stage===2?'Stage II':'Stage III';
    const free=!save.beastStatResetUsed[id];
    const panel=document.createElement('section');
    panel.className='beast-training-panel';
    panel.innerHTML=`
      <div class="training-head">
        <div><span class="training-kicker">BEAST TRAINING</span><h3>Shape Your Build</h3><small>${stageName} • Stat cap ${s.cap}</small></div>
        <div class="skill-orb ${points?'has-points':''}"><b>${points}</b><span>SKILL ${points===1?'POINT':'POINTS'}</span></div>
      </div>
      <div class="training-note">Gain 1 Skill Point each level. Evolution grants <b>+5</b> at Lv30 and <b>+10</b> at Lv60. Points remain yours when the beast evolves.</div>
      <div class="training-stats">
        ${STAT_KEYS.map(k=>{
          const info=STAT_INFO[k],value=s[k],atCap=value>=s.cap,canAdd=points>0&&!atCap,segments=Math.max(1,s.cap);
          return `<div class="training-stat" data-stat="${k}">
            <div class="training-stat-top"><span class="stat-symbol">${info.icon}</span><div class="stat-copy"><b>${info.label}</b><small>${info.desc}</small></div><strong>${value}<i>/${s.cap}</i></strong><button class="stat-plus" data-add-stat="${k}" ${canAdd?'':'disabled'} aria-label="Add ${info.label}">+</button></div>
            <div class="training-bar"><i style="width:${Math.min(100,value/s.cap*100)}%"></i></div>
            <div class="training-stat-foot"><span>Base ${base[k]}</span><em>${statPreview(id,k)}</em>${atCap?'<b>MAX</b>':''}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="training-footer">
        <span>${used} of ${earned} earned points allocated</span>
        <button class="stat-reset" ${used?'':'disabled'}>${free?'FREE RESET':'RESET • 100 ESSENCE'}</button>
      </div>`;
    body.appendChild(panel);
    panel.querySelectorAll('[data-add-stat]').forEach(btn=>btn.onclick=()=>{
      if(allocatePoint(id,btn.dataset.addStat)){
        try{openDenBeast(id)}catch(e){renderStatTraining(id)}
      }
    });
    const reset=panel.querySelector('.stat-reset');
    if(reset)reset.onclick=()=>{
      if(!resetStats(id)){
        reset.textContent='NOT ENOUGH ESSENCE';
        setTimeout(()=>renderStatTraining(id),800);
        return;
      }
      try{openDenBeast(id)}catch(e){renderStatTraining(id)}
    };
  }

  const previousOpenDenBeast=openDenBeast;
  openDenBeast=function(id){
    ensureStatData();
    previousOpenDenBeast(id);
    renderStatTraining(id);
  };

  // Surface unspent points on the collection screen without changing the existing card markup.
  const previousRenderCollection=renderCollection;
  renderCollection=function(){
    ensureStatData();
    previousRenderCollection();
    const cards=[...document.querySelectorAll('#beastCollection .beast-card, #beastCollection > *')];
    const ids=(save.unlocked||[]);
    cards.forEach((card,i)=>{
      const id=ids[i];if(!id||!beasts[id]||card.querySelector('.skill-point-badge'))return;
      const n=availableSkillPoints(id);if(!n)return;
      card.style.position='relative';
      const badge=document.createElement('span');badge.className='skill-point-badge';badge.textContent=`+${n} SP`;card.appendChild(badge);
    });
  };

  const css=document.createElement('style');
  css.textContent=`
    .beast-training-panel{margin:18px 0 4px;padding:16px;border:1px solid #566b57;border-radius:14px;background:linear-gradient(180deg,#10261c,#0b1812);box-shadow:inset 0 0 30px #80c88b0b,0 10px 25px #0005;color:#dce4d8}
    .training-head{display:flex;justify-content:space-between;gap:14px;align-items:center;padding-bottom:12px;border-bottom:1px solid #51615355}.training-kicker{font-size:8px;font-weight:900;letter-spacing:.25em;color:#84b998}.training-head h3{font-family:Georgia,serif;color:#e9cf72;font-size:21px;margin:3px 0}.training-head small{color:#8fa095;font-size:9px}.skill-orb{min-width:82px;padding:9px 12px;border-radius:12px;text-align:center;border:1px solid #4e6757;background:#0c1711}.skill-orb.has-points{border-color:#d8bd6177;box-shadow:0 0 18px #d8bd6118}.skill-orb b{display:block;color:#efd26e;font:700 25px Georgia,serif}.skill-orb span{font-size:7px;letter-spacing:.12em;color:#8fa095;font-weight:900}.training-note{margin:10px 0 12px;padding:8px 10px;border-radius:8px;background:#16281e;color:#8fa095;font-size:9px;line-height:1.45}.training-note b{color:#dfca74}.training-stats{display:grid;gap:8px}.training-stat{padding:10px;border:1px solid #3d5144;border-radius:10px;background:#0c1913}.training-stat-top{display:grid;grid-template-columns:28px 1fr auto 34px;align-items:center;gap:8px}.stat-symbol{width:26px;height:26px;border-radius:7px;display:grid;place-items:center;background:#1a3024;color:#e1c967}.stat-copy b{display:block;font-size:11px}.stat-copy small{display:block;color:#718278;font-size:8px;margin-top:2px}.training-stat strong{font:700 18px Georgia,serif;color:#ebd477}.training-stat strong i{font:normal 9px sans-serif;color:#718278}.stat-plus{width:32px;height:32px;border-radius:8px;border:1px solid #d4bb6666;background:#284c35;color:#f2dc86;font-size:21px;font-weight:900;cursor:pointer}.stat-plus:disabled{opacity:.28;cursor:default}.training-bar{height:5px;margin:8px 0 5px;border-radius:4px;background:#1c2a22;overflow:hidden}.training-bar i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,#4c9a69,#d0b95e)}.training-stat-foot{display:flex;gap:10px;align-items:center;font-size:7px;color:#64756a}.training-stat-foot em{font-style:normal;color:#91ad99;margin-left:auto}.training-stat-foot b{color:#e6ca69;font-size:7px}.training-footer{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;color:#829087;font-size:8px}.stat-reset{padding:8px 11px;border:1px solid #816f43;border-radius:8px;background:#211f16;color:#d9c57a;font-size:8px;font-weight:900;cursor:pointer}.stat-reset:disabled{opacity:.3}.skill-point-badge{position:absolute!important;right:7px!important;top:7px!important;z-index:6;padding:4px 6px!important;border-radius:10px!important;background:#d7bc5f!important;color:#172218!important;font-size:8px!important;font-weight:1000!important;box-shadow:0 3px 9px #0007!important}
    @media(max-width:650px){.beast-training-panel{margin:12px -3px 2px;padding:11px}.training-head h3{font-size:18px}.skill-orb{min-width:68px}.training-stat-top{grid-template-columns:25px 1fr auto 32px}.stat-copy small{font-size:7px}.training-footer{align-items:flex-end}.stat-reset{max-width:130px}}
  `;
  document.head.appendChild(css);

  ensureStatData();
})();
