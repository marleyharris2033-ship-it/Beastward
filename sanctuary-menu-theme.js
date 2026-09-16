// Shared illustrated sanctuary presentation. Gameplay and save data are untouched.
(()=>{
 const link=document.createElement('link');link.rel='stylesheet';link.href='sanctuary-menu-theme.css?v=20260916-2';document.head.appendChild(link);
 const cuts={campaign:[18,48,742,246],hatchery:[778,48,742,246],den:[18,305,742,246],quests:[778,305,742,246],bestiary:[18,560,742,230],warden:[778,560,742,230]};
 const headers=[['#campaignScreen .campaign-panel','campaign'],['#hatcheryScreen .hatchery-panel','hatchery'],['#beastsScreen .den-panel','den'],['#bestiaryScreen .bestiary-panel','bestiary'],['.quest-shell','quests'],['.warden-top','warden']];
 function decorate(){
  for(const [selector,key] of headers){const panel=document.querySelector(selector);if(!panel||panel.querySelector(':scope > .sanctuary-banner'))continue;const banner=document.createElement('div');banner.className='sanctuary-banner';banner.setAttribute('aria-hidden','true');banner.style.setProperty('--banner',`var(--sanctuary-${key})`);const back=panel.querySelector(':scope > .back,:scope > .warden-back,:scope > .quest-close');if(back)back.after(banner);else panel.prepend(banner);}
  const labels={campaignBtn:'Campaign',endlessModeBtn:'Endless Mode',hatcheryBtn:'Hatchery',beastsBtn:'Beast Vault',questsHubBtn:'Warden Quests',bestiaryBtn:'Bestiary',wardenBtn:'Warden Skill Tree',questCloseBtn:'Close quests',bestiarySearch:'Search the bestiary'};
  for(const [id,label] of Object.entries(labels)){const el=document.getElementById(id);if(el&&el.getAttribute('aria-label')!==label)el.setAttribute('aria-label',label);}
 }
 const img=new Image();img.onload=()=>{for(const [key,[x,y,w,h]] of Object.entries(cuts)){const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,x,y,w,h,0,0,w,h);document.documentElement.style.setProperty(`--sanctuary-${key}`,`url("${c.toDataURL()}")`);}document.documentElement.classList.add('sanctuary-art-ready');};img.src='assets/sheets/CF905EF0-87FA-4656-A9DF-480B420F9E7A.png';
 // A text-free section of the campaign illustration supplies the woodland scenery.
 const scene=new Image();scene.onload=()=>{const c=document.createElement('canvas');c.width=320;c.height=180;c.getContext('2d').drawImage(scene,412,85,320,180,0,0,320,180);document.documentElement.style.setProperty('--sanctuary-scene',`url("${c.toDataURL()}")`);};scene.src=img.src;
 decorate();let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;decorate();});}).observe(document.body,{childList:true,subtree:true});
})();
