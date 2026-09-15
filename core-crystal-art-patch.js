// Beastward protected Core crystal artwork
(()=>{
  // Transparent PNG uploaded for the protected crystal.
  const CORE_ART='assets/sheets/78DCC6A3-7DA9-46D0-BB3E-43E8673B8B03.png';
  const coreImg=new Image();
  coreImg.src=CORE_ART;

  window.drawCore=function(){
    const end=path[path.length-1];
    const x=Math.min(canvas.width-92,end.x),y=end.y;
    ctx.save();
    ctx.translate(x,y);

    // Soft aura underneath the transparent artwork.
    const pulse=.92+Math.sin(performance.now()/520)*.08;
    ctx.globalAlpha=.24;
    ctx.fillStyle=levelWorld(currentLevel)===2?'#75dcff':'#66dfff';
    ctx.shadowBlur=24;ctx.shadowColor='#65dcff';
    ctx.beginPath();ctx.ellipse(0,31,58*pulse,18*pulse,0,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;ctx.globalAlpha=1;

    if(coreImg.complete&&coreImg.naturalWidth){
      // Enlarged protected Core for better readability on mobile while keeping it clear of the edge.
      const size=142;
      ctx.drawImage(coreImg,-size/2,-size/2-16,size,size);
    }else{
      ctx.fillStyle='#bff7ff';ctx.shadowBlur=18;ctx.shadowColor='#69dfff';
      ctx.beginPath();ctx.moveTo(0,-28);ctx.lineTo(18,0);ctx.lineTo(0,28);ctx.lineTo(-18,0);ctx.closePath();ctx.fill();
    }
    ctx.restore();
  };
})();
