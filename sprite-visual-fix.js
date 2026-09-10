// Beastward sprite presentation polish — visual-only patch
(() => {
  const css=document.createElement('style');
  css.textContent=`
    /* Keep the page from growing sideways when large sprite panels are open. */
    html,body,#app{max-width:100%;overflow-x:hidden!important}

    /* All Stage-1 art gets a consistent, clean presentation. */
    .stage1-roster-form,
    .title-beast img,
    .beast-pc-sprite img,
    .den-detail-portrait img,
    .best-portrait img,
    .bestiary-item img,
    .tower-choice img{
      object-fit:contain!important;
      object-position:center!important;
      max-width:100%!important;
      max-height:100%!important;
    }

    /* Home screen: three equal visual footprints instead of three differently-scaled sprites. */
    #titleScreen .title-sanctuary .title-beast{
      width:132px!important;
      height:132px!important;
      bottom:4px!important;
      transform:none!important;
      display:grid!important;
      place-items:end center!important;
      filter:drop-shadow(0 12px 12px rgba(0,0,0,.62))!important;
    }
    #titleScreen .title-sanctuary .title-beast-left{
      left:calc(50% - 205px)!important;
      right:auto!important;
    }
    #titleScreen .title-sanctuary .title-beast-centre{
      left:50%!important;
      right:auto!important;
      transform:translateX(-50%)!important;
    }
    #titleScreen .title-sanctuary .title-beast-right{
      right:calc(50% - 205px)!important;
      left:auto!important;
    }
    #titleScreen .title-sanctuary .title-beast img{
      width:128px!important;
      height:128px!important;
      display:block!important;
      transform:none!important;
      image-rendering:pixelated!important;
      image-rendering:crisp-edges!important;
    }
    #titleScreen .title-beast-centre:after{bottom:-1px!important;width:118px!important;height:18px!important}

    /* Beast Vault cards: predictable sprite window and no art/text overlap. */
    #beastCollection.beast-pc-grid{width:100%!important;max-width:100%!important;overflow:visible!important}
    #beastCollection .beast-pc-slot{
      min-width:0!important;
      width:100%!important;
      overflow:hidden!important;
      position:relative!important;
      isolation:isolate!important;
    }
    #beastCollection .beast-pc-sprite{
      width:100%!important;
      height:104px!important;
      min-height:104px!important;
      display:grid!important;
      place-items:center!important;
      overflow:hidden!important;
      padding:5px!important;
      border-radius:11px!important;
    }
    #beastCollection .beast-pc-sprite .stage-sprite,
    #beastCollection .beast-pc-sprite .pc-sprite{
      width:94px!important;
      height:94px!important;
      min-width:94px!important;
      min-height:94px!important;
      display:grid!important;
      place-items:center!important;
      overflow:hidden!important;
    }
    #beastCollection .beast-pc-sprite img{
      width:92px!important;
      height:92px!important;
      display:block!important;
      image-rendering:pixelated!important;
    }
    #beastCollection .skill-point-badge{
      top:6px!important;
      right:6px!important;
      max-width:62px!important;
      padding:4px 7px!important;
      border-radius:999px!important;
      font-size:8px!important;
      line-height:1!important;
      white-space:nowrap!important;
      transform:none!important;
    }

    /* Beast detail modal: stop the right-hand text and portrait from clipping on iPhone. */
    .den-beast-modal{overflow:hidden!important}
    .den-beast-card{
      box-sizing:border-box!important;
      width:min(760px,calc(100vw - 16px))!important;
      max-width:calc(100vw - 16px)!important;
      overflow-x:hidden!important;
      overscroll-behavior:contain!important;
    }
    .den-beast-card *{min-width:0}
    .den-detail-head{width:100%!important;max-width:100%!important}
    .den-detail-copy{min-width:0!important;overflow:hidden!important}
    .den-detail-copy h2,.den-detail-copy p,.den-detail-copy small{max-width:100%!important;overflow-wrap:anywhere!important}
    .den-detail-pills{display:flex!important;flex-wrap:wrap!important;gap:6px!important;max-width:100%!important}
    .den-detail-portrait{overflow:hidden!important}
    .den-detail-portrait .stage-sprite,
    .den-detail-portrait .den-detail-sprite{
      width:132px!important;
      height:132px!important;
      display:grid!important;
      place-items:center!important;
    }
    .den-detail-portrait img{
      width:128px!important;
      height:128px!important;
      image-rendering:pixelated!important;
    }

    /* Bestiary portraits: centre the complete beast instead of allowing artwork to touch edges. */
    .best-portrait,.bestiary-detail .portrait{overflow:hidden!important;padding:10px!important}
    .best-portrait .stage-sprite,.bestiary-detail .portrait .stage-sprite{width:132px!important;height:132px!important}
    .best-portrait img,.bestiary-detail .portrait img{width:128px!important;height:128px!important;object-fit:contain!important}

    /* Battle selector / tower icons use a stable square footprint. */
    #towerChoices .stage-sprite{display:grid!important;place-items:center!important;overflow:hidden!important}
    #towerChoices .stage1-roster-form{width:100%!important;height:100%!important;object-fit:contain!important}

    @media(max-width:760px){
      #titleScreen .title-sanctuary .title-beast{
        width:108px!important;
        height:108px!important;
        bottom:6px!important;
      }
      #titleScreen .title-sanctuary .title-beast img{
        width:104px!important;
        height:104px!important;
      }
      #titleScreen .title-sanctuary .title-beast-left{left:calc(50% - 132px)!important}
      #titleScreen .title-sanctuary .title-beast-right{right:calc(50% - 132px)!important}
      #titleScreen .title-sanctuary .title-beast-centre{left:50%!important;transform:translateX(-50%)!important}

      #beastCollection.beast-pc-grid{
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:9px!important;
      }
      #beastCollection .beast-pc-slot{min-height:170px!important;padding:8px 6px!important}
      #beastCollection .beast-pc-sprite{height:108px!important;min-height:108px!important}
      #beastCollection .beast-pc-sprite .stage-sprite,
      #beastCollection .beast-pc-sprite .pc-sprite{width:96px!important;height:96px!important;min-width:96px!important;min-height:96px!important}
      #beastCollection .beast-pc-sprite img{width:94px!important;height:94px!important}
      #beastCollection .beast-pc-slot>b{font-size:13px!important;line-height:1.1!important}
      #beastCollection .beast-pc-slot>span{font-size:10px!important}
      #beastCollection .beast-pc-slot>small{font-size:8px!important}
      #beastCollection .skill-point-badge{font-size:7px!important;padding:4px 6px!important;top:7px!important;right:7px!important}

      .den-beast-modal{align-items:flex-end!important;padding:6px!important}
      .den-beast-card{
        width:calc(100vw - 12px)!important;
        max-width:calc(100vw - 12px)!important;
        max-height:88svh!important;
        padding:14px!important;
        border-radius:20px 20px 12px 12px!important;
      }
      .den-detail-head{
        grid-template-columns:1fr!important;
        gap:10px!important;
        padding-right:0!important;
        text-align:center!important;
      }
      .den-detail-portrait{width:150px!important;min-height:150px!important;margin:0 auto!important}
      .den-detail-portrait .stage-sprite,.den-detail-portrait .den-detail-sprite{width:132px!important;height:132px!important}
      .den-detail-portrait img{width:128px!important;height:128px!important}
      .den-detail-copy h2{font-size:27px!important;line-height:1.05!important;margin:0 0 6px!important}
      .den-detail-copy p{font-size:11px!important;line-height:1.45!important}
      .den-detail-pills{justify-content:center!important}
      .den-stat-grid,.den-combat-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;width:100%!important}
      .beast-training-panel{max-width:100%!important;overflow:hidden!important}
    }

    @media(max-width:390px){
      #titleScreen .title-sanctuary .title-beast{width:96px!important;height:96px!important}
      #titleScreen .title-sanctuary .title-beast img{width:92px!important;height:92px!important}
      #titleScreen .title-sanctuary .title-beast-left{left:calc(50% - 112px)!important}
      #titleScreen .title-sanctuary .title-beast-right{right:calc(50% - 112px)!important}
    }
  `;
  document.head.appendChild(css);

  function polishImage(img){
    if(!img||img.dataset.spriteVisualFixed)return;
    const isStage1=img.classList.contains('stage1-roster-form')||/assets\/pixel\//.test(img.getAttribute('src')||'')||img.closest('.title-beast');
    if(!isStage1)return;
    img.dataset.spriteVisualFixed='1';
    img.draggable=false;
    img.decoding='async';
  }

  function polishAll(){
    document.querySelectorAll('img').forEach(polishImage);
  }

  const observer=new MutationObserver(polishAll);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  polishAll();

  // Keep canvas pixel creatures crisp without altering any combat logic.
  try{
    const previousDraw=draw;
    draw=function(){
      const previous=ctx.imageSmoothingEnabled;
      ctx.imageSmoothingEnabled=false;
      try{return previousDraw()}finally{ctx.imageSmoothingEnabled=previous}
    };
  }catch(e){}

  document.documentElement.dataset.spriteVisualFix='ready';
})();
