// Use the clean main Stage-1 beast artwork for placed battle towers.
(() => {
  const IDS=[
    'embercub','sprigpaw','bubblit','sparkit','pebblum',
    'gustwing','toxip','scorchick','mosshell','drizzlet',
    'zapmoth','frostkit','shadepup','lumpling','voltwing',
    'cindrake','sporeling','drakeling','voidling'
  ];

  function installCleanBattleSprites(){
    IDS.forEach(id=>{
      const beast=beasts[id];
      if(!beast||!beast.sprite)return;

      // Battle towers now use the exact same clean image as the menu/Bestiary,
      // simply scaled down by the existing canvas renderer.
      beast.towerSprite=beast.sprite;
      const img=new Image();
      img.decoding='async';
      img.src=beast.sprite;
      spriteImgs[id]=img;
    });

    // The existing renderer scales these images down; keep pixel edges crisp.
    try{ctx.imageSmoothingEnabled=false;}catch(e){}
    document.documentElement.dataset.battleMainSpriteFix='ready';
  }

  installCleanBattleSprites();
})();
