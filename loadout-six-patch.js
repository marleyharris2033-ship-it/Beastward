// Beastward six-beast loadout patch
// Expands the individual-beast battle squad from 4 to 6 without disturbing instance progression.
(()=>{
const MAX_LOADOUT=6;

function withSixSlice(fn,ctx,args){
  const originalSlice=Array.prototype.slice;
  Array.prototype.slice=function(start,end){
    if(end===4) end=MAX_LOADOUT;
    return originalSlice.call(this,start,end);
  };
  try{return fn.apply(ctx,args||[])}finally{Array.prototype.slice=originalSlice}
}

const previousOpenLoadoutPicker=openLoadoutPicker;
openLoadoutPicker=function(id){
  return withSixSlice(previousOpenLoadoutPicker,this,[id]);
};

const previousBeginSelectedLevel=beginSelectedLevel;
beginSelectedLevel=function(){
  return withSixSlice(previousBeginSelectedLevel,this,arguments);
};

const previousRenderLoadoutPicker=renderLoadoutPicker;
renderLoadoutPicker=function(){
  previousRenderLoadoutPicker();
  const grid=document.querySelector('#loadoutGrid');
  const count=document.querySelector('#loadoutCount');
  const start=document.querySelector('#loadoutStartBtn');
  if(!grid)return;

  const list=(save.beastInstances||[]).filter(i=>i&&beasts[i.species]);
  const cards=[...grid.querySelectorAll('.loadout-card')];
  cards.forEach((card,index)=>{
    const individual=list[index];
    if(!individual)return;
    card.onclick=()=>{
      const n=loadoutDraft.indexOf(individual.uid);
      if(n>=0) loadoutDraft.splice(n,1);
      else if(loadoutDraft.length<MAX_LOADOUT) loadoutDraft.push(individual.uid);
      renderLoadoutPicker();
    };
  });

  if(count) count.textContent=loadoutDraft.length+' / '+MAX_LOADOUT+' selected';
  if(start){
    start.disabled=!loadoutDraft.length;
    start.textContent=loadoutDraft.length?'DEFEND WITH '+loadoutDraft.length:'SELECT AT LEAST 1';
  }
};

try{if(document.querySelector('#loadoutModal:not(.hidden)'))renderLoadoutPicker()}catch(e){}
document.documentElement.dataset.maxBattleLoadout=String(MAX_LOADOUT);
})();
