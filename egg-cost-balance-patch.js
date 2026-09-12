// Beastward egg economy rebalance v3: doubled paid egg prices without recursive DOM observation.
(() => {
  const BASE_EGG_COSTS={common:200,rare:1000,epic:2000};
  function eggkeeperDiscount(){const rank=Math.max(0,Math.min(5,Number(save?.wardenSkills?.eggkeeper)||0));return rank*.01;}
  function displayedCost(base){return Math.max(1,Math.round(base*(1-eggkeeperDiscount())));}
  function refreshEggCosts(){
    const common=document.querySelector('#commonEggCost'),rare=document.querySelector('#rareEggCost'),epic=document.querySelector('#epicEggCost');
    const commonText=save?.freeCommonClaimed?displayedCost(BASE_EGG_COSTS.common)+' Essence':'Free';
    const rareText=displayedCost(BASE_EGG_COSTS.rare)+' Essence';
    const epicText=displayedCost(BASE_EGG_COSTS.epic)+' Essence';
    if(common&&common.textContent!==commonText)common.textContent=commonText;
    if(rare&&rare.textContent!==rareText)rare.textContent=rareText;
    if(epic&&epic.textContent!==epicText)epic.textContent=epicText;
  }

  const previousHatch=hatch;
  hatch=function(pool,cost,isFreeCommon=false){
    const result=previousHatch(pool,Math.max(1,Math.round(cost*2)),isFreeCommon);
    refreshEggCosts();
    requestAnimationFrame(refreshEggCosts);
    return result;
  };

  const previousShow=show;
  show=function(id){
    const result=previousShow(id);
    if(id==='hatcheryScreen'){
      refreshEggCosts();
      requestAnimationFrame(refreshEggCosts);
    }
    return result;
  };

  // Intentionally no MutationObserver here. The previous observer watched the same
  // text nodes it edited, which could repeatedly retrigger itself on Safari.
  refreshEggCosts();
  document.documentElement.dataset.eggCostBalance='double-v3';
})();