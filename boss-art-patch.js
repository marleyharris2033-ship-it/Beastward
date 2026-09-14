// Beastward regional boss artwork v1
// Uses the ten approved transparent boss PNGs uploaded to assets/enemies.
(()=>{
  const VERSION='20260915-boss-art-1';
  const BOSSES={
    1:{id:'hollowmaw',name:'Hollowmaw',file:'F4089942-75EF-436D-924A-D34E4EFB92F9.png'},
    2:{id:'glaciermaw',name:'Glaciermaw',file:'2DAAE690-DA04-4D42-88E4-70530439C820.png'},
    3:{id:'sandwyrm',name:'Sandwyrm',file:'9F472194-F107-4514-874F-FA2ACAFE8BDD.png'},
    4:{id:'pyroclast',name:'Pyroclast',file:'BF1097AD-6D7D-4615-BBFA-53BBF258B178.png'},
    5:{id:'mirequeen',name:'Mirequeen',file:'3365334E-E93A-4CCC-BFF0-2B3A9D4E5E2C.png'},
    6:{id:'tempestroc',name:'Tempest Roc',file:'7BC415C8-43F7-4ADE-A9E8-A6FB0A5762F5.png'},
    7:{id:'dreadhorn',name:'Dreadhorn',file:'402F605F-66AA-4D34-95EE-13E37AEA5B7E.png'},
    8:{id:'prismtitan',name:'Prism Titan',file:'37B23F6F-5C9F-4216-8014-7841C7BF94ED.png'},
    9:{id:'riftsovereign',name:'Rift Sovereign',file:'CB0FB3C3-17A7-43F8-87F9-F56507141974.png'},
    10:{id:'worldheart',name:'Worldheart Guardian',file:'69925AC6-32CE-44CC-A43F-01BEA8684EC2.png'}
  };
  const loaded={};
  Object.entries(BOSSES).forEach(([world,b])=>{
    const img=new Image();img.decoding='async';img.src=`assets/enemies/${b.file}?v=${VERSION}`;
    img.onload=()=>{loaded[world]=img;enemyImgs[`regional_boss_${world}`]=img;};
    img.onerror=()=>console.warn('Boss artwork failed to load:',b.name,b.file);
  });
  function bossWorld(){
    try{return Math.max(1,Math.min(10,Number(levelWorld(currentLevel)||1)))}
    catch(_){return Math.max(1,Math.min(10,Math.ceil(Number(currentLevel?.id||1)/10)))}
  }
  const previousSpawn=spawn;
  spawn=function(s){
    const before=enemies.length,r=previousSpawn.apply(this,arguments);
    if(s?.boss&&enemies.length>before){
      const e=enemies[enemies.length-1],w=bossWorld(),b=BOSSES[w];
      if(b){
        e.type=`regional_boss_${w}`;
        e.size=Math.max(Number(e.size)||18,26);
        e.bossIdentity=b.name;e.bossArtWorld=w;
        if(loaded[w])enemyImgs[e.type]=loaded[w];
      }
    }
    return r;
  };
  // Add the approved artwork to the existing regional boss introduction card as well.
  const observer=new MutationObserver(()=>{
    const intro=document.querySelector('#regionalBossIntro.show .boss-intro-card');
    if(!intro||intro.querySelector('.boss-art-portrait'))return;
    const w=bossWorld(),b=BOSSES[w];if(!b)return;
    const pic=document.createElement('img');pic.className='boss-art-portrait';pic.alt=b.name;
    pic.src=`assets/enemies/${b.file}?v=${VERSION}`;
    const icon=intro.querySelector('.boss-intro-icon');if(icon)icon.replaceWith(pic);else intro.prepend(pic);
  });
  observer.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});
  const style=document.createElement('style');style.textContent=`
    .boss-art-portrait{display:block;width:112px;height:112px;object-fit:contain;margin:4px auto 2px;filter:drop-shadow(0 8px 12px #0009)}
    @media(max-width:520px){.boss-art-portrait{width:96px;height:96px}}
  `;document.head.appendChild(style);
  document.documentElement.dataset.regionalBossArt='v1';
})();
