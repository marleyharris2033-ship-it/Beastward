// Beastward simple native sprite set - crisp, lightweight and generated directly in-game
(() => {
  const V='20260910-simple-1';
  const cfg={
    sprigpaw:['fox','#6f4a2f','#82b83f','#f2dfb8'],bubblit:['blob','#398fd0','#79d7ef','#e8fbff'],sparkit:['cat','#d7a51f','#ffe45d','#fff4c2'],pebblum:['golem','#6d6257','#aa9b82','#d4c6a9'],gustwing:['bird','#5fa88d','#b7ead0','#eefcf5'],toxip:['lizard','#69427f','#b45bc8','#d7e77b'],frostkit:['fox','#6ab7d4','#bcefff','#f5fdff'],shadepup:['wolf','#302b49','#715f9c','#c7b8e9'],lumpling:['deer','#d6b348','#fff0a2','#fffbea'],voltwing:['bird','#534487','#ffe35a','#fff6b5'],scorchick:['bird','#c64b24','#ff9b38','#ffe09b'],mosshell:['turtle','#52663b','#7ea854','#c0cf78'],drizzlet:['otter','#388cae','#70d2e8','#d9f8ff'],zapmoth:['moth','#46366f','#ffd84d','#fff3b0'],cindrake:['dragon','#7d3024','#ef6534','#ffc45d'],sporeling:['mushroom','#6b3c79','#c467d6','#e5d29a'],drakeling:['dragon','#397d78','#81d8ca','#d8fff5'],voidling:['imp','#241d38','#8a56bf','#d0a4ff']
  };
  const esc=s=>encodeURIComponent(s).replace(/'/g,'%27').replace(/"/g,'%22');
  function sprite(id,stage){
    if(id==='embercub')return null;
    const c=cfg[id]||['fox','#555','#999','#eee'],[kind,dark,main,light]=c,s=Math.max(1,Math.min(4,stage));
    const big=3+s, bodyW=16+s*3, bodyH=10+s*2, x=24-s*2, y=34-s;
    let parts=`<ellipse cx='32' cy='52' rx='${13+s*2}' ry='3' fill='#000' opacity='.22'/><rect x='${x}' y='${y}' width='${bodyW}' height='${bodyH}' rx='2' fill='${main}' stroke='${dark}' stroke-width='3'/>`;
    if(kind==='blob')parts=`<ellipse cx='32' cy='39' rx='${11+s*3}' ry='${9+s*2}' fill='${main}' stroke='${dark}' stroke-width='3'/><rect x='22' y='45' width='6' height='5' fill='${dark}'/><rect x='37' y='45' width='6' height='5' fill='${dark}'/>`;
    else if(kind==='bird'||kind==='moth')parts+=`<polygon points='${x+4},${y+5} ${10-s*2},${19-s*2} ${17+s},${y+12}' fill='${light}' stroke='${dark}' stroke-width='3'/><polygon points='${x+bodyW-3},${y+5} ${54+s*2},${19-s*2} ${47-s},${y+12}' fill='${main}' stroke='${dark}' stroke-width='3'/>`;
    else if(kind==='golem')parts=`<rect x='${19-s}' y='${28-s}' width='${26+s*2}' height='${20+s*2}' rx='4' fill='${main}' stroke='${dark}' stroke-width='4'/><rect x='${12-s}' y='34' width='9' height='13' fill='${dark}'/><rect x='43' y='34' width='${9+s}' height='13' fill='${dark}'/>`;
    else if(kind==='turtle')parts=`<ellipse cx='31' cy='39' rx='${14+s*2}' ry='${10+s}' fill='${main}' stroke='${dark}' stroke-width='3'/><path d='M20 39h22M25 30l-3 17M37 30l4 17' stroke='${light}' stroke-width='2'/><rect x='45' y='36' width='9' height='7' fill='${light}' stroke='${dark}' stroke-width='2'/>`;
    else if(kind==='mushroom')parts=`<rect x='28' y='35' width='9' height='15' fill='${light}' stroke='${dark}' stroke-width='3'/><path d='M${16-s} 35 Q32 ${13-s*2} ${48+s} 35Z' fill='${main}' stroke='${dark}' stroke-width='3'/><rect x='23' y='27' width='4' height='4' fill='${light}'/><rect x='37' y='23' width='5' height='5' fill='${light}'/>`;
    else {
      parts+=`<circle cx='${x+bodyW-1}' cy='${y-2}' r='${7+s}' fill='${main}' stroke='${dark}' stroke-width='3'/><polygon points='${x+bodyW-7},${y-8} ${x+bodyW-5},${y-17-s} ${x+bodyW},${y-9}' fill='${main}' stroke='${dark}' stroke-width='2'/><polygon points='${x+bodyW+2},${y-9} ${x+bodyW+7},${y-17-s} ${x+bodyW+8},${y-6}' fill='${main}' stroke='${dark}' stroke-width='2'/><path d='M${x+2} ${y+5} Q${7-s*2} ${y-3} ${10-s} ${y-15-s*2}' fill='none' stroke='${main}' stroke-width='${5+s}' stroke-linecap='square'/><rect x='${x+4}' y='${y+bodyH-1}' width='5' height='${7+s}' fill='${dark}'/><rect x='${x+bodyW-9}' y='${y+bodyH-1}' width='5' height='${7+s}' fill='${dark}'/>`;
    }
    if(kind==='dragon')parts+=`<polygon points='25,34 ${14-s*2},${18-s} 30,29' fill='${main}' stroke='${dark}' stroke-width='3'/>`;
    if(kind==='deer'&&s>=3)parts+=`<path d='M42 27l-5-10m6 9l6-11m-11 5l-5-5m15 4l5-5' stroke='${dark}' stroke-width='3' fill='none'/>`;
    if(kind==='imp')parts+=`<polygon points='23,31 17,18 29,27M41,31 47,18 35,27' fill='${main}' stroke='${dark}' stroke-width='3'/>`;
    // face + stage accents
    parts+=`<rect x='40' y='31' width='3' height='3' fill='#151515'/><rect x='41' y='31' width='1' height='1' fill='white'/>`;
    if(s>=2)parts+=`<rect x='${19-s}' y='${30-s}' width='4' height='4' fill='${light}'/>`;
    if(s>=3)parts+=`<polygon points='31,${24-s} 35,${15-s} 39,${25-s}' fill='${light}' stroke='${dark}' stroke-width='2'/>`;
    if(s>=4)parts+=`<polygon points='19,29 13,22 21,24M45,27 52,20 49,30' fill='${light}' stroke='${dark}' stroke-width='2'/><rect x='29' y='${12-s}' width='5' height='5' fill='${light}'/>`;
    const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' shape-rendering='crispEdges'>${parts}</svg>`;
    return `data:image/svg+xml,${esc(svg)}`;
  }
  const oldPath=spritePathForStage;
  spritePathForStage=function(id,stage=1){const made=sprite(id,stage);return made||oldPath(id,stage);};
  currentSprite=function(id){return spritePathForStage(id,evolutionStage(id));};
  Object.keys(cfg).forEach(id=>{if(!beasts[id])return;beasts[id].sprite=spritePathForStage(id,1);beasts[id].towerSprite=beasts[id].sprite;evolutionSpriteImgs[id]=evolutionSpriteImgs[id]||{};[1,2,3,4].forEach(st=>{const im=new Image();im.src=spritePathForStage(id,st);if(st===1)spriteImgs[id]=im;else evolutionSpriteImgs[id][st]=im;});});
  const oldMarkup=stageSpriteMarkup;
  stageSpriteMarkup=function(id,stage=evolutionStage(id),extra='',unseen=false){if(id==='embercub')return oldMarkup(id,stage,extra,unseen);const b=beasts[id],s=Math.max(1,Math.min(4,stage)),name=nameForStage(id,s),src=spritePathForStage(id,s);return `<span class="stage-sprite stage-${s} type-${b.type.toLowerCase()} ${unseen?'unseen-sprite':''} ${extra}" aria-label="${unseen?'Undiscovered beast':name}"><img class="stage-form" src="${src}" alt="${unseen?'Undiscovered beast':name}" style="display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;image-rendering:pixelated!important;${unseen?'filter:brightness(0) saturate(0) contrast(1.2)!important;':''}"></span>`;};
  const css=document.createElement('style');css.textContent='.stage-form{image-rendering:pixelated!important}.tower img,.placed-tower img{image-rendering:pixelated!important}';document.head.appendChild(css);
  try{renderStarters();renderCollection();}catch(e){}
})();