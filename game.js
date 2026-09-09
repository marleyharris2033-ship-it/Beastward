// Beastward loader v24
(() => {
  const core = document.createElement('script');
  core.src = 'game-core.js?v=20260909-57';
  core.onload = () => {
    const patch = document.createElement('script');
    patch.src = 'range-sprite-patch.js?v=20260909-58';
    patch.onload = () => {
      const stage2 = document.createElement('script');
      stage2.src = 'stage2-sheet-fix.js?v=20260909-59';
      document.head.appendChild(stage2);
    };
    document.head.appendChild(patch);
  };
  document.head.appendChild(core);
})();
