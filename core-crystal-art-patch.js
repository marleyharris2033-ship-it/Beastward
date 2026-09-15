// Beastward protected Core crystal artwork
(()=>{
  const CORE_ART='assets/sheets/C7415C7C-A1A2-4DB1-A14F-FFD5285EA6E3.png';
  const coreImg=new Image();
  coreImg.src=CORE_ART;

  window.drawCore=function(){
    const end=path[path.length-1];
    const x=Math.min(canvas.width-76,end.x),y=end.y;
    ctx.save();
    ctx.translate(x,y);

    // Ground aura makes the protected objective readable on every biome.
    const pulse=.92+Math.sin(performance.now()/520)*.08;
    ctx.globalAlpha=.28;
    ctx.fillStyle=levelWorld(currentLevel)===2?'#75dcff':'#66dfff';
    ctx.shadowBlur=24;ctx.shadowColor='#65dcff';
    ctx.beginPath();ctx.ellipse(0,30,56*pulse,19*pulse,0,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;ctx.globalAlpha=1;

    if(coreImg.complete&&coreImg.naturalWidth){
      const w=132,h=132;
      ctx.drawImage(coreImg,-w/2,-h/2-18,w,h);
    }else{
      // Keep the old objective visible while the image is loading.
      ctx.fillStyle='#1d3b2b';ctx.beginPath();ctx.arc(0,0,48,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#8eeaff';ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,38,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='#bff7ff';ctx.shadowBlur=18;ctx.shadowColor='#69dfff';
      ctx.beginPath();ctx.moveTo(0,-28);ctx.lineTo(18,0);ctx.lineTo(0,28);ctx.lineTo(-18,0);ctx.closePath();ctx.fill();
    }
    ctx.restore();
  };
})();
