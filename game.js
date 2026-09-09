// Beastward loader v30
(() => {
  const core=document.createElement('script');
  core.src='game-core.js?v=20260909-57';
  core.onload=()=>{
    const patch=document.createElement('script');
    patch.src='range-sprite-patch.js?v=20260909-66';
    patch.onload=()=>{
      const synergy=document.createElement('script');
      synergy.src='synergy-patch.js?v=20260909-67';
      document.head.appendChild(synergy);
    };
    document.head.appendChild(patch);
  };
  document.head.appendChild(core);
})();
