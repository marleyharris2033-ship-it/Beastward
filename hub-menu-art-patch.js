// Beastward illustrated Sanctuary menu cards v1
(()=>{
 const V='20260915-hub-menu-art-1';
 const SRC=`assets/sheets/CF905EF0-87FA-4656-A9DF-480B420F9E7A.png?v=${V}`;
 const cuts={
  campaign:[18,48,742,246], hatchery:[778,48,742,246],
  den:[18,305,742,246], quests:[778,305,742,246],
  bestiary:[18,560,742,230], warden:[778,560,742,230],
  master:[160,798,1215,195]
 };
 const art={};
 function crop(img,r){const [x,y,w,h]=r,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(img,x,y,w,h,0,0,w,h);return c.toDataURL('image/png')}
 function applyCard(el,key){if(!el||!art[key])return;el.classList.add('illustrated-menu-card');el.style.setProperty('--menu-art',`url("${art[key]}")`);el.dataset.menuArt=key}
 function apply(){
  applyCard(document.querySelector('#campaignBtn'),'campaign');
  applyCard(document.querySelector('#hatcheryBtn'),'hatchery');
  applyCard(document.querySelector('#beastsBtn'),'den');
  applyCard(document.querySelector('#questsHubBtn'),'quests');
  applyCard(document.querySelector('#bestiaryBtn'),'bestiary');
  applyCard(document.querySelector('.warden-hub-card'),'warden');
  const trials=document.querySelector('#wardenTrialsPanel');
  if(trials&&art.master){trials.classList.add('illustrated-master-card');trials.style.setProperty('--master-art',`url("${art.master}")`)}
 }
 const style=document.createElement('style');style.id='hubMenuArtStyles';style.textContent=`
 #hubScreen .hub-grid{gap:14px!important}
 #hubScreen .hub-card.illustrated-menu-card{position:relative!important;display:block!important;width:100%!important;min-height:0!important;height:auto!important;aspect-ratio:3.02/1!important;padding:0!important;overflow:hidden!important;border:0!important;border-radius:18px!important;background-image:var(--menu-art)!important;background-size:100% 100%!important;background-position:center!important;background-repeat:no-repeat!important;box-shadow:0 12px 28px #0005!important;cursor:pointer!important;touch-action:manipulation!important}
 #hubScreen .hub-card.illustrated-menu-card>*{visibility:hidden!important;pointer-events:none!important}
 #hubScreen .hub-card.illustrated-menu-card:before,#hubScreen .hub-card.illustrated-menu-card:after{content:none!important;display:none!important}
 #hubScreen .hub-card.illustrated-menu-card:active{transform:scale(.985)!important;filter:brightness(.92)!important}
 #hubScreen .warden-hub-card.illustrated-menu-card{grid-column:1/-1!important}
 #wardenTrialsPanel.illustrated-master-card{position:relative!important;padding-top:clamp(105px,15.8vw,190px)!important;overflow:hidden!important}
 #wardenTrialsPanel.illustrated-master-card>header{position:absolute!important;left:0!important;right:0!important;top:0!important;height:clamp(92px,15.2vw,180px)!important;background-image:var(--master-art)!important;background-size:100% 100%!important;background-position:center!important;background-repeat:no-repeat!important;border-radius:16px 16px 10px 10px!important}
 #wardenTrialsPanel.illustrated-master-card>header>*{visibility:hidden!important}
 @media(max-width:760px){#hubScreen .hub-grid{grid-template-columns:1fr!important;gap:12px!important}#hubScreen .hub-card.illustrated-menu-card{grid-column:auto!important;aspect-ratio:3.02/1!important;border-radius:15px!important}#hubScreen .warden-hub-card.illustrated-menu-card{grid-column:auto!important}#wardenTrialsPanel.illustrated-master-card{padding-top:96px!important}#wardenTrialsPanel.illustrated-master-card>header{height:88px!important}}
 `;document.head.appendChild(style);
 const img=new Image();img.onload=()=>{Object.entries(cuts).forEach(([k,r])=>art[k]=crop(img,r));apply();new MutationObserver(()=>apply()).observe(document.querySelector('#hubScreen')||document.body,{childList:true,subtree:true});document.documentElement.dataset.hubMenuArt='v1'};img.src=SRC;
})();