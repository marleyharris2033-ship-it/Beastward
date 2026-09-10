// BeastBorn battle-only landscape focus mode + six-beast loadouts
(() => {
  if(window.__beastbornLandscapeModeInitialised){
    document.querySelectorAll('#battleLandscapeBtn').forEach((el,i)=>{if(i>0)el.remove();});
    return;
  }
  window.__beastbornLandscapeModeInitialised=true;
  const game=document.querySelector('#gameScreen');
  if(!game)return;
  document.querySelectorAll('#battleLandscapeBtn').forEach(el=>el.remove());

  const MAX_LOADOUT=6;
  const loadoutKey=()=>`beastborn-loadout6-${typeof activeSlot!=='undefined'?activeSlot:0}`;
  const readSavedSix=()=>{try{return JSON.parse(localStorage.getItem(loadoutKey())||'[]').filter(id=>save.unlocked.includes(id)).slice(0,MAX_LOADOUT)}catch(e){return[]}};
  const writeSavedSix=ids=>{try{localStorage.setItem(loadoutKey(),JSON.stringify(ids.slice(0,MAX_LOADOUT)))}catch(e){}};

  // Replace the 4-beast picker with a 6-beast picker without touching the rest of the game UI.
  renderLoadoutPicker=function(){
    const grid=$('#loadoutGrid'),count=$('#loadoutCount'),start=$('#loadoutStartBtn'),title=$('#loadoutLevelName');
    if(!grid)return;
    if(title&&pendingLevelId){const lvl=levels.find(x=>x.id===pendingLevelId);title.textContent=(pendingMode==='hard'?'HARD • ':'')+levelCode(lvl)+' • '+lvl.name+(pendingMode==='hard'?' • 2× HP • +12% speed':'')}
    grid.innerHTML='';
    save.unlocked.forEach(id=>{
      const selected=loadoutDraft.includes(id),card=document.createElement('button');
      card.className='loadout-card'+(selected?' selected':'');
      card.innerHTML=stageSpriteMarkup(id,evolutionStage(id),'loadout-sprite')+'<div class="loadout-card-copy"><b>'+nameFor(id)+'</b><small>Lv '+progress(id).level+'</small></div><span class="loadout-check">'+(selected?'✓':'+')+'</span>';
      card.onclick=()=>{const i=loadoutDraft.indexOf(id);if(i>=0)loadoutDraft.splice(i,1);else if(loadoutDraft.length<MAX_LOADOUT)loadoutDraft.push(id);renderLoadoutPicker()};
      grid.appendChild(card);
    });
    if(count)count.textContent=loadoutDraft.length+' / '+MAX_LOADOUT+' selected';
    if(start){start.disabled=loadoutDraft.length<1;start.textContent=loadoutDraft.length?'DEFEND WITH '+loadoutDraft.length:'SELECT AT LEAST 1'}
  };
  openLoadoutPicker=function(id){
    pendingLevelId=id;pendingMode=campaignMode;
    const six=readSavedSix();
    const legacy=(save.lastLoadout||[]).filter(x=>save.unlocked.includes(x)).slice(0,MAX_LOADOUT);
    const valid=six.length?six:legacy;
    loadoutDraft=valid.length?valid:save.unlocked.slice(0,Math.min(MAX_LOADOUT,save.unlocked.length));
    renderLoadoutPicker();$('#loadoutModal').classList.remove('hidden');
  };
  beginSelectedLevel=function(){
    if(!pendingLevelId||!loadoutDraft.length)return;
    battleLoadout=[...loadoutDraft].slice(0,MAX_LOADOUT);
    save.lastLoadout=[...battleLoadout];writeSavedSix(battleLoadout);persist();
    currentLevel=levels.find(x=>x.id===pendingLevelId);path=currentLevel.path;battleMode=pendingMode;$('#loadoutModal').classList.add('hidden');pendingLevelId=null;
    reset();show('gameScreen');last=performance.now();requestAnimationFrame(loop);
  };
  const startBtn=$('#loadoutStartBtn');if(startBtn)startBtn.onclick=()=>beginSelectedLevel();

  const style=document.createElement('style');
  style.id='battleLandscapeStyle';
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
    #gameScreen.battle-focus .game-layout{flex:1;min-height:0;width:100%;max-width:none;margin:0;padding:6px;gap:7px;display:grid;grid-template-columns:minmax(0,1fr) 270px;align-items:stretch;overflow:hidden}
    #gameScreen.battle-focus .battle-board{min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
    #gameScreen.battle-focus #gameCanvas{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:100%!important;aspect-ratio:5/3;object-fit:contain;border-radius:10px}
    #gameScreen.battle-focus .tower-panel{width:270px!important;height:100%;min-height:0;padding:6px;border-radius:11px;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column}
    #gameScreen.battle-focus .tower-panel-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px}
    #gameScreen.battle-focus .tower-panel-title span{font-size:14px}
    #gameScreen.battle-focus .tower-panel-title small,#gameScreen.battle-focus .tip{display:none!important}
    #gameScreen.battle-focus .battle-synergy-strip{margin:0 0 3px;padding:3px;display:flex;gap:3px;flex-wrap:wrap;align-items:center}
    #gameScreen.battle-focus .battle-synergy-strip>small{display:none!important}
    #gameScreen.battle-focus .battle-synergy-chip{margin:0;padding:2px 4px;font-size:7px;gap:2px}
    #gameScreen.battle-focus .battle-synergy-chip span{font-size:8px}
    #gameScreen.battle-focus #towerChoices{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(58px,1fr));gap:4px;align-content:start;overflow:visible;flex:0 0 auto}
    #gameScreen.battle-focus .tower-choice{margin:0!important;padding:4px 2px!important;min-height:58px!important;max-height:76px;display:flex!important;flex-direction:column!important;justify-content:center;align-items:center;gap:1px;text-align:center;overflow:hidden}
    #gameScreen.battle-focus .tower-choice .stage-sprite,#gameScreen.battle-focus .tower-choice img{width:32px!important;height:32px!important;flex:0 0 32px}
    #gameScreen.battle-focus .tower-choice b{font-size:9px!important;line-height:1!important;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}
    #gameScreen.battle-focus .tower-choice small{display:none!important}
    #gameScreen.battle-focus .tower-choice .battle-level-only{display:block!important;color:#aebbb1;font-size:7px!important;line-height:1!important}
    #gameScreen.battle-focus .selected-tower-panel{position:relative;z-index:20;flex:0 0 auto;margin-top:4px;padding:6px;font-size:8px;overflow:visible}
    #gameScreen.battle-focus .selected-tower-panel .stat-grid{display:none}
    #gameScreen.battle-focus .selected-tower-panel button{min-height:28px;padding:5px;font-size:8px}
    #battleRotateHint{display:none}
    @media(orientation:portrait) and (max-width:900px){#gameScreen.battle-focus #battleRotateHint{display:grid;position:fixed;inset:0;z-index:120;place-items:center;background:#06100dec;color:#f0d77d;text-align:center;padding:30px;font-weight:900;letter-spacing:.06em}#gameScreen.battle-focus #battleRotateHint span{display:block;font-size:46px;margin-bottom:12px}}
    @media(orientation:landscape) and (max-height:520px){body.battle-focus-body{overflow:hidden!important}#gameScreen.battle-focus .tower-panel{width:250px!important}#gameScreen.battle-focus .game-layout{grid-template-columns:minmax(0,1fr) 250px}#gameScreen.battle-focus .tower-choice{min-height:52px!important;max-height:64px}#gameScreen.battle-focus .tower-choice .stage-sprite,#gameScreen.battle-focus .tower-choice img{width:28px!important;height:28px!important;flex-basis:28px}#battleLandscapeBtn{padding:7px 9px;font-size:9px}}
  `;
  document.head.appendChild(style);

  const hud=game.querySelector('.battle-hud');const btn=document.createElement('button');btn.id='battleLandscapeBtn';btn.type='button';btn.textContent='⛶ FULL SCREEN';if(hud)hud.appendChild(btn);
  let hint=document.querySelector('#battleRotateHint');if(!hint){hint=document.createElement('div');hint.id='battleRotateHint';hint.innerHTML='<div><span>↻</span>ROTATE YOUR PHONE<br><small style="display:block;margin-top:8px;color:#b9c6bd;font-weight:600">Battle mode is designed to fit in landscape.</small></div>';game.appendChild(hint)}
  function simplifyTowerCards(){game.querySelectorAll('.tower-choice').forEach(card=>{const name=card.querySelector('b');if(!name)return;let level=card.querySelector('.battle-level-only');if(!level){const firstSmall=card.querySelector('small'),m=firstSmall?.textContent.match(/Lv\s*([0-9]+)/i);level=document.createElement('small');level.className='battle-level-only';level.textContent='Lv '+(m?m[1]:'1');name.insertAdjacentElement('afterend',level)}})}
  if(typeof choices==='function'){const baseChoices=choices;choices=function(){const r=baseChoices();simplifyTowerCards();return r;}}
  simplifyTowerCards();
  async function enterFocus(){game.classList.add('battle-focus');document.body.classList.add('battle-focus-body');btn.textContent='✕ EXIT FULL';try{if(document.documentElement.requestFullscreen&&!document.fullscreenElement)await document.documentElement.requestFullscreen()}catch(e){}try{if(screen.orientation?.lock)await screen.orientation.lock('landscape')}catch(e){}}
  async function leaveFocus(){game.classList.remove('battle-focus');document.body.classList.remove('battle-focus-body');btn.textContent='⛶ FULL SCREEN';try{if(document.fullscreenElement)await document.exitFullscreen()}catch(e){}try{if(screen.orientation?.unlock)screen.orientation.unlock()}catch(e){}}
  btn.onclick=()=>game.classList.contains('battle-focus')?leaveFocus():enterFocus();
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&game.classList.contains('battle-focus')){game.classList.remove('battle-focus');document.body.classList.remove('battle-focus-body');btn.textContent='⛶ FULL SCREEN'}});
  if(typeof show==='function'){const baseShow=show;show=function(id){if(id!=='gameScreen'&&game.classList.contains('battle-focus'))leaveFocus();return baseShow(id)}}
})();