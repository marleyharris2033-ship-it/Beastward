// Beastward compact campaign overview: keep all 10 stages visible without page scrolling.
(() => {
  const css=document.createElement('style');
  css.textContent=`
    #campaignScreen{overflow:hidden!important;height:100dvh!important;min-height:100dvh!important}
    #campaignScreen .campaign-panel{height:100dvh!important;max-height:100dvh!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;box-sizing:border-box!important;padding-bottom:10px!important}
    #campaignScreen .campaign-world-switch{flex:0 0 auto!important;gap:6px!important;flex-wrap:nowrap!important;overflow:visible!important}
    #campaignScreen .campaign-world-btn{min-width:0!important;flex:1 1 0!important;padding:8px 5px!important;font-size:9px!important;white-space:nowrap!important}
    #campaignScreen .campaign-heading{flex:0 0 auto!important;margin:8px 0 6px!important;align-items:center!important}
    #campaignScreen .campaign-heading .screen-crest{display:none!important}
    #campaignScreen .campaign-heading h2{font-size:24px!important;margin:0 0 2px!important}
    #campaignScreen .campaign-heading p{font-size:10px!important;margin:0!important;line-height:1.2!important}
    #campaignScreen .region-progress{padding:6px 8px!important}
    #campaignScreen .region-progress span{font-size:8px!important}
    #campaignScreen .region-progress b{font-size:11px!important}
    #campaignScreen .campaign-mode-bar{flex:0 0 auto!important;margin:0 0 7px!important;padding:6px 8px!important;gap:6px!important}
    #campaignScreen .campaign-mode-btn{padding:6px 10px!important;font-size:9px!important}
    #campaignScreen #campaignModeHint{font-size:8px!important;line-height:1.2!important}
    #campaignScreen .campaign-map{flex:1 1 auto!important;min-height:0!important;height:auto!important;overflow:hidden!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-template-rows:repeat(5,minmax(0,1fr))!important;gap:6px 8px!important;padding:25px 8px 8px!important;align-content:stretch!important}
    #campaignScreen .map-route-line,#campaignScreen .map-path{display:none!important}
    #campaignScreen .map-start-label{position:absolute!important;top:5px!important;left:10px!important;font-size:8px!important;letter-spacing:.12em!important}
    #campaignScreen .map-stage-row{display:contents!important}
    #campaignScreen .map-node{position:relative!important;inset:auto!important;transform:none!important;width:100%!important;max-width:none!important;min-height:0!important;height:100%!important;margin:0!important;padding:5px 8px!important;border-radius:10px!important;display:flex!important;align-items:center!important;gap:7px!important;text-align:left!important;box-sizing:border-box!important}
    #campaignScreen .map-node .map-marker{position:static!important;flex:0 0 22px!important;width:22px!important;height:22px!important;display:grid!important;place-items:center!important;font-size:12px!important;margin:0!important}
    #campaignScreen .map-node-copy{min-width:0!important;line-height:1.05!important}
    #campaignScreen .map-node-copy span{font-size:7px!important;letter-spacing:.08em!important}
    #campaignScreen .map-node-copy b{display:block!important;font-size:10px!important;line-height:1.05!important;margin:1px 0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
    #campaignScreen .map-node-copy small{font-size:7px!important}
    #campaignScreen .boss-node{box-shadow:0 0 0 1px #d4b85c66,inset 0 0 16px #d4b85c10!important}
    @media(min-width:760px){
      #campaignScreen .campaign-map{grid-template-columns:repeat(5,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(0,1fr))!important;gap:10px!important;padding:30px 12px 12px!important}
      #campaignScreen .map-node-copy b{font-size:12px!important}
      #campaignScreen .map-node-copy span,#campaignScreen .map-node-copy small{font-size:8px!important}
    }
    @media(max-height:700px){
      #campaignScreen .campaign-heading h2{font-size:20px!important}
      #campaignScreen .campaign-heading p,#campaignScreen #campaignModeHint{display:none!important}
      #campaignScreen .campaign-heading{margin:4px 0!important}
      #campaignScreen .campaign-mode-bar{margin-bottom:4px!important;padding:4px 6px!important}
      #campaignScreen .campaign-world-btn{padding:6px 4px!important}
      #campaignScreen .campaign-map{padding-top:20px!important;gap:4px 6px!important}
      #campaignScreen .map-node{padding:3px 6px!important}
      #campaignScreen .map-node-copy b{font-size:9px!important}
    }
  `;
  document.head.appendChild(css);

  const oldRender=renderCampaignMap;
  renderCampaignMap=function(){
    oldRender();
    const panel=document.querySelector('#campaignScreen .campaign-panel');
    if(panel)panel.scrollTop=0;
  };
})();
