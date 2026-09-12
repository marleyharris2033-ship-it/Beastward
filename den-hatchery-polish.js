// Beastward Den + Hatchery polish v1
(()=>{
const V='20260912-den-hatchery-polish-v1';
function rarityFor(species){if(Array.isArray(epicPool)&&epicPool.includes(species))return'epic';if(Array.isArray(rarePool)&&rarePool.includes(species))return'rare';return'common'}
function rarityLabel(r){return r.charAt(0).toUpperCase()+r.slice(1)}
function decorateCollection(){
  const cards=[...document.querySelectorAll('#beastCollection .beast-pc-slot')];
  cards.forEach(card=>{
    if(card.querySelector('.den-rarity-chip'))return;
    const text=card.textContent||'',i=(save.beastInstances||[]).find(x=>text.includes('#'+String(x.uid).slice(-4).toUpperCase()));
    if(!i)return;
    const r=rarityFor(i.species),chip=document.createElement('span');chip.className='den-rarity-chip den-rarity-'+r;chip.textContent=rarityLabel(r);card.appendChild(chip);
  });
}
const baseRenderCollection=renderCollection;
renderCollection=function(){const r=baseRenderCollection.apply(this,arguments);decorateCollection();return r};
function instanceFor(key){return(save.beastInstances||[]).find(x=>x&&x.uid===key)||null}
function evolutionMarkup(i){
  const b=beasts[i.species],s=i.level>=100?4:i.level>=60?3:i.level>=30?2:1;
  const forms=[{stage:1,name:b.name,level:1},{stage:2,name:b.evo20,level:30},{stage:3,name:b.evo30,level:60},{stage:4,name:b.evo100||b.evo30,level:100}];
  return `<section class="den-evo-preview"><div class="den-evo-head"><div><small>EVOLUTION PATH</small><h3>Growth Milestones</h3></div><b>Current Lv ${i.level}</b></div><div class="den-evo-steps">${forms.map((f,n)=>`<div class="den-evo-step ${s===f.stage?'current':''} ${s>f.stage?'done':''}"><span>${s>f.stage?'✓':s===f.stage?'◆':'○'}</span><b>${f.name}</b><small>${f.level===1?'Base form':'Lv '+f.level}</small></div>`).join('')}</div></section>`;
}
function treatSummary(){
  const t=save.trainingTreats||{},defs=[['small','250'],['standard','500'],['greater','1,000'],['master','2,500']];
  return `<div class="den-treat-summary"><small>TRAINING STOCK</small>${defs.map(([k,xp])=>`<span><b>${t[k]||0}</b><em>+${xp} XP</em></span>`).join('')}</div>`;
}
const baseOpenDenBeast=openDenBeast;
openDenBeast=function(key){const r=baseOpenDenBeast.apply(this,arguments),i=instanceFor(key),body=document.querySelector('#denBeastModalBody');if(i&&body){body.querySelector('.den-evo-preview')?.remove();body.querySelector('.den-treat-summary')?.remove();const training=body.querySelector('.training-treat-panel');if(training)training.insertAdjacentHTML('beforebegin',evolutionMarkup(i)+treatSummary());else body.insertAdjacentHTML('beforeend',evolutionMarkup(i)+treatSummary())}return r};
function decorateHatchery(){
  const screen=document.querySelector('#hatcheryScreen');if(!screen)return;
  let panel=screen.querySelector('.hatchery-guide-panel');if(!panel){panel=document.createElement('section');panel.className='hatchery-guide-panel';const target=screen.querySelector('#openCommonEggBtn')?.parentElement?.parentElement||screen.firstElementChild;target?.insertAdjacentElement('afterend',panel)}
  if(!panel)return;
  panel.innerHTML=`<div><small>HATCHERY GUIDE</small><h3>Choose Your Egg</h3><p>Each egg rolls evenly between beasts in that rarity pool. Duplicates become separate individual beasts, so every hatch can be trained differently.</p></div><div class="hatchery-guide-grid"><span class="common"><b>COMMON</b><em>200 Essence</em><small>${commonPool.length} possible beasts</small></span><span class="rare"><b>RARE</b><em>1,000 Essence</em><small>${rarePool.length} possible beasts</small></span><span class="epic"><b>EPIC</b><em>2,000 Essence</em><small>${epicPool.length} possible beasts</small></span></div>`;
}
const baseShow=show;
show=function(id){const r=baseShow.apply(this,arguments);if(id==='hatcheryScreen')setTimeout(decorateHatchery,0);if(id==='beastsScreen')setTimeout(decorateCollection,0);return r};
const style=document.createElement('style');style.textContent=`
#beastCollection .beast-pc-slot{position:relative}.den-rarity-chip{position:absolute;top:8px;right:8px;padding:3px 7px;border-radius:999px;font-size:8px;font-weight:900;letter-spacing:.08em;border:1px solid #ffffff28;background:#102018;color:#d7e4da}.den-rarity-rare{background:#17324c;color:#9dccff;border-color:#4f86c7}.den-rarity-epic{background:#38204e;color:#d7a7ff;border-color:#9a65ce}
.den-evo-preview{margin-top:14px;padding:13px;border:1px solid #ffffff1a;border-radius:14px;background:#0a1711}.den-evo-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.den-evo-head small,.den-treat-summary>small{font-size:9px;letter-spacing:.14em;color:#91a399}.den-evo-head h3{margin:2px 0 0;font-size:17px;color:#f0d36d}.den-evo-head>b{font-size:11px;color:#c9d5cc}.den-evo-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px}.den-evo-step{padding:8px 6px;border-radius:10px;background:#111d16;border:1px solid #ffffff12;opacity:.55;text-align:center}.den-evo-step span,.den-evo-step b,.den-evo-step small{display:block}.den-evo-step span{font-size:13px}.den-evo-step b{font-size:10px;margin:3px 0}.den-evo-step small{font-size:8px}.den-evo-step.done,.den-evo-step.current{opacity:1;border-color:#6e9d79}.den-evo-step.current{background:#183324;box-shadow:0 0 14px #74cf8b18}.den-evo-step.current span{color:#f0d36d}
.den-treat-summary{margin-top:8px;padding:10px 12px;border-radius:12px;background:#101a26;border:1px solid #6f5a9638;display:grid;grid-template-columns:auto repeat(4,1fr);gap:8px;align-items:center}.den-treat-summary span{text-align:center}.den-treat-summary b,.den-treat-summary em{display:block}.den-treat-summary b{font-size:14px}.den-treat-summary em{font-size:8px;font-style:normal;opacity:.7}
.hatchery-guide-panel{margin:12px 0 16px;padding:14px;border:1px solid #ffffff18;border-radius:16px;background:linear-gradient(145deg,#17291f,#0d1712);display:grid;grid-template-columns:1.2fr 1fr;gap:14px}.hatchery-guide-panel small{font-size:9px;letter-spacing:.14em;color:#8fa096}.hatchery-guide-panel h3{margin:2px 0 5px;color:#f0d36d}.hatchery-guide-panel p{margin:0;font-size:11px;line-height:1.45;color:#b6c2ba}.hatchery-guide-grid{display:grid;gap:6px}.hatchery-guide-grid span{padding:8px 10px;border-radius:10px;border:1px solid #ffffff12;background:#142219}.hatchery-guide-grid b,.hatchery-guide-grid em,.hatchery-guide-grid small{display:block}.hatchery-guide-grid b{font-size:10px}.hatchery-guide-grid em{font-size:11px;font-style:normal}.hatchery-guide-grid .rare{background:#162b40;border-color:#4f86c744}.hatchery-guide-grid .epic{background:#2d1b3f;border-color:#9a65ce55}
@media(max-width:600px){.den-evo-steps{grid-template-columns:repeat(2,1fr)}.den-treat-summary{grid-template-columns:repeat(4,1fr)}.den-treat-summary>small{grid-column:1/-1}.hatchery-guide-panel{grid-template-columns:1fr}}
`;document.head.appendChild(style);
try{decorateCollection();decorateHatchery()}catch(e){}
document.documentElement.dataset.denHatcheryPolish=V;
})();