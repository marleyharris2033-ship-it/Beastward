// Beastward form naming patch v1
(()=>{
  const labels={1:'First Form',2:'Second Form',3:'Third Form',4:'Fourth Form'};
  function relabel(root=document){
    const screen=root.querySelector?.('#bestiaryScreen')||document.querySelector('#bestiaryScreen');
    if(!screen)return;
    const walker=document.createTreeWalker(screen,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      const t=n.nodeValue||'';
      n.nodeValue=t
        .replace(/Base Form/g,'First Form')
        .replace(/Evolution III/g,'Fourth Form')
        .replace(/Evolution II/g,'Third Form')
        .replace(/Evolution I/g,'Second Form');
    });
  }
  const baseRender=renderBestiary;
  renderBestiary=function(){const r=baseRender.apply(this,arguments);relabel();return r;};
  document.addEventListener('click',()=>setTimeout(()=>relabel(),0),true);
  try{relabel();}catch(e){}
})();