// Verdant Valley: ten authored environments. Other regions retain their renderers.
(()=>{
'use strict';
if(typeof levels==='undefined'||typeof drawGround!=='function')return;
const TAU=Math.PI*2;
const maps=[
 {id:1,subtitle:'Sunlit meadows • The old warden road',col:['#799c55','#527845','#345c3b'],accent:'#efd68a',route:[[-30,320],[145,320],[255,210],[400,210],[520,420],[665,420],[775,270],[930,270]],landmark:['gate',300,90],props:[['tree',80,160],['tree',320,470],['tree',790,105],['sign',100,400],['cart',600,110]]},
 {id:2,subtitle:'Ancient canopy • The whispering heart',col:['#426c49','#2b503d','#183a32'],accent:'#91d5b1',route:[[-30,115],[830,115],[830,480],[180,480],[180,260],[650,260],[650,365],[930,365]],landmark:['elder',440,365],props:[['tree',95,240],['tree',930,130],['tree',90,500],['tree',720,540],['stump',560,550]]},
 {id:3,subtitle:'Riven banks • The last standing bridge',col:['#739569','#4c7854','#325c49'],accent:'#a6decb',route:[[-30,470],[200,470],[300,330],[400,330],[610,330],[715,170],[820,170],[930,270]],landmark:['bridgeRuin',510,495],water:{axis:'v',a:440,b:580},bridges:[{x:510,y:330,w:166,h:77}],props:[['tree',150,170],['tree',795,485],['cart',300,100],['rock',690,480]]},
 {id:4,subtitle:'Mosswood market • Hold the village square',col:['#89955c','#667c4e','#3f5d3d'],accent:'#f6cd8f',route:[[-30,190],[220,190],[220,465],[480,465],[480,245],[690,245],[690,450],[930,450]],landmark:['well',460,125],props:[['house',105,90],['house',350,315],['house',820,130],['house',820,315],['stall',570,540],['cart',90,460],['sign',585,160]]},
 {id:5,subtitle:'Moonwell sanctuary • The sleeping guardian',col:['#748875','#506d60','#304b48'],accent:'#a2ead1',route:[[-30,310],[160,310],[160,135],[730,135],[730,470],[320,470],[320,315],[540,315],[540,255],[930,255]],landmark:['shrine',460,205],props:[['pillar',75,440],['pillar',830,480],['pillar',880,100],['tree',95,90],['tree',920,535]]},
 {id:6,subtitle:'Willow wetlands • Three timber crossings',col:['#668f79','#406f60','#2a504e'],accent:'#9cddcf',route:[[-30,450],[180,450],[180,140],[460,140],[460,460],[740,460],[740,140],[850,140],[930,240]],water:{axis:'h',a:265,b:345},bridges:[{x:180,y:305,w:122,h:75,vertical:true},{x:460,y:305,w:122,h:75,vertical:true},{x:740,y:305,w:122,h:75,vertical:true}],landmark:['boat',340,310],props:[['willow',340,470],['willow',80,155],['willow',620,150],['willow',870,445]]},
 {id:7,subtitle:'Blighted roots • A forest turning against itself',col:['#62576d','#404951','#283a3d'],accent:'#ce94ec',route:[[-30,130],[200,130],[200,460],[385,460],[385,170],[600,170],[600,460],[790,460],[790,220],[930,220]],landmark:['blight',495,330],props:[['dead',80,350],['dead',300,80],['dead',690,300],['crystal',300,300],['crystal',880,510]]},
 {id:8,subtitle:'Fallen keep • The wardens’ broken watch',col:['#808773','#5d6d5b','#394e47'],accent:'#d3d1a1',route:[[-30,490],[190,490],[190,330],[365,330],[365,145],[620,145],[620,365],[790,365],[790,180],[930,180]],landmark:['keep',480,450],props:[['wall',90,110],['wall',830,530],['pillar',90,300],['pillar',740,80],['statue',475,260],['tree',930,410]]},
 {id:9,subtitle:'Wind-carved cliffs • The final ascent',col:['#9b8a65','#766c50','#4d5747'],accent:'#efcf91',route:[[-30,165],[210,165],[360,295],[220,440],[460,490],[615,340],[520,175],[730,110],[930,280]],landmark:['arch',810,460],props:[['rock',100,490],['rock',400,110],['bones',100,330],['rock',700,520],['sign',820,90]],cliffs:true},
 {id:10,subtitle:'Hollowmaw’s lair • Beneath the ancient roots',col:['#4c5254','#303d40','#172a31'],accent:'#ba9edf',route:[[-30,285],[120,285],[120,115],[825,115],[825,495],[280,495],[280,280],[625,280],[625,385],[930,385]],landmark:['maw',470,190],props:[['crystal',75,460],['crystal',930,140],['crystal',440,575],['bones',420,400],['bones',750,210],['rock',190,570]],cliffs:true}
];
const byId=new Map(maps.map(m=>[m.id,m]));
const original={ground:drawGround,under:drawUnderScenery,path:drawPath,scenery:drawScenery,blocked:blockedByScenery,label:drawStageLabel};
const caches=new Map();
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function ellipse(c,x,y,rx,ry,colour){c.fillStyle=colour;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill()}
function poly(c,points,colour){c.fillStyle=colour;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill()}
function line(c,points,colour,width){c.strokeStyle=colour;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
function routeDistance(m,x,y){let d=Infinity;for(let i=1;i<m.route.length;i++){const [ax,ay]=m.route[i-1],[bx,by]=m.route[i],dx=bx-ax,dy=by-ay,t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));d=Math.min(d,Math.hypot(x-ax-t*dx,y-ay-t*dy))}return d}
function inWater(m,x,y,pad=0){return m.water&&(m.water.axis==='v'?x>=m.water.a-pad&&x<=m.water.b+pad:y>=m.water.a-pad&&y<=m.water.b+pad)}
function footprint(p){const [kind,x,y]=p;const sizes={gate:[72,39],elder:[74,60],bridgeRuin:[79,34],well:[38,35],shrine:[62,44],boat:[43,16],blight:[59,61],keep:[85,53],arch:[65,50],maw:[90,34],house:[48,52],stall:[45,30],tree:[34,37],willow:[43,40],wall:[65,24],rock:[31,25],pillar:[17,30],statue:[24,35],dead:[29,35],crystal:[25,30],cart:[29,23],sign:[19,24],bones:[18,13],stump:[20,16]};const [rx,ry]=sizes[kind]||[25,25];return{x,y,rx,ry}}
for(const m of maps){const level=levels.find(l=>l.id===m.id);if(!level)continue;m.level=level;level.path=m.route.map(([x,y])=>({x,y}));level.pathWidth=64;level.scenery=[];m.objects=[m.landmark,...m.props];
 // Dense scenery frames the board; the playable interior remains open.
 const random=rng(800+m.id);
 for(let i=0;i<130;i++){const x=20+random()*960,y=45+random()*530;if(x>65&&x<935&&y>85&&y<535)continue;if(routeDistance(m,x,y)<94||inWater(m,x,y,30)||m.objects.some(p=>Math.hypot(p[1]-x,p[2]-y)<75))continue;
 m.objects.push([m.id>=9?'rock':m.id===7?'dead':'tree',x,y]);}
 m.footprints=m.objects.filter(p=>!['bones','sign'].includes(p[0])).map(footprint);
}
if(byId.has(currentLevel.id))path=currentLevel.path;
function tree(c,x,y,scale=1,dark=false){c.save();c.translate(x,y);c.scale(scale,scale);ellipse(c,8,24,35,13,'#102d2866');line(c,[[0,22],[0,-17]],'#614b35',12);line(c,[[-14,24],[0,10],[15,24]],'#685139',4);for(const [a,b,r] of [[-22,-10,22],[19,-14,24],[0,-34,28],[-4,-13,28]]){ellipse(c,a,b+6,r,r*.77,dark?'#203e39':'#244f3a');ellipse(c,a-3,b,r*.89,r*.65,dark?'#335a49':'#47764c');ellipse(c,a-8,b-6,r*.55,r*.34,dark?'#426954':'#659155')}c.restore()}
function stone(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,5,16,30,11,'#10252c66');poly(c,[[-29,12],[-23,-13],[-4,-26],[23,-16],[32,12],[8,23]],'#596868');poly(c,[[-23,-13],[-4,-26],[23,-16],[4,1]],'#92a090');poly(c,[[4,1],[23,-16],[32,12],[8,23]],'#738276');line(c,[[-21,11],[-3,17],[7,14]],'#a2b58a',3);c.restore()}
function crystal(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,0,15,25,10,'#be8aff22');for(const [dx,h] of [[-13,22],[0,43],[13,27]]){poly(c,[[dx-9,12],[dx-6,-h],[dx,-h-8],[dx+9,8],[dx,20]],'#7660a1');poly(c,[[dx,-h-8],[dx+9,8],[dx,20]],'#ba99d5');line(c,[[dx,-h+1],[dx+3,6]],'#dbd9ef',2)}c.restore()}
function object(c,p,m){const [kind,x,y]=p;c.save();c.translate(x,y);ellipse(c,7,25,footprint(p).rx,12,'#122c2f55');
 switch(kind){
 case 'tree':tree(c,0,0,1,m.id===2);break;
 case 'elder':tree(c,0,-2,1.8,true);poly(c,[[-22,36],[-15,-18],[12,-24],[23,36]],'#655640');ellipse(c,0,13,12,23,'#182d2c');line(c,[[-40,39],[-13,27],[0,37],[34,43]],'#85724e',5);for(let i=0;i<7;i++)ellipse(c,-49+i*16,37+Math.sin(i)*8,3,2,'#aedcc3');break;
 case 'willow':tree(c,0,-4,1.1,true);for(let i=-3;i<=3;i++)line(c,[[i*10,-28],[i*12,0],[i*12-6,28]],'#719b65',4);break;
 case 'rock':stone(c,0,0);break;
 case 'crystal':crystal(c,0,0);break;
 case 'dead':case 'blight':{const s=kind==='blight'?1.7:1;c.scale(s,s);line(c,[[0,25],[-5,-8],[2,-36]],'#302e3c',13);line(c,[[-4,-3],[-26,-23],[-29,-40]],'#393544',7);line(c,[[0,-14],[23,-26],[31,-47]],'#393544',7);line(c,[[-30,31],[0,14],[36,31]],'#4e4057',6);if(kind==='blight'){ellipse(c,1,-8,9,15,'#cd95e6');line(c,[[-2,4],[-21,30]],'#ac79bd',2);crystal(c,29,24,.5);crystal(c,-28,26,.45)}break;}
 case 'house':case 'stall':{const stall=kind==='stall';c.fillStyle='#504536';c.fillRect(-35,-5,70,40);c.fillStyle='#bb9c6b';c.fillRect(-30,-5,60,33);line(c,[[-28,0],[-28,29],[28,29],[28,0]],'#66563e',5);poly(c,[[-47,-4],[0,-43],[47,-4],[0,8]],stall?'#ac7161':'#3d6762');line(c,[[-44,-4],[0,-39],[44,-4]],stall?'#d5a078':'#719388',4);c.fillStyle='#3d4236';c.fillRect(-9,6,18,24);c.fillStyle='#f1cf85';c.fillRect(16,7,9,10);if(!stall){c.fillStyle='#76776b';c.fillRect(20,-38,10,19);line(c,[[-42,1],[-20,5]],'#85a875',3)}else{c.fillStyle='#765540';c.fillRect(-38,17,76,7);for(let i=0;i<6;i++)ellipse(c,-28+i*11,14,4,4,i%2?'#d3ae66':'#9eb571')}break;}
 case 'well':ellipse(c,0,8,32,24,'#4c5754');ellipse(c,0,0,32,21,'#a3a28a');ellipse(c,0,0,23,13,'#27535b');line(c,[[-27,6],[-27,-35],[27,-35],[27,6]],'#70563c',5);poly(c,[[-40,-30],[0,-51],[40,-30]],'#66847a');line(c,[[0,-30],[0,2]],'#c3b583',2);break;
 case 'gate':case 'arch':{const ruin=kind==='arch';for(const dx of [-51,51]){c.fillStyle='#657571';c.fillRect(dx-13,-24,26,59);c.fillStyle='#a2ad91';c.fillRect(dx-17,-30,34,10);line(c,[[dx-8,-8],[dx+7,-8]],'#475d56',2)}line(c,[[-52,-28],[-29,-50],[0,-57],[29,-50],[52,-28]],ruin?'#8b9684':'#b4b991',18);line(c,[[-46,-30],[-25,-45],[0,-51],[24,-45],[46,-30]],'#d0cba0',3);if(!ruin){poly(c,[[-24,-41],[24,-41],[20,-6],[0,5],[-20,-6]],'#355f56');line(c,[[-9,-22],[0,-32],[9,-22],[0,-11],[-9,-22]],'#dcc784',3)}break;}
 case 'shrine':case 'statue':{const s=kind==='statue'?.6:1;c.scale(s,s);ellipse(c,0,20,57,29,'#3e5754');ellipse(c,0,12,53,26,'#81958b');ellipse(c,0,8,42,20,'#b1b7a0');poly(c,[[-26,6],[-23,-23],[-10,-30],[0,-18],[13,-30],[28,-22],[22,5]],'#6a8179');poly(c,[[-23,-23],[-28,-42],[-10,-30]],'#a6b5a1');poly(c,[[13,-30],[29,-43],[28,-22]],'#a6b5a1');line(c,[[-12,-17],[-5,-16]],'#b5f3d1',3);line(c,[[8,-16],[16,-18]],'#b5f3d1',3);for(let i=0;i<8;i++){const a=i*TAU/8;ellipse(c,Math.cos(a)*46,10+Math.sin(a)*21,3,2,'#c6ebc9')}break;}
 case 'keep':for(const dx of [-62,62]){c.fillStyle='#647470';c.fillRect(dx-22,-40,44,70);c.fillStyle='#92a090';for(let j=0;j<3;j++)c.fillRect(dx-22+j*17,-50,11,16);c.fillStyle='#334c4b';c.fillRect(dx-6,-18,12,20)}c.fillStyle='#77877d';c.fillRect(-42,-20,84,51);c.fillStyle='#263d3e';c.beginPath();c.arc(0,4,21,Math.PI,TAU);c.lineTo(21,31);c.lineTo(-21,31);c.fill();line(c,[[-72,8],[-60,13],[-55,31]],'#9aa777',4);break;
 case 'wall':for(let i=0;i<7;i++){c.fillStyle=i%2?'#849386':'#6d7e75';c.fillRect(-63+i*18,-12-(i%3)*6,16,33+(i%3)*6)}break;
 case 'pillar':c.fillStyle='#85978b';c.fillRect(-11,-30,22,58);c.fillStyle='#bcc2a6';c.fillRect(-17,-34,34,9);c.fillRect(-17,23,34,8);line(c,[[-3,-21],[-3,17]],'#516c63',3);break;
 case 'maw':poly(c,[[-88,25],[-77,-21],[-43,-35],[4,-40],[51,-29],[84,8],[88,30]],'#26383c');ellipse(c,0,8,64,26,'#12272d');for(let i=-3;i<=3;i++){poly(c,[[i*19-8,-18],[i*19+7,-20],[i*17,1]],'#8a9690');poly(c,[[i*20-9,27],[i*20+7,28],[i*18,13]],'#788983')}ellipse(c,-22,-22,9,3,'#c9a5df');ellipse(c,22,-22,9,3,'#c9a5df');break;
 case 'bridgeRuin':for(const side of [-1,1]){c.fillStyle='#637b72';c.fillRect(side<0?-80:53,-24,27,51);for(let i=0;i<3;i++){c.save();c.translate(side*(35+i*13),0);c.rotate(side*(.1+i*.08));c.fillStyle='#988160';c.fillRect(-5,-21,10,43);c.restore()}}line(c,[[-72,-25],[-38,-12]],'#bca479',4);line(c,[[72,-25],[41,-2]],'#bca479',4);break;
 case 'boat':poly(c,[[-40,0],[-23,-12],[28,-10],[44,0],[26,12],[-23,12]],'#9f845c');poly(c,[[-26,0],[-18,-7],[22,-6],[28,0],[20,7],[-18,7]],'#4d5247');line(c,[[-6,-18],[14,20]],'#d1bc86',3);break;
 case 'cart':c.fillStyle='#997747';c.fillRect(-22,-14,44,29);for(let i=0;i<4;i++)line(c,[[-20,-10+i*7],[20,-10+i*7]],'#c1a477',2);ellipse(c,-15,18,7,7,'#39463d');ellipse(c,15,18,7,7,'#39463d');break;
 case 'sign':line(c,[[0,27],[0,-15]],'#6f6146',5);poly(c,[[-19,-18],[13,-18],[24,-10],[13,-2],[-19,-2]],'#c2ae79');line(c,[[-10,-10],[11,-10]],'#5d624a',2);break;
 case 'bones':line(c,[[-17,-7],[16,9]],'#bcbba2',4);line(c,[[-14,10],[15,-8]],'#bcbba2',4);ellipse(c,0,-6,9,7,'#d1ccb4');ellipse(c,3,-7,3,3,'#55625c');break;
 case 'stump':c.fillStyle='#71593e';c.fillRect(-17,-5,34,24);ellipse(c,0,-5,19,10,'#b49762');ellipse(c,0,-5,11,5,'#816a46');break;
 }c.restore();}
