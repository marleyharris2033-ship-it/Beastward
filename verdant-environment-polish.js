// Beastward Verdant Valley environment polish v1
// Richer layered terrain + deterministic decorative details while preserving paths and gameplay collision.
(()=>{
  if(typeof drawGround!=='function'||typeof levelWorld!=='function')return;
  const baseGround=drawGround;
  const hash=(a,b,c=0)=>{let n=(a*374761393+b*668265263+c*1442695041)>>>0;n=(n^(n>>13))*1274126177>>>0;return ((n^(n>>16))>>>0)/4294967295};
  function blob(x,y,r,col,a=1){ctx.save();ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore()}
  function blade(x,y,s=1){ctx.strokeStyle='#a4c56c88';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x,y+3*s);ctx.quadraticCurveTo(x-2*s,y-4*s,x-4*s,y-7*s);ctx.moveTo(x,y+3*s);ctx.quadraticCurveTo(x+2*s,y-4*s,x+4*s,y-6*s);ctx.stroke()}
  function leaf(x,y,r=2){ctx.fillStyle='#89b85f99';ctx.beginPath();ctx.ellipse(x,y,r*1.7,r,.45,0,Math.PI*2);ctx.fill()}
  function stone(x,y,s=1){ctx.fillStyle='#59665799';ctx.beginPath();ctx.ellipse(x,y,7*s,4*s,-.25,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#a1ad8b55';ctx.lineWidth=1;ctx.stroke()}
  function roots(x,y,s=1){ctx.strokeStyle='#5b472d55';ctx.lineWidth=3*s;ctx.lineCap='round';for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+i*15*s,y+10*s,x+i*27*s,y+18*s);ctx.stroke()}}
  drawGround=function(level){
    if(levelWorld(level)!==1)return baseGround(level);
    const themes={
      meadow:['#527d43','#648d4c','#365f38'],forest:['#294b32','#38613a','#1d3d2b'],river:['#47764a','#5d8b52','#315e3c'],village:['#5f8050','#77905b','#465f43'],shrine:['#535f4b','#6c7457','#39483b'],wetlands:['#3f7054','#527d5d','#2f5947'],corrupted:['#393745','#4b4353','#29352f'],ruins:['#4c604b','#65705a','#35483b'],canyon:['#735d42','#876e49','#4b5138'],den:['#24272a','#30352e','#18231d']
    };
    const p=themes[level.theme]||themes.meadow;
    const g=ctx.createLinearGradient(0,0,canvas.width,canvas.height);g.addColorStop(0,p[1]);g.addColorStop(.48,p[0]);g.addColorStop(1,p[2]);ctx.fillStyle=g;ctx.fillRect(0,0,canvas.width,canvas.height);
    // Broad organic patches replace the old obvious square tile pattern.
    for(let i=0;i<34;i++){const x=hash(i,level.id)*canvas.width,y=hash(i+77,level.id)*canvas.height,r=35+hash(i+21,level.id)*80;blob(x,y,r,i%3===0?p[2]:p[1],.09+.05*hash(i+8,level.id));}
    // Fine ground texture: grass, leaves, pebbles and occasional roots. Deterministic per level.
    for(let i=0;i<115;i++){const x=12+hash(i,level.id,4)*(canvas.width-24),y=12+hash(i,level.id,9)*(canvas.height-24),v=hash(i,level.id,15);ctx.save();ctx.globalAlpha=.45;if(v<.53)blade(x,y,.65+hash(i,level.id,18)*.75);else if(v<.82)leaf(x,y,1.3+hash(i,level.id,20)*1.4);else stone(x,y,.45+hash(i,level.id,22)*.45);ctx.restore()}
    // A few larger environmental marks make each stage feel composed rather than tiled.
    for(let i=0;i<5;i++){const x=70+hash(i,level.id,31)*(canvas.width-140),y=75+hash(i,level.id,37)*(canvas.height-150);roots(x,y,.55+hash(i,level.id,41)*.35)}
    if(['shrine','ruins'].includes(level.theme)){ctx.save();ctx.strokeStyle='#b7c49a22';ctx.lineWidth=2;for(let i=0;i<8;i++){const x=hash(i,level.id,52)*canvas.width,y=hash(i,level.id,54)*canvas.height;ctx.strokeRect(x,y,18+hash(i,level.id,56)*28,10+hash(i,level.id,58)*20)}ctx.restore()}
    if(level.theme==='wetlands'){ctx.save();ctx.fillStyle='#75a78918';for(let i=0;i<12;i++){const x=hash(i,level.id,62)*canvas.width,y=hash(i,level.id,64)*canvas.height;ctx.beginPath();ctx.ellipse(x,y,25+hash(i,level.id,66)*42,8+hash(i,level.id,68)*15,hash(i,level.id,70),0,Math.PI*2);ctx.fill()}ctx.restore()}
    if(level.theme==='corrupted'||level.theme==='den'){ctx.save();ctx.fillStyle='#a65ed510';for(let i=0;i<9;i++)blob(hash(i,level.id,71)*canvas.width,hash(i,level.id,73)*canvas.height,18+hash(i,level.id,75)*42,'#9a5bc4',.08);ctx.restore()}
    // Subtle edge vignette adds depth without obscuring towers/enemies.
    const vg=ctx.createRadialGradient(canvas.width/2,canvas.height/2,150,canvas.width/2,canvas.height/2,610);vg.addColorStop(.55,'#00000000');vg.addColorStop(1,'#07150d35');ctx.fillStyle=vg;ctx.fillRect(0,0,canvas.width,canvas.height);
  };
  document.documentElement.dataset.verdantEnvironment='polished-v1';
})();