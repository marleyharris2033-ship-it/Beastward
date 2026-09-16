// Beastward Endless defeat guard v1
(()=>{
 const priorFinish=finish;
 finish=function(win){
   if(window.BEASTWARD_ENDLESS?.active && win===false){
     lives=0; running=false; queue=[]; enemies=[]; projectiles=[]; effects=[]; speed=1;
     try{save.endlessBest=Math.max(save.endlessBest||0,wave);persist()}catch(_){}
     ui();
     const modal=document.getElementById('endlessRetireModal');if(modal)modal.remove();
     // v5's internal Endless flag is intentionally cleared by reloading after returning to hub.
     show('hubScreen');try{updateHub()}catch(_){}
     showProgressToast('ENDLESS RUN ENDED',`The Beast Core fell on Wave ${wave} • Best ${save.endlessBest||wave}`,'boss-danger');
     setTimeout(()=>location.reload(),900);
     return;
   }
   return priorFinish.apply(this,arguments);
 };
 console.info('[Beastward] Endless zero-lives defeat fix active');
})();