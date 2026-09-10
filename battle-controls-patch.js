// Beastward ergonomic battle controls + reliable auto-wave
(() => {
  if(window.__beastwardBattleControlsV1)return;
  window.__beastwardBattleControlsV1=true;

  const game=document.querySelector('#gameScreen');
  if(!game)return;
  const title=game.querySelector('.tower-panel-title');
  const start=document.querySelector('#startWaveBtn');
  if(!title||!start)return;

  let autoOn=false;
  let autoTimer=null;

  // Find the existing Auto button, wherever an older patch put it.
  let oldAuto=[...game.querySelectorAll('button')].find(b=>/^AUTO\b/i.test((b.textContent||'').trim()));
  let autoBtn;
  if(oldAuto){
    autoBtn=oldAuto.cloneNode(true); // strips any old/broken event listeners
    oldAuto.replaceWith(autoBtn);
  }else{
    autoBtn=document.createElement('button');
    autoBtn.className='battle-action';
    autoBtn.textContent='AUTO OFF';
  }
  autoBtn.id='battleAutoBtn';

  let controls=title.querySelector('.beast-battle-controls');
  if(!controls){
    controls=document.createElement('div');
    controls.className='beast-battle-controls';
    title.appendChild(controls);
  }
  controls.appendChild(start);
  controls.appendChild(autoBtn);

  function setAuto(on){
    autoOn=!!on;
    autoBtn.classList.toggle('active',autoOn);
    autoBtn.textContent=autoOn?'AUTO ON':'AUTO OFF';
    if(autoOn)maybeStartNextWave();
  }

  function waveIsIdle(){
    try{
      const noQueue=typeof queue==='undefined'||!queue||queue.length===0;
      const noEnemies=typeof enemies==='undefined'||!enemies||enemies.length===0;
      const notRunning=typeof running==='undefined'||!running;
      const hasMore=typeof currentLevel!=='undefined'&&currentLevel&&typeof wave!=='undefined'&&wave<currentLevel.waves;
      return noQueue&&noEnemies&&notRunning&&hasMore;
    }catch(e){return false}
  }

  function maybeStartNextWave(){
    if(!autoOn)return;
    if(!game.classList.contains('active'))return;
    if(waveIsIdle()&&!start.disabled){
      start.click();
    }
  }

  autoBtn.onclick=()=>setAuto(!autoOn);
  autoTimer=setInterval(maybeStartNextWave,450);

  // Reset Auto when leaving a battle, so it never leaks into another screen.
  if(typeof show==='function'){
    const previousShow=show;
    show=function(id){
      if(id!=='gameScreen')setAuto(false);
      return previousShow(id);
    };
  }

  const style=document.createElement('style');
  style.id='beastBattleControlsStyle';
  style.textContent=`
    .tower-panel-title{gap:8px;align-items:center!important}
    .beast-battle-controls{margin-left:auto;display:flex;gap:6px;align-items:center;flex:0 0 auto}
    .beast-battle-controls #startWaveBtn,.beast-battle-controls #battleAutoBtn{min-height:34px!important;padding:7px 10px!important;border-radius:9px!important;font-size:10px!important;font-weight:900!important;letter-spacing:.04em!important;white-space:nowrap!important;width:auto!important;margin:0!important}
    .beast-battle-controls #battleAutoBtn{border:1px solid #6f8b76;background:#13261c;color:#d7e2d9}
    .beast-battle-controls #battleAutoBtn.active{border-color:#d8bc62;background:#315f42;color:#ffe68d;box-shadow:0 0 0 1px #d8bc6233 inset}
    @media(max-width:720px){
      .tower-panel-title>span{font-size:28px!important}
      .beast-battle-controls{gap:5px}
      .beast-battle-controls #startWaveBtn,.beast-battle-controls #battleAutoBtn{min-height:32px!important;padding:6px 8px!important;font-size:9px!important}
    }
    #gameScreen.battle-focus .beast-battle-controls{gap:3px}
    #gameScreen.battle-focus .beast-battle-controls #startWaveBtn,#gameScreen.battle-focus .beast-battle-controls #battleAutoBtn{min-height:26px!important;padding:4px 6px!important;font-size:7px!important;border-radius:6px!important}
  `;
  document.head.appendChild(style);
})();
