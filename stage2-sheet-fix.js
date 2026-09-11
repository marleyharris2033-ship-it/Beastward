// Beastward v64: Stage 2 sheet dimensions corrected
(() => {
  const sheet='assets/pixel/evolved/stage2_sheet.png?v=64';
  const order=['embercub','sprigpaw','bubblit','sparkit','pebblum','gustwing','toxip','frostkit','shadepup','lumpling','voltwing','scorchick','mosshell','drizzlet','zapmoth','cindrake','sporeling','drakeling','voidling'];

  function cell(id){
    const i=Math.max(0,order.indexOf(id));
    return {col:i%5,row:Math.floor(i/5),sx:(i%5)*32,sy:Math.floor(i/5)*32};
  }

  const previousMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){
    if(stage!==2)return previousMarkup(id,stage,extra,unseen);
    const b=beasts[id],name=nameForStage(id,2),c=cell(id);
    const x=c.col*25,y=c.row*(100/3);
    return `<span class="stage-sprite stage-2 type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}" style="position:relative;overflow:hidden;display:inline-block;">
      <span class="stage2-sheet-form" style="display:block;width:100%;height:100%;background-image:url('${sheet}');background-size:500% 400%;background-position:${x}% ${y}%;background-repeat:no-repeat;filter:${unseen?'brightness(0) saturate(0) contrast(1.2)':'drop-shadow(0 3px 3px #0007)'};image-rendering:pixelated;"></span>
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
      ctx.drawImage(exactSheet,c.sx,c.sy,32,32,t.x-size/2,t.y-size/2,size,size);
      ctx.imageSmoothingEnabled=true;
    });
  };
})();
