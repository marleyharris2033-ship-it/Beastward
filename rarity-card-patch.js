// Beastward Beast Vault rarity card styling v1
(()=>{
  function rarityFor(species){
    if(Array.isArray(epicPool)&&epicPool.includes(species)) return 'epic';
    if(Array.isArray(rarePool)&&rarePool.includes(species)) return 'rare';
    return 'common';
  }

  function orderedInstances(){
    const list=[...(save.beastInstances||[])].filter(i=>i&&beasts[i.species]);
    if(save.denSort==='level'){
      list.sort((a,b)=>(b.level||1)-(a.level||1)||beasts[a.species].name.localeCompare(beasts[b.species].name));
    }else{
      list.sort((a,b)=>beasts[a.species].name.localeCompare(beasts[b.species].name)||(b.level||1)-(a.level||1));
    }
    return list;
  }

  function decorate(){
    const cards=[...document.querySelectorAll('#beastCollection .beast-pc-slot')];
    if(!cards.length)return;
    const list=orderedInstances();
    cards.forEach((card,index)=>{
      card.classList.remove('rarity-common','rarity-rare','rarity-epic');
      const i=list[index];
      if(!i)return;
      const rarity=rarityFor(i.species);
      card.classList.add('rarity-'+rarity);
      card.dataset.rarity=rarity;
    });
  }

  const oldRender=window.renderCollection;
  if(typeof oldRender==='function'){
    window.renderCollection=function(){
      const result=oldRender.apply(this,arguments);
      decorate();
      return result;
    };
  }

  const style=document.createElement('style');
  style.textContent=`
    #beastCollection .beast-pc-slot{position:relative;overflow:hidden;transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}
    #beastCollection .beast-pc-slot:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.72;z-index:0}
    #beastCollection .beast-pc-slot>*{position:relative;z-index:1}
    #beastCollection .beast-pc-slot.rarity-common{background:linear-gradient(155deg,#183325 0%,#10261b 68%,#0b1d14 100%);border-color:#4f8060}
    #beastCollection .beast-pc-slot.rarity-common:before{background:radial-gradient(circle at 50% 20%,rgba(89,190,116,.18),transparent 54%)}
    #beastCollection .beast-pc-slot.rarity-rare{background:linear-gradient(155deg,#17324c 0%,#11283d 68%,#0c1c2e 100%);border-color:#4f86c7;box-shadow:inset 0 0 0 1px rgba(100,164,231,.08)}
    #beastCollection .beast-pc-slot.rarity-rare:before{background:radial-gradient(circle at 50% 18%,rgba(83,158,235,.26),transparent 56%)}
    #beastCollection .beast-pc-slot.rarity-epic{background:linear-gradient(155deg,#38204e 0%,#28183c 66%,#1b102a 100%);border-color:#9a65ce;box-shadow:inset 0 0 0 1px rgba(190,123,242,.1),0 0 18px rgba(123,66,171,.12)}
    #beastCollection .beast-pc-slot.rarity-epic:before{background:radial-gradient(circle at 50% 18%,rgba(188,104,239,.28),transparent 58%)}
    #beastCollection .beast-pc-slot.rarity-common .beast-pc-sprite{background:linear-gradient(180deg,rgba(35,82,53,.5),rgba(5,20,12,.74))}
    #beastCollection .beast-pc-slot.rarity-rare .beast-pc-sprite{background:linear-gradient(180deg,rgba(35,76,118,.56),rgba(7,19,36,.78))}
    #beastCollection .beast-pc-slot.rarity-epic .beast-pc-sprite{background:linear-gradient(180deg,rgba(83,44,116,.58),rgba(25,9,38,.8))}
    #beastCollection .beast-pc-slot.rarity-common b{color:#e8d477}
    #beastCollection .beast-pc-slot.rarity-rare b{color:#9dccff}
    #beastCollection .beast-pc-slot.rarity-epic b{color:#d7a7ff}
  `;
  document.head.appendChild(style);

  try{decorate()}catch(e){}
  setTimeout(decorate,100);
  document.documentElement.dataset.rarityCards='v1';
})();