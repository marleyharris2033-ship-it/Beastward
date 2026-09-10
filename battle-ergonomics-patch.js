// BeastBorn battle/loadout ergonomics v1
(() => {
  if(window.__beastbornErgonomicsV1)return;window.__beastbornErgonomicsV1=true;
  const MAX_LOADOUT=6;
  const synergyDefs=window.BeastwardSynergies?.definitions||[];
  const typesFor=ids=>new Set((ids||[]).filter(id=>beasts[id]).map(id=>beasts[id].type));
  const activeSynergies=ids=>{const types=typesFor(ids);return synergyDefs.filter(s=>s.types.every(t=>types.has(t)))};
  const suggestions=ids=>{const types=typesFor(ids);return synergyDefs.map(s=>({...s,missing:s.types.filter(t=>!types.has(t)),owned:s.types.filter(t=>types.has(t))})).filter(s=>s.owned.length===1&&s.missing.length===1&&!activeSynergies(ids).some(a=>a.id===s.id)).slice(0,3)};

  function renderErgonomicSynergies(){
    const shell=document.querySelector('.loadout-card-shell');if(!shell)return;
    let panel=document.querySelector('#synergyPreview');if(!panel){panel=document.createElement('div');panel.id='synergyPreview';panel.className='synergy-preview';const grid=document.querySelector('#loadoutGrid');shell.insertBefore(panel,grid)}
    const active=activeSynergies(loadoutDraft||[]),near=suggestions(loadoutDraft||[]);
    panel.innerHTML='<div class="erg-syn-head"><b>TEAM SYNERGIES</b><span>'+active.length+' active</span></div><div class="erg-syn-row">'+
      (active.length?active.map(s=>'<div class="erg-syn active"><span>'+s.icon+'</span><b>'+s.name+'</b></div>').join(''):near.length?near.map(s=>'<div class="erg-syn"><span>'+s.icon+'</span><b>'+s.name+'</b><small>+ '+s.missing[0]+'</small></div>').join(''):'<div class="erg-syn-empty">Pick beasts to build type combinations</div>')+'</div>';
  }

  const loadoutKey=()=>`beastborn-loadout6-${typeof activeSlot!=='undefined'?activeSlot:0}`;
  const readSaved=()=>{try{return JSON.parse(localStorage.getItem(loadoutKey())||'[]').filter(id=>save.unlocked.includes(id)).slice(0,MAX_LOADOUT)}catch(e){return[]}};
  const writeSaved=ids=>{try{localStorage.setItem(loadoutKey(),JSON.stringify(ids.slice(0,MAX_LOADOUT)))}catch(e){}};

  renderLoadoutPicker=function(){
    const grid=$('#loadoutGrid'),count=$('#loadoutCount'),start=$('#loadoutStartBtn'),title=$('#loadoutLevelName');if(!grid)return;
    if(title&&pendingLevelId){const lvl=levels.find(x=>x.id===pendingLevelId);title.textContent=(pendingMode==='hard'?'HARD • ':'')+levelCode(lvl)+' • '+lvl.name}
    grid.innerHTML='';
    save.unlocked.forEach(id=>{const selected=loadoutDraft.includes(id),card=document.createElement('button');card.className='loadout-card'+(selected?' selected':'');card.innerHTML=stageSpriteMarkup(id,evolutionStage(id),'loadout-sprite')+'<div class="loadout-card-copy"><b>'+nameFor(id)+'</b><small>Lv '+progress(id).level+'</small></div><span class="loadout-check">'+(selected?'✓':'+')+'</span>';card.onclick=()=>{const i=loadoutDraft.indexOf(id);if(i>=0)loadoutDraft.splice(i,1);else if(loadoutDraft.length<MAX_LOADOUT)loadoutDraft.push(id);renderLoadoutPicker()};grid.appendChild(card)});
    if(count){count.textContent=loadoutDraft.length+' / '+MAX_LOADOUT+' selected';const note=count.parentElement?.querySelector('p,small');if(note&&/four beasts/i.test(note.textContent))note.textContent='Choose up to six beasts for this level.'}
    if(start){start.disabled=!loadoutDraft.length;start.textContent=loadoutDraft.length?'DEFEND WITH '+loadoutDraft.length:'SELECT AT LEAST 1'}
    renderErgonomicSynergies();
  };
  openLoadoutPicker=function(id){pendingLevelId=id;pendingMode=campaignMode;const six=readSaved(),legacy=(save.lastLoadout||[]).filter(x=>save.unlocked.includes(x)).slice(0,MAX_LOADOUT);const valid=six.length?six:legacy;loadoutDraft=valid.length?valid:save.unlocked.slice(0,Math.min(MAX_LOADOUT,save.unlocked.length));renderLoadoutPicker();$('#loadoutModal').classList.remove('hidden')};
  beginSelectedLevel=function(){if(!pendingLevelId||!loadoutDraft.length)return;battleLoadout=[...loadoutDraft].slice(0,MAX_LOADOUT);save.lastLoadout=[...battleLoadout];writeSaved(battleLoadout);persist();currentLevel=levels.find(x=>x.id===pendingLevelId);path=currentLevel.path;battleMode=pendingMode;$('#loadoutModal').classList.add('hidden');pendingLevelId=null;reset();show('gameScreen');last=performance.now();requestAnimationFrame(loop)};
  const start=$('#loadoutStartBtn');if(start)start.onclick=()=>beginSelectedLevel();

  function simplifyBattleCards(){document.querySelectorAll('#gameScreen .tower-choice').forEach(card=>{const b=card.querySelector('b');if(!b)return;let lv=card.querySelector('.battle-level-only');if(!lv){const m=[...card.querySelectorAll('small')].map(x=>x.textContent).join(' ').match(/Lv\s*([0-9]+)/i);lv=document.createElement('small');lv.className='battle-level-only';lv.textContent='Lv '+(m?m[1]:'1');b.insertAdjacentElement('afterend',lv)}})}
  if(typeof choices==='function'){const baseChoices=choices;choices=function(){const r=baseChoices();simplifyBattleCards();return r}}simplifyBattleCards();

  const style=document.createElement('style');style.id='battleErgonomicsStyle';style.textContent=`
    /* Regular portrait battle: same six-card language as fullscreen */
    @media(max-width:760px){
      #gameScreen:not(.battle-focus) .tower-panel{padding:10px!important}
      #gameScreen:not(.battle-focus) .tower-panel-title{margin-bottom:6px}
      #gameScreen:not(.battle-focus) .tower-panel-title small,#gameScreen:not(.battle-focus) .tip{display:none!important}
      #gameScreen:not(.battle-focus) .battle-synergy-strip{margin:0 0 7px!important;padding:5px!important;display:flex!important;gap:4px!important;flex-wrap:wrap!important}
      #gameScreen:not(.battle-focus) .battle-synergy-strip>small{display:none!important}
      #gameScreen:not(.battle-focus) .battle-synergy-chip{margin:0!important;padding:4px 6px!important;font-size:9px!important;width:auto!important}
      #gameScreen:not(.battle-focus) #towerChoices{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:7px!important}
      #gameScreen:not(.battle-focus) .tower-choice{margin:0!important;min-height:92px!important;padding:7px 3px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;gap:3px!important;overflow:hidden!important}
      #gameScreen:not(.battle-focus) .tower-choice .stage-sprite,#gameScreen:not(.battle-focus) .tower-choice img{width:46px!important;height:46px!important;flex:0 0 46px!important}
      #gameScreen:not(.battle-focus) .tower-choice b{font-size:11px!important;line-height:1.05!important;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      #gameScreen:not(.battle-focus) .tower-choice small{display:none!important}
      #gameScreen:not(.battle-focus) .tower-choice .battle-level-only{display:block!important;color:#aebbb1!important;font-size:9px!important;line-height:1!important}
    }

    /* Loadout picker: compact, scannable and synergy-led */
    #loadoutModal .loadout-card-shell{max-height:min(88svh,760px);overflow:auto!important}
    #loadoutModal #loadoutCount{position:sticky;top:0;z-index:8;background:#122219;padding:8px 10px;border-radius:10px;border:1px solid #405947;display:inline-block}
    #loadoutModal .synergy-preview{padding:8px!important;margin:8px 0 10px!important}
    #loadoutModal .synergy-preview .synergy-preview-head,#loadoutModal .synergy-preview .synergy-list{display:none!important}
    .erg-syn-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.erg-syn-head b{font-size:10px;letter-spacing:.12em;color:#f2db82}.erg-syn-head span{font-size:9px;color:#9fb2a7}
    .erg-syn-row{display:flex;gap:5px;flex-wrap:wrap}.erg-syn{display:flex;align-items:center;gap:4px;border:1px solid #405947;background:#102018;border-radius:999px;padding:5px 7px;font-size:9px}.erg-syn.active{border-color:#6ecf8f;background:#153321}.erg-syn small{color:#8fd7a8}.erg-syn-empty{font-size:9px;color:#9fb2a7;padding:4px}
    #loadoutModal #loadoutGrid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}
    #loadoutModal .loadout-card{min-height:82px!important;padding:7px!important;display:grid!important;grid-template-columns:54px minmax(0,1fr) 28px!important;align-items:center!important;gap:6px!important}
    #loadoutModal .loadout-sprite{width:50px!important;height:50px!important;margin:0!important}
    #loadoutModal .loadout-card-copy b{font-size:13px!important;line-height:1.05!important}.loadout-card-copy small{font-size:10px!important;margin-top:3px!important}.loadout-check{width:27px!important;height:27px!important;display:grid!important;place-items:center!important}
    @media(min-width:760px){#loadoutModal #loadoutGrid{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
    @media(max-width:420px){#loadoutModal .loadout-card{grid-template-columns:45px minmax(0,1fr) 24px!important;min-height:72px!important}.loadout-sprite{width:42px!important;height:42px!important}.loadout-card-copy b{font-size:11px!important}}
  `;document.head.appendChild(style);
})();