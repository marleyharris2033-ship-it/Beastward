// Beastward: starter third-form artwork + clear First/Second/Third/Fourth Form naming
(()=>{
  const VERSION='20260913-1';
  const SOURCE='assets/pixel/evolved/stage3_custom_sheet.svg';
  const IDS=['embercub','bubblit','sprigpaw','sparkit'];
  const urls={},imgs={};

  function formLabel(stage){return ['','First Form','Second Form','Third Form','Fourth Form'][Math.max(1,Math.min(4,Number(stage)||1))];}
  window.beastFormLabel=formLabel;

  function crop(img,index){
    const cellW=img.naturalWidth/4,cellH=img.naturalHeight;
    const c=document.createElement('canvas');c.width=300;c.height=300;
    const x=c.getContext('2d');x.imageSmoothingEnabled=true;
    x.drawImage(img,index*cellW,0,cellW,cellH,0,0,300,300);
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
    draw=function(){oldDraw();towers.forEach(t=>{if(evolutionStage(t.b.id)!==3)return;const im=imgs[t.b.id];if(!(im&&im.complete&&im.naturalWidth))return;ctx.imageSmoothingEnabled=true;ctx.drawImage(im,t.x-47,t.y-51,94,94);});};

    try{renderCollection();}catch(e){}try{renderBestiary();}catch(e){}try{choices();}catch(e){}relabel(document);
    document.documentElement.dataset.thirdFormArt='ready';
  };
  sheet.onerror=()=>{console.error('Third-form sheet failed to load');document.documentElement.dataset.thirdFormArt='failed';};
  sheet.src=`${SOURCE}?v=${VERSION}`;

  const oldBestiary=renderBestiary;renderBestiary=function(){oldBestiary();relabel(document.querySelector('#bestiaryScreen')||document);};
  const oldCollection=renderCollection;renderCollection=function(){oldCollection();relabel(document.querySelector('#denScreen')||document);};
  const oldOpenDen=openDenBeast;openDenBeast=function(id){oldOpenDen(id);relabel(document.querySelector('#denBeastModal')||document);};
  const oldShow=show;show=function(){const r=oldShow.apply(this,arguments);requestAnimationFrame(()=>relabel(document));return r;};
})();
