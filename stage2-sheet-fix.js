// Beastward v65: reliable Stage 2 sprite extraction for Safari
(() => {
  const VERSION='20260911-stage2-v65';
  const sheet=`assets/pixel/evolved/stage2_sheet.png?v=${VERSION}`;
  const order=['embercub','sprigpaw','bubblit','sparkit','pebblum','gustwing','toxip','frostkit','shadepup','lumpling','voltwing','scorchick','mosshell','drizzlet','zapmoth','cindrake','sporeling','drakeling','voidling'];
  const stage2Urls={};
  const objectUrls=[];

  function blobToDataUrl(blob){
    return new Promise((resolve,reject)=>{
      const r=new FileReader();
      r.onload=()=>resolve(r.result);
      r.onerror=reject;
      r.readAsDataURL(blob);
    });
  }

  function cropSvgUrl(atlasDataUri,index){
    const cellW=32,cellH=32,atlasW=160,atlasH=128;
    const col=index%5,row=Math.floor(index/5);
    const x=-(col*cellW),y=-(row*cellH);
    const safeAtlas=String(atlasDataUri).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cellW} ${cellH}" width="${cellW}" height="${cellH}"><image href="${safeAtlas}" x="${x}" y="${y}" width="${atlasW}" height="${atlasH}" preserveAspectRatio="none" style="image-rendering:pixelated"/></svg>`;
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
    objectUrls.push(url);
    return url;
  }

  async function install(){
    const response=await fetch(sheet,{cache:'no-store'});
    if(!response.ok)throw new Error(`Stage 2 sheet failed: ${response.status}`);
    const atlasDataUri=await blobToDataUrl(await response.blob());

    order.forEach((id,index)=>{stage2Urls[id]=cropSvgUrl(atlasDataUri,index)});

    const previousSpritePathForStage=spritePathForStage;
    spritePathForStage=function(id,stage=1){
      if(stage===2&&stage2Urls[id])return stage2Urls[id];
      return previousSpritePathForStage(id,stage);
    };
    currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};

    const previousMarkup=stageSpriteMarkup;
    stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
      if(stage!==2||!stage2Urls[id])return previousMarkup(id,stage,extra,unseen);
      const b=beasts[id],name=nameForStage(id,2);
      return `<span class="stage-sprite stage-2 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage2-approved-form" src="${stage2Urls[id]}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;transform:none!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':'filter:drop-shadow(0 3px 3px #0007);'}"></span>`;
    };

    const exactSheet=new Image();
    exactSheet.decoding='async';
    exactSheet.src=atlasDataUri;
    const previousDraw=draw;
    draw=function(){
      previousDraw();
      if(!(exactSheet.complete&&exactSheet.naturalWidth))return;
      towers.forEach(t=>{
        if(evolutionStage(t.b.id)!==2)return;
        const i=order.indexOf(t.b.id);if(i<0)return;
        const sx=(i%5)*32,sy=Math.floor(i/5)*32,size=83;
        ctx.imageSmoothingEnabled=false;
        ctx.drawImage(exactSheet,sx,sy,32,32,t.x-size/2,t.y-size/2,size,size);
        ctx.imageSmoothingEnabled=true;
      });
    };

    try{renderCollection();}catch(e){}
    try{renderBestiary();}catch(e){}
    try{choices();}catch(e){}
    document.documentElement.dataset.stage2Art='ready-v65';
  }

  install().catch(error=>{
    console.error('Stage 2 art failed',error);
    document.documentElement.dataset.stage2Art='failed';
  });
})();
