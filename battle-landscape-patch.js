// BeastBorn battle-only landscape focus mode
(() => {
  if(window.__beastbornLandscapeModeInitialised){
    document.querySelectorAll('#battleLandscapeBtn').forEach((el,i)=>{if(i>0)el.remove();});
    return;
  }
  window.__beastbornLandscapeModeInitialised=true;

  const game=document.querySelector('#gameScreen');
  if(!game)return;
  document.querySelectorAll('#battleLandscapeBtn').forEach(el=>el.remove());

  const style=document.createElement('style');
  style.id='battleLandscapeStyle';
  style.textContent=`
    #battleLandscapeBtn{margin-left:auto;border:1px solid #d8bc62;background:#254833;color:#f6dfa0;border-radius:10px;padding:8px 11px;font-weight:900;font-size:11px;letter-spacing:.05em;white-space:nowrap}
    #gameScreen.battle-focus{height:100svh;min-height:100svh;max-height:100svh;overflow:hidden;padding:0!important;background:#08110c}
    #gameScreen.battle-focus .battle-hud{flex:0 0 auto;padding:4px 7px;gap:5px;display:flex;align-items:center;flex-wrap:nowrap;min-height:42px}
    #gameScreen.battle-focus .hud-stat,#gameScreen.battle-focus .hud-wave{padding:4px 7px;min-width:58px;border-radius:8px}
    #gameScreen.battle-focus .hud-label{font-size:7px;letter-spacing:.1em}
    #gameScreen.battle-focus .hud-stat b,#gameScreen.battle-focus .hud-wave b{font-size:15px}
    #gameScreen.battle-focus .wave-xp-notice{display:none!important}
    #gameScreen.battle-focus .speed-segment{display:flex;gap:2px;padding:2px;min-width:auto}
    #gameScreen.battle-focus .speed-choice{min-width:31px;padding:5px 4px}
    #gameScreen.battle-focus .battle-action,#gameScreen.battle-focus .battle-exit{padding:7px 9px;min-height:32px;font-size:9px;white-space:nowrap}
    #gameScreen.battle-focus .next-wave-strip{display:none!important}
    #gameScreen.battle-focus .game-layout{flex:1;min-height:0;width:100%;max-width:none;margin:0;padding:5px;gap:6px;display:grid;grid-template-columns:minmax(0,1fr) 220px;align-items:stretch;overflow:hidden}
    #gameScreen.battle-focus .battle-board{min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
    #gameScreen.battle-focus #gameCanvas{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:100%!important;aspect-ratio:5/3;object-fit:contain;border-radius:9px}
    #gameScreen.battle-focus .tower-panel{width:220px!important;height:100%;min-height:0;padding:6px;border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
    #gameScreen.battle-focus .tower-panel-title{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;margin:0 0 3px}
    #gameScreen.battle-focus .tower-panel-title span{font-size:13px}
    #gameScreen.battle-focus .tower-panel-title small,#gameScreen.battle-focus .tip{display:none!important}
    #gameScreen.battle-focus .battle-synergy-strip{flex:0 0 auto;margin:0 0 3px;padding:2px 3px;display:flex;gap:3px;flex-wrap:nowrap;align-items:center;overflow:hidden}
    #gameScreen.battle-focus .battle-synergy-strip>small{display:none!important}
    #gameScreen.battle-focus .battle-synergy-chip{margin:0!important;padding:2px 4px!important;font-size:7px!important;gap:2px!important;min-width:0}
    #gameScreen.battle-focus .battle-synergy-chip span{font-size:8px!important}
    #gameScreen.battle-focus #towerChoices{flex:1 1 auto;min-height:0;display:grid!important;grid-template-columns:1fr 1fr!important;grid-template-rows:1fr 1fr!important;gap:4px!important;align-content:stretch!important;overflow:hidden!important}
    #gameScreen.battle-focus .tower-choice{margin:0!important;padding:3px!important;min-height:0!important;height:100%!important;display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;gap:1px!important;text-align:center!important;overflow:hidden!important}
    #gameScreen.battle-focus .tower-choice .stage-sprite,#gameScreen.battle-focus .tower-choice img{width:31px!important;height:31px!important;flex:0 0 31px!important}
    #gameScreen.battle-focus .tower-choice b{font-size:9px!important;line-height:1!important;white-space:nowrap;max-width:96px;overflow:hidden;text-overflow:ellipsis}
    #gameScreen.battle-focus .tower-choice small{display:none!important}
    #gameScreen.battle-focus .battle-level-only{display:block!important;color:#aebbb1;font-size:7px!important;line-height:1!important}
    #gameScreen.battle-focus .selected-tower-panel{position:relative;z-index:20;flex:0 0 auto;margin-top:4px;padding:5px;font-size:8px;overflow:visible}
    #gameScreen.battle-focus .selected-tower-panel .stat-grid{display:none}
    #gameScreen.battle-focus .selected-tower-panel button{min-height:27px;padding:4px;font-size:8px}
    #battleRotateHint{display:none}
    @media(orientation:portrait) and (max-width:900px){
      #gameScreen.battle-focus #battleRotateHint{display:grid;position:fixed;inset:0;z-index:120;place-items:center;background:#06100dec;color:#f0d77d;text-align:center;padding:30px;font-weight:900;letter-spacing:.06em}
      #gameScreen.battle-focus #battleRotateHint span{display:block;font-size:46px;margin-bottom:12px}
    }
    @media(orientation:landscape) and (max-height:520px){
      body.battle-focus-body{overflow:hidden!important}
      #gameScreen.battle-focus .tower-panel{width:200px!important}
      #gameScreen.battle-focus .game-layout{grid-template-columns:minmax(0,1fr) 200px}
      #gameScreen.battle-focus .tower-choice .stage-sprite,#gameScreen.battle-focus .tower-choice img{width:28px!important;height:28px!important;flex-basis:28px!important}
      #battleLandscapeBtn{padding:6px 8px;font-size:8px}
    }
  `;
  document.head.appendChild(style);

  const hud=game.querySelector('.battle-hud');
  const btn=document.createElement('button');
  btn.id='battleLandscapeBtn';
  btn.type='button';
  btn.textContent='⛶ FULL SCREEN';
  if(hud)hud.appendChild(btn);

  let hint=document.querySelector('#battleRotateHint');
  if(!hint){
    hint=document.createElement('div');
    hint.id='battleRotateHint';
    hint.innerHTML='<div><span>↻</span>ROTATE YOUR PHONE<br><small style="display:block;margin-top:8px;color:#b9c6bd;font-weight:600">Battle mode is designed to fit in landscape.</small></div>';
    game.appendChild(hint);
  }

  function simplifyTowerCards(){
    game.querySelectorAll('.tower-choice').forEach(card=>{
      const name=card.querySelector('b');
      if(!name)return;
      let level=card.querySelector('.battle-level-only');
      if(!level){
        const firstSmall=card.querySelector('small');
        const m=firstSmall?.textContent.match(/Lv\s*([0-9]+)/i);
        level=document.createElement('small');
        level.className='battle-level-only';
        level.textContent='Lv '+(m?m[1]:'1');
        name.insertAdjacentElement('afterend',level);
      }
    });
  }

  if(typeof choices==='function'){
    const baseChoices=choices;
    choices=function(){const r=baseChoices();simplifyTowerCards();return r;};
  }
  simplifyTowerCards();

  async function enterFocus(){
    game.classList.add('battle-focus');
    document.body.classList.add('battle-focus-body');
    btn.textContent='✕ EXIT FULL';
    simplifyTowerCards();
    try{if(document.documentElement.requestFullscreen&&!document.fullscreenElement)await document.documentElement.requestFullscreen();}catch(e){}
    try{if(screen.orientation?.lock)await screen.orientation.lock('landscape');}catch(e){}
  }
  async function leaveFocus(){
    game.classList.remove('battle-focus');
    document.body.classList.remove('battle-focus-body');
    btn.textContent='⛶ FULL SCREEN';
    try{if(document.fullscreenElement)await document.exitFullscreen();}catch(e){}
    try{if(screen.orientation?.unlock)screen.orientation.unlock();}catch(e){}
  }
  btn.onclick=()=>game.classList.contains('battle-focus')?leaveFocus():enterFocus();
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&game.classList.contains('battle-focus')){game.classList.remove('battle-focus');document.body.classList.remove('battle-focus-body');btn.textContent='⛶ FULL SCREEN';}});

  if(typeof show==='function'){
    const baseShow=show;
    show=function(id){if(id!=='gameScreen'&&game.classList.contains('battle-focus'))leaveFocus();return baseShow(id);};
  }
})();
