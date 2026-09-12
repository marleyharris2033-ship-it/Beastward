// Beastward egg economy rebalance v2: doubled paid egg prices, persistent display after every hatch.
(() => {
  const BASE_EGG_COSTS={common:200,rare:1000,epic:2000};
  function eggkeeperDiscount(){const rank=Math.max(0,Math.min(5,Number(save?.wardenSkills?.eggkeeper)||0));return rank*.01;}
  function displayedCost(base){return Math.max(1,Math.round(base*(1-eggkeeperDiscount())));}
  function refreshEggCosts(){
    const common=document.querySelector('#commonEggCost'),rare=document.querySelector('#rareEggCost'),epic=document.querySelector('#epicEggCost');
    if(common)common.textContent=save?.freeCommonClaimed?displayedCost(BASE_EGG_COSTS.common)+' Essence':'Free';
    if(rare)rare.textContent=displayedCost(BASE_EGG_COSTS.rare)+' Essence';
    if(epic)epic.textContent=displayedCost(BASE_EGG_COSTS.epic)+' Essence';
  }
  // Warden's hatch wrapper is already installed before this patch. Feed it doubled tier costs directly.
  const previousHatch=hatch;
  hatch=function(pool,cost,isFreeCommon=false){
    const result=previousHatch(pool,Math.max(1,Math.round(cost*2)),isFreeCommon);
    // The Warden wrapper redraws the old 100/500/1000 labels at the end of hatch().
    // Always redraw our balanced values afterwards (and again next tick for modal/UI callbacks).
    refreshEggCosts();setTimeout(refreshEggCosts,0);return result;
  };
  // Persist and screen changes can also cause the Warden patch to repaint old constants.
  const previousShow=show;
  show=function(id){const result=previousShow(id);if(id==='hatcheryScreen'){refreshEggCosts();setTimeout(refreshEggCosts,0);}return result;};
  const observer=new MutationObserver(()=>{if(document.querySelector('#hatcheryScreen.active'))refreshEggCosts();});
  const hatchery=document.querySelector('#hatcheryScreen');if(hatchery)observer.observe(hatchery,{subtree:true,childList:true});
  refreshEggCosts();
  document.documentElement.dataset.eggCostBalance='double-v2';
})();