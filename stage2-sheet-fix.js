// Beastward v61: sharper approved Stage 2 evolution artwork
(() => {
  const sheet='assets/pixel/evolved/stage2_sheet.png?v=61';
  const order=['embercub','sprigpaw','bubblit','sparkit','pebblum','gustwing','toxip','frostkit','shadepup','lumpling','voltwing','scorchick','mosshell','drizzlet','zapmoth','cindrake','sporeling','drakeling','voidling'];

  function cell(id){
    const i=Math.max(0,order.indexOf(id));
    return {col:i%5,row:Math.floor(i/5),sx:(i%5)*64,sy:Math.floor(i/5)*64};
  }

  const previousMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
    if(stage!==2)return previousMarkup(id,stage,extra,unseen);
    const b=beasts[id],name=nameForStage(id,2),c=cell(id);
    return `<span class="stage-sprite stage-2 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}" style="position:relative;overflow:hidden;display:inline-block;">
      <img src="${sheet}" alt="${unseen?'Undiscovered beast':name}" style="position:absolute;max-width:none!important;max-height:none!important;width:500%!important;height:400%!important;left:-${c.col*100}%;top:-${c.row*100}%;object-fit:fill!important;transform:none!important;filter:${unseen?'brightness(0) saturate(0) contrast(1.2)':'drop-shadow(0 3px 3px #0007)'};image-rendering:pixelated;">
    </span>`;
  };

  const exactSheet=new Image();
  exactSheet.src=sheet;
  const previousDraw=draw;
  draw=function(){
    previousDraw();
    if(!(exactSheet.complete&&exactSheet.naturalWidth))return;
    towers.forEach(t=>{
      if(evolutionStage(t.b.id)!==2)return;
      const c=cell(t.b.id),size=83;
      ctx.imageSmoothingEnabled=false;
      ctx.drawImage(exactSheet,c.sx,c.sy,64,64,t.x-size/2,t.y-size/2,size,size);
      ctx.imageSmoothingEnabled=true;
    });
  };
})();
