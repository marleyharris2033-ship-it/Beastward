// BeastBorn battle-only landscape focus mode
(() => {
  const game=document.querySelector('#gameScreen');
  if(!game)return;

  const style=document.createElement('style');
  style.textContent=`
    #battleLandscapeBtn{margin-left:auto;border:1px solid #d8bc62;background:#254833;color:#f6dfa0;border-radius:10px;padding:8px 11px;font-weight:900;font-size:11px;letter-spacing:.05em;white-space:nowrap}
    #gameScreen.battle-focus{height:100svh;min-height:100svh;max-height:100svh;overflow:hidden;padding:0!important;background:#08110c}
    #gameScreen.battle-focus .battle-hud{flex:0 0 auto;padding:5px 8px;gap:6px;display:flex;align-items:center;flex-wrap:nowrap;min-height:44px}
    #gameScreen.battle-focus .hud-stat,#gameScreen.battle-focus .hud-wave{padding:5px 8px;min-width:62px;border-radius:9px}
    #gameScreen.battle-focus .hud-label{font-size:8px;letter-spacing:.1em}
    #gameScreen.battle-focus .hud-stat b,#gameScreen.battle-focus .hud-wave b{font-size:16px}
    #gameScreen.battle-focus .wave-xp-notice{display:none!important}
    #gameScreen.battle-focus .speed-segment{display:flex;gap:2px;padding:2px;min-width:auto}
    #gameScreen.battle-focus .speed-choice{min-width:34px;padding:6px 5px}
    #gameScreen.battle-focus .battle-action,#gameScreen.battle-focus .battle-exit{padding:8px 10px;min-height:34px;font-size:10px;white-space:nowrap}
    #gameScreen.battle-focus .next-wave-strip{display:none!important}
    #gameScreen.battle-focus .game-layout{flex:1;min-height:0;width:100%;max-width:none;margin:0;padding:6px;gap:7px;display:grid;grid-template-columns:minmax(0,1fr) 230px;align-items:stretch;overflow:hidden}
    #gameScreen.battle-focus .battle-board{min-width:0;min-height:0;display:grid;place-items:center;overflow:hidden}
    #gameScreen.battle-focus #gameCanvas{display:block;width:100%!important;height:auto!important;max-width:100%;max-height:calc(100svh - 56px);object-fit:contain;border-radius:10px}
    #gameScreen.battle-focus .tower-panel{width:230px!important;height:100%;min-height:0;padding:7px;border-radius:11px;overflow:hidden;display:flex;flex-direction:column}
    #gameScreen.battle-focus .tower-panel-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
    #gameScreen.battle-focus .tower-panel-title span{font-size:15px}
    #gameScreen.battle-focus .tower-panel-title small,#gameScreen.battle-focus .tip{display:none!important}
    #gameScreen.battle-focus .battle-synergy-strip{margin:0 0 5px;padding:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center}
    #gameScreen.battle-focus .battle-synergy-strip>small{display:none!important}
    #gameScreen.battle-focus .battle-synergy-chip{margin:0;padding:3px 5px;font-size:8px;gap:3px}
    #gameScreen.battle-focus .battle-synergy-chip span{font-size:9px}
    #gameScreen.battle-focus #towerChoices{display:grid;grid-template-columns:1fr 1fr;gap:5px;align-content:start;overflow:hidden}
    #gameScreen.battle-focus .tower-choice{margin:0;padding:5px;min-height:68px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px;text-align:center}
    #gameScreen.battle-focus .tower-choice .stage-sprite,#gameScreen.battle-focus .tower-choice img{width:34px!important;height:34px!important;flex:0 0 34px}
    #gameScreen.battle-focus .tower-choice b{font-size:10px;line-height:1.05}
    #gameScreen.battle-focus .tower-choice small{display:none!important}
    #gameScreen.battle-focus .battle-level-only{display:block!important;color:#aebbb1;font-size:8px!important;line-height:1!important}
    #battleRotateHint{display:none}
    @media(orientation:portrait) and (max-width:900px){
      #gameScreen.battle-focus #battleRotateHint{display:grid;position:fixed;inset:0;z-index:120;place-items:center;background:#06100dec;color:#f0d77d;text-align:center;padding:30px;font-weight:900;letter-spacing:.06em}
      #gameScreen.battle-focus #battleRotateHint span{display:block;font-size:46px;margin-bottom:12px}
    }
    @media(orientation:landscape) and (max-height:520px){
      body.battle-focus-body{overflow:hidden!important}
      #gameScreen.battle-focus .tower-panel{width:210px!important}
      #gameScreen.battle-focus .game-layout{grid-template-columns:minmax(0,1fr) 210px}
      #gameScreen.battle-focus .tower-choice{min-height:58px}
      #gameScreen.battle-focus .tower-choice .stage-sprite,#gameScreen.battle-focus .tower-choice img{width:30px!important;height:30px!important;flex-basis:30px}
      #battleLandscapeBtn{padding:7px 9px;font-size:9px}
    }
  `;
  document.head.appendChild(style);

  const hud=game.querySelector('.battle-hud');
  const btn=document.createElement('button');
  btn.id='battleLandscapeBtn';
  btn.type='button';
  btn.textContent='⛶ FULL SCREEN';
  if(hud)hud.appendChild(btn);

  const hint=document.createElement('div');
  hint.id='battleRotateHint';
  hint.innerHTML='<div><span>↻</span>ROTATE YOUR PHONE<br><small style="display:block;margin-top:8px;color:#b9c6bd;font-weight:600">Battle mode is designed to fit in landscape.</small></div>';
  game.appendChild(hint);

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

  const baseChoices=choices;
  choices=function(){const r=baseChoices();simplifyTowerCards();return r;};
  simplifyTowerCards();

  async function enterFocus(){
    game.classList.add('battle-focus');
    document.body.classList.add('battle-focus-body');
    btn.textContent='✕ EXIT FULL';
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

  const baseShow=show;
  show=function(id){
    if(id!=='gameScreen'&&game.classList.contains('battle-focus'))leaveFocus();
    return baseShow(id);
  };
})();