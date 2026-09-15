// Beastward illustrated Sanctuary topbar v2
(()=>{
 const V='20260915-topbar-art-2';
 const SRC=`assets/sheets/58DDA63A-8BB0-4AED-A748-67806BD05417.png?v=${V}`;
 const bar=document.querySelector('#hubScreen .themed-topbar');
 if(!bar)return;
 bar.classList.add('illustrated-topbar');
 const brand=bar.firstElementChild;
 const actions=bar.querySelector('.topbar-actions');
 const saves=bar.querySelector('#switchSaveBtn');
 const essence=bar.querySelector('.currency');
 if(brand)brand.classList.add('topbar-live-brand');
 if(actions)actions.classList.add('topbar-live-actions');
 if(saves)saves.classList.add('topbar-live-save');
 if(essence)essence.classList.add('topbar-live-essence');
 const st=document.createElement('style');st.id='hubTopbarArtStyles';st.textContent=`
 #hubScreen .themed-topbar.illustrated-topbar{position:relative!important;width:100%!important;min-height:0!important;aspect-ratio:3.2/1!important;padding:0!important;overflow:hidden!important;border:0!important;border-radius:0!important;background:transparent url('${SRC}') center/100% 100% no-repeat!important;box-shadow:none!important;display:block!important}
 #hubScreen .illustrated-topbar .topbar-live-brand{display:none!important}
 #hubScreen .illustrated-topbar .topbar-live-actions{position:absolute!important;inset:0!important;display:block!important;pointer-events:none!important}
 #hubScreen .illustrated-topbar .topbar-live-save{position:absolute!important;left:10.2%!important;bottom:17.5%!important;width:21%!important;height:20%!important;margin:0!important;padding:0 1%!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:0!important;box-shadow:none!important;color:#fff7dc!important;font-weight:800!important;font-size:clamp(12px,2.15vw,24px)!important;pointer-events:auto!important;cursor:pointer!important;touch-action:manipulation!important}
 #hubScreen .illustrated-topbar .topbar-live-essence{position:absolute!important;right:8.7%!important;bottom:17.5%!important;width:22.5%!important;height:20%!important;margin:0!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:0!important;box-shadow:none!important;color:#fff0a0!important;font-weight:800!important;font-size:clamp(12px,2.05vw,23px)!important;white-space:nowrap!important;pointer-events:none!important}
 #hubScreen .illustrated-topbar .topbar-live-save:active{transform:scale(.96)!important;filter:brightness(.9)!important}
 @media(max-width:700px){#hubScreen .illustrated-topbar .topbar-live-save{font-size:clamp(11px,3.2vw,18px)!important}#hubScreen .illustrated-topbar .topbar-live-essence{font-size:clamp(11px,3vw,17px)!important}}
 `;document.head.appendChild(st);document.documentElement.dataset.hubTopbarArt='v2';
})();