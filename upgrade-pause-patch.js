// Beastward upgrade pause patch v1
// Pause combat whenever a placed beast's upgrade panel is open, then restore the previous speed on close.
(()=>{
let upgradePaused=false;
let resumeSpeed=1;

const originalRenderSelectedTower=renderSelectedTower;
renderSelectedTower=function(){
  const hadTower=!!(selectedTower&&towers.includes(selectedTower));
  if(hadTower&&!upgradePaused){
    resumeSpeed=speed>0?speed:(resumeSpeed||1);
    speed=0;
    upgradePaused=true;
  }
  const result=originalRenderSelectedTower.apply(this,arguments);
  if(!selectedTower&&upgradePaused){
    speed=resumeSpeed||1;
    upgradePaused=false;
  }
  return result;
};

const originalCloseTowerModal=closeTowerModal;
closeTowerModal=function(){
  const result=originalCloseTowerModal.apply(this,arguments);
  if(upgradePaused){
    speed=resumeSpeed||1;
    upgradePaused=false;
  }
  return result;
};

// Selling closes the upgrade interaction too, so resume immediately afterwards.
const sellBtn=document.querySelector('#sellTowerBtn');
if(sellBtn){
  sellBtn.addEventListener('click',()=>{
    if(upgradePaused&&!selectedTower){
      speed=resumeSpeed||1;
      upgradePaused=false;
    }
  });
}

document.documentElement.dataset.upgradePause='v1';
})();