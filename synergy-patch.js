// Beastward team synergies v2
(() => {
  const synergyDefs = [
    {id:'wildfire',name:'Wildfire',types:['Fire','Wind'],icon:'🔥',desc:'Fire burn damage +25%. Wind deals +20% damage to burning enemies.'},
    {id:'stormfront',name:'Stormfront',types:['Water','Electric'],icon:'⚡',desc:'Electric attacks chain to +1 enemy. Water slows last 20% longer.'},
    {id:'toxic-growth',name:'Toxic Growth',types:['Nature','Poison'],icon:'☣',desc:'Poisoned enemies spread poison to nearby enemies when defeated.'},
    {id:'permafrost',name:'Permafrost',types:['Water','Ice'],icon:'❄',desc:'Water and Ice hits against slowed enemies have a 20% chance to freeze.'},
    {id:'sunstone-ward',name:'Sunstone Ward',types:['Rock','Light'],icon:'✦',desc:'All beasts gain +8% damage and +6% range.'},
    {id:'eclipse',name:'Eclipse',types:['Dark','Light'],icon:'◐',desc:'Dark attacks gain a 10% chance to trigger an extra critical strike.'},
    {id:'thundercliff',name:'Thundercliff',types:['Rock','Electric'],icon:'⛰',desc:'Electric attacks deal +25% damage to stunned enemies.'},
    {id:'blightfire',name:'Blightfire',types:['Fire','Poison'],icon:'♨',desc:'Burn and poison damage-over-time effects are 15% stronger.'}
  ];

  let synergyBattleActive = false;

  const typesFor = ids => new Set((ids || []).filter(id => beasts[id]).map(id => beasts[id].type));
  const teamIds = () => synergyBattleActive && battleLoadout?.length ? battleLoadout : (loadoutDraft || []);
  const activeSynergies = (ids = teamIds()) => {
    const types = typesFor(ids);
    return synergyDefs.filter(s => s.types.every(t => types.has(t)));
  };
  const hasSynergy = id => activeSynergies().some(s => s.id === id);

  window.BeastwardSynergies = {
    definitions: synergyDefs,
    active: () => activeSynergies().map(s => s.id)
  };

  const style = document.createElement('style');
  style.textContent = `
    .synergy-preview{margin:10px 0 14px;padding:11px;border:1px solid #ffffff18;border-radius:12px;background:#08140f99}
    .synergy-preview-head{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:8px}
    .synergy-preview-head b{font-size:12px;letter-spacing:.12em;color:#f2db82}
    .synergy-preview-head small{color:#9fb2a7;font-size:10px}
    .synergy-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
    .synergy-card{display:flex;gap:8px;align-items:flex-start;padding:8px;border-radius:9px;background:#10251a;border:1px solid #6ecf8f45}
    .synergy-card .synergy-icon{font-size:17px;line-height:1}
    .synergy-card b{display:block;font-size:11px;color:#e9d37b}
    .synergy-card small{display:block;font-size:9px;line-height:1.3;color:#b9c8be;margin-top:2px}
    .synergy-card.suggestion{background:#101914;border-color:#ffffff14;opacity:.82}
    .synergy-card.suggestion b{color:#b7c6bc}
    .synergy-card.suggestion em{display:block;font-style:normal;color:#80d7a1;font-size:9px;margin-top:2px}
    .synergy-empty{padding:8px 9px;border-radius:9px;background:#ffffff08;color:#9eafa4;font-size:10px}
    .battle-synergy-strip{margin:0 0 10px;padding:9px;border-radius:10px;background:#08150faa;border:1px solid #ffffff14}
    .battle-synergy-strip>small{display:block;color:#9fb0a5;font-size:9px;letter-spacing:.12em;margin-bottom:5px}
    .battle-synergy-chip{display:flex;align-items:center;gap:6px;padding:5px 7px;margin-top:4px;border-radius:7px;background:#153321;color:#f2df91;font-size:10px;border:1px solid #78d29235}
    .battle-synergy-chip span{font-size:13px}
    @media(max-width:720px){.synergy-list{grid-template-columns:1fr}.battle-synergy-strip{padding:7px}}
  `;
  document.head.appendChild(style);

  function ensureLoadoutPanel(){
    const shell = document.querySelector('.loadout-card-shell');
    if(!shell) return null;
    let panel = document.querySelector('#synergyPreview');
    if(!panel){
      panel = document.createElement('div');
      panel.id = 'synergyPreview';
      panel.className = 'synergy-preview';
      const grid = document.querySelector('#loadoutGrid');
      shell.insertBefore(panel, grid);
    }
    return panel;
  }

  function renderSynergyPreview(){
    const panel = ensureLoadoutPanel();
    if(!panel) return;
    const ids = loadoutDraft || [];
    const selectedTypes = typesFor(ids);
    const active = activeSynergies(ids);
    const suggestions = synergyDefs
      .filter(s => !active.includes(s))
      .map(s => ({...s, missing:s.types.filter(t => !selectedTypes.has(t)), owned:s.types.filter(t => selectedTypes.has(t))}))
      .filter(s => s.owned.length === 1 && s.missing.length === 1)
      .slice(0,3);

    const activeHtml = active.map(s => `
      <div class="synergy-card"><span class="synergy-icon">${s.icon}</span><div><b>${s.name}</b><small>${s.desc}</small></div></div>
    `).join('');
    const suggestionHtml = suggestions.map(s => `
      <div class="synergy-card suggestion"><span class="synergy-icon">${s.icon}</span><div><b>${s.name}</b><em>Add ${s.missing[0]} to activate</em><small>${s.desc}</small></div></div>
    `).join('');

    panel.innerHTML = `
      <div class="synergy-preview-head"><b>TEAM SYNERGIES</b><small>${active.length} active</small></div>
      <div class="synergy-list">
        ${activeHtml || suggestionHtml || '<div class="synergy-empty">Select a beast to reveal compatible type pairings.</div>'}
        ${activeHtml ? suggestionHtml : ''}
      </div>
    `;
  }

  function ensureBattlePanel(){
    const panel = document.querySelector('.tower-panel');
    if(!panel) return null;
    let strip = document.querySelector('#battleSynergyStrip');
    if(!strip){
      strip = document.createElement('div');
      strip.id = 'battleSynergyStrip';
      strip.className = 'battle-synergy-strip';
      const choices = document.querySelector('#towerChoices');
      panel.insertBefore(strip, choices);
    }
    return strip;
  }

  function renderBattleSynergies(){
    const strip = ensureBattlePanel();
    if(!strip) return;
    const active = activeSynergies(battleLoadout || []);
    strip.innerHTML = active.length
      ? '<small>ACTIVE SYNERGIES</small>' + active.map(s => '<div class="battle-synergy-chip"><span>'+s.icon+'</span><b>'+s.name+'</b></div>').join('')
      : '<small>ACTIVE SYNERGIES</small><div class="synergy-empty">None active</div>';
  }

  const baseRenderLoadoutPicker = renderLoadoutPicker;
  renderLoadoutPicker = function(){
    const result = baseRenderLoadoutPicker();
    renderSynergyPreview();
    return result;
  };

  const baseBeginSelectedLevel = beginSelectedLevel;
  beginSelectedLevel = function(){
    const selected = activeSynergies(loadoutDraft || []);
    synergyBattleActive = true;
    const result = baseBeginSelectedLevel();
    renderBattleSynergies();
    if(selected.length){
      setTimeout(() => showProgressToast(
        selected.length > 1 ? 'TEAM SYNERGIES ACTIVE' : 'TEAM SYNERGY ACTIVE',
        selected.map(s => s.name).join(' • '),
        'evolution'
      ), 180);
    }
    return result;
  };

  const baseShow = show;
  show = function(id){
    if(id !== 'gameScreen') synergyBattleActive = false;
    return baseShow(id);
  };

  const baseReset = reset;
  reset = function(){
    const result = baseReset();
    renderBattleSynergies();
    return result;
  };

  const baseBattleStats = battleStats;
  battleStats = function(id){
    const stats = baseBattleStats(id);
    if(synergyBattleActive && hasSynergy('sunstone-ward')){
      return {...stats, damage:stats.damage*1.08, range:clampCombatRange(stats.range*1.06)};
    }
    return stats;
  };

  function reportExtraDamage(beastId, amount){
    if(!battleReport || !beastId || amount <= 0) return;
    battleReport.damageByBeast[beastId] = (battleReport.damageByBeast[beastId] || 0) + amount;
  }

  const baseHitProjectile = hitProjectile;
  hitProjectile = function(p){
    const t = p?.target;
    if(!t) return baseHitProjectile(p);

    const wasBurning = (t.burn || 0) > 0;
    const wasSlowed = (t.slow || 0) > 0;
    const wasStunned = (t.stun || 0) > 0;
    const beforeSlow = t.slow || 0;
    const beforeBurnDps = t.burnDps || 0;
    const beforePoisonDps = t.poisonDps || 0;

    const result = baseHitProjectile(p);

    if(p.type === 'Fire' && t.burnDps > beforeBurnDps){
      let factor = 1;
      if(hasSynergy('wildfire')) factor *= 1.25;
      if(hasSynergy('blightfire')) factor *= 1.15;
      if(factor > 1) t.burnDps *= factor;
    }

    if(p.type === 'Poison' && t.poisonDps > beforePoisonDps && hasSynergy('blightfire')){
      t.poisonDps *= 1.15;
    }

    if(hasSynergy('wildfire') && p.type === 'Wind' && wasBurning && t.hp > 0){
      const bonus = p.damage * .20;
      t.hp -= bonus; reportExtraDamage(p.beastId, bonus);
      fx('burst',t.x,t.y,'#ff9b45',{size:44,life:.45,maxLife:.45});
    }

    if(hasSynergy('stormfront')){
      if(p.type === 'Water' && t.slow > beforeSlow) t.slow *= 1.20;
      if(p.type === 'Electric'){
        const extra = enemies
          .filter(e => e !== t && e.hp > 0 && Math.hypot(e.x-t.x,e.y-t.y) < 120)
          .sort((a,b) => Math.hypot(a.x-t.x,a.y-t.y)-Math.hypot(b.x-t.x,b.y-t.y))[0];
        if(extra){
          const bonus = p.damage * .35;
          extra.hp -= bonus; reportExtraDamage(p.beastId, bonus);
          fx('lightning',t.x,t.y,'#fff36c',{x2:extra.x,y2:extra.y,life:.38,maxLife:.38});
        }
      }
    }

    if(hasSynergy('permafrost') && (p.type === 'Water' || p.type === 'Ice') && (wasSlowed || t.slow > 0) && Math.random() < .20){
      t.stun = Math.max(t.stun || 0, .55);
      fx('freeze',t.x,t.y,'#d9fbff',{size:58,life:.5,maxLife:.5});
    }

    if(hasSynergy('eclipse') && p.type === 'Dark' && t.hp > 0 && Math.random() < .10){
      const bonus = p.damage;
      t.hp -= bonus; reportExtraDamage(p.beastId, bonus);
      fx('crit',t.x,t.y,'#fff2a6',{life:.65,maxLife:.65});
      fx('light',t.x,t.y,'#d7b7ff',{size:62,life:.5,maxLife:.5});
    }

    if(hasSynergy('thundercliff') && p.type === 'Electric' && wasStunned && t.hp > 0){
      const bonus = p.damage * .25;
      t.hp -= bonus; reportExtraDamage(p.beastId, bonus);
      fx('zap',t.x,t.y,'#ffe66a',{size:52,life:.45,maxLife:.45});
    }

    return result;
  };

  const baseDefeatEnemy = defeatEnemy;
  defeatEnemy = function(e){
    const shouldSpread = synergyBattleActive && hasSynergy('toxic-growth') && e && (e.poison || 0) > 0;
    const x = e?.x, y = e?.y, dps = e?.poisonDps || 0;
    const result = baseDefeatEnemy(e);
    if(result && shouldSpread){
      const nearby = enemies.filter(n => n.hp > 0 && Math.hypot(n.x-x,n.y-y) < 82).slice(0,4);
      nearby.forEach(n => {
        n.poison = Math.max(n.poison || 0, 2.8);
        n.poisonDps = Math.max(n.poisonDps || 0, Math.max(4,dps*.65));
      });
      if(nearby.length) fx('poison',x,y,'#9be76c',{size:76,life:.6,maxLife:.6});
    }
    return result;
  };

  renderSynergyPreview();
  renderBattleSynergies();
})();
