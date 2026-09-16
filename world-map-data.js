// Art direction for every stage beyond Verdant Valley. No save or combat-stat changes.
(()=>{
'use strict';
const regions={
2:{name:'Frostfall Expanse',col:['#c6dee0','#94b7c6','#607f99'],road:['#7495a5','#e3edf0'],stone:['#749aaa','#b9d7dd'],accent:'#cbf5ff',flora:'pine',weather:'snow',material:'ice',stages:[
 ['beacon','The first watchfire','drifts'],['elder','The whitepine monarch','forest'],['bridgegate','The glacial span','river'],['outpost','Frosthaven watch','settlement'],['geode','The blueheart geode','pool'],['windmill','The storm vane','ridge'],['obelisk','A glacier split in two','rift'],['keep','The frostbound citadel','court'],['arch','The last mountain gate','ridge'],['maw','Glaciermaw’s frozen throne','arena']]},
3:{name:'Sunscar Desert',col:['#d8b27b','#b98b59','#856246'],road:['#93673d','#edcf91'],stone:['#ac8157','#e1bd7d'],accent:'#ffe0a0',flora:'palm',weather:'sand',material:'sand',stages:[
 ['caravan','The caravan waystation','dunes'],['scorpion','The hunter’s husk','bones'],['fountain','Water beneath the dunes','oasis'],['ribs','The buried serpent','dunes'],['pyramid','Temple of the sundisc','court'],['sundial','The mirage sundial','salt'],['arch','The redstone arch','ridge'],['aqueduct','A forgotten aqueduct','ruins'],['windmill','The ashwind watch','ridge'],['sarcophagus','The Sandwyrm’s seal','arena']]},
4:{name:'Embercrag Peaks',col:['#655354','#43383f','#292e38'],road:['#553b36','#a58776'],stone:['#4d505a','#827b7e'],accent:'#ffb16b',flora:'basalt',weather:'embers',material:'basalt',stages:[
 ['brazier','The cinder beacon','vents'],['bridgegate','The basalt causeway','lava'],['watchtower','The ashfall watch','ridge'],['sluice','The molten floodgates','lava'],['forge','The broken anvil','court'],['obelisk','Obsidian sundial','shards'],['furnace','The ancient furnace','vents'],['geode','Fireglass heart','crater'],['arch','The summit gate','ridge'],['volcano','Pyroclast’s crown','arena']]},
5:{name:'Mireveil Marsh',col:['#78937b','#486b60','#294c4d'],road:['#3d4d42','#9a9b72'],stone:['#5d7c6f','#9faf84'],accent:'#d1ed94',flora:'willow',weather:'fireflies',material:'wood',stages:[
 ['dock','The ferryman’s landing','water'],['totem','The reed watchers','reeds'],['mushroom','The spore canopy','fungi'],['boat','The lost river barge','pool'],['elder','The hollow rotwood','forest'],['cauldron','The poison well','poison'],['outpost','The drowned hamlet','settlement'],['lanterns','Lights in the mire','pool'],['rootheart','Roots beneath the water','reeds'],['nest','The Mirequeen’s brood','arena']]},
6:{name:'Stormspire Isles',col:['#8eb5c3','#668b9f','#3e5c7a'],road:['#647989','#c9d9d7'],stone:['#748996','#bacbc8'],accent:'#e0f2ba',flora:'skyrock',weather:'wind',material:'sky',stages:[
 ['dock','The skyship landing','islands'],['bridgegate','The thunderchain span','rift'],['windmill','The cloudcatcher','islands'],['conductor','The lightning stair','ridge'],['temple','Sanctuary of the four winds','court'],['orrery','The cyclone engine','islands'],['nest','The shattered aerie','ruins'],['chain','The anchors of the sky','rift'],['stormeye','The eye of the storm','arena'],['roc','The Tempest Roc’s spire','arena']]},
7:{name:'Moonshadow Wilds',col:['#676786','#40485f','#253345'],road:['#484559','#a6a3b5'],stone:['#6c7384','#b5b8bd'],accent:'#ded5ff',flora:'silverpine',weather:'wisps',material:'moon',stages:[
 ['moongate','The twilight threshold','forest'],['elder','The silverwood matriarch','forest'],['crypt','The whispering tomb','graves'],['fountain','The moon’s reflection','pool'],['rootheart','Ghostroot’s hollow','roots'],['gazebo','The forgotten garden','garden'],['lanterns','The wraith lanterns','graves'],['eclipse','The eclipse altar','court'],['outpost','The abandoned nightwatch','settlement'],['antlers','Dreadhorn’s silver crown','arena']]},
8:{name:'Crystaldeep',col:['#58848d','#315969','#203d54'],road:['#3b6373','#99c7ca'],stone:['#4e8193','#91d0d0'],accent:'#93f4eb',flora:'crystal',weather:'glints',material:'crystal',stages:[
 ['mine','The first gemshaft','rails'],['geode','The azure heart','pool'],['cluster','The singing crystal forest','shards'],['winch','The echo lift','rails'],['sluice','The luminous stream','river'],['vault','The geode lock','court'],['obelisk','The fractured monolith','shards'],['bridgegate','The luminous abyss','rift'],['statue','The sleeping titan','court'],['prism','The Prism Titan’s heart','arena']]},
9:{name:'Astral Ruins',col:['#685f91','#403c69','#252b50'],road:['#534e7b','#b1a2d2'],stone:['#6c6397','#c0aed9'],accent:'#f0c8ff',flora:'floatstone',weather:'stars',material:'astral',stages:[
 ['portal','The starfall threshold','islands'],['orrery','The orbital rings','islands'],['orrery','The shattered heavens','ruins'],['fountain','The nebula font','court'],['chain','The bridge between worlds','rift'],['archive','The last astral library','court'],['blackhole','The gravity well','arena'],['temple','The rift sanctuary','rift'],['statue','The sovereign’s sentinels','court'],['throne','The Rift Sovereign’s seat','arena']]},
10:{name:'The Wildheart',col:['#819479','#4f7168','#304f58'],road:['#626756','#c6bd95'],stone:['#678578','#b7c7a2'],accent:'#f5e5a7',flora:'worldtree',weather:'essence',material:'primal',stages:[
 ['convergence','Where the realms meet','garden'],['rootheart','The burning worldroot','lava'],['geode','Ice around a living flame','pool'],['conductor','The stormblossom garden','garden'],['cluster','The shattered elements','shards'],['bridgegate','The elemental crossing','river'],['elder','The oldest living root','forest'],['crown','The crown of chaos','arena'],['temple','The heartward sanctuary','court'],['worldheart','The heart of Beastward','arena']]}
};
// Thirty route compositions, selected by travel length and region; the old late-game
// copy/paste routes receive different bends, orientations and defensive pockets.
const routes=[
[[-30,390],[170,390],[275,180],[480,180],[615,410],[775,410],[930,280]],
[[-30,175],[220,175],[220,435],[495,435],[495,240],[730,240],[930,370]],
[[-30,465],[190,465],[320,315],[520,315],[640,135],[815,135],[930,240]],
[[-30,275],[160,130],[360,130],[470,325],[335,475],[660,475],[790,290],[930,290]],
[[-30,125],[225,125],[340,290],[200,450],[460,495],[615,310],[505,145],[750,110],[840,310],[930,310]],
[[-30,465],[155,465],[155,160],[345,160],[345,440],[565,440],[565,130],[780,130],[780,335],[930,335]],
[[-30,165],[160,165],[280,360],[440,360],[570,175],[750,175],[800,455],[930,455]],
[[-30,480],[130,480],[130,350],[305,350],[305,185],[520,185],[520,420],[720,420],[720,225],[930,225]],
[[-30,135],[170,135],[170,435],[365,435],[365,220],[575,220],[575,470],[785,470],[785,275],[930,275]],
[[-30,320],[130,320],[130,115],[365,115],[365,485],[600,485],[600,200],[795,200],[795,415],[930,415]],
[[-30,510],[180,510],[290,370],[180,230],[360,110],[525,245],[435,430],[660,490],[775,310],[665,150],[930,95]],
[[-30,300],[150,150],[320,300],[470,460],[610,300],[765,140],[930,300]],
[[-30,465],[185,465],[300,310],[415,155],[620,155],[735,315],[605,450],[800,495],[930,365]],
[[-30,125],[200,125],[310,310],[470,310],[540,475],[730,475],[805,250],[930,250]],
[[-30,380],[195,380],[195,160],[410,160],[520,330],[660,330],[760,130],[930,130]],
[[-30,120],[815,120],[815,480],[185,480],[185,275],[640,275],[640,365],[930,365]],
[[-30,490],[130,490],[130,375],[315,375],[315,245],[505,245],[505,110],[715,110],[715,325],[930,325]],
[[-30,340],[135,340],[135,115],[390,115],[390,305],[255,440],[540,495],[685,315],[580,175],[800,125],[930,280]],
[[-30,470],[200,470],[200,145],[460,145],[460,455],[730,455],[730,145],[845,145],[930,245]],
[[-30,190],[235,190],[235,465],[510,465],[510,280],[730,280],[730,125],[930,125]],
[[-30,450],[160,450],[280,235],[490,235],[490,435],[695,435],[695,155],[930,155]],
[[-30,130],[185,130],[315,300],[210,445],[425,480],[560,290],[730,290],[800,440],[930,440]],
[[-30,480],[195,480],[325,335],[245,170],[460,105],[640,245],[570,415],[775,485],[930,320]],
[[-30,315],[145,315],[270,130],[440,130],[560,330],[425,470],[695,470],[805,270],[930,270]],
[[-30,105],[205,105],[205,475],[410,475],[410,180],[620,180],[620,475],[820,475],[820,280],[930,280]],
[[-30,495],[160,495],[160,300],[355,300],[355,115],[585,115],[585,340],[775,340],[775,180],[930,180]],
[[-30,175],[155,175],[155,460],[365,460],[365,200],[575,200],[575,455],[790,455],[790,235],[930,235]],
[[-30,420],[200,420],[335,245],[235,115],[495,115],[615,290],[490,465],[745,495],[835,325],[930,325]],
[[-30,305],[160,120],[335,305],[500,125],[690,305],[550,480],[340,370],[775,370],[930,245]],
[[-30,305],[120,305],[120,95],[865,95],[865,505],[235,505],[235,205],[745,205],[745,405],[385,405],[385,300],[615,300],[615,350],[930,350]]
];
window.BeastwardWorldArtData={regions,routes,version:'20260916-worlds-1'};
})();
