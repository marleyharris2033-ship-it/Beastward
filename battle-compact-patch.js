// Beastward compact mobile battle layout
(() => {
  const css=document.createElement('style');
  css.textContent=`
  @media(max-width:760px){
    #gameScreen.game-screen{height:100dvh!important;min-height:100dvh!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;padding:0!important}
    #gameScreen .battle-hud{flex:0 0 auto!important;min-height:46px!important;padding:5px 7px!important;gap:5px!important}
    #gameScreen .battle-hud .hud-stat,#gameScreen .battle-hud .hud-wave{padding:3px 6px!important;min-width:0!important}
    #gameScreen .battle-hud .hud-label{font-size:7px!important}
    #gameScreen .battle-hud b{font-size:12px!important}
    #gameScreen .speed-segment button{padding:5px 7px!important;font-size:9px!important}
    #gameScreen .battle-action,#gameScreen .battle-exit{padding:6px 8px!important;font-size:8px!important}
    #gameScreen .next-wave-strip{flex:0 0 30px!important;min-height:30px!important;margin:0!important;padding:4px 8px!important;gap:6px!important;font-size:8px!important;overflow:hidden!important}
    #gameScreen .next-wave-strip .enemy-preview img{width:20px!important;height:20px!important}
    #gameScreen .game-layout{flex:1 1 auto!important;min-height:0!important;height:auto!important;display:grid!important;grid-template-rows:minmax(0,1fr) auto!important;grid-template-columns:1fr!important;gap:6px!important;padding:6px!important;overflow:hidden!important}
    #gameScreen .battle-board{min-height:0!important;width:100%!important;height:100%!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;margin:0!important;overflow:hidden!important}
    #gameScreen .battle-board canvas{width:100%!important;height:auto!important;max-height:100%!important;aspect-ratio:5/3!important;object-fit:contain!important;border-radius:12px!important}
    #gameScreen .tower-panel{margin:0!important;padding:7px!important;min-height:0!important;max-height:164px!important;overflow:hidden!important;border-radius:14px!important}
    #gameScreen .tower-panel-title{display:flex!important;align-items:center!important;justify-content:space-between!important;margin:0 2px 5px!important}
    #gameScreen .tower-panel-title span{font-size:12px!important}
    #gameScreen .tower-panel-title small{font-size:8px!important}
    #gameScreen .battle-synergy-strip{display:flex!important;align-items:center!important;gap:5px!important;margin:0 0 5px!important;padding:4px 5px!important;min-height:25px!important;overflow-x:auto!important;white-space:nowrap!important}
    #gameScreen .battle-synergy-strip>small{display:none!important}
    #gameScreen .battle-synergy-chip{display:inline-flex!important;flex:0 0 auto!important;margin:0!important;padding:3px 6px!important;font-size:8px!important;gap:3px!important}
    #gameScreen .battle-synergy-chip span{font-size:10px!important}
    #gameScreen .synergy-empty{padding:3px 6px!important;font-size:8px!important}
    #gameScreen #towerChoices{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important;margin:0!important}
    #gameScreen .tower-choice{height:91px!important;min-height:91px!important;margin:0!important;padding:5px 3px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;text-align:center!important;border-radius:10px!important;overflow:hidden!important}
    #gameScreen .tower-choice .tower-list-sprite{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;margin:0!important}
    #gameScreen .tower-choice>div{min-width:0!important;width:100%!important}
    #gameScreen .tower-choice b{display:block!important;font-size:10px!important;line-height:1.05!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
    #gameScreen .tower-choice small{display:none!important}
    #gameScreen .tower-choice .compact-level{display:block!important;font-size:8px!important;color:#aebbb3!important;margin-top:2px!important}
    #gameScreen .tip{display:none!important}
  }
  `;
  document.head.appendChild(css);

  choices=function(){
    const w=document.querySelector('#towerChoices');if(!w)return;w.innerHTML='';
    const available=(battleLoadout&&battleLoadout.length?battleLoadout:save.unlocked.slice(0,4)).filter(id=>save.unlocked.includes(id));
    available.forEach(id=>{
      const el=document.createElement('button');
      el.className='tower-choice';
      el.innerHTML=`${stageSpriteMarkup(id,evolutionStage(id),'tower-list-sprite')}<div><b>${nameFor(id)}</b><span class="compact-level">Lv ${progress(id).level}</span></div>`;
      el.onclick=()=>{selectedSpecies=id;selectedTower=null;renderSelectedTower();document.querySelectorAll('.tower-choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')};
      w.appendChild(el);
    });
  };

  try{choices();}catch(e){}
})();
