// Beastward: isolate first-form portraits and support the centred third beast.
(()=>{
const VERSION='20260914-stage1-v14';
const sources=[
{file:'assets/pixel/stage1/67D9C8B1-7AA7-4936-A160-9B3B2E702D51.png',ids:['embercub','sprigpaw','bubblit','sparkit']},
{file:'assets/pixel/stage1/0CCB9194-AEA9-4953-B9CC-5CF85C19C0A0.png',ids:['pebblum','gustwing','toxip','scorchick']},
{file:'assets/pixel/stage1/F83C630A-6166-4913-B236-D60671553C25.png',ids:['mosshell','drizzlet','zapmoth','frostkit']},
{file:'assets/pixel/stage1/B824A5E5-9ADD-4340-A188-733BB0637B8E.png',ids:['shadepup','lumpling','voltwing','cindrake']},
{file:'assets/pixel/stage1/ADDC82B5-2370-4318-AA28-DB417989F164.png',ids:['sporeling','drakeling','voidling']}
];
const urls={},imgs={};
const load=src=>new Promise((ok,bad)=>{const i=new Image();i.decoding='async';i.onload=()=>ok(i);i.onerror=bad;i.src=`${src}?v=${VERSION}`;});
function rect(img,index,count){
  const w=img.naturalWidth,h=img.naturalHeight;
  if((count===3||count===4)&&w/h<2.5){
    const midY=Math.round(h/2);
    if(count===3&&index===2)return {sx:0,sy:midY,sw:w,sh:h-midY,row:1};
    const col=index%2,row=Math.floor(index/2),sx=Math.round(col*w/2),sy=row?midY:0;
    return {sx,sy,sw:Math.round((col+1)*w/2)-sx,sh:(row?h:midY)-sy,row};
  }
  const sx=Math.round(index*w/count);
  return {sx,sy:0,sw:Math.round((index+1)*w/count)-sx,sh:h,row:0};
}
function edgeWhite(d,w,h){const white=new Uint8Array(w*h),seen=new Uint8Array(w*h),q=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++){const p=(y*w+x)*4,r=d[p],g=d[p+1],b=d[p+2],lo=Math.min(r,g,b),hi=Math.max(r,g,b);if(lo>232&&hi-lo<18)white[y*w+x]=1}const add=(x,y)=>{const i=y*w+x;if(white[i]&&!seen[i]){seen[i]=1;q.push(i)}};for(let x=0;x<w;x++){add(x,0);add(x,h-1)}for(let y=0;y<h;y++){add(0,y);add(w-1,y)}for(let n=0;n<q.length;n++){const i=q[n],x=i%w,y=(i/w)|0;d[i*4+3]=0;if(x)add(x-1,y);if(x<w-1)add(x+1,y);if(y)add(x,y-1);if(y<h-1)add(x,y+1)}}

// Keep the primary connected silhouette and only small decorations immediately
// beside it. A separate miniature below it is not part of the portrait.
function isolatePortrait(d,w,h){
  const labels=new Int32Array(w*h),components=[];
  const stack=[];
  let label=0;
  for(let start=0;start<w*h;start++){
    if(labels[start]||d[start*4+3]<=42)continue;
    label++;labels[start]=label;stack.push(start);
    let minX=w,minY=h,maxX=-1,maxY=-1,n=0;
    while(stack.length){
      const p=stack.pop(),x=p%w,y=Math.floor(p/w);n++;
      minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
      for(let yy=Math.max(0,y-1);yy<=Math.min(h-1,y+1);yy++){
        for(let xx=Math.max(0,x-1);xx<=Math.min(w-1,x+1);xx++){
          const q=yy*w+xx;
          if(!labels[q]&&d[q*4+3]>42){labels[q]=label;stack.push(q);}
        }
      }
    }
    components.push({label,minX,minY,maxX,maxY,n});
  }
  components.sort((a,b)=>b.n-a.n);
  const main=components[0];if(!main)throw new Error('No visible beast in source crop');
  const mw=main.maxX-main.minX+1,mh=main.maxY-main.minY+1;
  const selected=components.filter(c=>c===main||(
    c.n>=main.n*.001&&c.n<main.n*.06&&
    c.minX>=main.minX-mw*.18&&c.maxX<=main.maxX+mw*.18&&
    c.minY>=main.minY-mh*.10&&c.maxY<=main.maxY+mh*.06
  ));
  const keep=new Set(selected.map(c=>c.label));
  // Also retain the antialiased fringe immediately adjoining the selected pixels.
  const mask=new Uint8Array(w*h);
  for(let p=0;p<w*h;p++)if(keep.has(labels[p])){
    const x=p%w,y=Math.floor(p/w);
    for(let yy=Math.max(0,y-1);yy<=Math.min(h-1,y+1);yy++)
      for(let xx=Math.max(0,x-1);xx<=Math.min(w-1,x+1);xx++)mask[yy*w+xx]=1;
  }
  let minX=w,minY=h,maxX=-1,maxY=-1;
  for(let p=0;p<w*h;p++){
    if(!mask[p])d[p*4+3]=0;
    if(d[p*4+3]>0){
      const x=p%w,y=Math.floor(p/w);
      minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
    }
  }
  return {minX,minY,maxX,maxY};
}
function crop(img,index,count,id){
  const cell=rect(img,index,count),work=document.createElement('canvas');
  work.width=cell.sw;work.height=cell.sh;
  const c=work.getContext('2d',{willReadFrequently:true});
  c.drawImage(img,cell.sx,cell.sy,cell.sw,cell.sh,0,0,cell.sw,cell.sh);
  const frame=c.getImageData(0,0,cell.sw,cell.sh);
  edgeWhite(frame.data,cell.sw,cell.sh);
  const box=isolatePortrait(frame.data,cell.sw,cell.sh);
  c.putImageData(frame,0,0);
  const sw=box.maxX-box.minX+1,sh=box.maxY-box.minY+1;
  const out=document.createElement('canvas');out.width=256;out.height=256;
  const o=out.getContext('2d');o.imageSmoothingEnabled=true;
  const scale=Math.min(232/sw,232/sh),dw=sw*scale,dh=sh*scale;
  o.drawImage(work,box.minX,box.minY,sw,sh,(256-dw)/2,(256-dh)/2,dw,dh);
  return out.toDataURL('image/png');
}
async function install(){for(const source of sources){const sheet=await load(source.file);source.ids.forEach((id,index)=>{if(!beasts[id])return;const u=crop(sheet,index,source.ids.length,id);urls[id]=u;const im=new Image();im.src=u;imgs[id]=im;beasts[id].sprite=u;beasts[id].towerSprite=u;spriteImgs[id]=im})}const prev=spritePathForStage;spritePathForStage=function(id,stage=1){if(stage===1&&urls[id])return urls[id];return prev(id,stage)};currentSprite=function(id){return spritePathForStage(id,evolutionStage(id))};const oldMarkup=stageSpriteMarkup;stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){if(stage!==1||!urls[id])return oldMarkup(id,stage,extra,unseen);const b=beasts[id],name=nameForStage(id,1);return `<span class="stage-sprite stage-1 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}"><img class="stage-form stage1-direct-form" src="${urls[id]}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;transform:none!important;image-rendering:auto!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':'filter:drop-shadow(0 3px 3px #0007);'}"></span>`};const oldDraw=draw;draw=function(){oldDraw();towers.forEach(t=>{if(evolutionStage(t.instanceUid||t.b.id)!==1)return;const im=imgs[t.b.id];if(!(im&&im.complete&&im.naturalWidth))return;const size=82;ctx.imageSmoothingEnabled=true;ctx.drawImage(im,t.x-size/2,t.y-size/2-2,size,size)})};try{renderStarters()}catch(e){}try{renderCollection()}catch(e){}try{renderBestiary()}catch(e){}try{choices()}catch(e){}document.documentElement.dataset.stage1RosterArt='ready-isolated-v14'}install().catch(e=>console.error('Stage 1 art failed',e));
})();