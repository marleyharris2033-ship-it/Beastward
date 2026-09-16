// Authored regional art, route-aware scenery and cached rendering for levels 11–100.
(()=>{
'use strict';
const data=window.BeastwardWorldArtData;if(!data||typeof levels==='undefined')return;
const TAU=Math.PI*2,cache=new Map(),maps=new Map();
const base={ground:drawGround,under:drawUnderScenery,path:drawPath,scenery:drawScenery,blocked:blockedByScenery,label:drawStageLabel};
const randomFor=n=>()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296};
const length=p=>p.slice(1).reduce((sum,b,i)=>sum+Math.hypot(b.x-p[i].x,b.y-p[i].y),0);
function distance(path,x,y){let best=1e9;for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],vx=b.x-a.x,vy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*vx+(y-a.y)*vy)/(vx*vx+vy*vy)));best=Math.min(best,Math.hypot(x-a.x-t*vx,y-a.y-t*vy))}return best}
function circle(c,x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill()}
function line(c,p,col,w){c.lineCap='round';c.lineJoin='round';c.strokeStyle=col;c.lineWidth=w;c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
function polygon(c,p,col){c.fillStyle=col;c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill()}
function ring(c,x,y,rx,ry,col,w=2){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.stroke()}
function rect(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h)}
function waterAt(m,x,y,pad=0){const q=m.channel;return q&&(q.axis==='v'?Math.abs(x-q.at)<q.width/2+pad:Math.abs(y-q.at)<q.width/2+pad)}
function islandAt(m,x,y,pad=0){return !m.islands||distance(m.path,x,y)<103-pad||m.land.some(p=>Math.hypot(x-p.x,y-p.y)<p.r-8-pad)}
function poolAt(m,x,y,pad=0){return m.pools.some(p=>((x-p.x)/(p.rx+pad))**2+((y-p.y)/(p.ry+pad))**2<1)}
function occupied(m,x,y,pad=0){return m.objects.some(p=>((x-p.x)/(p.rx+pad))**2+((y-p.y)/(p.ry+pad))**2<1)}
function slot(m,radius,preferred,random){let best=null;for(let i=0;i<330;i++){const x=85+random()*775,y=115+random()*390;const d=distance(m.path,x,y);if((x-radius<375&&y-radius<82)||d<radius+43||waterAt(m,x,y,radius)||poolAt(m,x,y,radius)||occupied(m,x,y,radius+10))continue;const score=d-Math.hypot(x-preferred[0],y-preferred[1])*.18;if(!best||score>best.score)best={x,y,score}}return best}
function makeChannel(m){
 const riverKinds=['river','water','lava','rift'];if(!riverKinds.includes(m.feature))return;
 let best;for(const axis of ['v','h'])for(const at of axis==='v'?Array.from({length:25},(_,i)=>190+i*25):Array.from({length:13},(_,i)=>150+i*25)){const crossings=[];let invalid=false;for(let i=1;i<m.path.length;i++){const a=m.path[i-1],b=m.path[i],aa=axis==='v'?a.x:a.y,bb=axis==='v'?b.x:b.y;if((aa<=at&&bb>at)||(bb<=at&&aa>at)){const t=(at-aa)/(bb-aa),cos=Math.abs(bb-aa)/Math.hypot(b.x-a.x,b.y-a.y);if(cos<.6||Math.min(t,1-t)*Math.hypot(b.x-a.x,b.y-a.y)<(84/cos+26)/2+8){invalid=true;break}crossings.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,angle:Math.atan2(b.y-a.y,b.x-a.x),span:84/cos+26})}else if(Math.min(Math.abs(aa-at),Math.abs(bb-at))<54){invalid=true;break}}
 if(invalid||!crossings.length||crossings.length>3||crossings.some((a,i)=>crossings.slice(i+1).some(b=>Math.hypot(a.x-b.x,a.y-b.y)<(a.span+b.span)/2+12)))continue;const score=crossings.length+Math.abs(at-(axis==='v'?500:300))/200;if(!best||score<best.score)best={axis,at,width:84,crossings,score}}
 if(best)m.channel=best;
}
const usedByRegion={};
for(const level of levels){const w=levelWorld(level);let region=data.regions[w];if(!region)continue;if(level.id===93)region={...region,col:['#b4cfcc','#7fa5b0','#506d83'],road:['#75949c','#dbe5df'],accent:'#ffc393'};const index=(level.id-1)%10,spec=region.stages[index],random=randomFor(level.id*7123);const oldLength=length(level.path);const used=usedByRegion[w]||(usedByRegion[w]=new Set());
 let chosen=level.path.map(p=>({...p}));if(!level.boss){const candidates=data.routes.slice(0,-1).map((r,i)=>({i,path:r.map(([x,y])=>({x,y})),score:Math.abs(length(r.map(([x,y])=>({x,y})))/oldLength-1)})).filter(c=>!used.has(c.i)&&c.score<.17).sort((a,b)=>a.score-b.score);if(candidates.length){const c=candidates[(w+index*3)%Math.min(5,candidates.length)];chosen=c.path;used.add(c.i)}}
 // Region-specific warping removes identical routes without changing campaign pacing sharply.
 chosen=chosen.map((p,i)=>({x:i===0?-30:i===chosen.length-1?930:Math.max(100,Math.min(870,p.x+Math.sin(i*1.9+w)*17)),y:Math.max(90,Math.min(515,(w%2?600-p.y:p.y)+Math.sin(i*1.3+w*2)*13))}));
 if(Math.abs(length(chosen)/oldLength-1)>.2)chosen=level.path.map((p,i)=>({x:p.x,y:Math.max(80,Math.min(525,(w%2?600-p.y:p.y)+Math.sin(i+w)*8))}));
 const m={id:level.id,w,index,region,level,path:chosen,feature:spec[2],kind:spec[0],caption:spec[1],objects:[],pools:[],land:[],islands:w===6||w===9,originalLength:oldLength};
 m.land=chosen.filter((_,i)=>i%2).map(p=>({x:p.x,y:p.y,r:140}));makeChannel(m);
 let loc,scale=1;for(const s of [1,.85,.7,.55]){loc=slot(m,95*s,[500,300],random);if(loc){scale=s;break}}
 if(!loc){loc={x:960,y:530};scale=.45}
 m.landmark={x:loc.x,y:loc.y,rx:90*scale,ry:100*scale,scale,kind:m.kind,variant:index,hero:true};m.objects.push(m.landmark);m.land.push({x:loc.x,y:loc.y,r:130});
 if(m.w===5&&['boat','dock'].includes(m.kind))m.pools.push({x:loc.x,y:loc.y+10,rx:95*scale,ry:50*scale});
 if(['pool','oasis','poison','crater','salt'].includes(m.feature)){for(let j=0;j<2;j++){const s=slot(m,42,[j?735:235,j?440:195],random);if(s)m.pools.push({...s,rx:45+random()*9,ry:28+random()*10})}}
 const extras=m.feature==='settlement'?['hut','hut','hut','cart']:m.feature==='court'||m.feature==='ruins'?['pillar','pillar','wall','statue']:m.feature==='graves'?['grave','grave','grave','grave']:m.feature==='rails'?['cart','winch','crate','crate']:m.feature==='fungi'?['mushroom','mushroom','mushroom']:m.feature==='garden'?['fountain','bush','bush']:m.feature==='arena'?['pillar','pillar','crystal','crystal']:['rock','lantern','flora'];
 extras.forEach((kind,i)=>{const s=slot(m,47,[140+i*220,i%2?450:140],random);if(s){m.objects.push({...s,rx:49,ry:53,scale:.55,kind,variant:i});if(m.islands)m.land.push({x:s.x,y:s.y,r:82})}});
 for(let i=0;i<120;i++){const x=25+random()*950,y=65+random()*500;if(x>80&&x<920&&y>105&&y<530&&i%5)continue;if(distance(m.path,x,y)<80||waterAt(m,x,y,25)||poolAt(m,x,y,25)||occupied(m,x,y,45)||!islandAt(m,x,y))continue;if(x>845&&Math.abs(y-chosen.at(-1).y)<95)continue;const size=.48+random()*.18;m.objects.push({x,y,kind:i%4?'flora':'rock',rx:34,ry:41,scale:size,variant:i})}
 level.path=chosen;level.pathWidth=62;level.scenery=[];level.environmentCaption=m.caption;maps.set(level.id,m);
}
if(maps.has(currentLevel.id))path=currentLevel.path;
function crystal(c,x,y,s,p){c.save();c.translate(x,y);c.scale(s,s);circle(c,0,15,33,12,p.accent+'28');for(const [dx,h]of[[-20,27],[0,54],[21,34]]){polygon(c,[[dx-10,17],[dx-7,-h],[dx,-h-12],[dx+12,12],[dx,25]],p.stone[0]);polygon(c,[[dx,-h-12],[dx+12,12],[dx,25]],p.accent);line(c,[[dx-2,-h],[dx-4,11]],'#ffffff88',2)}c.restore()}
function rock(c,x,y,s,p){c.save();c.translate(x,y);c.scale(s,s);circle(c,5,22,42,14,'#14273355');polygon(c,[[-39,14],[-30,-21],[-4,-35],[30,-19],[42,18],[8,30]],p.stone[0]);polygon(c,[[-30,-21],[-4,-35],[30,-19],[5,0]],p.stone[1]);polygon(c,[[5,0],[30,-19],[42,18],[8,30]],p.col[1]);line(c,[[-28,15],[-8,21],[6,18]],p.stone[1],3);c.restore()}
function tree(c,x,y,s,p,variant=0){c.save();c.translate(x,y);c.scale(s,s);const style=p.flora;circle(c,7,30,48,14,'#11283455');line(c,[[0,27],[0,-28]],style==='silverpine'?'#acaabb':'#6d6251',12);
 if(['crystal','basalt','skyrock','floatstone'].includes(style)){c.restore();if(style==='crystal')crystal(c,x,y,s,p);else rock(c,x,y,s,p);return}
 if(style==='palm'){line(c,[[0,28],[5,-13],[0,-43]],'#a18450',10);for(let i=0;i<7;i++){const a=i*TAU/7;line(c,[[0,-42],[Math.cos(a)*24,-45+Math.sin(a)*12],[Math.cos(a)*47,-24+Math.sin(a)*13]],'#607f54',8)}circle(c,-7,-34,5,5,'#80643f');c.restore();return}
 if(style==='pine'||style==='silverpine'){for(let i=0;i<3;i++){const y=-60+i*26,w=36+i*8;polygon(c,[[0,y],[-w,y+48],[w,y+48]],style==='pine'?'#607f8d':'#555877');polygon(c,[[0,y],[-w*.82,y+32],[3,y+25],[w*.65,y+34]],style==='pine'?'#e5f0ea':'#b4b1c9')}c.restore();return}
 for(const [a,b,r]of[[-30,-12,28],[26,-17,32],[0,-43,36],[0,-10,34]]){circle(c,a,b+7,r,r*.76,'#254d4f');circle(c,a-4,b,r*.87,r*.63,style==='willow'?'#689578':'#69a28a');circle(c,a-9,b-7,r*.5,r*.3,style==='willow'?'#93b28c':'#a2b99a')}
 if(style==='willow')for(let i=-3;i<=3;i++)line(c,[[i*13,-37],[i*16,-2],[i*14-5,32]],'#a0bc83',4);
 if(style==='worldtree')for(let i=0;i<5;i++)circle(c,-34+i*17,-35+Math.sin(i)*12,3,3,['#ffc58d','#b4e7f0','#e7c5fa'][i%3]);c.restore()}
