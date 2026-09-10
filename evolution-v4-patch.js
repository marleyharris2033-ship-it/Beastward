// BeastBorn four-stage evolution framework v1
(() => {
  const FINAL_EVOLUTION_LEVEL=100;
  const finalNames={
    embercub:'Emberlord',sprigpaw:'Verdantyr',bubblit:'Leviatide',sparkit:'Voltitan',pebblum:'Terraxis',gustwing:'Skyreign',toxip:'Venomarch',frostkit:'Glacieron',shadepup:'Noctyra',lumpling:'Aurelion',voltwing:'Thundaroc',scorchick:'Solarix',mosshell:'Gaiafort',drizzlet:'Maelstrom',zapmoth:'Stormoth',cindrake:'Pyrodrake',sporeling:'Mycotitan',drakeling:'Aetherwyrm',voidling:'Nullreaver'
  };
  const finalGrowth={
    embercub:{damage:1.22,rate:.94,range:1.05},sprigpaw:{damage:1.12,rate:.96,range:1.10},bubblit:{damage:1.14,rate:.94,range:1.09},sparkit:{damage:1.15,rate:.91,range:1.06},pebblum:{damage:1.28,rate:.97,range:1.03},gustwing:{damage:1.13,rate:.92,range:1.13},toxip:{damage:1.16,rate:.95,range:1.08},frostkit:{damage:1.17,rate:.96,range:1.09},shadepup:{damage:1.23,rate:.91,range:1.05},lumpling:{damage:1.18,rate:.96,range:1.11},voltwing:{damage:1.19,rate:.90,range:1.12},scorchick:{damage:1.12,rate:.86,range:1.04},mosshell:{damage:1.26,rate:.98,range:1.04},drizzlet:{damage:1.11,rate:.87,range:1.10},zapmoth:{damage:1.12,rate:.86,range:1.11},cindrake:{damage:1.30,rate:.96,range:1.08},sporeling:{damage:1.22,rate:.94,range:1.10},drakeling:{damage:1.20,rate:.90,range:1.14},voidling:{damage:1.29,rate:.92,range:1.09}
  };
  Object.entries(finalNames).forEach(([id,name])=>{if(beasts[id])beasts[id].evo100=name;});
  // Embercub is the first fully redesigned line.
  Object.assign(beasts.embercub,{evo20:'Flarecub',evo30:'Blazefang',evo100:'Emberlord',sprite:'assets/pixel/redesign/embercub.png',towerSprite:'assets/pixel/redesign/embercub.png'});

  const previousEvolutionStage=evolutionStage;
  evolutionStage=function(id){return progress(id).level>=FINAL_EVOLUTION_LEVEL?4:previousEvolutionStage(id);};
  const previousNameForStage=nameForStage;
  nameForStage=function(id,stage){if(stage===4)return beasts[id]?.evo100||previousNameForStage(id,3);return previousNameForStage(id,stage);};
  const previousSpritePathForStage=spritePathForStage;
  spritePathForStage=function(id,stage=1){if(id==='embercub'&&stage>=1&&stage<=4)return `assets/pixel/redesign/embercub_${stage}.png?v=77`;if(stage===4)return previousSpritePathForStage(id,3);return previousSpritePathForStage(id,stage);};
  currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};

  const previousStageSpriteMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
    if(id==='embercub'||stage===4){const b=beasts[id],name=nameForStage(id,stage),src=spritePathForStage(id,stage);return `<span class="stage-sprite stage-${stage} type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;}
    return previousStageSpriteMarkup(id,stage,extra,unseen);
  };

  Object.keys(beasts).forEach(id=>{evolutionSpriteImgs[id]=evolutionSpriteImgs[id]||{};const img=new Image();img.onerror=()=>{img.src=spritePathForStage(id,3)};img.src=spritePathForStage(id,4);evolutionSpriteImgs[id][4]=img;});
  ['embercub'].forEach(id=>{[1,2,3,4].forEach(stage=>{const img=new Image();img.src=spritePathForStage(id,stage);if(stage===1)spriteImgs[id]=img;else evolutionSpriteImgs[id][stage]=img;});});

  const previousBattleStats=battleStats;
  battleStats=function(id){const b=previousBattleStats(id);if(evolutionStage(id)!==4)return b;const g=finalGrowth[id]||{damage:1.2,rate:.94,range:1.08};return {...b,damage:b.damage*g.damage,rate:Math.max(.2,b.rate*g.rate),range:clampCombatRange(b.range*g.range),finalEvolution:true};};

  // Make Lv100 feel like a genuine final evolution without changing the 100-point training cap.
  const oldOpenDenBeast=openDenBeast;
  openDenBeast=function(id){oldOpenDenBeast(id);if(evolutionStage(id)===4){const body=document.querySelector('#denBeastModalBody');if(body&&!body.querySelector('.final-evo-banner')){const el=document.createElement('div');el.className='final-evo-banner';const g=finalGrowth[id];el.innerHTML=`<b>✦ FINAL EVOLUTION — ${nameForStage(id,4)}</b><span>Lv100 mastery • +${Math.round((g.damage-1)*100)}% damage • ${Math.round((1-g.rate)*100)}% faster attacks • +${Math.round((g.range-1)*100)}% range</span>`;body.prepend(el);}}};
  const css=document.createElement('style');css.textContent=`.stage-sprite.stage-4{filter:drop-shadow(0 0 9px #e6c86655)}.final-evo-banner{margin:8px 0 12px;padding:10px 12px;border:1px solid #d5bd6466;border-radius:10px;background:linear-gradient(90deg,#2b2514,#12261b);display:flex;flex-direction:column;gap:3px}.final-evo-banner b{color:#efd474;font:700 12px Georgia,serif}.final-evo-banner span{font-size:8px;color:#9fb0a3}`;document.head.appendChild(css);
})();