function bridge(c,b){c.save();c.translate(b.x,b.y);if(b.vertical)c.rotate(Math.PI/2);c.fillStyle='#172e3155';c.fillRect(-b.w/2+5,-b.h/2+7,b.w,b.h);c.fillStyle='#65543f';c.fillRect(-b.w/2,-b.h/2,b.w,b.h);for(let x=-b.w/2+2;x<b.w/2;x+=12){c.fillStyle=(Math.floor(x/12)%2)?'#b79c70':'#aa8c62';c.fillRect(x,-b.h/2+4,10,b.h-8)}for(const y of [-b.h/2,b.h/2]){line(c,[[-b.w/2,y],[b.w/2,y]],'#d1b688',4);for(let x=-b.w/2;x<=b.w/2;x+=36){c.fillStyle='#6a5743';c.fillRect(x-3,y-6,6,13)}}c.restore()}
function paint(m){const surface=document.createElement('canvas');surface.width=1000;surface.height=600;const c=surface.getContext('2d'),random=rng(194+m.id);const g=c.createLinearGradient(0,0,950,600);m.col.forEach((col,i)=>g.addColorStop(i/2,col));c.fillStyle=g;c.fillRect(0,0,1000,600);
 for(let i=0;i<80;i++){c.globalAlpha=.07;ellipse(c,random()*1000,random()*600,25+random()*80,14+random()*40,i%2?'#e1dda0':'#102e32')}c.globalAlpha=1;
 for(let i=0;i<1500;i++){const x=random()*1000,y=random()*600;c.fillStyle=i%3?'#d5d5a51c':'#122f3526';c.fillRect(x,y,1+random()*3,1)}
 if(m.cliffs){for(const y of [0,580]){poly(c,[[0,y],[1000,y],[1000,y+32],[0,y+24]],'#243b3e');for(let x=0;x<1000;x+=70){stone(c,x+25,y+3,.8)}}}
 if(m.water){const v=m.water.axis==='v',a=m.water.a,b=m.water.b;c.fillStyle='#a3ad7d';c.fillRect(v?a-10:0,v?0:a-10,v?b-a+20:1000,v?600:b-a+20);c.fillStyle='#3d737b';c.fillRect(v?a:0,v?0:a,v?b-a:1000,v?600:b-a);c.fillStyle='#518d8d';c.fillRect(v?a+15:0,v?0:a+12,v?b-a-30:1000,v?600:b-a-24);for(let i=0;i<55;i++){const x=v?a+random()*(b-a):random()*1000,y=v?random()*600:a+random()*(b-a);line(c,[[x,y],[x+10+random()*16,y]],'#bce4ca55',1.5)}
 for(let i=0;i<35;i++){const x=v?(i%2?a-16:b+16):random()*1000,y=v?random()*600:(i%2?a-12:b+12);if(routeDistance(m,x,y)<70)continue;for(let j=-1;j<=1;j++)line(c,[[x+j*4,y+8],[x+j*7,y-13]],'#99ae77',2);if(i%4===0)ellipse(c,v?a+25:x,v?y:a+19,8,4,'#91b786')}}
 // Worn edges, warm soil and sparse stepping stones replace the dashed road centreline.
 line(c,m.route,'#152d353b',78);line(c,m.route,m.id>=7?'#62615c':'#89906a',69);line(c,m.route,m.id>=7?'#9b9481':'#cfbc8a',55);line(c,m.route,'#e3d3a323',36);
 for(let i=1;i<m.route.length;i++){const [ax,ay]=m.route[i-1],[bx,by]=m.route[i],len=Math.hypot(bx-ax,by-ay);for(let t=20;t<len;t+=24){const x=ax+(bx-ax)*t/len,y=ay+(by-ay)*t/len,j=(random()-.5)*28;c.fillStyle=m.id>=7?'#d1c8a344':'#927c5644';c.fillRect(x+j,y+random()*18-9,3+random()*5,2)}}
 (m.bridges||[]).forEach(b=>bridge(c,b));
 // Low meadow detail never obscures the route or competes with beasts.
 for(let i=0;i<170;i++){const x=25+random()*950,y=75+random()*485;if(routeDistance(m,x,y)<65||inWater(m,x,y,15))continue;line(c,[[x-3,y+4],[x,y-4],[x+2,y+3]],m.id>=7?'#a0a18455':'#b7c78c88',1.4);if(i%6===0){const colour=m.id>=7?'#bd9ac7':m.id===2?'#abd3c0':'#f0d8aa';ellipse(c,x+5,y,2.3,2.3,colour);ellipse(c,x-4,y+5,2,2,colour)}}
 m.objects.slice().sort((a,b)=>a[2]-b[2]).forEach(p=>object(c,p,m));
 const vignette=c.createRadialGradient(500,300,210,500,300,600);vignette.addColorStop(0,'#102c3100');vignette.addColorStop(1,'#0a252e66');c.fillStyle=vignette;c.fillRect(0,0,1000,600);
 return surface;
}
function atmosphere(m){if(document.body.classList.contains('reduced-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const t=performance.now()/1000;ctx.save();
 // Small motes stay beneath combat sprites and remain independent of game speed.
 for(let i=0;i<14;i++){const x=(i*79+m.id*47+t*(m.id===9?15:3))%970+15,y=85+(i*61%445)+Math.sin(t*.65+i)*9;ctx.globalAlpha=.2+.18*(1+Math.sin(t+i));ellipse(ctx,x,y,m.id===9?2.7:1.8,1.3,m.accent)}
 if(m.water){ctx.globalAlpha=.23;const v=m.water.axis==='v';for(let i=0;i<10;i++){const x=v?m.water.a+35+(i%3)*26:(i*97+t*8)%990,y=v?(i*67+t*10)%590:m.water.a+20+(i%3)*18;if(routeDistance(m,x,y)>48)line(ctx,[[x,y],[x+17,y]],'#d6f0db',1.5)}}ctx.restore();}
drawGround=function(level){const m=byId.get(level.id);if(!m)return original.ground.apply(this,arguments);if(!caches.has(m.id)){if(caches.size>=3)caches.delete(caches.keys().next().value);caches.set(m.id,paint(m));}ctx.drawImage(caches.get(m.id),0,0,canvas.width,canvas.height)};
drawUnderScenery=function(level){if(!byId.has(level.id))return original.under.apply(this,arguments)};
drawPath=function(level){if(!byId.has(level.id))return original.path.apply(this,arguments)};
drawScenery=function(level){const m=byId.get(level.id);if(!m)return original.scenery.apply(this,arguments);atmosphere(m)};
blockedByScenery=function(x,y){const m=byId.get(currentLevel.id);if(!m)return original.blocked.apply(this,arguments);if(x<25||x>975||y<35||y>575)return true;if(inWater(m,x,y,18))return true;return m.footprints.some(p=>((x-p.x)/(p.rx+18))**2+((y-p.y)/(p.ry+18))**2<1)};
drawStageLabel=function(){const m=byId.get(currentLevel.id);if(!m)return original.label.apply(this,arguments);ctx.save();ctx.fillStyle='#112b30de';roundedRect(17,15,345,51,9);ctx.fill();ctx.fillStyle=m.accent;ctx.fillRect(17,24,3,31);ctx.font='bold 14px Georgia,serif';ctx.fillText(levelCode(currentLevel)+'  '+currentLevel.name,31,36);ctx.font='10px sans-serif';ctx.fillStyle='#d2ddd0';ctx.fillText(m.subtitle,31,54);ctx.restore()};
document.documentElement.dataset.verdantEnvironment='authored-zone-v2';
})();