function plinth(c,p){circle(c,0,33,73,27,'#11263855');circle(c,0,22,65,28,p.stone[0]);circle(c,0,14,65,25,p.stone[1]);circle(c,0,10,52,19,p.col[1]);ring(c,0,10,47,16,p.accent+'99',2)}
function pillar(c,x,y,p,s=1){c.save();c.translate(x,y);c.scale(s,s);rect(c,-13,-45,26,78,p.stone[0]);rect(c,-20,-50,40,11,p.stone[1]);rect(c,-20,27,40,10,p.stone[1]);line(c,[[-5,-35],[-5,19]],p.stone[1],4);c.restore()}
function arch(c,p){pillar(c,-52,0,p);pillar(c,52,0,p);line(c,[[-53,-44],[-32,-72],[0,-83],[32,-72],[53,-44]],p.stone[0],23);line(c,[[-52,-48],[-30,-70],[0,-78],[30,-70],[52,-48]],p.stone[1],7)}
function fire(c,x,y,s,p){c.save();c.translate(x,y);c.scale(s,s);circle(c,0,2,22,12,p.accent+'30');polygon(c,[[-17,7],[-13,-10],[-4,-28],[1,-12],[12,-34],[18,-4],[12,13],[-9,15]],p.accent);polygon(c,[[-7,7],[0,-12],[8,5],[4,13]],'#fff0b6');c.restore()}
function hut(c,p,variant=0){rect(c,-43,-12,86,57,p.stone[0]);rect(c,-35,-7,70,48,p.stone[1]);line(c,[[-35,-5],[-35,41],[35,41],[35,-5]],'#4c5354',6);polygon(c,[[-57,-12],[0,-57],[57,-12],[0,0]],p.material==='ice'?'#eff4ee':p.col[1]);line(c,[[-53,-12],[0,-52],[53,-12]],p.accent,4);rect(c,-10,11,20,31,'#34494e');rect(c,20,7,10,13,p.accent);if(variant%2){rect(c,-32,-47,11,23,p.stone[0]);rect(c,-34,-51,15,6,p.stone[1])}}
function object(c,o,m){const p=m.region,k=o.kind;c.save();c.translate(o.x,o.y);c.scale(o.scale,o.scale);circle(c,7,30,60,15,'#13253340');
 switch(k){
 case 'flora':case 'bush':tree(c,0,0,k==='bush'?.65:1,m.w===10?{...p,flora:['worldtree','pine','crystal','worldtree'][o.variant%4]}:p,o.variant);break;
 case 'rock':rock(c,0,0,1,p);break;
 case 'crystal':case 'cluster':crystal(c,0,0,k==='cluster'?1.25:1,p);if(k==='cluster'){crystal(c,-48,19,.6,{...p,accent:'#eab9ff'});crystal(c,45,22,.65,{...p,accent:'#ffdea4'})}break;
 case 'pillar':pillar(c,0,0,p);break;
 case 'hut':hut(c,p,o.variant);break;
 case 'outpost':hut(c,p,o.variant);pillar(c,-73,6,p,.7);line(c,[[65,36],[65,-56]],p.stone[1],5);polygon(c,[[67,-55],[90,-47],[67,-34]],p.accent);break;
 case 'cart':case 'caravan':{if(k==='caravan'){hut(c,{...p,col:['', '#b48759']});circle(c,-28,44,13,13,'#5f5145');circle(c,28,44,13,13,'#5f5145');line(c,[[43,27],[85,45]],p.stone[0],5)}else{rect(c,-33,-20,66,46,'#92785b');for(let i=0;i<5;i++)line(c,[[-30,-14+i*8],[30,-14+i*8]],p.stone[1],2);circle(c,-25,30,10,10,'#2c4049');circle(c,25,30,10,10,'#2c4049');crystal(c,0,-7,.45,p)}break;}
 case 'crate':rect(c,-24,-22,48,48,p.stone[0]);line(c,[[-22,-20],[22,24],[-22,24],[22,-20],[-22,-20]],p.stone[1],4);break;
 case 'elder':tree(c,0,-6,1.4,p);line(c,[[-61,49],[-20,28],[0,38],[46,53]],p.stone[0],9);circle(c,0,19,16,26,'#213942');ring(c,0,16,12,20,p.accent,3);break;
 case 'rootheart':plinth(c,p);for(let i=-2;i<=2;i++)line(c,[[i*30,35],[i*15,-2],[i*19,-44],[i*26,-67]],p.stone[0],12);circle(c,0,-10,20,31,p.accent);line(c,[[-5,-28],[6,-7],[-5,12]],'#eff4c7',3);break;
 case 'arch':case 'bridgegate':case 'moongate':arch(c,p);if(k==='moongate'){ring(c,0,-24,29,29,p.accent,5);circle(c,11,-33,23,23,p.col[1])}if(k==='bridgegate'){line(c,[[-50,-45],[0,-34],[50,-45]],p.accent,3);polygon(c,[[-15,-68],[15,-68],[13,-41],[0,-31],[-13,-41]],p.col[0])}break;
 case 'beacon':case 'brazier':case 'lantern':plinth(c,p);pillar(c,0,-2,p,.75);circle(c,0,-35,28,10,p.stone[0]);fire(c,0,-52,1,p);break;
 case 'lanterns':for(let i=-1;i<=1;i++){line(c,[[i*48,37],[i*48,-42-i*9],[i*48+16,-42-i*9]],p.stone[1],5);rect(c,i*48+5,-34-i*9,20,27,p.stone[0]);rect(c,i*48+9,-31-i*9,12,20,p.accent);circle(c,i*48+15,-20-i*9,20,24,p.accent+'15')}break;
 case 'watchtower':plinth(c,p);rect(c,-31,-52,62,81,p.stone[0]);for(let i=0;i<4;i++)rect(c,-40+i*23,-69,15,23,p.stone[1]);rect(c,-9,-37,18,27,p.col[2]);line(c,[[0,0],[0,22]],p.accent,4);break;
 case 'keep':case 'vault':plinth(c,p);for(const x of [-48,48]){rect(c,x-23,-58,46,88,p.stone[0]);for(let j=0;j<3;j++)rect(c,x-25+j*18,-68,13,15,p.stone[1])}rect(c,-31,-31,62,58,p.stone[1]);circle(c,0,-4,18,22,p.col[2]);rect(c,-18,-3,36,31,p.col[2]);if(k==='vault'){ring(c,0,0,21,21,p.accent,4);line(c,[[0,-16],[0,18]],p.accent,3)}break;
 case 'temple':case 'archive':plinth(c,p);for(const x of [-48,0,48])pillar(c,x,-4,p,.7);polygon(c,[[-76,-38],[0,-85],[76,-38]],p.stone[0]);polygon(c,[[-64,-41],[0,-74],[64,-41]],p.stone[1]);circle(c,0,-52,10,8,p.accent);if(k==='archive')for(const x of [-40,13]){rect(c,x,-11,28,35,p.col[2]);for(let j=0;j<5;j++)rect(c,x+3+j*5,-7,3,25,j%2?p.accent:p.stone[1])}break;
 case 'statue':plinth(c,p);polygon(c,[[-30,12],[-24,-28],[-12,-43],[0,-30],[15,-44],[30,-24],[24,13]],p.stone[0]);polygon(c,[[-24,-28],[-34,-66],[-12,-43]],p.stone[1]);polygon(c,[[15,-44],[34,-65],[30,-24]],p.stone[1]);line(c,[[-17,-26],[-6,-23]],p.accent,4);line(c,[[7,-23],[19,-26]],p.accent,4);break;
 case 'maw':case 'sarcophagus':case 'crypt':plinth(c,p);polygon(c,[[-68,17],[-55,-40],[-19,-64],[38,-53],[67,-15],[67,22]],p.stone[0]);if(k==='maw'){circle(c,0,-2,46,27,p.col[2]);for(let i=-2;i<=2;i++){polygon(c,[[i*18-7,-26],[i*18+7,-26],[i*18,-4]],p.accent);polygon(c,[[i*18-7,20],[i*18+7,20],[i*18,5]],p.stone[1])}}else{polygon(c,[[-30,26],[-33,-24],[0,-44],[33,-24],[30,26]],p.stone[1]);line(c,[[0,-29],[0,19]],p.accent,5);line(c,[[-17,-9],[17,-9]],p.accent,5)}break;
 case 'geode':rock(c,0,0,1.5,p);circle(c,0,-4,42,33,p.col[2]);crystal(c,0,1,.8,p);ring(c,0,-4,45,35,p.stone[1],6);break;
 case 'obelisk':plinth(c,p);polygon(c,[[-21,20],[-17,-60],[0,-89],[19,-60],[25,20]],p.stone[0]);polygon(c,[[0,-89],[19,-60],[25,20],[0,26]],p.stone[1]);for(let i=0;i<3;i++)line(c,[[-7,-47+i*19],[6,-41+i*19],[-3,-34+i*19]],p.accent,3);break;
 case 'windmill':case 'conductor':pillar(c,0,0,p);if(k==='windmill'){circle(c,0,-45,8,8,p.accent);for(let i=0;i<4;i++){c.save();c.translate(0,-45);c.rotate(i*TAU/4+.3);polygon(c,[[5,-4],[51,-16],[49,0],[7,5]],p.stone[1]);line(c,[[0,0],[52,-9]],p.stone[0],3);c.restore()}}else{ring(c,0,-54,33,14,p.stone[1],5);line(c,[[-25,-51],[0,-91],[25,-51]],p.accent,3);crystal(c,0,-40,.5,p)}break;
 case 'fountain':case 'sundial':plinth(c,p);circle(c,0,5,42,16,p.col[2]);if(k==='fountain'){pillar(c,0,-7,p,.45);line(c,[[0,-35],[-13,-20],[-18,4]],p.accent,3);line(c,[[0,-35],[15,-19],[20,4]],p.accent,3)}else polygon(c,[[-7,6],[0,-49],[17,6]],p.accent);break;
 case 'pyramid':plinth(c,p);polygon(c,[[-70,20],[0,-91],[72,20]],p.stone[0]);polygon(c,[[0,-91],[72,20],[0,30]],p.stone[1]);for(let i=0;i<4;i++)line(c,[[-49+i*10,6-i*20],[50-i*10,6-i*20]],p.col[1],2);circle(c,0,-58,10,10,p.accent);break;
 case 'aqueduct':for(const x of [-54,0,54])pillar(c,x,0,p,.7);line(c,[[-69,-44],[69,-44]],p.stone[1],13);line(c,[[-69,-52],[69,-52]],p.accent,3);break;
 case 'scorpion':plinth(c,p);circle(c,0,0,27,18,p.stone[0]);for(let i=-1;i<=1;i++){line(c,[[-17,i*11],[-40,i*19],[-51,i*22-5]],p.stone[1],5);line(c,[[17,i*11],[40,i*19],[51,i*22-5]],p.stone[1],5)}line(c,[[0,-10],[17,-34],[8,-62],[-11,-66],[-20,-49]],p.stone[1],10);polygon(c,[[-25,-47],[-14,-51],[-21,-35]],p.accent);break;
 case 'ribs':for(let i=-2;i<=2;i++){c.save();c.translate(i*25,i*i*3);line(c,[[-9,24],[-18,-4],[-10,-33],[0,-42],[11,-33],[18,-4],[10,24]],p.stone[1],7);c.restore()}line(c,[[-68,-39],[66,-39]],p.stone[0],6);break;
 case 'forge':case 'furnace':plinth(c,p);if(k==='forge'){polygon(c,[[-48,-15],[-21,-17],[-12,-3],[40,-3],[58,-20],[56,1],[24,18],[18,34],[-20,34],[-25,12],[-48,5]],p.stone[0]);line(c,[[-45,-14],[-20,-14],[-11,0],[39,0],[56,-17]],p.stone[1],4);fire(c,-40,17,.5,p)}else{rect(c,-39,-53,78,83,p.stone[0]);polygon(c,[[-49,-52],[0,-78],[49,-52]],p.stone[1]);rect(c,-26,-24,52,45,p.col[2]);fire(c,0,0,1,p);for(let i=-2;i<=2;i++)line(c,[[i*9,-20],[i*9,22]],p.stone[1],3)}break;
 case 'volcano':polygon(c,[[-84,35],[-37,-48],[-22,-35],[0,-48],[32,-45],[83,35]],p.stone[0]);polygon(c,[[0,-38],[32,-45],[83,35],[24,25]],p.stone[1]);circle(c,0,-39,34,12,p.accent);line(c,[[3,-33],[18,-11],[8,8],[37,32]],'#ef8c63',9);circle(c,0,-40,22,6,'#ffe3a3');break;
 case 'sluice':arch(c,p);for(let i=-2;i<=2;i++)line(c,[[i*15,-43],[i*15,26]],p.stone[1],7);circle(c,0,-57,18,18,p.stone[0]);ring(c,0,-57,14,14,p.accent,3);line(c,[[-13,-57],[13,-57]],p.accent,3);break;
 case 'dock':for(let y=-20;y<40;y+=10)rect(c,-65,y,130,8,p.stone[1]);for(const x of [-58,58])line(c,[[x,41],[x,-39]],p.stone[0],8);line(c,[[-57,-31],[57,-31]],p.accent,3);if(m.w===6)polygon(c,[[-31,-12],[0,-35],[31,-12],[0,19]],p.col[1]);break;
 case 'boat':polygon(c,[[-75,2],[-41,-24],[40,-24],[75,2],[41,30],[-40,30]],p.stone[0]);polygon(c,[[-56,2],[-33,-14],[33,-14],[56,2],[32,18],[-33,18]],p.stone[1]);line(c,[[0,17],[0,-68]],p.stone[0],5);polygon(c,[[4,-66],[47,-28],[4,-24]],p.accent);break;
 case 'totem':plinth(c,p);rect(c,-25,-66,50,94,p.stone[0]);for(let i=0;i<3;i++){line(c,[[-19,-53+i*27],[-8,-44+i*27],[0,-53+i*27],[10,-44+i*27],[19,-53+i*27]],p.accent,4)}polygon(c,[[-25,-65],[-41,-83],[0,-74],[41,-83],[25,-65]],p.stone[1]);break;
 case 'mushroom':for(const [x,y,s]of[[-38,18,.6],[35,21,.65],[0,-5,1]]){c.save();c.translate(x,y);c.scale(s,s);rect(c,-9,-7,18,56,p.stone[1]);circle(c,0,-11,46,24,p.stone[0]);circle(c,0,-17,43,20,p.col[0]);for(const [a,b]of[[-20,-20],[13,-26],[28,-11],[-5,-5]])circle(c,a,b,5,3,p.accent);c.restore()}break;
 case 'cauldron':plinth(c,p);circle(c,0,0,47,34,p.stone[0]);circle(c,0,-20,49,19,p.stone[1]);circle(c,0,-20,39,13,p.accent);for(let i=0;i<4;i++)circle(c,-24+i*15,-39-(i%2)*17,4+i%2,5,p.accent+'88');break;
 case 'nest':case 'roc':for(let i=0;i<8;i++){c.save();c.rotate(i*TAU/8);line(c,[[-40,29],[0,37],[43,25]],p.stone[i%2],8);c.restore()}circle(c,0,4,42,24,p.col[2]);for(const [x,y]of[[-21,1],[19,4],[0,-12]])circle(c,x,y,12,16,p.accent);if(k==='roc'){polygon(c,[[-9,-20],[-22,-51],[-74,-63],[-45,-32],[-21,-17]],p.stone[1]);polygon(c,[[9,-20],[22,-51],[74,-63],[45,-32],[21,-17]],p.stone[1])}break;
 case 'orrery':case 'stormeye':case 'eclipse':case 'blackhole':plinth(c,p);c.save();c.translate(0,-28);ring(c,0,0,56,23,p.stone[1],4);c.rotate(.8);ring(c,0,0,54,23,p.accent,3);c.rotate(-1.6);ring(c,0,0,54,23,p.stone[1],3);c.restore();circle(c,0,-28,22,22,k==='blackhole'?p.col[2]:p.accent);if(k==='eclipse')circle(c,10,-34,20,20,p.col[2]);if(k==='orrery')for(let i=0;i<3;i++)circle(c,-48+i*46,-38+(i%2)*28,7,7,i%2?p.stone[1]:p.accent);break;
 case 'chain':for(const x of [-47,47]){pillar(c,x,0,p);ring(c,x,-30,15,22,p.accent,5)}for(let i=-2;i<=2;i++)ring(c,i*19,-21+Math.abs(i)*-4,13,8,p.stone[1],4);break;
 case 'grave':case 'wall':if(k==='grave'){rect(c,-27,-23,54,55,p.stone[0]);circle(c,0,-23,27,17,p.stone[1]);line(c,[[0,-24],[0,13]],p.accent,3);line(c,[[-12,-11],[12,-11]],p.accent,3)}else for(let i=0;i<7;i++)rect(c,-65+i*19,-23-(i%3)*7,17,54+(i%3)*7,i%2?p.stone[0]:p.stone[1]);break;
 case 'gazebo':plinth(c,p);for(const x of [-45,45])pillar(c,x,0,p,.7);polygon(c,[[-67,-40],[0,-81],[67,-40]],p.stone[1]);ring(c,0,6,31,12,p.accent,3);break;
 case 'antlers':plinth(c,p);for(const sign of [-1,1]){line(c,[[sign*10,20],[sign*23,-10],[sign*38,-39],[sign*37,-74]],p.stone[1],10);line(c,[[sign*29,-22],[sign*64,-36],[sign*70,-60]],p.stone[1],7);line(c,[[sign*39,-44],[sign*58,-70]],p.stone[1],6)}circle(c,0,0,14,19,p.accent);break;
 case 'mine':arch(c,p);polygon(c,[[-37,28],[-37,-28],[0,-55],[37,-28],[37,28]],p.col[2]);for(const x of [-24,24])line(c,[[x,22],[x*1.7,52]],p.stone[1],4);crystal(c,44,24,.55,p);break;
 case 'winch':line(c,[[-48,36],[-30,-52],[30,-52],[48,36]],p.stone[0],10);line(c,[[-37,-53],[37,-53]],p.stone[1],8);ring(c,0,-41,15,15,p.accent,4);line(c,[[0,-25],[0,24]],p.stone[1],3);rect(c,-23,18,46,24,p.stone[0]);break;
 case 'prism':case 'worldheart':case 'convergence':plinth(c,p);crystal(c,0,-17,1.1,p);for(let i=0;i<4;i++){const a=i*TAU/4+.4,x=Math.cos(a)*58,y=12+Math.sin(a)*24;crystal(c,x,y,.35,{...p,accent:['#ffba86','#aff3fd','#c8b5ff','#cdf3a5'][i]})}if(k==='worldheart')ring(c,0,-23,48,46,p.accent,3);break;
 case 'portal':arch(c,p);circle(c,0,-18,36,52,p.col[2]);ring(c,0,-18,29,44,p.accent,4);ring(c,0,-18,20,34,p.stone[1],2);break;
 case 'throne':plinth(c,p);polygon(c,[[-31,23],[-40,-64],[-18,-50],[0,-89],[18,-50],[40,-64],[31,23]],p.stone[1]);rect(c,-26,-37,52,58,p.col[2]);rect(c,-39,8,78,13,p.stone[0]);for(const x of [-40,40])crystal(c,x,4,.4,p);circle(c,0,-45,8,11,p.accent);break;
 case 'crown':plinth(c,p);polygon(c,[[-58,-34],[-27,-10],[0,-61],[27,-10],[58,-34],[44,26],[-44,26]],p.stone[1]);line(c,[[-43,15],[43,15]],p.accent,5);for(const x of [-26,0,26])circle(c,x,3,6,8,['#ffc491','#c5f2c6','#c2d3ff'][(x+26)/26]);break;
 default:throw new Error('Unknown world landmark: '+k);
 }c.restore()}
