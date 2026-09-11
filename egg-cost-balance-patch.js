// Beastward egg economy rebalance: double paid egg prices while preserving Warden discounts.
(() => {
  const BASE_EGG_COSTS={common:200,rare:1000,epic:2000};

  function eggkeeperDiscount(){
    const rank=Math.max(0,Math.min(5,Number(save?.wardenSkills?.eggkeeper)||0));
    return rank*.01;
  }

  function displayedCost(base){
    return Math.max(1,Math.round(base*(1-eggkeeperDiscount())));
  }

  function refreshEggCosts(){
    const common=document.querySelector('#commonEggCost');
    const rare=document.querySelector('#rareEggCost');
    const epic=document.querySelector('#epicEggCost');
    if(common)common.textContent=save?.freeCommonClaimed?displayedCost(BASE_EGG_COSTS.common)+' Essence':'Free';
    if(rare)rare.textContent=displayedCost(BASE_EGG_COSTS.rare)+' Essence';
    if(epic)epic.textContent=displayedCost(BASE_EGG_COSTS.epic)+' Essence';
  }

  // All existing Hatchery buttons pass the original base costs into hatch().
  // Double them here so the Warden skill-tree wrapper still applies Eggkeeper,
  // Sanctuary Master and Keeper's Fortune to the new prices correctly.
  const previousHatch=hatch;
  hatch=function(pool,cost,isFreeCommon=false){
    const beforeCopies={...(save?.beastCopies||{})};
    const result=previousHatch(pool,Math.max(1,Math.round(cost*2)),isFreeCommon);

    // Excess Bond previously refunds 20% using the old tier constants inside
    // the Warden patch. Add the matching second half so it remains a true 20%
    // refund of the newly doubled egg tier price.
    if(!isFreeCommon||save?.freeCommonClaimed){
      if((Number(save?.wardenSkills?.excessBond)||0)>0){
        const hatchedName=document.querySelector('#eggResultName')?.textContent||'';
        const id=Object.keys(beasts).find(key=>beasts[key]?.name===hatchedName);
        if(id&&ascension(id)>=3&&(save.beastCopies?.[id]||0)===(beforeCopies[id]||0)){
          save.essence+=Math.round(cost*.20);
          persist();
        }
      }
    }
    refreshEggCosts();
    return result;
  };

  const previousShow=show;
  show=function(id){
    const result=previousShow(id);
    if(id==='hatcheryScreen')refreshEggCosts();
    return result;
  };

  refreshEggCosts();
  document.documentElement.dataset.eggCostBalance='double';
})();
