// Beastward full Stage-1 roster art override
(() => {
  const ART_VERSION='20260910-stage1-roster-v1';
  const ids=['embercub','sprigpaw','bubblit','sparkit','pebblum','gustwing','toxip','scorchick','mosshell','drizzlet','zapmoth','frostkit','shadepup','lumpling','voltwing','cindrake','sporeling','drakeling','voidling'];
  ids.forEach(id=>{
    if(!beasts[id])return;
    beasts[id].sprite=`assets/pixel/stage1/${id}.svg?v=${ART_VERSION}`;
    beasts[id].towerSprite=`assets/pixel/stage1/tower/${id}.svg?v=${ART_VERSION}`;
    const img=new Image();
    img.decoding='async';
    img.onerror=()=>{img.src=beasts[id].sprite};
    img.src=beasts[id].towerSprite;
    spriteImgs[id]=img;
  });

  const previousSpritePathForStage=spritePathForStage;
  spritePathForStage=function(id,stage=1){
    if(stage===1&&beasts[id])return beasts[id].sprite;
    return previousSpritePathForStage(id,stage);
  };
  currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};

  const previousStageSpriteMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
    if(stage!==1||!beasts[id])return previousStageSpriteMarkup(id,stage,extra,unseen);
    const b=beasts[id],name=nameForStage(id,1),src=b.sprite;
    return `<span class="stage-sprite stage-1 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage1-roster-form" src="${src}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;
  };

  try{renderStarters();}catch(e){}
  try{renderCollection();}catch(e){}
  try{renderBestiary();}catch(e){}
  try{choices();}catch(e){}
})();