function bridge(c,m,b){const p=m.region;c.save();c.translate(b.x,b.y);c.rotate(b.angle);const wood=['wood','sand'].includes(p.material),w=b.span,h=72;rect(c,-w/2+4,-h/2+7,w,h,'#17243566');rect(c,-w/2,-h/2,w,h,p.stone[0]);for(let x=-w/2+2;x<w/2;x+=13)rect(c,x,-h/2+5,11,h-10,wood?'#bea67c':p.stone[1]);for(const y of [-h/2,h/2]){line(c,[[-w/2,y],[w/2,y]],p.accent,3);for(let x=-w/2;x<=w/2;x+=30)rect(c,x-3,y-5,6,11,p.stone[0])}c.restore()}
function backdrop(c,m,random){const p=m.region,g=c.createLinearGradient(0,0,1000,600);p.col.forEach((v,i)=>g.addColorStop(i/2,v));c.fillStyle=g;c.fillRect(0,0,1000,600);
 if(m.islands){rect(c,0,0,1000,600,p.col[2]);for(let i=0;i<70;i++)circle(c,random()*1000,random()*600,random()*2+1,1,p.accent+'55');const pts=m.path.map(q=>[q.x,q.y]);line(c,pts,'#132438',240);for(const q of m.land)circle(c,q.x,q.y+12,q.r+5,q.r*.8,p.col[2]);line(c,pts,p.stone[0],224);line(c,pts,p.col[1],207);for(const q of m.land){circle(c,q.x,q.y,q.r,q.r,p.stone[0]);circle(c,q.x,q.y-7,q.r-8,q.r-8,p.col[1])}}
 for(let i=0;i<72;i++){const x=random()*1000,y=random()*600;if(!islandAt(m,x,y,m.islands?85:0))continue;c.globalAlpha=.06;circle(c,x,y,25+random()*60,10+random()*25,i%2?'#f6e7c8':'#162a3d')}c.globalAlpha=1;
 if(m.w===3)for(let j=0;j<9;j++){const y=80+j*65;line(c,[[0,y],[200,y-28],[460,y+12],[720,y-19],[1000,y+15]],'#f9d99b23',5)}
 if(m.w===2)for(let j=0;j<14;j++){const x=random()*1000,y=random()*600;if(distance(m.path,x,y)>70)circle(c,x,y,45+random()*40,9+random()*10,'#f1f5ea44')}
 if(m.w===10){for(let j=0;j<4;j++){const x=[130,820,140,820][j],y=[120,120,490,490][j],g=c.createRadialGradient(x,y,0,x,y,190);g.addColorStop(0,['#ffb17a25','#94e5ff25','#bc99f425','#a3de9725'][j]);g.addColorStop(1,'#ffffff00');c.fillStyle=g;c.fillRect(x-190,y-190,380,380)}}
 for(let i=0;i<1100;i++){const x=random()*1000,y=random()*600;if(!islandAt(m,x,y))continue;rect(c,x,y,1+random()*3,1,i%3?'#efedd026':'#12263625')}
 if(m.feature==='ridge'&&!m.islands)for(const y of [16,575])for(let x=15;x<1000;x+=64)if(distance(m.path,x,y)>80)rock(c,x,y,.75,p);
 if(m.channel){const q=m.channel,v=q.axis==='v',x=v?q.at-q.width/2:0,y=v?0:q.at-q.width/2,w=v?q.width:1000,h=v?600:q.width;rect(c,x-6,y-6,w+12,h+12,p.stone[0]);const colour=m.feature==='lava'?'#cf7258':m.feature==='rift'?'#172939':m.w===2?'#6ba5ba':'#3d7a82';rect(c,x,y,w,h,colour);for(let i=0;i<70;i++){const xx=x+random()*w,yy=y+random()*h;line(c,[[xx,yy],[xx+10+random()*15,yy]],m.feature==='lava'?'#ffe09b77':p.accent+'55',1.5)}}
 for(const q of m.pools){circle(c,q.x,q.y,q.rx+6,q.ry+6,p.stone[0]);circle(c,q.x,q.y,q.rx,q.ry,m.feature==='poison'?'#86a967':m.feature==='crater'?'#d18363':m.feature==='salt'?'#d7cba7':m.w===2||m.id===93?'#83b9cf':'#396d7d');ring(c,q.x,q.y,q.rx*.72,q.ry*.6,p.accent+'77',2)}
 // Floor details reinforce each location without adding hidden obstacles.
 if(['vents','reeds','roots','bones','shards','forest','garden'].includes(m.feature))for(let i=0;i<24;i++){
  const x=45+random()*910,y=90+random()*440;if(distance(m.path,x,y)<80||occupied(m,x,y,30)||waterAt(m,x,y,22)||!islandAt(m,x,y,32))continue;
  if(m.feature==='vents'){circle(c,x,y,17,7,p.col[2]);line(c,[[x-9,y],[x-1,y-3],[x+8,y+2]],p.accent+'bb',2)}
  else if(m.feature==='reeds')for(let j=-2;j<=2;j++)line(c,[[x+j*3,y+6],[x+j*4,y-12]],p.stone[1],2);
  else if(m.feature==='roots')line(c,[[x-19,y+7],[x-7,y-3],[x+8,y],[x+21,y-9]],p.stone[1]+'66',3);
  else if(m.feature==='bones'){line(c,[[x-8,y-4],[x+9,y+5]],p.stone[1],3);circle(c,x-9,y-5,3,3,p.accent)}
  else if(m.feature==='shards')polygon(c,[[x-5,y+4],[x,y-9],[x+5,y+3]],p.accent+'99');
  else if(m.feature==='garden'){ring(c,x,y,13,7,p.stone[1],2);for(let j=0;j<5;j++)circle(c,x+Math.cos(j*TAU/5)*9,y+Math.sin(j*TAU/5)*4,2,2,p.accent)}
  else{circle(c,x,y,17,9,p.col[2]+'44');for(let j=0;j<5;j++)rect(c,x-10+j*5,y+(j%2)*4,4,2,p.accent+'33')}
 }
 // A platform physically anchors each landmark and changes with the site type.
 const a=m.landmark;if(['court','arena','garden','ruins','graves'].includes(m.feature)){circle(c,a.x,a.y+8,a.rx+25,a.ry*.7+18,p.stone[0]);ring(c,a.x,a.y+8,a.rx+18,a.ry*.7+10,p.stone[1],3);for(let i=0;i<12;i++){const t=i*TAU/12;rect(c,a.x+Math.cos(t)*(a.rx+13)-3,a.y+8+Math.sin(t)*(a.ry*.7+7)-2,6,4,p.accent+'66')}}
 if(m.feature==='rails'){for(let i=1;i<m.path.length;i++){const a=m.path[i-1],b=m.path[i],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);for(let t=25;t<len;t+=40){const x=a.x+dx*t/len,y=a.y+dy*t/len;if(distance(m.path,x+dy/len*76,y-dx/len*76)>67&&!waterAt(m,x,y,30))line(c,[[x+dy/len*69,y-dx/len*69],[x+dy/len*83,y-dx/len*83]],p.stone[1],3)}}}
}
function paint(m){const surface=document.createElement('canvas');surface.width=1000;surface.height=600;const c=surface.getContext('2d'),p=m.region,random=randomFor(m.id*1117);backdrop(c,m,random);const points=m.path.map(q=>[q.x,q.y]);line(c,points,'#13283940',77);line(c,points,p.road[0],67);line(c,points,p.road[1],53);line(c,points,'#ffffff10',33);
 for(let i=1;i<m.path.length;i++){const a=m.path[i-1],b=m.path[i],len=Math.hypot(b.x-a.x,b.y-a.y);for(let t=12;t<len;t+=22){const x=a.x+(b.x-a.x)*t/len,y=a.y+(b.y-a.y)*t/len;rect(c,x+(random()-.5)*27,y+(random()-.5)*24,3+random()*5,2,p.road[0]+'44')}}
 m.channel?.crossings.forEach(b=>bridge(c,m,b));
 for(let i=0;i<150;i++){const x=25+random()*950,y=80+random()*490;if(distance(m.path,x,y)<70||waterAt(m,x,y,12)||poolAt(m,x,y,12)||!islandAt(m,x,y))continue;if(m.w===2)line(c,[[x,y],[x+7,y+2]],'#f6f9ed88',2);else if(m.w===3)line(c,[[x-4,y+3],[x,y-5],[x+5,y+3]],'#d8ba7966',1.5);else if([4,8,9].includes(m.w)){polygon(c,[[x-3,y+3],[x,y-5],[x+3,y+2]],p.accent+'66')}else{line(c,[[x-3,y+3],[x,y-5],[x+4,y+3]],p.stone[1]+'77',1.5);if(i%5===0)circle(c,x+4,y-2,2,2,p.accent)}}
 m.objects.slice().sort((a,b)=>a.y-b.y).forEach(o=>object(c,o,m));
 const g=c.createRadialGradient(500,300,220,500,300,610);g.addColorStop(0,'#122d3600');g.addColorStop(1,'#14243566');c.fillStyle=g;c.fillRect(0,0,1000,600);return surface;
}
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function animate(m){if(document.body.classList.contains('reduced-motion')||reducedMotion.matches)return;const p=m.region,t=performance.now()/1000;ctx.save();for(let i=0;i<18;i++){const n=(i*71+m.id*23),wind=['sand','wind'].includes(p.weather),snow=p.weather==='snow',x=(n+t*(wind?17:snow?5:2))%990,y=snow?(i*43+t*12)%570+15:75+(i*47%475)+Math.sin(t+i)*7;ctx.globalAlpha=.18+(1+Math.sin(t+i))*.13;if(wind)line(ctx,[[x,y],[x+7,y-2]],p.accent,1);else circle(ctx,x,y,snow?2:1.6,snow?2:1.6,p.accent)}if(m.channel&&m.feature==='lava'){ctx.globalAlpha=.35;const q=m.channel;for(let i=0;i<9;i++){const x=q.axis==='v'?q.at+Math.sin(i)*23:(i*117+t*5)%990,y=q.axis==='v'?(i*73-t*6+1000)%590:q.at+Math.sin(i)*22;if(distance(m.path,x,y)>50)circle(ctx,x,y,2.5,1.5,'#ffe5a8')}}ctx.restore()}
drawGround=function(level){const m=maps.get(level.id);if(!m)return base.ground.apply(this,arguments);if(!cache.has(m.id)){if(cache.size>=3)cache.delete(cache.keys().next().value);cache.set(m.id,paint(m))}ctx.drawImage(cache.get(m.id),0,0,canvas.width,canvas.height)};
drawUnderScenery=function(level){if(!maps.has(level.id))return base.under.apply(this,arguments)};
drawPath=function(level){if(!maps.has(level.id))return base.path.apply(this,arguments)};
drawScenery=function(level){const m=maps.get(level.id);if(m)animate(m);else return base.scenery.apply(this,arguments)};
blockedByScenery=function(x,y){const m=maps.get(currentLevel.id);if(!m)return base.blocked.apply(this,arguments);return x<25||x>975||y<35||y>575||waterAt(m,x,y,18)||poolAt(m,x,y,18)||!islandAt(m,x,y,18)||occupied(m,x,y,18)};
drawStageLabel=function(){const m=maps.get(currentLevel.id);if(!m)return base.label.apply(this,arguments);ctx.save();ctx.fillStyle='#152b3ce6';roundedRect(17,15,352,52,9);ctx.fill();rect(ctx,17,23,3,35,m.region.accent);ctx.fillStyle=m.region.accent;ctx.font='bold 14px Georgia,serif';ctx.fillText(levelCode(currentLevel)+'  '+currentLevel.name,31,36);ctx.font='10px sans-serif';ctx.fillStyle='#e0e6df';ctx.fillText(m.caption,31,55);ctx.restore()};
// Shared read-only map metadata also supports deterministic offline visual/collision QA.
window.BeastwardWorldArt={version:data.version,maps,cache};
document.documentElement.dataset.worldEnvironment=data.version;
})();
