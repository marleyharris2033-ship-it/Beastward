// Beastward campaign balance pass v1
// Smooths Regions 1-10, reduces late-game enemy bloat, and keeps levelling/treats meaningful without a huge grind.
(()=>{
const V='20260912-campaign-balance-v1';
function targetLevel(id){id=Math.max(0,Math.min(100,id||0));if(id===0)return 1;if(id<=10)return 1+14*id/10;if(id<=90)return 15+(id-10);return 95+(id-90)*.5}
// Restore a compact Lv1-100 XP curve so catch-up items and normal play both stay practical.
xpNeeded=function(level){
  level=Math.max(1,Math.min(99,Math.floor(level||1)));
  if(level<20)return 60+(level-1)*15;
  if(level<30)return 330+(level-20)*2;
  if(level<60)return 350+(level-30);
  return 390+Math.floor((level-60)/5)*5;
};
// Smooth stage pressure across all ten regions. Later stages are harder, but not sponge-heavy.
levels.forEach(lvl=>{
  const t=targetLevel(lvl.id),local=((lvl.id-1)%10)+1;
  lvl.hp=Math.round((1+(t-1)*.18)*100)/100;
  lvl.speed=Math.round((1+Math.min(.38,(t-1)*.0038))*1000)/1000;
  lvl.expectedLevel=[Math.max(1,Math.round(t)-2),Math.min(100,Math.round(t)+2)];
  const base=140+lvl.id*24+Math.floor(lvl.id/10)*35;
  lvl.reward=Math.round(base*(lvl.boss?1.25:1));
  lvl.balanceTier=Math.ceil(lvl.id/10);
  lvl.balanceLocal=local;
});
// Keep placement affordable enough to experiment with a full six-beast roster.
Object.values(beasts||{}).forEach(b=>{if(!b)return;b.cost=Math.max(125,Math.min(220,Math.round((b.cost||150)/5)*5))});
// Enemy count now grows by region rather than exploding with raw stage id.
waveEnemyCount=function(w){
  const region=typeof levelWorld==='function'?Number(levelWorld(currentLevel)||1):Math.max(1,Math.ceil((currentLevel?.id||1)/10));
  const local=typeof localLevelNumber==='function'?Number(localLevelNumber(currentLevel)||1):(((currentLevel?.id||1)-1)%10)+1;
  const normal=Math.min(38,Math.ceil(4+w*1.65+region*1.15+local*.28));
  return battleMode==='hard'?Math.ceil(normal*1.25):normal;
};
// Hard remains endgame, but avoid multiplying health into pure attrition.
modeDifficulty=function(mode=battleMode){return mode==='hard'?2.75:1};
function balanceSummary(){
  const el=document.querySelector('#campaignModeHint');if(!el)return;
  if(campaignMode==='hard')el.textContent='ENDGAME • 2.75× enemy health • denser waves • Lv100 teams recommended.';
}
const baseRenderCampaignMap=renderCampaignMap;
renderCampaignMap=function(){const r=baseRenderCampaignMap.apply(this,arguments);balanceSummary();return r};
try{renderCampaignMap()}catch(e){}
document.documentElement.dataset.campaignBalance=V;
})();