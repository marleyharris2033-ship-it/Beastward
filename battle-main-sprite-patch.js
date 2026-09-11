// Clean, crop and normalise Stage-1 beast artwork for battle placement.
(() => {
  const IDS=[
    'embercub','sprigpaw','bubblit','sparkit','pebblum',
    'gustwing','toxip','scorchick','mosshell','drizzlet',
    'zapmoth','frostkit','shadepup','lumpling','voltwing',
    'cindrake','sporeling','drakeling','voidling'
  ];
  const OUT=96;

  function bboxGap(a,b){
    const dx=Math.max(0,Math.max(a.minX,b.minX)-Math.min(a.maxX,b.maxX)-1);
    const dy=Math.max(0,Math.max(a.minY,b.minY)-Math.min(a.maxY,b.maxY)-1);
    return Math.hypot(dx,dy);
  }

  function components(data,w,h){
    const seen=new Uint8Array(w*h),items=[];
    const alpha=i=>data[i*4+3]>22;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const start=y*w+x;
      if(seen[start]||!alpha(start))continue;
      const stack=[start];seen[start]=1;
      const pixels=[];let minX=x,maxX=x,minY=y,maxY=y;
      while(stack.length){
        const p=stack.pop(),px=p%w,py=(p/w)|0;
        pixels.push(p);if(px<minX)minX=px;if(px>maxX)maxX=px;if(py<minY)minY=py;if(py>maxY)maxY=py;
        for(let oy=-1;oy<=1;oy++)for(let ox=-1;ox<=1;ox++){
          if(!ox&&!oy)continue;
          const nx=px+ox,ny=py+oy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
          const np=ny*w+nx;if(!seen[np]&&alpha(np)){seen[np]=1;stack.push(np)}
        }
      }
      items.push({pixels,area:pixels.length,minX,maxX,minY,maxY,w:maxX-minX+1,h:maxY-minY+1});
    }
    return items;
  }

  function cleanSprite(img,id){
    const w=img.naturalWidth||128,h=img.naturalHeight||128;
    const src=document.createElement('canvas');src.width=w;src.height=h;
    const sctx=src.getContext('2d',{willReadFrequently:true});sctx.imageSmoothingEnabled=false;sctx.drawImage(img,0,0,w,h);
    const frame=sctx.getImageData(0,0,w,h),comps=components(frame.data,w,h);
    if(!comps.length)throw new Error('No visible sprite pixels for '+id);
    comps.sort((a,b)=>b.area-a.area);
    const core=comps[0];
    const kept=comps.filter((c,index)=>{
      if(index===0)return true;
      const skinny=(c.w>=4*c.h&&c.h<=4)||(c.h>=4*c.w&&c.w<=4);
      if(skinny&&c.area<core.area*.22)return false; // removes stray black bars/guide marks
      if(c.area<4)return false;
      const near=bboxGap(c,core)<=13;
      const substantial=c.area>=Math.max(7,core.area*.012);
      const centreX=(c.minX+c.maxX)/2,centreY=(c.minY+c.maxY)/2;
      const aroundCore=centreX>=core.minX-14&&centreX<=core.maxX+14&&centreY>=core.minY-14&&centreY<=core.maxY+14;
      return (near&&substantial)||aroundCore;
    });

    let minX=w,minY=h,maxX=0,maxY=0;
    const keepMask=new Uint8Array(w*h);
    kept.forEach(c=>c.pixels.forEach(p=>{keepMask[p]=1;const x=p%w,y=(p/w)|0;if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;}));
    minX=Math.max(0,minX-2);minY=Math.max(0,minY-2);maxX=Math.min(w-1,maxX+2);maxY=Math.min(h-1,maxY+2);

    const cleaned=sctx.createImageData(w,h);
    for(let p=0;p<w*h;p++)if(keepMask[p]){
      const i=p*4;cleaned.data[i]=frame.data[i];cleaned.data[i+1]=frame.data[i+1];cleaned.data[i+2]=frame.data[i+2];cleaned.data[i+3]=frame.data[i+3];
    }
    const filtered=document.createElement('canvas');filtered.width=w;filtered.height=h;
    filtered.getContext('2d').putImageData(cleaned,0,0);

    const cropW=maxX-minX+1,cropH=maxY-minY+1;
    const scale=Math.min(88/cropW,88/cropH);
    const dw=Math.max(1,Math.round(cropW*scale)),dh=Math.max(1,Math.round(cropH*scale));
    const out=document.createElement('canvas');out.width=OUT;out.height=OUT;
    const octx=out.getContext('2d');octx.imageSmoothingEnabled=false;
    const dx=Math.round((OUT-dw)/2),dy=Math.round(91-dh); // consistent feet/baseline across species
    octx.drawImage(filtered,minX,minY,cropW,cropH,dx,dy,dw,dh);
    return out.toDataURL('image/png');
  }

  function process(id){
    const beast=beasts[id];if(!beast||!beast.sprite)return;
    const source=new Image();source.decoding='async';
    source.onload=()=>{
      try{
        const cleanedUrl=cleanSprite(source,id);
        beast.towerSprite=cleanedUrl;
        const battleImg=new Image();battleImg.decoding='async';battleImg.src=cleanedUrl;
        spriteImgs[id]=battleImg;
      }catch(error){
        console.warn('Battle sprite cleanup fallback for',id,error);
        beast.towerSprite=beast.sprite;
        const fallback=new Image();fallback.decoding='async';fallback.src=beast.sprite;spriteImgs[id]=fallback;
      }
    };
    source.onerror=()=>console.warn('Battle sprite source failed for',id);
    source.src=beast.sprite;
  }

  IDS.forEach(process);
  try{ctx.imageSmoothingEnabled=false;}catch(e){}
  document.documentElement.dataset.battleMainSpriteFix='clean-v2';
})();
