// BeastBorn Level 100 final evolution system v4
(() => {
  const FINAL_EVOLUTION_LEVEL=100;
  const ART_VERSION='20260910-redesign-2';
  const FINAL_FORMS={
    embercub:{name:'Emberlord',damage:14,speed:4,range:3,special:5},
    sprigpaw:{name:'Verdantyr',damage:8,speed:6,range:4,special:10},
    bubblit:{name:'Leviara',damage:8,speed:5,range:6,special:10},
    sparkit:{name:'Voltaris',damage:10,speed:9,range:4,special:7},
    pebblum:{name:'Terravorn',damage:18,speed:2,range:2,special:4},
    gustwing:{name:'Aetheroc',damage:8,speed:8,range:10,special:4},
    toxip:{name:'Venomarch',damage:8,speed:5,range:4,special:12},
    frostkit:{name:'Frostwyrm',damage:10,speed:4,range:6,special:10},
    shadepup:{name:'Noctyron',damage:14,speed:8,range:3,special:7},
    lumpling:{name:'Heliarch',damage:10,speed:5,range:8,special:10},
    voltwing:{name:'Fulgarion',damage:12,speed:10,range:8,special:8},
    scorchick:{name:'Solaraptor',damage:8,speed:14,range:3,special:8},
    mosshell:{name:'Gaiafort',damage:16,speed:2,range:2,special:8},
    drizzlet:{name:'Tsunavor',damage:7,speed:13,range:6,special:8},
    zapmoth:{name:'Stormmoth',damage:8,speed:14,range:7,special:8},
    cindrake:{name:'Pyroclast',damage:18,speed:4,range:7,special:10},
    sporeling:{name:'Mycoryx',damage:13,speed:5,range:7,special:12},
    drakeling:{name:'Skydrake',damage:12,speed:10,range:12,special:8},
    voidling:{name:'Voidreign',damage:18,speed:7,range:8,special:12}
  };

  Object.entries(FINAL_FORMS).forEach(([id,data])=>{if(beasts[id]){beasts[id].evo100=data.name;beasts[id].finalEvolution=data;}});

  if(beasts.embercub){
    beasts.embercub.evo20='Flarecub';beasts.embercub.evo30='Blazefang';beasts.embercub.evo100='Emberlord';
    beasts.embercub.sprite=`assets/pixel/redesign/embercub_1.png?v=${ART_VERSION}`;
    beasts.embercub.towerSprite=beasts.embercub.sprite;
  }
  if(beasts.sprigpaw){
    beasts.sprigpaw.sprite=`assets/pixel/redesign/sprigpaw_1.svg?v=${ART_VERSION}`;
    beasts.sprigpaw.towerSprite=beasts.sprigpaw.sprite;
  }

  evolutionStage=function(id){const l=progress(id).level;return l>=FINAL_EVOLUTION_LEVEL?4:l>=SECOND_EVOLUTION_LEVEL?3:l>=FIRST_EVOLUTION_LEVEL?2:1;};
  nameForStage=function(id,stage){const b=beasts[id];return stage>=4?(b.evo100||b.evo30):stage===3?b.evo30:stage===2?b.evo20:b.name;};
  nameFor=function(id){return nameForStage(id,evolutionStage(id));};

  const previousSyncSeenStages=syncSeenStages;
  syncSeenStages=function(id){previousSyncSeenStages(id);if(progress(id).level>=FINAL_EVOLUTION_LEVEL)markStageSeen(id,4);};

  const previousSpritePathForStage=spritePathForStage;
  spritePathForStage=function(id,stage=1){
    const s=Math.max(1,Math.min(4,stage));
    if(id==='embercub')return `assets/pixel/redesign/embercub_${s}.png?v=${ART_VERSION}`;
    if(id==='sprigpaw')return `assets/pixel/redesign/sprigpaw_${s}.svg?v=${ART_VERSION}`;
    if(stage>=4)return `assets/pixel/evolved/${id}_3.svg?v=48`;
    return previousSpritePathForStage(id,stage);
  };
  currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};

  const previousStageSpriteMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
    if(id==='embercub'||id==='sprigpaw'||stage>=4){
      const b=beasts[id],safeStage=Math.max(1,Math.min(4,stage)),name=nameForStage(id,safeStage),src=spritePathForStage(id,safeStage);
      return `<span class="stage-sprite stage-${safeStage} type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;
    }
    return previousStageSpriteMarkup(id,stage,extra,unseen);
  };

  Object.keys(beasts).forEach(id=>{evolutionSpriteImgs[id]=evolutionSpriteImgs[id]||{};evolutionSpriteImgs[id][4]=evolutionSpriteImgs[id][3]||spriteImgs[id];if(progress(id).level>=FINAL_EVOLUTION_LEVEL)syncSeenStages(id);});

  ['embercub','sprigpaw'].forEach(id=>{
    if(!beasts[id])return;
    [1,2,3,4].forEach(stage=>{const img=new Image();img.decoding='async';img.src=spritePathForStage(id,stage);if(stage===1)spriteImgs[id]=img;else evolutionSpriteImgs[id][stage]=img;});
  });
  const titleEmber=document.querySelector('#titleScreen .title-beast-left img');if(titleEmber)titleEmber.src=spritePathForStage('embercub',1);

  const previousBattleStats=battleStats;
  battleStats=function(id){const b=previousBattleStats(id),f=FINAL_FORMS[id];if(!f||progress(id).level<FINAL_EVOLUTION_LEVEL)return b;return {...b,damage:b.damage*(1+f.damage/100)*(1+f.special/200),rate:Math.max(.20,b.rate*(1-f.speed/100)),range:clampCombatRange(b.range*(1+f.range/100)),finalEvolution:true,finalEvolutionName:f.name};};

  bestiaryBeastEntries=function(){const result=[];Object.values(beasts).forEach((b,speciesIndex)=>{[1,2,3,4].forEach(stage=>result.push({id:b.id,stage,key:beastStageKey(b.id,stage),number:speciesIndex*4+stage,name:nameForStage(b.id,stage),type:b.type,role:b.role,seen:stageSeen(b.id,stage)}));});return result;};

  const previousBestiaryStageDescription=bestiaryStageDescription;
  bestiaryStageDescription=function(id,stage){if(stage<4)return previousBestiaryStageDescription(id,stage);const b=beasts[id],f=FINAL_FORMS[id];return `${f.name} is the ultimate Level 100 evolution of ${b.name}. This final form represents complete mastery of its ${b.type.toLowerCase()} bond and gains a species-specific capstone combat bonus.`;};

  const previousRenderBestiary=renderBestiary;
  renderBestiary=function(){previousRenderBestiary();const bp=document.querySelector('#bestiaryProgress');if(bp)bp.textContent=`${(save.seenBeastStages||[]).length} / ${Object.keys(beasts).length*4} entries logged`;};

  const previousOpenDenBeast=openDenBeast;
  openDenBeast=function(id){previousOpenDenBeast(id);const body=document.querySelector('#denBeastModalBody'),b=beasts[id],f=FINAL_FORMS[id];if(!body||!b||!f)return;const line=body.querySelector('.den-evo-line');if(line&&!line.querySelector('.final-evo-node')){const node=document.createElement('div');node.className='final-evo-node';node.innerHTML=`${stageSpriteMarkup(id,4,'den-evo-sprite')}<small>Lv 100</small><b>${f.name}</b><em>+${f.damage}% DMG • +${f.speed}% SPD • +${f.range}% RNG • +${f.special}% ELEMENT</em>`;line.appendChild(node);}const pills=body.querySelector('.den-detail-pills');if(pills&&progress(id).level>=FINAL_EVOLUTION_LEVEL&&!pills.querySelector('.final-form-pill')){const pill=document.createElement('span');pill.className='final-form-pill';pill.textContent='FINAL EVOLUTION';pills.appendChild(pill);}};

  document.querySelectorAll('.den-summary').forEach(el=>{const labels=[...el.querySelectorAll('span')];const target=labels.find(x=>x.textContent.trim()==='EVOLUTIONS');if(target){const b=target.parentElement?.querySelector('b');if(b)b.textContent='30 / 60 / 100';}});
  document.querySelectorAll('p').forEach(p=>{if(p.textContent.includes('evolves at Levels 30 and 60'))p.textContent=p.textContent.replace('evolves at Levels 30 and 60','evolves at Levels 30, 60 and 100');});

  const css=document.createElement('style');css.textContent=`.den-evo-line{grid-template-columns:repeat(4,minmax(0,1fr))!important}.den-evo-line .final-evo-node{border-color:#d6bd6577!important;background:linear-gradient(180deg,#1a291f,#18170f)!important;box-shadow:inset 0 0 18px #e6c55d10}.den-evo-line .final-evo-node em{display:block;margin-top:4px;color:#bea95f;font-size:6px;font-style:normal;line-height:1.3}.final-form-pill{color:#f3dc83!important;border-color:#d6bd6577!important;background:#2a2413!important}.stage-sprite.stage-4{filter:drop-shadow(0 0 9px #e8ca6550)}@media(max-width:650px){.den-evo-line{grid-template-columns:repeat(2,minmax(0,1fr))!important}.den-evo-line .final-evo-node em{font-size:5px}}`;document.head.appendChild(css);

  try{renderStarters();}catch(e){}try{renderCollection();}catch(e){}
})();
