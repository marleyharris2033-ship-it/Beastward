// BeastBorn beast stat progression v2
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
    save.beastStatAlloc=save.beastStatAlloc||{};save.beastStatResetUsed=save.beastStatResetUsed||{};
    (save.unlocked||[]).forEach(id=>{const a=save.beastStatAlloc[id]||(save.beastStatAlloc[id]={});STAT_KEYS.forEach(k=>a[k]=Math.max(0,Math.floor(a[k]||0)));});
  }
  // Species identity: natural/base values are permanent and never exceed 30.
  function baseStats(id){
    const b=beastRatings[id]||{power:5,speed:5,range:5,special:5};
    return {
      power:Math.min(30,Math.max(1,Math.round(b.power*3))),
      speed:Math.min(30,Math.max(1,Math.round(b.speed*3))),
      range:Math.min(30,Math.max(1,Math.round(b.range*3))),
      focus:Math.min(30,Math.max(1,Math.round(b.special*3))),
      instinct:Math.min(30,Math.max(1,Math.round(((b.speed+b.special)/2)*3)))
    };
  }
  function statCap(){return 100}
  // Exactly 100 trainable points by Lv100: 1 at Lv1, then 1 for every level reached.
  function earnedSkillPoints(id){return Math.max(1,Math.min(100,progress(id).level||1))}
  function statAlloc(id){ensureStatData();return save.beastStatAlloc[id]||(save.beastStatAlloc[id]={power:0,speed:0,range:0,focus:0,instinct:0})}
  function usedSkillPoints(id){return STAT_KEYS.reduce((n,k)=>n+(statAlloc(id)[k]||0),0)}
  function availableSkillPoints(id){return Math.max(0,earnedSkillPoints(id)-usedSkillPoints(id))}
  function trainedStats(id){
    const base=baseStats(id),a=statAlloc(id),cap=statCap(),out={cap,stage:evolutionStage(id)};
    STAT_KEYS.forEach(k=>out[k]=Math.min(cap,base[k]+(a[k]||0)));
    return out;
  }
  stageStats=function(id){const s=trainedStats(id);return {stage:s.stage,cap:s.cap,power:s.power,speed:s.speed,range:s.range,special:s.focus,focus:s.focus,instinct:s.instinct};};
  const previousBattleStats=battleStats;
  battleStats=function(id){
    const b=previousBattleStats(id),s=trainedStats(id),base=baseStats(id);
    const powerGain=Math.max(0,s.power-base.power),speedGain=Math.max(0,s.speed-base.speed),rangeGain=Math.max(0,s.range-base.range),focusGain=Math.max(0,s.focus-base.focus),instinctGain=Math.max(0,s.instinct-base.instinct);
    return {...b,
      damage:b.damage*(1+powerGain*.018)*(1+focusGain*.0075),
      rate:Math.max(.22,b.rate*(1-Math.min(.55,speedGain*.009))),
      range:clampCombatRange(b.range+rangeGain*1.35),
      beastStatFocus:focusGain,
      beastStatCrit:.025+Math.min(.35,instinctGain*.005)
    };
  };
  const previousHitProjectile=hitProjectile;
  hitProjectile=function(p){if(p&&p.beastId&&beasts[p.beastId]){const bs=battleStats(p.beastId);if(Math.random()<(bs.beastStatCrit||0)){p.damage*=1.5;try{fx('crit',p.target.x,p.target.y,'#f2d36b')}catch(e){}}}return previousHitProjectile(p);};
  function allocatePoint(id,key){if(!STAT_KEYS.includes(key)||availableSkillPoints(id)<=0)return false;const a=statAlloc(id),s=trainedStats(id);if(s[key]>=100)return false;a[key]=(a[key]||0)+1;persist();return true;}
  function resetStats(id){const a=statAlloc(id);if(!usedSkillPoints(id))return true;const free=!save.beastStatResetUsed[id],cost=free?0:100;if((save.essence||0)<cost)return false;if(cost)save.essence-=cost;STAT_KEYS.forEach(k=>a[k]=0);save.beastStatResetUsed[id]=true;persist();const essence=document.querySelector('#essenceTotal');if(essence)essence.textContent=save.essence||0;return true;}
  function statPreview(id,key){const s=trainedStats(id),base=baseStats(id),added=Math.max(0,s[key]-base[key]);if(key==='power')return `+${Math.round(added*1.8)}% damage`;if(key==='speed')return `~${Math.round(Math.min(55,added*.9))}% faster`;if(key==='range')return `+${Math.round(added*1.35)}px range`;if(key==='focus')return `+${Math.round(added*.75)}% elemental damage`;return `${Math.round((2.5+Math.min(35,added*.5))*10)/10}% critical chance`;}
  function renderStatTraining(id){
    ensureStatData();const body=document.querySelector('#denBeastModalBody');if(!body||!beasts[id])return;body.querySelector('.beast-training-panel')?.remove();
    const s=trainedStats(id),base=baseStats(id),points=availableSkillPoints(id),used=usedSkillPoints(id),earned=earnedSkillPoints(id),free=!save.beastStatResetUsed[id];
    const panel=document.createElement('section');panel.className='beast-training-panel';panel.innerHTML=`
      <div class="training-head"><div><span class="training-kicker">BEAST TRAINING</span><h3>Shape Your Build</h3><small>Five specialist stats • Maximum 100 each</small></div><div class="skill-orb ${points?'has-points':''}"><b>${points}</b><span>SKILL ${points===1?'POINT':'POINTS'}</span></div></div>
      <div class="training-note">Every beast has unique natural stats of up to <b>30</b>. You gain <b>1 Skill Point per level</b>, giving <b>100 total at Lv100</b>. With five stats reaching 100, no beast can master everything — specialise your build.</div>
      <div class="training-stats">${STAT_KEYS.map(k=>{const info=STAT_INFO[k],value=s[k],atCap=value>=100,canAdd=points>0&&!atCap;return `<div class="training-stat" data-stat="${k}"><div class="training-stat-top"><span class="stat-symbol">${info.icon}</span><div class="stat-copy"><b>${info.label}</b><small>${info.desc}</small></div><strong>${value}<i>/100</i></strong><button class="stat-plus" data-add-stat="${k}" ${canAdd?'':'disabled'} aria-label="Add ${info.label}">+</button></div><div class="training-bar"><i style="width:${value}%"></i></div><div class="training-stat-foot"><span>Natural ${base[k]}</span><em>${statPreview(id,k)}</em>${atCap?'<b>MAX</b>':''}</div></div>`;}).join('')}</div>
      <div class="training-footer"><span>${used} of ${earned} earned points allocated • ${100-earned} still earnable</span><button class="stat-reset" ${used?'':'disabled'}>${free?'FREE RESET':'RESET • 100 ESSENCE'}</button></div>`;
    body.appendChild(panel);
    panel.querySelectorAll('[data-add-stat]').forEach(btn=>btn.onclick=()=>{if(allocatePoint(id,btn.dataset.addStat)){try{openDenBeast(id)}catch(e){renderStatTraining(id)}}});
    const reset=panel.querySelector('.stat-reset');if(reset)reset.onclick=()=>{if(!resetStats(id)){reset.textContent='NOT ENOUGH ESSENCE';setTimeout(()=>renderStatTraining(id),800);return}try{openDenBeast(id)}catch(e){renderStatTraining(id)}};
  }
  const previousOpenDenBeast=openDenBeast;openDenBeast=function(id){ensureStatData();previousOpenDenBeast(id);renderStatTraining(id);};
  const previousRenderCollection=renderCollection;renderCollection=function(){ensureStatData();previousRenderCollection();const cards=[...document.querySelectorAll('#beastCollection .beast-card, #beastCollection > *')],ids=(save.unlocked||[]);cards.forEach((card,i)=>{const id=ids[i];if(!id||!beasts[id]||card.querySelector('.skill-point-badge'))return;const n=availableSkillPoints(id);if(!n)return;card.style.position='relative';const badge=document.createElement('span');badge.className='skill-point-badge';badge.textContent=`+${n} SP`;card.appendChild(badge);});};
  const css=document.createElement('style');css.textContent=`.beast-training-panel{margin:18px 0 4px;padding:16px;border:1px solid #566b57;border-radius:14px;background:linear-gradient(180deg,#10261c,#0b1812);box-shadow:inset 0 0 30px #80c88b0b,0 10px 25px #0005;color:#dce4d8}.training-head{display:flex;justify-content:space-between;gap:14px;align-items:center;padding-bottom:12px;border-bottom:1px solid #51615355}.training-kicker{font-size:8px;font-weight:900;letter-spacing:.25em;color:#84b998}.training-head h3{font-family:Georgia,serif;color:#e9cf72;font-size:21px;margin:3px 0}.training-head small{color:#8fa095;font-size:9px}.skill-orb{min-width:82px;padding:9px 12px;border-radius:12px;text-align:center;border:1px solid #4e6757;background:#0c1711}.skill-orb.has-points{border-color:#d8bd6177;box-shadow:0 0 18px #d8bd6118}.skill-orb b{display:block;color:#efd26e;font:700 25px Georgia,serif}.skill-orb span{font-size:7px;letter-spacing:.12em;color:#8fa095;font-weight:900}.training-note{margin:10px 0 12px;padding:8px 10px;border-radius:8px;background:#16281e;color:#8fa095;font-size:9px;line-height:1.45}.training-note b{color:#dfca74}.training-stats{display:grid;gap:8px}.training-stat{padding:10px;border:1px solid #3d5144;border-radius:10px;background:#0c1913}.training-stat-top{display:grid;grid-template-columns:28px 1fr auto 34px;align-items:center;gap:8px}.stat-symbol{width:26px;height:26px;border-radius:7px;display:grid;place-items:center;background:#1a3024;color:#e1c967}.stat-copy b{display:block;font-size:11px}.stat-copy small{display:block;color:#718278;font-size:8px;margin-top:2px}.training-stat strong{font:700 18px Georgia,serif;color:#ebd477}.training-stat strong i{font:normal 9px sans-serif;color:#718278}.stat-plus{width:32px;height:32px;border-radius:8px;border:1px solid #d4bb6666;background:#284c35;color:#f2dc86;font-size:21px;font-weight:900;cursor:pointer}.stat-plus:disabled{opacity:.28;cursor:default}.training-bar{height:5px;margin:8px 0 5px;border-radius:4px;background:#1c2a22;overflow:hidden}.training-bar i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,#4c9a69,#d0b95e)}.training-stat-foot{display:flex;gap:10px;align-items:center;font-size:7px;color:#64756a}.training-stat-foot em{font-style:normal;color:#91ad99;margin-left:auto}.training-stat-foot b{color:#e6ca69;font-size:7px}.training-footer{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;color:#829087;font-size:8px}.stat-reset{padding:8px 11px;border:1px solid #816f43;border-radius:8px;background:#211f16;color:#d9c57a;font-size:8px;font-weight:900;cursor:pointer}.stat-reset:disabled{opacity:.3}.skill-point-badge{position:absolute!important;right:7px!important;top:7px!important;z-index:6;padding:4px 6px!important;border-radius:10px!important;background:#d7bc5f!important;color:#172218!important;font-size:8px!important;font-weight:1000!important;box-shadow:0 3px 9px #0007!important}@media(max-width:650px){.beast-training-panel{margin:12px -3px 2px;padding:11px}.training-head h3{font-size:18px}.skill-orb{min-width:68px}.training-stat-top{grid-template-columns:25px 1fr auto 32px}.stat-copy small{font-size:7px}.training-footer{align-items:flex-end}.stat-reset{max-width:130px}}`;document.head.appendChild(css);ensureStatData();
})();
