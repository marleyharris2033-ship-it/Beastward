// Beastward v10: direct Stage 1 artwork with fixed main-beast crop windows
(() => {
  const VERSION='20260911-stage1-direct-v10';
  const sources={
    S1:{file:'assets/pixel/stage1/67D9C8B1-7AA7-4936-A160-9B3B2E702D51.png',ids:['embercub','sprigpaw','bubblit','sparkit']},
    S2:{file:'assets/pixel/stage1/0CCB9194-AEA9-4953-B9CC-5CF85C19C0A0.png',ids:['pebblum','gustwing','toxip','scorchick']},
    S3:{file:'assets/pixel/stage1/F83C630A-6166-4913-B236-D60671553C25.png',ids:['mosshell','drizzlet','zapmoth','frostkit']},
    S4:{file:'assets/pixel/stage1/B824A5E5-9ADD-4340-A188-733BB0637B8E.png',ids:['shadepup','lumpling','voltwing','cindrake']},
    S5:{file:'assets/pixel/stage1/ADDC82B5-2370-4318-AA28-DB417989F164.png',ids:['sporeling','drakeling','voidling']}
  };
  const stage1Urls={},stage1Images={};
  function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.decoding='async';img.onload=()=>resolve(img);img.onerror=reject;img.src=`${src}?v=${VERSION}`;});}
  function cellRect(img,index,count){const ratio=img.naturalWidth/img.naturalHeight;let cols,rows;if((count===4||count===3)&&ratio<2.5){cols=2;rows=2;}else{cols=count;rows=1;}const col=index%cols,row=Math.floor(index/cols),x0=Math.round(col*img.naturalWidth/cols),x1=Math.round((col+1)*img.naturalWidth/cols),y0=Math.round(row*img.naturalHeight/rows),y1=Math.round((row+1)*img.naturalHeight/rows);return{sx:x0,sy:y0,sw:x1-x0,sh:y1-y0,row,rows};}

  function makeTransparentCrop(img,index,count){
    const cell=cellRect(img,index,count),work=document.createElement('canvas');work.width=cell.sw;work.height=cell.sh;
    const c=work.getContext('2d',{willReadFrequently:true});c.drawImage(img,cell.sx,cell.sy,cell.sw,cell.sh,0,0,cell.sw,cell.sh);
    const frame=c.getImageData(0,0,cell.sw,cell.sh),d=frame.data,w=cell.sw,h=cell.sh;

    // Every uploaded Stage 1 panel contains a large main beast and a small duplicate beneath it.
    // Bottom-row cells can also contain the tail of the miniature from the cell above.
    // Restrict detection to the band where the intended large beast actually lives.
    const detectTop=cell.row>0?Math.round(h*0.10):0;
    const detectBottom=Math.round(h*0.72);
    const solid=new Uint8Array(w*h);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=y*w+x,p=i*4,r=d[p],g=d[p+1],b=d[p+2],lo=Math.min(r,g,b),hi=Math.max(r,g,b);
      if(lo>244&&hi-lo<12){d[p+3]=0;continue;}
      if(lo>232&&hi-lo<9)d[p+3]=Math.min(d[p+3],Math.max(0,(246-lo)*20));
      if(y>=detectTop&&y<=detectBottom&&d[p+3]>42)solid[i]=1;
    }

    const seen=new Uint8Array(w*h),components=[],stack=[];
    for(let y=detectTop;y<=detectBottom;y++)for(let x=0;x<w;x++){
      const start=y*w+x;if(!solid[start]||seen[start])continue;
      let minX=x,maxX=x,minY=y,maxY=y,n=0;seen[start]=1;stack.push(start);
      while(stack.length){const q=stack.pop(),qx=q%w,qy=(q/w)|0;n++;if(qx<minX)minX=qx;if(qx>maxX)maxX=qx;if(qy<minY)minY=qy;if(qy>maxY)maxY=qy;for(let yy=Math.max(detectTop,qy-1);yy<=Math.min(detectBottom,qy+1);yy++)for(let xx=Math.max(0,qx-1);xx<=Math.min(w-1,qx+1);xx++){const ni=yy*w+xx;if(solid[ni]&&!seen[ni]){seen[ni]=1;stack.push(ni);}}}
      components.push({minX,maxX,minY,maxY,n});
    }
    components.sort((a,b)=>b.n-a.n);
    const main=components[0]||{minX:0,maxX:w-1,minY:detectTop,maxY:detectBottom,n:w*h};
    const mainCx=(main.minX+main.maxX)/2,mainCy=(main.minY+main.maxY)/2,mainW=main.maxX-main.minX+1,mainH=main.maxY-main.minY+1;
    const keep=components.filter((o,k)=>{if(k===0)return true;const cx=(o.minX+o.maxX)/2,cy=(o.minY+o.maxY)/2,dx=Math.abs(cx-mainCx),dy=Math.abs(cy-mainCy);return o.n>=main.n*.012&&dx<mainW*.95&&dy<mainH*.90;});

    let minX=w,minY=h,maxX=-1,maxY=-1;
    for(const o of keep){minX=Math.min(minX,o.minX);minY=Math.min(minY,o.minY);maxX=Math.max(maxX,o.maxX);maxY=Math.max(maxY,o.maxY);}
    if(maxX<minX){minX=0;minY=detectTop;maxX=w-1;maxY=detectBottom;}
    const margin=Math.max(7,Math.round(Math.max(maxX-minX+1,maxY-minY+1)*.045));
    minX=Math.max(0,minX-margin);minY=Math.max(detectTop,minY-margin);maxX=Math.min(w-1,maxX+margin);maxY=Math.min(detectBottom,maxY+margin);

    // Remove everything outside the selected large-beast region before exporting.
    for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(x<minX||x>maxX||y<minY||y>maxY)d[(y*w+x)*4+3]=0;
    c.putImageData(frame,0,0);
    const sw=maxX-minX+1,sh=maxY-minY+1,out=document.createElement('canvas');out.width=256;out.height=256;
    const o=out.getContext('2d');o.imageSmoothingEnabled=true;const scale=Math.min(238/sw,238/sh),dw=Math.max(1,Math.round(sw*scale)),dh=Math.max(1,Math.round(sh*scale));o.drawImage(work,minX,minY,sw,sh,Math.round((256-dw)/2),Math.round((256-dh)/2),dw,dh);return out.toDataURL('image/png');
  }

  async function install(){for(const source of Object.values(sources)){const sheet=await loadImage(source.file);source.ids.forEach((id,index)=>{if(!beasts[id])return;const url=makeTransparentCrop(sheet,index,source.ids.length);stage1Urls[id]=url;const img=new Image();img.src=url;stage1Images[id]=img;beasts[id].sprite=url;beasts[id].towerSprite=url;spriteImgs[id]=img;});}
    const oldPath=spritePathForStage;spritePathForStage=function(id,stage=1){if(stage===1&&stage1Urls[id])return stage1Urls[id];return oldPath(id,stage);};currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};
    const oldMarkup=stageSpriteMarkup;stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){if(stage!==1||!stage1Urls[id])return oldMarkup(id,stage,extra,unseen);const b=beasts[id],name=nameForStage(id,1);return `<span class="stage-sprite stage-1 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage1-direct-form" src="${stage1Urls[id]}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;transform:none!important;image-rendering:auto!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':'filter:drop-shadow(0 3px 3px #0007);'}"></span>`;};
    const oldDraw=draw;draw=function(){oldDraw();towers.forEach(t=>{if(evolutionStage(t.b.id)!==1)return;const img=stage1Images[t.b.id];if(!(img&&img.complete&&img.naturalWidth))return;const size=82;ctx.imageSmoothingEnabled=true;ctx.drawImage(img,t.x-size/2,t.y-size/2-2,size,size);});};
    try{renderStarters();}catch(e){}try{renderCollection();}catch(e){}try{renderBestiary();}catch(e){}try{choices();}catch(e){}document.documentElement.dataset.stage1RosterArt='ready-direct-v10';}
  install().catch(error=>{console.error('Stage 1 direct art failed',error);document.documentElement.dataset.stage1RosterArt='failed-direct-v10';});
})();