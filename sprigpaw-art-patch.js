// Beastward approved Sprigpaw four-stage PNG art
(() => {
  const ART_VERSION='20260910-sprigpaw-64-v2';
  const id='sprigpaw';
  if(!beasts[id])return;
  beasts[id].evo20='Leafstride';
  beasts[id].evo30='Brambleclaw';
  beasts[id].evo100='Verdantyr';
  beasts[id].sprite=`assets/pixel/redesign/sprigpaw_1.png?v=${ART_VERSION}`;
  beasts[id].towerSprite=beasts[id].sprite;
  const previousSpritePathForStage=spritePathForStage;
  spritePathForStage=function(beastId,stage=1){
    if(beastId===id){const s=Math.max(1,Math.min(4,stage));return `assets/pixel/redesign/sprigpaw_${s}.png?v=${ART_VERSION}`;}
    return previousSpritePathForStage(beastId,stage);
  };
  currentSprite=function(beastId){return spritePathForStage(beastId,evolutionStage(beastId));};
  const previousStageSpriteMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(beastId,stage=evolutionStage(beastId),extra='',unseen=false){
    if(beastId!==id)return previousStageSpriteMarkup(beastId,stage,extra,unseen);
    const b=beasts[beastId],s=Math.max(1,Math.min(4,stage)),name=nameForStage(beastId,s),src=spritePathForStage(beastId,s);
    return `<span class="stage-sprite stage-${s} type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;
  };
  evolutionSpriteImgs[id]=evolutionSpriteImgs[id]||{};
  [1,2,3,4].forEach(stage=>{const img=new Image();img.decoding='async';img.src=spritePathForStage(id,stage);if(stage===1)spriteImgs[id]=img;else evolutionSpriteImgs[id][stage]=img;});
  try{renderStarters();}catch(e){}
  try{renderCollection();}catch(e){}
  try{if(document.querySelector('#denBeastModal:not(.hidden)'))openDenBeast(id);}catch(e){}
})();
