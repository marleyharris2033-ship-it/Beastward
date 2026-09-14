// Beastward approved level-100 artwork from the 19-creature final-form sheet.
(() => {
  const VERSION='20260914-finalforms-1';
  const SHEET=`assets/pixel/391788B8-564E-4B68-820C-440D97E2FFC8.png?v=${VERSION}`;
  const IDS=['embercub','bubblit','sprigpaw','sparkit','pebblum','gustwing','toxip','frostkit','shadepup','lumpling','voltwing','scorchick','mosshell','drizzlet','zapmoth','cindrake','sporeling','drakeling','voidling'];
  const X=[0,311,606,918,1218,1536],Y=[0,274,513,754,1024];
  const finalUrls={},finalImgs={},baseImgs={};

  const oldSpritePath=spritePathForStage;
  spritePathForStage=function(id,stage=1){
    if(Number(stage)===4 && finalUrls[id]) return finalUrls[id];
    return oldSpritePath(id,stage);
  };
  const oldStageMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
    if(Number(stage)!==4 || !finalUrls[id]) return oldStageMarkup(id,stage,extra,unseen);
    const b=beasts[id],name=nameForStage(id,4),src=finalUrls[id];
    return `<span class="stage-sprite stage-4 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;image-rendering:auto!important;opacity:${unseen?'.86':'1'}!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;
  };

  function candidate(r,g,b){const mn=Math.min(r,g,b),mx=Math.max(r,g,b);return mn>=228 && mx-mn<=26;}
  function processCell(sheet,idx){
    const r=Math.floor(idx/5),c=idx%5,x0=X[c],x1=X[c+1],y0=Y[r],y1=Y[r+1],w=x1-x0,h=y1-y0;
    const raw=document.createElement('canvas');raw.width=w;raw.height=h;const rc=raw.getContext('2d',{willReadFrequently:true});
    rc.drawImage(sheet,x0,y0,w,h,0,0,w,h);
    const im=rc.getImageData(0,0,w,h),d=im.data,n=w*h,bg=new Uint8Array(n),q=new Int32Array(n);let qh=0,qt=0;
    const test=i=>{const p=i*4;return candidate(d[p],d[p+1],d[p+2]);};
    const push=i=>{if(!bg[i]&&test(i)){bg[i]=1;q[qt++]=i;}};
    for(let x=0;x<w;x++){push(x);push((h-1)*w+x);} for(let y=1;y<h-1;y++){push(y*w);push(y*w+w-1);}
    while(qh<qt){const i=q[qh++],x=i%w,y=(i/w)|0;if(x)push(i-1);if(x<w-1)push(i+1);if(y)push(i-w);if(y<h-1)push(i+w);}
    const fg=new Uint8Array(n);for(let i=0;i<n;i++)if(!bg[i])fg[i]=1;
    // Connected components: retain the beast plus nearby detached elemental accents, but reject neighbour fragments touching cell edges.
    const seen=new Uint8Array(n),stack=new Int32Array(n),parts=[];
    for(let s=0;s<n;s++){
      if(!fg[s]||seen[s])continue;let sh=0,st=0;stack[st++]=s;seen[s]=1;const pix=[];let minx=w,miny=h,maxx=0,maxy=0;
      while(sh<st){const i=stack[sh++],x=i%w,y=(i/w)|0;pix.push(i);if(x<minx)minx=x;if(x>maxx)maxx=x;if(y<miny)miny=y;if(y>maxy)maxy=y;
        const add=j=>{if(fg[j]&&!seen[j]){seen[j]=1;stack[st++]=j;}};if(x)add(i-1);if(x<w-1)add(i+1);if(y)add(i-w);if(y<h-1)add(i+w);
      }
      parts.push({pix,size:pix.length,minx,miny,maxx,maxy});
    }
    parts.sort((a,b)=>b.size-a.size);const main=parts[0],keep=new Uint8Array(n);
    if(main){for(const i of main.pix)keep[i]=1;for(let k=1;k<parts.length;k++){const p=parts[k];if(p.size<8)continue;const touch=p.minx<=1||p.miny<=1||p.maxx>=w-2||p.maxy>=h-2;const gx=Math.max(0,main.minx-p.maxx,p.minx-main.maxx),gy=Math.max(0,main.miny-p.maxy,p.miny-main.maxy),gap=Math.hypot(gx,gy);if(!touch&&(gap<52||(p.size>120&&gap<78)))for(const i of p.pix)keep[i]=1;}}
    let minx=w,miny=h,maxx=-1,maxy=-1;
    for(let i=0;i<n;i++){const p=i*4;if(!keep[i]){d[p+3]=0;continue;}const x=i%w,y=(i/w)|0;if(x<minx)minx=x;if(x>maxx)maxx=x;if(y<miny)miny=y;if(y>maxy)maxy=y;}
    rc.putImageData(im,0,0);
    if(maxx<minx)return null;
    const bw=maxx-minx+1,bh=maxy-miny+1,scale=Math.min(276/bw,276/bh,1),dw=Math.round(bw*scale),dh=Math.round(bh*scale);
    const out=document.createElement('canvas');out.width=320;out.height=320;const oc=out.getContext('2d');oc.imageSmoothingEnabled=true;oc.imageSmoothingQuality='high';oc.drawImage(raw,minx,miny,bw,bh,(320-dw)/2,(320-dh)/2,dw,dh);
    return out.toDataURL('image/png');
  }

  const sheet=new Image();sheet.decoding='async';sheet.onload=()=>{
    IDS.forEach((id,idx)=>{
      try{
        const url=processCell(sheet,idx);if(!url)return;finalUrls[id]=url;baseImgs[id]=spriteImgs[id];const im=new Image();im.decoding='async';im.onload=()=>{finalImgs[id]=im;evolutionSpriteImgs[id]=evolutionSpriteImgs[id]||{};evolutionSpriteImgs[id][4]=im;if(evolutionStage(id)===4)spriteImgs[id]=im;};im.src=url;
      }catch(err){console.warn('Final-form crop failed',id,err);}
    });
    // Battle renderer currently falls back to spriteImgs for stage 4. Keep that slot synced to final art at runtime.
    const previousDraw=draw;draw=function(){IDS.forEach(id=>{if(!finalImgs[id])return;spriteImgs[id]=evolutionStage(id)===4?finalImgs[id]:(baseImgs[id]||spriteImgs[id]);});previousDraw();};
    document.documentElement.dataset.fourthFormArt='ready-19';
    try{renderCollection();renderBestiary();choices();}catch(_){ }
  };
  sheet.onerror=()=>{document.documentElement.dataset.fourthFormArt='failed';console.error('Fourth-form sheet failed to load',SHEET);};
  sheet.src=SHEET;
})();
