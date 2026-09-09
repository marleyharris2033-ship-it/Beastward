// Beastward loader v22
(() => {
  const core = document.createElement('script');
  core.src = 'game-core.js?v=20260909-52';
  core.onload = () => {
    const patch = document.createElement('script');
    patch.src = 'range-sprite-patch.js?v=20260909-52';
    document.head.appendChild(patch);
  };
  document.head.appendChild(core);
})();
