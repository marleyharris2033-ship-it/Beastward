// Beastward visual QA: reveal every Bestiary beast form without changing save data.
(() => {
  const params=new URLSearchParams(location.search);
  if(params.get('showall')!=='1')return;
  if(typeof bestiaryBeastEntries!=='function'||typeof renderBestiary!=='function')return;

  const originalEntries=bestiaryBeastEntries;
  bestiaryBeastEntries=function(){
    return originalEntries().map(entry=>({...entry,seen:true}));
  };

  const originalRender=renderBestiary;
  renderBestiary=function(){
    originalRender();
    const progress=document.querySelector('#bestiaryProgress');
    if(progress)progress.textContent=`VISUAL PREVIEW • ${Object.keys(beasts).length*3} / ${Object.keys(beasts).length*3} beast forms shown`;
  };

  document.documentElement.dataset.bestiaryPreview='all';
})();
