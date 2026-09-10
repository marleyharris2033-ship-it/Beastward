// BeastBorn enemy balance pass v1
(() => {
  const verdantHp=[1.00,1.15,1.32,1.50,1.72,1.98,2.28,2.62,3.00,3.40];
  const verdantSpeed=[1.00,1.02,1.04,1.06,1.08,1.10,1.12,1.14,1.16,1.18];
  const verdantExpected=[[1,4],[3,6],[5,8],[7,10],[9,12],[11,14],[13,15],[14,17],[16,19],[17,20]];

  const frostHp=[3.75,4.15,4.60,5.05,5.55,6.10,6.70,7.35,8.05,8.85];
  const frostSpeed=[1.18,1.19,1.20,1.21,1.22,1.23,1.24,1.25,1.27,1.29];
  const frostExpected=[[18,20],[19,21],[20,22],[21,23],[22,24],[23,25],[24,26],[25,28],[27,29],[28,30]];

  levels.forEach(lvl=>{
    const local=((lvl.id-1)%10);
    if((lvl.world||1)===1){
      lvl.hp=verdantHp[local];
      lvl.speed=verdantSpeed[local];
      lvl.expectedLevel=verdantExpected[local];
    }else if(lvl.world===2){
      lvl.hp=frostHp[local];
      lvl.speed=frostSpeed[local];
      lvl.expectedLevel=frostExpected[local];
    }
  });

  // Re-tune enemy archetypes so difficulty comes from composition, not only raw stage HP.
  Object.assign(enemyTypes.raider,{hp:1.00,speed:1.00,reward:1.00});
  Object.assign(enemyTypes.hound,{hp:.66,speed:1.58,reward:.90});
  Object.assign(enemyTypes.brute,{hp:2.35,speed:.66,reward:1.85});
  Object.assign(enemyTypes.wisp,{hp:.42,speed:1.22,reward:.58});
  Object.assign(enemyTypes.thornling,{hp:.90,speed:1.30,reward:1.00});
  Object.assign(enemyTypes.shellback,{hp:1.78,speed:.80,reward:1.48});
  Object.assign(enemyTypes.glimmer,{hp:.58,speed:1.42,reward:.78});

  Object.assign(enemyTypes.frostling,{hp:1.12,speed:1.04,reward:1.08});
  Object.assign(enemyTypes.snowstalker,{hp:.76,speed:1.60,reward:1.00});
  Object.assign(enemyTypes.icegolem,{hp:2.75,speed:.60,reward:2.05});
  Object.assign(enemyTypes.shardwisp,{hp:.50,speed:1.32,reward:.66});

  // Bosses should be checks on build quality rather than giant health sponges.
  if(enemyTypes.hollowmaw){enemyTypes.hollowmaw.hp=1;enemyTypes.hollowmaw.speed=1;}
  if(enemyTypes.glaciermaw){enemyTypes.glaciermaw.hp=1;enemyTypes.glaciermaw.speed=1;}

  // Improve campaign guidance so the intended progression is visible to the player.
  const oldRenderCampaignMap=renderCampaignMap;
  renderCampaignMap=function(){
    oldRenderCampaignMap();
    document.querySelectorAll('.map-node').forEach(node=>{
      const label=node.querySelector('.map-node-copy span')?.textContent||node.querySelector('span')?.textContent||'';
      const match=label.match(/(?:HARD\s+)?(\d)-(\d+)/);
      if(!match)return;
      const world=Number(match[1]),local=Number(match[2]),lvl=levels.find(x=>(x.world||1)===world&&(((x.id-1)%10)+1)===local);
      if(!lvl||!lvl.expectedLevel)return;
      const small=node.querySelector('.map-node-copy small');
      if(small&&!small.textContent.includes('Lv'))small.textContent += ` • Lv ${lvl.expectedLevel[0]}–${lvl.expectedLevel[1]}`;
    });
  };

  if(worldMeta?.[1])worldMeta[1].subtitle='A balanced opening region built for developing beasts from roughly Lv1 to Lv20.';
  if(worldMeta?.[2])worldMeta[2].subtitle='A tougher frozen region tuned for established teams progressing from roughly Lv18 to Lv30.';
})();
