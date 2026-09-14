// Beastward Bestiary sprite frame safety patch
(() => {
  const css=document.createElement('style');
  css.textContent=`
    #bestiaryDetail{scroll-margin-top:16px;padding-bottom:max(24px,env(safe-area-inset-bottom))!important}
    #bestiaryScreen .best-portrait img{image-rendering:auto!important}
    .best-row .row-sprite{
      overflow:hidden!important;
      display:grid!important;
      place-items:center!important;
      position:relative!important;
    }
    .best-row .row-sprite .stage-form,
    .best-row .row-sprite .stage1-roster-form,
    .best-row .row-sprite .stage2-fallback-form{
      width:100%!important;
      height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
      object-fit:contain!important;
      object-position:center!important;
      transform:none!important;
      image-rendering:auto!important;
    }
    .best-portrait .stage1-roster-form,
    .best-portrait .stage2-fallback-form{
      width:100%!important;
      height:100%!important;
      max-width:128px!important;
      max-height:128px!important;
      object-fit:contain!important;
      object-position:center!important;
      transform:none!important;
      image-rendering:auto!important;
    }
  `;
  document.head.appendChild(css);
  document.documentElement.dataset.bestiarySpriteVisualPatch='ready';
})();
