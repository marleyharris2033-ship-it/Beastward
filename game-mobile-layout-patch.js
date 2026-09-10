// Beastward mobile battle layout only — keeps the entire battle on one screen.
(() => {
  const style=document.createElement('style');
  style.textContent=`
    @media(max-width:760px){
      body.battle-one-screen{overflow:hidden!important;height:100dvh!important}
      body.battle-one-screen #app{height:100dvh!important;overflow:hidden!important}
      body.battle-one-screen #gameScreen{height:100dvh!important;min-height:0!important;overflow:hidden!important;display:grid!important;grid-template-rows:auto auto 1fr!important;background:#07140f!important}
      body.battle-one-screen #gameScreen:not(.active){display:none!important}
      body.battle-one-screen .battle-hud{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important;padding:6px 8px!important;position:relative!important;top:auto!important}
      body.battle-one-screen .battle-hud .hud-stat,body.battle-one-screen .battle-hud .hud-wave{min-width:0!important;padding:5px 7px!important;border-radius:9px!important}
      body.battle-one-screen .battle-hud .hud-label{font-size:7px!important}
      body.battle-one-screen .battle-hud b{font-size:14px!important}
      body.battle-one-screen .speed-segment{padding:2px!important;min-height:0!important}
      body.battle-one-screen .speed-choice{padding:5px 6px!important;font-size:9px!important}
      body.battle-one-screen #startWaveBtn{grid-column:1/3!important;padding:7px!important;min-height:34px!important;font-size:9px!important}
      body.battle-one-screen #exitLevelBtn{grid-column:3/5!important;padding:7px!important;min-height:34px!important;font-size:9px!important}
      body.battle-one-screen .next-wave-strip{margin:0!important;padding:5px 8px!important;min-height:30px!important;border-radius:0!important;display:flex!important;align-items:center!important;gap:7px!important;overflow:hidden!important}
      body.battle-one-screen .next-wave-strip>span{font-size:9px!important;white-space:nowrap!important}
      body.battle-one-screen .next-wave-strip small{font-size:7px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
      body.battle-one-screen .enemy-preview img{width:18px!important;height:18px!important}
      body.battle-one-screen .game-layout{min-height:0!important;height:100%!important;display:grid!important;grid-template-rows:minmax(0,1fr) 112px!important;gap:6px!important;padding:6px 8px 8px!important;overflow:hidden!important}
      body.battle-one-screen .battle-board{min-height:0!important;height:100%!important;width:100%!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;margin:0!important;overflow:hidden!important;border-radius:12px!important}
      body.battle-one-screen #gameCanvas{display:block!important;width:100%!important;height:auto!important;max-height:100%!important;aspect-ratio:5/3!important;object-fit:contain!important;border-radius:10px!important}
      body.battle-one-screen .tower-panel{height:112px!important;min-height:112px!important;padding:5px 7px!important;margin:0!important;overflow:hidden!important;border-radius:12px!important}
      body.battle-one-screen .tower-panel-title{height:20px!important;margin:0 0 3px!important;display:flex!important;align-items:center!important}
      body.battle-one-screen .tower-panel-title span{font-size:12px!important}
      body.battle-one-screen .tower-panel-title small{font-size:7px!important}
      body.battle-one-screen #battleSynergyStrip{height:18px!important;min-height:18px!important;margin:0 0 3px!important;padding:2px 5px!important;display:flex!important;gap:4px!important;align-items:center!important;overflow:hidden!important}
      body.battle-one-screen #battleSynergyStrip>small{display:none!important}
      body.battle-one-screen .battle-synergy-chip{display:inline-flex!important;margin:0!important;padding:2px 5px!important;font-size:7px!important;height:15px!important;white-space:nowrap!important}
      body.battle-one-screen .battle-synergy-chip span{font-size:9px!important}
      body.battle-one-screen #towerChoices{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important;height:63px!important;overflow:hidden!important}
      body.battle-one-screen .tower-choice{height:63px!important;min-height:0!important;padding:3px!important;margin:0!important;display:grid!important;grid-template-rows:38px 1fr!important;place-items:center!important;gap:0!important;border-radius:9px!important;overflow:hidden!important}
      body.battle-one-screen .tower-choice>.stage-sprite{width:38px!important;height:38px!important;margin:0!important}
      body.battle-one-screen .tower-choice>div{width:100%!important;text-align:center!important;line-height:1!important;overflow:hidden!important}
      body.battle-one-screen .tower-choice b{display:block!important;font-size:8px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
      body.battle-one-screen .tower-choice small{display:none!important}
      body.battle-one-screen .tower-choice .tower-level-mini{display:block!important;font-size:6px!important;color:#aab9af!important;margin-top:2px!important}
      body.battle-one-screen .tower-panel .tip{display:none!important}
    }
  `;
  document.head.appendChild(style);

  const baseShow=show;
  show=function(id){
    document.body.classList.toggle('battle-one-screen',id==='gameScreen');
    return baseShow(id);
  };

  const baseChoices=choices;
  choices=function(){
    baseChoices();
    if(window.innerWidth>760)return;
    document.querySelectorAll('#towerChoices .tower-choice').forEach(el=>{
      const id=(battleLoadout&&battleLoadout.length?battleLoadout:save.unlocked.slice(0,4)).filter(x=>save.unlocked.includes(x))[Array.from(el.parentNode.children).indexOf(el)];
      if(!id)return;
      const box=el.querySelector('div');
      if(box)box.innerHTML=`<b>${nameFor(id)}</b><span class="tower-level-mini">Lv ${progress(id).level}</span>`;
    });
  };

  // Re-render immediately if the battle screen was already prepared before this patch loaded.
  if(document.querySelector('#gameScreen.active')){document.body.classList.add('battle-one-screen');try{choices();}catch(e){}}
})();
