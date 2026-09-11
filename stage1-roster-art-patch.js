// Beastward v8: direct Stage 1 artwork with grid-aware, close beast cropping
(() => {
  const VERSION='20260911-stage1-direct-v8';
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

  // The original Stage 1 source sheets are collage-style sheets, not the
  // single horizontal row used by Stage 2. Work out the grid from the sheet
  // shape so every beast stays inside its own safe cell before trimming.
  function cellRect(img,index,count){
    const ratio=img.naturalWidth/img.naturalHeight;
    let cols,rows;
    if(count===4 && ratio<2.5){cols=2;rows=2;}
    else if(count===3 && ratio<2.5){cols=2;rows=2;}
    else {cols=count;rows=1;}

    const col=index%cols,row=Math.floor(index/cols);
    const x0=Math.round(col*img.naturalWidth/cols);
    const x1=Math.round((col+1)*img.naturalWidth/cols);
    const y0=Math.round(row*img.naturalHeight/rows);
    const y1=Math.round((row+1)*img.naturalHeight/rows);
    return {sx:x0,sy:y0,sw:x1-x0,sh:y1-y0};
  }

  function makeTransparentCrop(img,index,count){
    const cell=cellRect(img,index,count);
    const work=document.createElement('canvas');
    work.width=cell.sw;work.height=cell.sh;
    const wctx=work.getContext('2d',{willReadFrequently:true});
    wctx.drawImage(img,cell.sx,cell.sy,cell.sw,cell.sh,0,0,cell.sw,cell.sh);

    const frame=wctx.getImageData(0,0,cell.sw,cell.sh);
    const d=frame.data;
    let minX=cell.sw,minY=cell.sh,maxX=-1,maxY=-1;

    // Remove only white / near-white background. The crop is then calculated
    // from the actual remaining beast pixels, not from the square grid cell.
    for(let y=0;y<cell.sh;y++){
      for(let x=0;x<cell.sw;x++){
        const p=(y*cell.sw+x)*4;
        const r=d[p],g=d[p+1],b=d[p+2];
        const lo=Math.min(r,g,b),hi=Math.max(r,g,b);
        if(lo>244 && hi-lo<12){d[p+3]=0;continue;}
        if(lo>232 && hi-lo<9){d[p+3]=Math.min(d[p+3],Math.max(0,(246-lo)*20));}
        if(d[p+3]>36){
          if(x<minX)minX=x;if(x>maxX)maxX=x;
          if(y<minY)minY=y;if(y>maxY)maxY=y;
        }
      }
    }
    wctx.putImageData(frame,0,0);

    if(maxX<minX||maxY<minY){
      minX=0;minY=0;maxX=cell.sw-1;maxY=cell.sh-1;
    }

    // Keep padding deliberately tight. Crucially, these limits can never cross
    // into a neighbouring beast's grid cell.
    const bw=maxX-minX+1,bh=maxY-minY+1;
    const pad=Math.max(4,Math.round(Math.max(bw,bh)*0.028));
    minX=Math.max(0,minX-pad);minY=Math.max(0,minY-pad);
    maxX=Math.min(cell.sw-1,maxX+pad);maxY=Math.min(cell.sh-1,maxY+pad);

    const sw=maxX-minX+1,sh=maxY-minY+1;
    const out=document.createElement('canvas');
    out.width=256;out.height=256;
    const o=out.getContext('2d');
    o.imageSmoothingEnabled=true;
    const scale=Math.min(240/sw,240/sh);
    const dw=Math.max(1,Math.round(sw*scale)),dh=Math.max(1,Math.round(sh*scale));
    const dx=Math.round((256-dw)/2),dy=Math.round((256-dh)/2);
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
      return `<span class="stage-sprite stage-1 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage1-direct-form" src="${stage1Urls[id]}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;transform:none!important;image-rendering:auto!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':'filter:drop-shadow(0 3px 3px #0007);'}"></span>`;
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
    document.documentElement.dataset.stage1RosterArt='ready-direct-v8';
  }

  install().catch(error=>{
    console.error('Stage 1 direct art failed',error);
    document.documentElement.dataset.stage1RosterArt='failed-direct-v8';
  });
})();
