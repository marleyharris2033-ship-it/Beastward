// Beastward v66: build reliable Stage 2 sprites directly from the uploaded source sheets
(() => {
  const VERSION='20260911-stage2-v66';
  const sources={
    C44819DD:{file:'assets/pixel/evolved/C44819DD-A9D7-4A61-AD93-30575D1661BB.png',ids:['embercub','bubblit','sprigpaw','sparkit']},
    B97276ECB:{file:'assets/pixel/evolved/97276ECB-8B19-4973-849E-1E2DB5A57E84.png',ids:['pebblum','gustwing','toxip','scorchick']},
    B05420A8A:{file:'assets/pixel/evolved/05420A8A-95B4-4E40-BB66-B45FA3F4DB6B.png',ids:['mosshell','drizzlet','zapmoth','frostkit']},
    B1246AFA8:{file:'assets/pixel/evolved/1246AFA8-A275-4FE6-85D5-1D039FF7EC8B.png',ids:['shadepup','lumpling','voltwing','cindrake']},
    A7E70873:{file:'assets/pixel/evolved/A7E70873-4DB4-49AA-B45F-E7CED98EB1FF.png',ids:['sporeling','drakeling','voidling']}
  };
  const stage2Urls={};
  const stage2Images={};

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
        // The approved source sheets have a white/near-white studio background.
        // Remove only neutral bright pixels so highlights on the beasts survive.
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
        const url=makeTransparentCrop(sheet,index,source.ids.length);
        stage2Urls[id]=url;
        const img=new Image();img.src=url;stage2Images[id]=img;
      });
    }

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
      return `<span class="stage-sprite stage-2 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage2-approved-form" src="${stage2Urls[id]}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;transform:none!important;image-rendering:auto!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':'filter:drop-shadow(0 3px 3px #0007);'}"></span>`;
    };

    const previousDraw=draw;
    draw=function(){
      previousDraw();
      towers.forEach(t=>{
        if(evolutionStage(t.b.id)!==2)return;
        const img=stage2Images[t.b.id];
        if(!(img&&img.complete&&img.naturalWidth))return;
        const size=88;
        ctx.imageSmoothingEnabled=true;
        ctx.drawImage(img,t.x-size/2,t.y-size/2-3,size,size);
      });
    };

    try{renderCollection();}catch(e){}
    try{renderBestiary();}catch(e){}
    try{choices();}catch(e){}
    document.documentElement.dataset.stage2Art='ready-v66';
  }

  install().catch(error=>{
    console.error('Stage 2 art failed',error);
    document.documentElement.dataset.stage2Art='failed-v66';
  });
})();
