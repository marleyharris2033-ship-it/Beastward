// Beastward economy balance — consistent in-battle gold rate across campaign levels
(()=>{
  const V='20260916-economy-1';
  const btn=document.querySelector('#startWaveBtn');
  if(!btn||typeof btn.onclick!=='function')return;
  const previous=btn.onclick;
  btn.onclick=function(ev){
    const before=typeof wave==='number'?wave:0;
    const result=previous.call(this,ev);
    // Core rewards previously included floor(level/2), making late campaign stages
    // dramatically richer. Remove only that level-based component while preserving
    // wave progression and enemy/archetype reward differences.
    if(typeof wave==='number'&&wave!==before&&Array.isArray(queue)&&currentLevel){
      const levelPart=Math.floor((currentLevel.id||1)/2);
      const base=13+wave;
      const ratio=base/Math.max(1,base+levelPart);
      queue.forEach(s=>{
        if(!s||s.boss)return;
        s.reward=Math.max(1,Math.round((s.reward||1)*ratio));
      });
    }
    return result;
  };
  window.BEASTWARD_ECONOMY={version:V,mode:'normalised-level-income'};
  console.info('[Beastward] economy balance active',V);
})();
