// Beastward v7: build reliable Stage 1 sprites directly from the uploaded source sheets
(() => {
  const VERSION='20260911-stage1-direct-v7';
  const sources={
    S1:{file:'assets/pixel/stage1/67D9C8B1-7AA7-4936-A160-9B3B2E702D51.png',ids:['embercub','sprigpaw','bubblit','sparkit']},
    S2:{file:'assets/pixel/stage1/0CCB9194-AEA9-4953-B9CC-5CF85C19C0A0.png',ids:['pebblum','gustwing','toxip','scorchick']},
    S3:{file:'assets/pixel/stage1/F83C630A-6166-4913-B236-D60671553C25.png',ids:['mosshell','drizzlet','zapmoth','frostkit']},
    S4:{file:'assets/pixel/stage1/B824A5E5-9ADD-4340-A188-733BB0637B8E.png',ids:['shadepup','lumpling','voltwing','cindrake']},
    S5:{file:'assets/pixel/stage1/ADDC82B5-2370-4318-AA28-DB417989F164.png',ids:['sporeling','drakeling','voidling']}
  };
  const stage1Urls={};
  const stage1Images={};

  function loadImage(src){
    return new Promise((resolve,reject)=>{
      const img=new Image();
      img.decoding='async';
      img.onload=()=>resolve(img);
      img.onerror=reject;
      img.src=`${src}?v=${VERSION}`;
    });
  }

  function makeTransparentCrop(img,index,count){
    const cellW=Math.floor(img.naturalWidth/count);
    const cellH=img.naturalHeight;
    const sx=index*cellW;
    const work=document.createElement('canvas');
    work.width=cellW;work.height=cellH;
    const wctx=work.getContext('2d',{willReadFrequently:true});
    wctx.drawImage(img,sx,0,cellW,cellH,0,0,cellW,cellH);
    const frame=wctx.getImageData(0,0,cellW,cellH);
    const d=frame.data;
    let minX=cellW,minY=cellH,maxX=-1,maxY=-1;
    for(let y=0;y<cellH;y++){
      for(let x=0;x<cellW;x++){
        const p=(y*cellW+x)*4,r=d[p],g=d[p+1],b=d[p+2];
        const lo=Math.min(r,g,b),hi=Math.max(r,g,b);
        if(lo>242 && hi-lo<13){d[p+3]=0;continue;}
        if(lo>228 && hi-lo<10){d[p+3]=Math.min(d[p+3],Math.max(0,(242-lo)*18));}
        if(d[p+3]>24){if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;}
      }
    }
    wctx.putImageData(frame,0,0);
    if(maxX<minX||maxY<minY){minX=0;minY=0;maxX=cellW-1;maxY=cellH-1;}
    const pad=Math.max(8,Math.round(Math.max(maxX-minX,maxY-minY)*0.055));
    minX=Math.max(0,minX-pad);minY=Math.max(0,minY-pad);
    maxX=Math.min(cellW-1,maxX+pad);maxY=Math.min(cellH-1,maxY+pad);
    const sw=maxX-minX+1,sh=maxY-minY+1;
    const out=document.createElement('canvas');
    out.width=256;out.height=256;
    const o=out.getContext('2d');
    o.imageSmoothingEnabled=true;
    const scale=Math.min(232/sw,232/sh);
    const dw=Math.max(1,Math.round(sw*scale)),dh=Math.max(1,Math.round(sh*scale));
    const dx=Math.round((256-dw)/2),dy=Math.round(244-dh);
    o.drawImage(work,minX,minY,sw,sh,dx,dy,dw,dh);
    return out.toDataURL('image/png');
  }

  async function install(){
    for(const source of Object.values(sources)){
      const sheet=await loadImage(source.file);
      source.ids.forEach((id,index)=>{
        if(!beasts[id])return;
        const url=makeTransparentCrop(sheet,index,source.ids.length);
        stage1Urls[id]=url;
        const img=new Image();img.src=url;stage1Images[id]=img;
        beasts[id].sprite=url;
        beasts[id].towerSprite=url;
        spriteImgs[id]=img;
      });
    }

    const previousSpritePathForStage=spritePathForStage;
    spritePathForStage=function(id,stage=1){
      if(stage===1&&stage1Urls[id])return stage1Urls[id];
      return previousSpritePathForStage(id,stage);
    };
    currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};

    const previousMarkup=stageSpriteMarkup;
    stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
      if(stage!==1||!stage1Urls[id])return previousMarkup(id,stage,extra,unseen);
      const b=beasts[id],name=nameForStage(id,1);
      return `<span class="stage-sprite stage-1 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage1-direct-form" src="${stage1Urls[id]}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;transform:none!important;image-rendering:auto!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':'filter:drop-shadow(0 3px 3px #0007);'}"></span>`;
    };

    const previousDraw=draw;
    draw=function(){
      previousDraw();
      towers.forEach(t=>{
        if(evolutionStage(t.b.id)!==1)return;
        const img=stage1Images[t.b.id];
        if(!(img&&img.complete&&img.naturalWidth))return;
        const size=82;
        ctx.imageSmoothingEnabled=true;
        ctx.drawImage(img,t.x-size/2,t.y-size/2-2,size,size);
      });
    };

    try{renderStarters();}catch(e){}
    try{renderCollection();}catch(e){}
    try{renderBestiary();}catch(e){}
    try{choices();}catch(e){}
    document.documentElement.dataset.stage1RosterArt='ready-direct-v7';
  }

  install().catch(error=>{
    console.error('Stage 1 direct art failed',error);
    document.documentElement.dataset.stage1RosterArt='failed-direct-v7';
  });
})();
