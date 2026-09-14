// Beastward regional normal-enemy artwork + Bestiary roster v1
// Crops the approved 10x6 regional enemy sheet at runtime and maps the 50 enemies into battle + Bestiary.
(()=>{
  if(typeof bestiaryEnemies==='undefined'||typeof enemyImgs==='undefined') return;
  const VERSION='20260915-regional-enemies-1';
  const SHEET=`assets/enemies/08CF18BA-F9D4-49F1-8BDE-4F4C7009D0C8.png?v=${VERSION}`;
  const ROLES=['Swarm','Runner','Standard','Specialist','Brute'];
  const REGIONS=[
    {name:'Misty Valley',world:1,names:['Rootling','Forest Sprite','Moss Boar','Vine Serpent','Ancient Treantling']},
    {name:'Frozen Tundra',world:2,names:['Ice Wisp','Snow Hare','Frost Wolf','Crystal Spider','Glacier Brute']},
    {name:'Sunscorch Desert',world:3,names:['Sandling','Scorpion','Dune Lizard','Sand Wraith','Tomb Sentinel']},
    {name:'Volcanic Caldera',world:4,names:['Magma Imp','Cinder Bat','Lava Hound','Molten Crab','Obsidian Golem']},
    {name:'Poisoned Marsh',world:5,names:['Bogling','Swamp Rat','Toxic Toad','Leech','Plague Walker']},
    {name:'Stormbound Peaks',world:6,names:['Storm Wisp','Wind Raptor','Thunder Hound','Sky Serpent','Aerie Guard']},
    {name:'Ruined Moon',world:7,names:['Shade Wisp','Lunar Stalker','Nightstalker','Void Bat','Eclipse Shade']},
    {name:'Prismatic Cavern',world:8,names:['Crystalling','Shard Beetle','Gem Slime','Prism Moth','Crystal Sentinel']},
    {name:'Shattered Realms',world:9,names:['Rift Wisp','Abyss Crawler','Void Hound','Rift Horror','Chaos Spawn']},
    {name:'Worldheart',world:10,names:['Celestial Wisp','Solar Sprite','Stone Guardian','Light Serpent','Verdant Construct']}
  ];
  const ROLE_TEXT={
    Swarm:'Small and fragile, but dangerous in numbers. Area damage and rapid attacks are ideal counters.',
    Runner:'A fast-moving enemy with lower durability. Slow, root and freeze effects are especially effective.',
    Standard:'A balanced frontline enemy with reliable health and speed. It forms the backbone of most regional waves.',
    Specialist:'A tactical enemy that carries disruptive regional mechanics such as regeneration, support, phasing or wards.',
    Brute:'A slow, heavily built enemy with high durability. Heavy damage and armour-breaking attacks are the cleanest answer.'
  };
  const ids={};
  const art={};
  function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')}
  REGIONS.forEach(r=>r.names.forEach((n,i)=>{const id=`region${r.world}_${slug(n)}`;ids[`${r.world}:${ROLES[i]}`]=id;}));

  function worldOf(){return Math.max(1,Math.min(10,Number(currentLevel?.world||Math.ceil(Number(currentLevel?.id||1)/10)||1)))}
  function baseGroup(type){
    if(['wisp','shardwisp'].includes(type)) return 'swarm';
    if(['hound','snowstalker','glimmer'].includes(type)) return 'runner';
    if(['brute','shellback','icegolem'].includes(type)) return 'brute';
    return 'standard';
  }
  function roleFor(s){
    if(s?.archetype==='elite'||s?.archetype==='armoured') return 'Brute';
    if(['support','regenerator','warded'].includes(s?.archetype)) return 'Specialist';
    if(['runner','phase'].includes(s?.archetype)) return 'Runner';
    const g=baseGroup(s?.type);return g==='swarm'?'Swarm':g==='runner'?'Runner':g==='brute'?'Brute':'Standard';
  }

  // The sheet is laid out as 6 equal columns (region badge + 5 enemies) and 10 equal rows.
  function cropCell(sheet,row,enemyCol){
    const cw=sheet.naturalWidth/6,ch=sheet.naturalHeight/10;
    const sx=Math.round((enemyCol+1)*cw),sy=Math.round(row*ch),sw=Math.round(cw),sh=Math.round(ch);
    const raw=document.createElement('canvas');raw.width=sw;raw.height=sh;const rc=raw.getContext('2d',{willReadFrequently:true});
    rc.drawImage(sheet,sx,sy,sw,sh,0,0,sw,sh);
    const im=rc.getImageData(0,0,sw,sh),d=im.data,n=sw*sh;
    // If the generated PNG already has alpha, preserve it. Otherwise remove the smooth edge-connected backdrop.
    let alphaEdge=false;for(let x=0;x<sw;x+=8){if(d[(x)*4+3]<245||d[((sh-1)*sw+x)*4+3]<245){alphaEdge=true;break}}
    if(!alphaEdge){
      const bg=new Uint8Array(n),q=new Int32Array(n);let qh=0,qt=0;
      const corner=[[0,0],[sw-1,0],[0,sh-1],[sw-1,sh-1]].map(([x,y])=>{const p=(y*sw+x)*4;return [d[p],d[p+1],d[p+2]]});
      const avg=[0,1,2].map(k=>corner.reduce((a,c)=>a+c[k],0)/4);
      const isBg=i=>{const p=i*4,dr=d[p]-avg[0],dg=d[p+1]-avg[1],db=d[p+2]-avg[2];return Math.sqrt(dr*dr+dg*dg+db*db)<78};
      const push=i=>{if(i>=0&&i<n&&!bg[i]&&isBg(i)){bg[i]=1;q[qt++]=i}};
      for(let x=0;x<sw;x++){push(x);push((sh-1)*sw+x)}for(let y=1;y<sh-1;y++){push(y*sw);push(y*sw+sw-1)}
      while(qh<qt){const i=q[qh++],x=i%sw,y=(i/sw)|0;if(x)push(i-1);if(x<sw-1)push(i+1);if(y)push(i-sw);if(y<sh-1)push(i+sw)}
      for(let i=0;i<n;i++)if(bg[i])d[i*4+3]=0;
      rc.putImageData(im,0,0);
    }
    // Trim transparent space and centre into a square game sprite.
    const pix=rc.getImageData(0,0,sw,sh).data;let minx=sw,miny=sh,maxx=-1,maxy=-1;
    for(let y=0;y<sh;y++)for(let x=0;x<sw;x++){if(pix[(y*sw+x)*4+3]>28){if(x<minx)minx=x;if(x>maxx)maxx=x;if(y<miny)miny=y;if(y>maxy)maxy=y}}
    if(maxx<0){minx=0;miny=0;maxx=sw-1;maxy=sh-1}
    const bw=maxx-minx+1,bh=maxy-miny+1,out=document.createElement('canvas');out.width=192;out.height=192;const oc=out.getContext('2d');oc.imageSmoothingEnabled=false;
    const scale=Math.min(166/bw,166/bh),dw=Math.max(1,Math.round(bw*scale)),dh=Math.max(1,Math.round(bh*scale));
    oc.drawImage(raw,minx,miny,bw,bh,(192-dw)/2,(192-dh)/2,dw,dh);
    return out.toDataURL('image/png');
  }

  function installBestiary(){
    // Remove the old generic normal-enemy records, while preserving the dedicated regional boss entries.
    for(let i=bestiaryEnemies.length-1;i>=0;i--){const e=bestiaryEnemies[i];if(!/Boss/i.test(e.kind||''))bestiaryEnemies.splice(i,1)}
    REGIONS.forEach((r,row)=>r.names.forEach((name,col)=>{
      const role=ROLES[col],id=ids[`${r.world}:${role}`],sprite=art[id];
      bestiaryEnemies.push({id,name,kind:role,role,region:r.name,world:r.world,hp:1,speed:1,reward:1,size:role==='Brute'?28:role==='Swarm'?15:20,sprite,text:`${ROLE_TEXT[role]} Native to ${r.name}.`});
    }));
  }

  const previousSpawn=spawn;
  spawn=function(s){
    const before=enemies.length,r=previousSpawn.apply(this,arguments);
    if(!s?.boss&&enemies.length>before){
      const e=enemies[enemies.length-1],w=worldOf(),role=roleFor(s),id=ids[`${w}:${role}`];
      if(id&&art[id]){e.type=id;enemyImgs[id]=enemyImgs[id]||(()=>{const im=new Image();im.src=art[id];return im})();e.regionRole=role;e.regionWorld=w;e.size=role==='Brute'?25:role==='Swarm'?15:20;}
    }
    return r;
  };

  const previousRender=renderBestiary;
  renderBestiary=function(){
    const r=previousRender.apply(this,arguments);
    if(bestiaryTab==='enemies'){
      const chosen=Number.isInteger(bestiarySelected)?bestiaryEnemies[bestiarySelected]:null;
      const detail=document.querySelector('#bestiaryDetail');
      document.querySelectorAll('#bestiaryList .best-row').forEach(row=>{
        const nm=row.querySelector('h4')?.textContent||'',e=bestiaryEnemies.find(x=>x.name===nm);
        if(e?.region&&!/Boss/i.test(e.kind||'')){row.dataset.role=e.role;const tag=row.querySelector('.tag');if(tag)tag.textContent=e.role;}
      });
      if(chosen?.region&&detail&&!/Boss/i.test(chosen.kind||'')){
        const img=detail.querySelector('img');if(img){img.src=chosen.sprite;img.alt=chosen.name;img.classList.add('regional-enemy-bestiary-art')}
        if(!detail.querySelector('.regional-enemy-lore')){const sec=document.createElement('div');sec.className='best-section regional-enemy-lore';sec.innerHTML=`<b>${chosen.region} • ${chosen.role}</b><p>${chosen.text}</p>`;detail.appendChild(sec)}
      }
    }
    return r;
  };

  const sheet=new Image();sheet.decoding='async';sheet.onload=()=>{
    REGIONS.forEach((r,row)=>r.names.forEach((name,col)=>{const id=ids[`${r.world}:${ROLES[col]}`];try{art[id]=cropCell(sheet,row,col);const im=new Image();im.decoding='async';im.src=art[id];enemyImgs[id]=im}catch(err){console.warn('Regional enemy crop failed',name,err)}}));
    installBestiary();document.documentElement.dataset.regionalEnemyArt='ready-50';try{renderBestiary();updateNextWavePreview?.()}catch(_){ }
  };
  sheet.onerror=()=>{document.documentElement.dataset.regionalEnemyArt='failed';console.error('Regional enemy sheet failed to load',SHEET)};
  sheet.src=SHEET;

  const style=document.createElement('style');style.textContent=`
    #bestiaryList .best-row[data-role="Swarm"] .tag{color:#9be88e}#bestiaryList .best-row[data-role="Runner"] .tag{color:#ffd36a}#bestiaryList .best-row[data-role="Standard"] .tag{color:#d9e1e8}#bestiaryList .best-row[data-role="Specialist"] .tag{color:#7fdcff}#bestiaryList .best-row[data-role="Brute"] .tag{color:#ff9b82}.regional-enemy-bestiary-art{object-fit:contain!important;image-rendering:auto!important;filter:drop-shadow(0 8px 12px #0008)}
  `;document.head.appendChild(style);
})();
