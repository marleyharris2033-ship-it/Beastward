// Beastward full Stage-1 roster pixel-art override
(() => {
  const VERSION='20260910-stage1-roster-v2';
  const IDS=[
    'embercub','sprigpaw','bubblit','sparkit','pebblum',
    'gustwing','toxip','scorchick','mosshell','drizzlet',
    'zapmoth','frostkit','shadepup','lumpling','voltwing',
    'cindrake','sporeling','drakeling','voidling'
  ];
  const DATA_ROOT='assets/pixel/stage1/data/';
  const objectUrls=[];

  async function loadText(parts){
    const chunks=await Promise.all(parts.map(async part=>{
      const response=await fetch(`${DATA_ROOT}${part}?v=${VERSION}`);
      if(!response.ok)throw new Error(`Stage-1 art chunk failed: ${part}`);
      return response.text();
    }));
    return chunks.join('');
  }

  function cropSvgUrl(atlasDataUri,index,cellW,cellH,atlasW,atlasH){
    const col=index%5,row=Math.floor(index/5);
    const x=-(col*cellW),y=-(row*cellH);
    const safeAtlas=atlasDataUri.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cellW} ${cellH}" width="${cellW}" height="${cellH}"><image href="${safeAtlas}" x="${x}" y="${y}" width="${atlasW}" height="${atlasH}" style="image-rendering:pixelated"/></svg>`;
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
    objectUrls.push(url);
    return url;
  }

  async function install(){
    const [baseB64,towerB64]=await Promise.all([
      loadText(['base1.txt','base2.txt','base3a.txt','base3b.txt','base3c.txt','base3d.txt','base4.txt']),
      loadText(['tower1.txt'])
    ]);
    const baseAtlas=`data:image/png;base64,${baseB64.trim()}`;
    const towerAtlas=`data:image/png;base64,${towerB64.trim()}`;

    IDS.forEach((id,index)=>{
      if(!beasts[id])return;
      const baseUrl=cropSvgUrl(baseAtlas,index,128,128,640,512);
      const towerUrl=cropSvgUrl(towerAtlas,index,64,64,320,256);
      beasts[id].sprite=baseUrl;
      beasts[id].towerSprite=towerUrl;

      const towerImage=new Image();
      towerImage.decoding='async';
      towerImage.src=towerUrl;
      spriteImgs[id]=towerImage;
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
      const b=beasts[id],name=nameForStage(id,1);
      return `<span class="stage-sprite stage-1 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage1-roster-form" src="${b.sprite}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;
    };

    // Refresh every screen that can already be visible by the time the atlas is decoded.
    try{renderStarters();}catch(e){}
    try{renderCollection();}catch(e){}
    try{renderBestiary();}catch(e){}
    try{choices();}catch(e){}
    document.documentElement.dataset.stage1RosterArt='ready';
  }

  install().catch(error=>{
    console.error('Stage-1 roster art failed',error);
    document.documentElement.dataset.stage1RosterArt='failed';
  });
})();
