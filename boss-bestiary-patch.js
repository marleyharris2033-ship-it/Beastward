// Beastward regional boss Bestiary entries v1
// Adds all ten regional bosses to the enemy Bestiary and uses the approved boss PNG artwork.
(()=>{
  if(typeof bestiaryEnemies==='undefined') return;
  const VERSION='20260915-boss-bestiary-1';
  const BOSSES=[
    {id:'hollowmaw',name:'Hollowmaw',kind:'Regional Boss',file:'F4089942-75EF-436D-924A-D34E4EFB92F9.png',region:'Verdant Valley',signature:'Dread Roar',text:'The Valley Devourer. An ancient forest predator twisted into a living mass of root, bark and stone. Its Dread Roar marks the final trial of Verdant Valley.'},
    {id:'glaciermaw',name:'Glaciermaw',kind:'Regional Boss',file:'2DAAE690-DA04-4D42-88E4-70530439C820.png',region:'Frostfall Expanse',signature:'Whiteout Roar',text:'The Frozen Alpha. A colossal sabre-fanged beast encased in living ice, ruling the frozen wastes through brute strength and killing cold.'},
    {id:'sandwyrm',name:'Sandwyrm',kind:'Regional Boss',file:'9F472194-F107-4514-874F-FA2ACAFE8BDD.png',region:'Sunscorch Desert',signature:'Buried Ambush',text:'The Dune Tyrant. A vast armoured wyrm that moves beneath the sands before erupting beneath advancing Wardens.'},
    {id:'pyroclast',name:'Pyroclast',kind:'Regional Boss',file:'BF1097AD-6D7D-4615-BBFA-53BBF258B178.png',region:'Volcanic Caldera',signature:'Magma Break',text:'The Caldera Titan. A volcanic beast of black stone and molten fire whose body burns hotter as the battle reaches its climax.'},
    {id:'mirequeen',name:'Mirequeen',kind:'Regional Boss',file:'3365334E-E93A-4CCC-BFF0-2B3A9D4E5E2C.png',region:'Poisoned Marsh',signature:'Toxic Brood',text:'The Rotcrown. A gigantic swamp monarch covered in toxic growths, fungus and living mire, surrounded by poisonous offspring.'},
    {id:'tempestroc',name:'Tempest Roc',kind:'Regional Boss',file:'7BC415C8-43F7-4ADE-A9E8-A6FB0A5762F5.png',region:'Stormbound Peaks',signature:'Thunderclap',text:'The Storm Sovereign. An immense thunderbird whose wings carry lightning across the peaks and whose cry can shake an entire battlefield.'},
    {id:'dreadhorn',name:'Dreadhorn',kind:'Regional Boss',file:'402F605F-66AA-4D34-95EE-13E37AEA5B7E.png',region:'Ruined Moon',signature:'Eclipse Charge',text:'The Moonstalker. A spectral horned hunter empowered by lunar energy, stalking the ruins between shadow and moonlight.'},
    {id:'prismtitan',name:'Prism Titan',kind:'Regional Boss',file:'37B23F6F-5C9F-4216-8014-7841C7BF94ED.png',region:'Prismatic Cavern',signature:'Prism Pulse',text:'The Crystal Colossus. A mountain-sized guardian of stone and living crystal whose refracted energy forms an almost impenetrable defence.'},
    {id:'riftsovereign',name:'Rift Sovereign',kind:'Regional Boss',file:'CB0FB3C3-17A7-43F8-87F9-F56507141974.png',region:'Shattered Realms',signature:'Rift Collapse',text:'The Void King. A monstrous ruler formed around a collapsing rift, bending shadow, crystal and space around its enormous body.'},
    {id:'worldheart',name:'Worldheart Guardian',kind:'Final Boss',file:'69925AC6-32CE-44CC-A43F-01BEA8684EC2.png',region:'Worldheart',signature:'Primal Convergence',text:'The Final Warden. An ancient guardian carrying the powers of every region, standing between Beastward and the heart of the world itself.'}
  ];
  const urls={};
  BOSSES.forEach(b=>{
    b.sprite=`assets/enemies/${b.file}?v=${VERSION}`;
    b.hp=1;b.speed=1;b.reward=1;b.size=46;
    urls[b.id]=b.sprite;
    const existing=bestiaryEnemies.find(e=>e.id===b.id);
    if(existing) Object.assign(existing,b);
    else bestiaryEnemies.push(b);
  });

  // Enhance the stock enemy detail panel with boss-specific region/signature information.
  const previousRender=renderBestiary;
  renderBestiary=function(){
    const r=previousRender.apply(this,arguments);
    if(bestiaryTab==='enemies'){
      document.querySelectorAll('#bestiaryList .best-row').forEach(row=>{
        const name=row.querySelector('h4')?.textContent||'';
        const boss=BOSSES.find(b=>b.name===name);
        if(!boss)return;
        row.classList.add('boss-bestiary-row');
        const tag=row.querySelector('.tag');if(tag)tag.textContent='Boss';
      });
      const chosen=Number.isInteger(bestiarySelected)?bestiaryEnemies[bestiarySelected]:null;
      const boss=chosen&&BOSSES.find(b=>b.id===chosen.id);
      const detail=document.querySelector('#bestiaryDetail');
      if(boss&&detail){
        const hero=detail.querySelector('img');if(hero){hero.src=boss.sprite;hero.alt=boss.name;hero.classList.add('boss-bestiary-art');}
        if(!detail.querySelector('.boss-bestiary-lore')){
          const section=document.createElement('div');section.className='best-section boss-bestiary-lore';
          section.innerHTML=`<b>${boss.region} • Regional Boss</b><p><strong>Signature:</strong> ${boss.signature}</p><p>${boss.text}</p>`;
          detail.appendChild(section);
        }
      }
    }
    return r;
  };

  const style=document.createElement('style');style.textContent=`
    .boss-bestiary-row{border-color:#d8aa55!important;background:linear-gradient(90deg,#3b281a88,#171d19)!important}.boss-bestiary-row .tag{color:#ffd879!important;border-color:#d8aa5577!important}.boss-bestiary-row img{object-fit:contain!important;background:radial-gradient(circle,#253026 0,#101511 72%)!important}.boss-bestiary-art{object-fit:contain!important;filter:drop-shadow(0 10px 18px #0009)}.boss-bestiary-lore strong{color:#e8c875}
  `;document.head.appendChild(style);
  document.documentElement.dataset.bossBestiary='ready-10';
  try{renderBestiary();}catch(_){ }
})();