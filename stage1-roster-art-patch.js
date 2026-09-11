// Beastward full Stage-1 roster pixel-art override
(() => {
  const VERSION='20260911-stage1-roster-v4';
  const IDS=[
    'embercub','sprigpaw','bubblit','sparkit','pebblum',
    'gustwing','toxip','scorchick','mosshell','drizzlet',
    'zapmoth','frostkit','shadepup','lumpling','voltwing',
    'cindrake','sporeling','drakeling','voidling'
  ];
  const BROKEN_STAGE2=new Set(['bubblit','sparkit','pebblum','gustwing']);
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
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cellW} ${cellH}" width="${cellW}" height="${cellH}"><image href="${safeAtlas}" x="${x}" y="${y}" width="${atlasW}" height="${atlasH}" preserveAspectRatio="none" style="image-rendering:pixelated"/></svg>`;
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
    objectUrls.push(url);
    return url;
  }

  async function install(){
    // The base atlas is intentionally stored as four independent PNG rows.
    // This avoids the Safari data-URI truncation that caused lower-row beasts
    // to appear half-loaded or completely blank.
    const [row0,row1,row2,row3,towerB64]=await Promise.all([
      loadText(['base-row0.txt']),
      loadText(['base-row1.txt']),
      loadText(['base-row2.txt']),
      loadText(['base-row3a.txt','base-row3b.txt','base-row3c.txt']),
      loadText(['tower1.txt'])
    ]);
    const baseRows=[row0,row1,row2,row3].map(data=>`data:image/png;base64,${data.trim()}`);
    const towerAtlas=`data:image/png;base64,${towerB64.trim()}`;

    IDS.forEach((id,index)=>{
      if(!beasts[id])return;
      const previousStaticSrc=`assets/pixel/${id}.png`;
      const atlasRow=Math.floor(index/5),col=index%5;
      const baseUrl=cropSvgUrl(baseRows[atlasRow],col,128,128,640,128);
      const towerUrl=cropSvgUrl(towerAtlas,index,64,64,320,256);
      beasts[id].sprite=baseUrl;
      beasts[id].towerSprite=towerUrl;

      const towerImage=new Image();
      towerImage.decoding='async';
      towerImage.src=towerUrl;
      spriteImgs[id]=towerImage;

      // Replace decorative Stage-1 art already present in static title/hub HTML.
      document.querySelectorAll('img').forEach(img=>{
        const original=img.getAttribute('src')||'';
        if(original===previousStaticSrc)img.src=baseUrl;
      });
    });

    const previousSpritePathForStage=spritePathForStage;
    spritePathForStage=function(id,stage=1){
      if(stage===1&&beasts[id])return beasts[id].sprite;
      return previousSpritePathForStage(id,stage);
    };
    currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};

    const previousStageSpriteMarkup=stageSpriteMarkup;
    stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
      if(stage===1&&beasts[id]){
        const b=beasts[id],name=nameForStage(id,1);
        return `<span class="stage-sprite stage-1 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage1-roster-form" src="${b.sprite}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;transform:none!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;
      }
      // Four cells in the current Evolution-I sheet are empty. Until their
      // bespoke evo sprites are redrawn, show the correct species art instead
      // of an empty Bestiary card. Gameplay/progression is untouched.
      if(stage===2&&BROKEN_STAGE2.has(id)&&beasts[id]){
        const b=beasts[id],name=nameForStage(id,2);
        return `<span class="stage-sprite stage-2 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra} stage2-visual-fallback" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage2-fallback-form" src="${b.sprite}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;transform:none!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;
      }
      return previousStageSpriteMarkup(id,stage,extra,unseen);
    };

    try{renderStarters();}catch(e){}
    try{renderCollection();}catch(e){}
    try{renderBestiary();}catch(e){}
    try{choices();}catch(e){}
    document.documentElement.dataset.stage1RosterArt='ready-v4';
  }

  install().catch(error=>{
    console.error('Stage-1 roster art failed',error);
    document.documentElement.dataset.stage1RosterArt='failed';
  });
})();
