// Beastward combat identity + Level 100 capstones v1
(() => {
  const V='20260914-combat-identities-1';
  const IDENTITIES={
    embercub:{passive:'Kindling',passiveText:'Burning targets take escalating fire damage.',ultimate:'Solar Roar',ultimateText:'A radial blast scorches every enemy in range.',cd:13},
    sprigpaw:{passive:'Bramblebind',passiveText:'Attacks can root enemies and spread control nearby.',ultimate:'Ancient Snare',ultimateText:'Roots a group in place and seeds lingering poison.',cd:15},
    bubblit:{passive:'Undertow',passiveText:'Water attacks apply stronger slows and spill onto nearby enemies.',ultimate:'Tidal Prison',ultimateText:'Crushes a group with a wave and heavily slows them.',cd:14},
    sparkit:{passive:'Arc Relay',passiveText:'Each strike jumps to additional nearby enemies.',ultimate:'Thunder Hunt',ultimateText:'Rapid lightning chains through a large group and briefly stuns.',cd:12},
    pebblum:{passive:'Aftershock',passiveText:'Heavy impacts stagger targets and splash nearby enemies.',ultimate:'Seismic Wall',ultimateText:'A powerful quake damages and stuns enemies around the impact.',cd:16},
    gustwing:{passive:'Gale Pierce',passiveText:'Wind shots pierce into extra enemies beyond the first target.',ultimate:'Tempest Volley',ultimateText:'A burst of cutting wind strikes enemies across its whole range.',cd:12},
    toxip:{passive:'Virulence',passiveText:'Poison lasts longer and builds stronger damage over time.',ultimate:'Plague Crown',ultimateText:'Floods a cluster with concentrated poison.',cd:15},
    frostkit:{passive:'Frostbite',passiveText:'Hits apply deep slow with a chance to freeze at higher forms.',ultimate:'Absolute Zero',ultimateText:'Freezes several enemies and leaves them severely slowed.',cd:16},
    shadepup:{passive:'Predator',passiveText:'Deals extra damage to wounded enemies and can land shadow crits.',ultimate:'Eclipse Pounce',ultimateText:'Executes a devastating strike against the most dangerous target.',cd:11},
    lumpling:{passive:'Radiant Splash',passiveText:'Light damage splashes around the main target.',ultimate:'Dawn Nova',ultimateText:'A radiant burst damages enemies and hastens nearby allied beasts.',cd:15},
    voltwing:{passive:'High Voltage',passiveText:'Powerful chains jump farther and can briefly stun.',ultimate:'Storm Judgement',ultimateText:'Calls a multi-target lightning storm across the battlefield.',cd:13},
    scorchick:{passive:'Cinder Rush',passiveText:'Rapid attacks stack burn quickly on priority targets.',ultimate:'Phoenix Rush',ultimateText:'A blazing sweep ignites enemies and immediately accelerates its next attack.',cd:11},
    mosshell:{passive:'Staggering Shell',passiveText:'Impacts stagger even bosses and disrupt clustered enemies.',ultimate:'Worldquake',ultimateText:'A ground shock locks down enemies around the tower.',cd:17},
    drizzlet:{passive:'Riptide',passiveText:'Fast water attacks spread a strong slow through groups.',ultimate:'Maelstrom',ultimateText:'A swirling surge damages and heavily slows enemies in range.',cd:12},
    zapmoth:{passive:'Static Web',passiveText:'Static arcs jump between clustered enemies and interrupt them.',ultimate:'Static Dominion',ultimateText:'Electrifies a wide group with repeated short stuns.',cd:12},
    cindrake:{passive:'Meteor Shock',passiveText:'Explosive attacks splash damage and ignite nearby enemies.',ultimate:'Meteorfall',ultimateText:'Drops a huge burning impact on a dense enemy cluster.',cd:15},
    sporeling:{passive:'Spore Bloom',passiveText:'Poison spreads from infected targets into nearby enemies.',ultimate:'Spore Eclipse',ultimateText:'Blankets a cluster in long-lasting toxic spores.',cd:16},
    drakeling:{passive:'Sky Lance',passiveText:'Wind lances pierce through multiple enemies.',ultimate:"Heaven's Gale",ultimateText:'A sweeping gale strikes nearly every enemy in range.',cd:13},
    voidling:{passive:'Rift Mark',passiveText:'Void hits can rupture for large critical damage.',ultimate:'Event Horizon',ultimateText:'Collapses a cluster into a damaging, slowing void field.',cd:16}
  };
  const clampStatus=(e,value)=>e?.boss?value*.42:value;
  const living=()=>enemies.filter(e=>e&&e.hp>0);
  const around=(x,y,r,exclude=null)=>living().filter(e=>e!==exclude&&Math.hypot(e.x-x,e.y-y)<=r);
  const extra=(e,amount)=>{if(e&&e.hp>0)e.hp-=Math.max(0,amount||0)};
  const slow=(e,time,factor)=>{if(!e||e.hp<=0)return;e.slow=Math.max(e.slow||0,clampStatus(e,time));e.slowFactor=Math.min(e.slowFactor||1,factor)};
  const root=(e,time)=>{if(!e||e.hp<=0)return;e.root=Math.max(e.root||0,clampStatus(e,time))};
  const stun=(e,time)=>{if(!e||e.hp<=0)return;e.stun=Math.max(e.stun||0,clampStatus(e,time))};
  const burn=(e,time,dps)=>{if(!e||e.hp<=0)return;e.burn=Math.max(e.burn||0,time);e.burnDps=Math.max(e.burnDps||0,dps)};
  const poison=(e,time,dps)=>{if(!e||e.hp<=0)return;e.poison=Math.max(e.poison||0,time);e.poisonDps=Math.max(e.poisonDps||0,dps)};
  const nearest=(x,y,r,n,exclude=null)=>around(x,y,r,exclude).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y)).slice(0,n);
  function applyPassive(p,t){
    if(!p||!t||!IDENTITIES[p.beastId])return;
    const s=Math.max(1,Math.min(4,p.beastStage||1)),d=p.damage||0;
    switch(p.beastId){
      case 'embercub': burn(t,2.1+s*.3,d*(.05+s*.012));if(t.burn>0)extra(t,d*(.035*s));break;
      case 'sprigpaw': if(Math.random()<.11+s*.025)root(t,.25+s*.09);if(s>=3)nearest(t.x,t.y,58,1,t).forEach(e=>root(e,.24+s*.04));break;
      case 'bubblit': slow(t,1.25+s*.18,.69-s*.035);if(s>=3)nearest(t.x,t.y,54,1,t).forEach(e=>slow(e,1.1,.55));break;
      case 'sparkit': nearest(t.x,t.y,92,1+(s>=3?1:0),t).forEach(e=>extra(e,d*(.14+s*.025)));break;
      case 'pebblum': stun(t,.08+s*.045);if(s>=3)around(t.x,t.y,54,t).slice(0,2).forEach(e=>extra(e,d*.16));break;
      case 'gustwing': nearest(t.x,t.y,122,1+(s>=3?1:0),t).forEach(e=>extra(e,d*(.14+s*.025)));break;
      case 'toxip': poison(t,2.8+s*.35,d*(.065+s*.016));break;
      case 'frostkit': slow(t,1.55+s*.18,.62-s*.025);if(s>=3&&Math.random()<.08+s*.025)stun(t,.24+s*.05);break;
      case 'shadepup': if((t.hp/t.max)<.58)extra(t,d*(.12+s*.045));if(Math.random()<.05+s*.025){extra(t,d*(.28+s*.07));fx('crit',t.x,t.y,'#a989ff')}break;
      case 'lumpling': around(t.x,t.y,54,t).slice(0,4).forEach(e=>extra(e,d*(.07+s*.022)));break;
      case 'voltwing': nearest(t.x,t.y,112,1+(s>=3?1:0),t).forEach(e=>{extra(e,d*(.16+s*.024));if(s>=4&&Math.random()<.16)stun(e,.2)});break;
      case 'scorchick': burn(t,2+s*.25,d*(.055+s*.014));break;
      case 'mosshell': stun(t,.10+s*.035);if(t.boss)extra(t,d*(.025*s));break;
      case 'drizzlet': slow(t,1.55+s*.18,.58-s*.025);if(s>=3)nearest(t.x,t.y,52,1,t).forEach(e=>slow(e,1.2,.5));break;
      case 'zapmoth': nearest(t.x,t.y,96,1+(s>=2?1:0),t).forEach(e=>{extra(e,d*(.11+s*.018));if(Math.random()<.05+s*.018)stun(e,.16)});break;
      case 'cindrake': around(t.x,t.y,58,t).slice(0,4).forEach(e=>{extra(e,d*(.11+s*.027));burn(e,1.8,d*.035*s)});break;
      case 'sporeling': poison(t,3.2+s*.3,d*(.075+s*.016));if(s>=2)nearest(t.x,t.y,62,1,t).forEach(e=>poison(e,2.4,d*(.06+s*.01)));break;
      case 'drakeling': nearest(t.x,t.y,128,1+(s>=3?1:0),t).forEach(e=>extra(e,d*(.16+s*.03)));break;
      case 'voidling': if(Math.random()<.05+s*.03){extra(t,d*(.30+s*.09));fx('crit',t.x,t.y,'#d06cff');if(s>=4)around(t.x,t.y,58,t).slice(0,2).forEach(e=>extra(e,d*.18))}break;
    }
  }
  const announced=new Set();
  function announce(id,meta){if(announced.has(id))return;announced.add(id);try{showProgressToast(meta.ultimate.toUpperCase(),meta.ultimateText,'levelup')}catch(_){}}
  function useUltimate(id,t,target){
    const meta=IDENTITIES[id];if(!meta||!target)return;
    const d=t.b.damage||beasts[id]?.damage||20,range=t.b.range||150;
    const field=around(t.x,t.y,range*1.04),cluster=around(target.x,target.y,110);
    switch(id){
      case 'embercub': field.slice(0,10).forEach(e=>{extra(e,d*.82);burn(e,4.2,d*.24)});fx('burst',t.x,t.y,'#ff6b35',{size:150});break;
      case 'sprigpaw': field.slice(0,7).forEach(e=>{root(e,1.35);poison(e,4.5,d*.15)});fx('roots',target.x,target.y,'#62c96b',{size:130});break;
      case 'bubblit': field.slice(0,8).forEach(e=>{extra(e,d*.58);slow(e,3.8,.34)});fx('splash',target.x,target.y,'#55a8ff',{size:145});break;
      case 'sparkit': field.slice(0,8).forEach(e=>{extra(e,d*.62);stun(e,.34)});fx('zap',target.x,target.y,'#ffd64e',{size:145});break;
      case 'pebblum': cluster.slice(0,7).forEach(e=>{extra(e,d*1.05);stun(e,.78)});fx('dust',target.x,target.y,'#c89c62',{size:155});break;
      case 'gustwing': field.slice(0,9).forEach(e=>extra(e,d*.68));fx('wind',t.x,t.y,'#9ff2cc',{size:160});break;
      case 'toxip': cluster.slice(0,9).forEach(e=>{extra(e,d*.38);poison(e,6.2,d*.32)});fx('poison',target.x,target.y,'#d46be8',{size:155});break;
      case 'frostkit': field.slice(0,7).forEach(e=>{stun(e,1.05);slow(e,4.4,.3);extra(e,d*.44)});fx('freeze',target.x,target.y,'#bff5ff',{size:155});break;
      case 'shadepup': {const prey=[...field].sort((a,b)=>(b.boss?1:0)-(a.boss?1:0)||(a.hp/a.max)-(b.hp/b.max))[0]||target;extra(prey,d*(prey.hp/prey.max<.4?3.2:2.25));fx('crit',prey.x,prey.y,'#a675e8');break;}
      case 'lumpling': field.slice(0,10).forEach(e=>extra(e,d*.62));towers.filter(a=>a!==t&&Math.hypot(a.x-t.x,a.y-t.y)<=range*.72).forEach(a=>a.cool=Math.max(0,(a.cool||0)-.7));fx('light',t.x,t.y,'#fff0a2',{size:165});break;
      case 'voltwing': field.slice(0,10).forEach(e=>{extra(e,d*.66);stun(e,.3)});fx('zap',target.x,target.y,'#ffe765',{size:160});break;
      case 'scorchick': field.slice(0,8).forEach(e=>{extra(e,d*.45);burn(e,4,d*.24)});t.cool=0;fx('burst',t.x,t.y,'#ff8a32',{size:145});break;
      case 'mosshell': field.slice(0,9).forEach(e=>{extra(e,d*.54);stun(e,.65);root(e,.85)});fx('dust',t.x,t.y,'#78b85b',{size:165});break;
      case 'drizzlet': field.slice(0,9).forEach(e=>{extra(e,d*.5);slow(e,4,.32)});fx('splash',t.x,t.y,'#6bcce8',{size:160});break;
      case 'zapmoth': field.slice(0,10).forEach((e,i)=>{extra(e,d*(.48-i*.018));stun(e,.22+(i%3===0?.14:0))});fx('zap',t.x,t.y,'#ffe55f',{size:158});break;
      case 'cindrake': cluster.slice(0,10).forEach(e=>{extra(e,d*1.25);burn(e,5,d*.28)});fx('burst',target.x,target.y,'#ff6b35',{size:175});break;
      case 'sporeling': cluster.slice(0,10).forEach(e=>{poison(e,7,d*.34);root(e,.45);extra(e,d*.3)});fx('poison',target.x,target.y,'#c85de2',{size:170});break;
      case 'drakeling': field.slice(0,11).forEach(e=>extra(e,d*.78));fx('wind',t.x,t.y,'#8de6d7',{size:175});break;
      case 'voidling': cluster.slice(0,9).forEach(e=>{extra(e,d*1.05);slow(e,3.2,.38);root(e,.35)});fx('apex',target.x,target.y,'#a675e8',{size:175});break;
    }
    announce(id,meta);
  }
  const baseHitProjectile=hitProjectile;
  hitProjectile=function(p){const t=p?.target;baseHitProjectile(p);if(t&&p){try{applyPassive(p,t)}catch(err){console.warn('Beastward passive failed',p.beastId,err)}}};
  const baseAttack=attack;
  attack=function(t,dt){
    const id=t?.b?.id,key=t?.b?.instanceUid||t?.instanceUid||id,stage=id?evolutionStage(key):1;
    if(stage>=4&&IDENTITIES[id]){if(t._capstoneRemaining===undefined)t._capstoneRemaining=Math.min(3.2,IDENTITIES[id].cd*.24)+Math.random()*1.4;else t._capstoneRemaining=Math.max(0,t._capstoneRemaining-dt)}
    const before=projectiles.length;baseAttack(t,dt);
    if(projectiles.length>before){const p=projectiles[projectiles.length-1];p.beastStage=stage;p.instanceUid=key;if(stage>=4&&IDENTITIES[id]&&t._capstoneRemaining<=0&&p.target){try{useUltimate(id,t,p.target);t._capstoneRemaining=IDENTITIES[id].cd}catch(err){console.warn('Beastward capstone failed',id,err)}}}
  };
  const baseBestiaryDescription=bestiaryStageDescription;
  bestiaryStageDescription=function(id,stage){const base=baseBestiaryDescription(id,stage),m=IDENTITIES[id];if(!m)return base;return stage>=4?`${base} Ultimate — ${m.ultimate}: ${m.ultimateText}`:`${base} Signature — ${m.passive}: ${m.passiveText}`};
  const baseOpenDenBeast=openDenBeast;
  openDenBeast=function(key){baseOpenDenBeast(key);try{const p=progress(key),id=p?.species||key,m=IDENTITIES[id],body=document.querySelector('#denBeastModalBody');if(!m||!body)return;const stage=evolutionStage(key),card=document.createElement('section');card.className='combat-identity-card';card.innerHTML=`<span>COMBAT IDENTITY</span><h3>${m.passive}</h3><p>${m.passiveText}</p>${stage>=4?`<div class="combat-ultimate"><b>LEVEL 100 ULTIMATE • ${m.ultimate}</b><small>${m.ultimateText} • ~${m.cd}s cooldown</small></div>`:''}`;body.appendChild(card)}catch(err){console.warn('Combat identity card failed',err)}};
  const style=document.createElement('style');style.textContent=`.combat-identity-card{margin-top:14px;padding:14px 15px;border:1px solid #d6bd654d;border-radius:16px;background:linear-gradient(180deg,#17261d,#111b16);box-shadow:inset 0 0 18px #e6c55d0a}.combat-identity-card>span{font-size:9px;font-weight:900;letter-spacing:.14em;color:#bba95f}.combat-identity-card h3{margin:5px 0 4px;color:#f0d77d;font:700 22px Georgia,serif}.combat-identity-card p{margin:0;color:#d4ded7;font-size:12px;line-height:1.45}.combat-ultimate{margin-top:11px;padding:10px 11px;border-radius:12px;background:#2a2413;border:1px solid #d6bd6540}.combat-ultimate b,.combat-ultimate small{display:block}.combat-ultimate b{font-size:10px;color:#ffe690;letter-spacing:.06em}.combat-ultimate small{margin-top:4px;color:#d8c98d;font-size:10px;line-height:1.35}`;document.head.appendChild(style);
  document.documentElement.dataset.combatIdentities=V;
})();
