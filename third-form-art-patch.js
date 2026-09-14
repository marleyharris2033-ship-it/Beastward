// Beastward: starter third-form artwork + clear First/Second/Third/Fourth Form naming
(()=>{
  const VERSION='20260914-roster-1';
  const SOURCE='assets/pixel/A435E827-2DBD-48FA-8B37-18A0DB549134.png';
  const IDS=['embercub','bubblit','sprigpaw','sparkit'];
  const urls={},imgs={};

  // Approved remaining third forms, in row-major order on the spacious sheet.
  const rosterIds=[
    'pebblum','gustwing','toxip','frostkit','shadepup',
    'lumpling','voltwing','scorchick','mosshell','drizzlet',
    'zapmoth','cindrake','sporeling','drakeling','voidling'
  ];
  function rosterRect(img,index){
    // White gutters in the approved artwork; the dragon's wings extend left
    // of a mathematically equal cell, so use the visible gaps, not equal fifths.
    const xs=[0,310/1536,610/1536,870/1536,1220/1536,1];
    const ys=[0,338/1024,625/1024,1];
    const col=index%5,row=Math.floor(index/5);
    const sx=Math.round(xs[col]*img.naturalWidth),sy=Math.round(ys[row]*img.naturalHeight);
    return {sx,sy,sw:Math.round(xs[col+1]*img.naturalWidth)-sx,sh:Math.round(ys[row+1]*img.naturalHeight)-sy};
  }
  function clearOuterWhite(d,w,h){
    const seen=new Uint8Array(w*h),queue=[];
    function add(i){
      if(seen[i])return;
      const p=i*4,lo=Math.min(d[p],d[p+1],d[p+2]),hi=Math.max(d[p],d[p+1],d[p+2]);
      if(d[p+3]===0||(lo>232&&hi-lo<18)){seen[i]=1;queue.push(i);}
    }
    for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}
    for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}
    for(let n=0;n<queue.length;n++){
      const i=queue[n],x=i%w,y=Math.floor(i/w);d[i*4+3]=0;
      if(x)add(i-1);if(x<w-1)add(i+1);if(y)add(i-w);if(y<h-1)add(i+w);
    }
  }
  function cropRoster(img,index){
    const r=rosterRect(img,index),work=document.createElement('canvas');
    work.width=r.sw;work.height=r.sh;
    const context=work.getContext('2d',{willReadFrequently:true});
    context.drawImage(img,r.sx,r.sy,r.sw,r.sh,0,0,r.sw,r.sh);
    const frame=context.getImageData(0,0,r.sw,r.sh);
    clearOuterWhite(frame.data,r.sw,r.sh);
    let minX=r.sw,minY=r.sh,maxX=-1,maxY=-1;
    for(let y=0;y<r.sh;y++)for(let x=0;x<r.sw;x++){
      if(frame.data[(y*r.sw+x)*4+3]>24){
        minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
      }
    }
    if(maxX<minX)throw new Error('Empty third-form crop: '+rosterIds[index]);
    context.putImageData(frame,0,0);
    const output=document.createElement('canvas');output.width=300;output.height=300;
    const o=output.getContext('2d');o.imageSmoothingEnabled=true;
    const sw=maxX-minX+1,sh=maxY-minY+1,scale=Math.min(268/sw,268/sh);
    const dw=sw*scale,dh=sh*scale;
    o.drawImage(work,minX,minY,sw,sh,(300-dw)/2,(300-dh)/2,dw,dh);
    return output.toDataURL('image/png');
  }
  const rosterSheet=new Image();rosterSheet.decoding='async';
  rosterSheet.onload=()=>{
    try{
      rosterIds.forEach((id,index)=>{
        const url=cropRoster(rosterSheet,index),im=new Image();
        urls[id]=url;imgs[id]=im;im.src=url;
        // Keep the game's normal evolved-image cache in sync as well.
        if(typeof evolutionSpriteImgs!=='undefined'){
          evolutionSpriteImgs[id]=evolutionSpriteImgs[id]||{};
          evolutionSpriteImgs[id][3]=im;
        }
      });
      try{renderCollection();}catch(e){}try{renderBestiary();}catch(e){}try{choices();}catch(e){}
      document.documentElement.dataset.thirdFormRoster='ready-15';
    }catch(error){
      document.documentElement.dataset.thirdFormRoster='failed';
      console.error('Third-form roster artwork failed',error);
    }
  };
  rosterSheet.onerror=()=>{
    document.documentElement.dataset.thirdFormRoster='failed';
    console.error('Third-form roster sheet could not load');
  };
  rosterSheet.src='assets/pixel/evolved/9A513EF0-11D6-4CAB-8697-72ED8CDFAAD3.png?v=20260914-roster-1';

  function formLabel(stage){return ['','First Form','Second Form','Third Form','Fourth Form'][Math.max(1,Math.min(4,Number(stage)||1))];}
  window.beastFormLabel=formLabel;

  function crop(img,index){
    // The uploaded sheet has slightly uneven columns. Keep each complete beast.
    const edges=[0,400/1536,755/1536,1140/1536,1];
    const left=edges[index]*img.naturalWidth;
    const cellW=(edges[index+1]-edges[index])*img.naturalWidth,cellH=img.naturalHeight;
    const c=document.createElement('canvas');c.width=300;c.height=300;
    const x=c.getContext('2d');x.imageSmoothingEnabled=true;
    const scale=Math.min(300/cellW,300/cellH);
    const width=cellW*scale,height=cellH*scale;
    x.drawImage(img,left,0,cellW,cellH,(300-width)/2,300-height,width,height);
    return c.toDataURL('image/png');
  }

  function relabel(root=document){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      let s=n.nodeValue||'';
      s=s.replace(/Base Form/gi,'First Form')
           .replace(/Evolution\s*I(?!I)/gi,'Second Form')
           .replace(/Evolution\s*II(?!I)/gi,'Third Form')
           .replace(/Final Evolution/gi,'Fourth Form')
           .replace(/Final Form/gi,'Fourth Form');
      if(s!==n.nodeValue)n.nodeValue=s;
    });
    root.querySelectorAll?.('[data-stage]').forEach(el=>{const st=Number(el.dataset.stage);if(st>=1&&st<=4&&/form|evolution/i.test(el.textContent||''))el.textContent=formLabel(st);});
  }

  const sheet=new Image();sheet.decoding='async';sheet.onload=()=>{
    IDS.forEach((id,i)=>{urls[id]=crop(sheet,i);const im=new Image();im.src=urls[id];imgs[id]=im;});
    const oldPath=spritePathForStage;
    spritePathForStage=function(id,stage=1){if(Number(stage)===3&&urls[id])return urls[id];return oldPath(id,stage);};
    currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};

    const oldMarkup=stageSpriteMarkup;
    stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
      if(Number(stage)!==3||!urls[id])return oldMarkup(id,stage,extra,unseen);
      const b=beasts[id],name=nameForStage(id,3);
      return `<span class="stage-sprite stage-3 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form stage3-approved-form" src="${urls[id]}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;transform:none!important;image-rendering:auto!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':'filter:drop-shadow(0 3px 4px #0008);'}"></span>`;
    };

    const oldDraw=draw;
    draw=function(){oldDraw();towers.forEach(t=>{if(evolutionStage(t.instanceUid||t.b.id)!==3)return;const im=imgs[t.b.id];if(!(im&&im.complete&&im.naturalWidth))return;ctx.imageSmoothingEnabled=true;ctx.drawImage(im,t.x-47,t.y-51,94,94);});};

    try{renderCollection();}catch(e){}try{renderBestiary();}catch(e){}try{choices();}catch(e){}relabel(document);
    document.documentElement.dataset.thirdFormArt='ready-v3';
  };
  sheet.onerror=()=>{console.error('Third-form sheet failed to load');document.documentElement.dataset.thirdFormArt='failed-v3';};
  sheet.src=`${SOURCE}?v=${VERSION}`;

  const oldBestiary=renderBestiary;renderBestiary=function(){oldBestiary();relabel(document.querySelector('#bestiaryScreen')||document);};
  const oldCollection=renderCollection;renderCollection=function(){oldCollection();relabel(document.querySelector('#denScreen')||document);};
  const oldOpenDen=openDenBeast;openDenBeast=function(id){oldOpenDen(id);relabel(document.querySelector('#denBeastModal')||document);};
  const oldShow=show;show=function(){const r=oldShow.apply(this,arguments);requestAnimationFrame(()=>relabel(document));return r;};
})();
