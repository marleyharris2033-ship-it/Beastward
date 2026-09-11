// BeastBorn illustrated home screen v4
(()=>{
 if(window.__beastbornIllustratedHomeV4)return;window.__beastbornIllustratedHomeV4=true;
 const t=document.querySelector('#titleScreen'),s=t?.querySelector('.title-shell'),m=t?.querySelector('.title-menu'),b=t?.querySelector('#newGameBtn');if(!t||!s||!m||!b)return;
 t.classList.add('illustrated-home');
 let art=s.querySelector('.beastborn-home-art');
 if(!art){
   art=document.createElement('img');
   art.className='beastborn-home-art';
   art.alt='';
   art.setAttribute('aria-hidden','true');
   art.src='assets/home-bg/D882EEB7-3A80-4526-872C-293D0387E9E3.png?v=20260911-4';
   s.insertBefore(art,s.firstChild);
 }
 const st=document.createElement('style');st.textContent=`
 #titleScreen.illustrated-home{padding:0!important;width:100%!important;height:100svh!important;min-height:100svh!important;overflow:hidden!important;background:#06130d!important}
 #titleScreen.illustrated-home .title-shell{position:relative!important;width:100%!important;max-width:none!important;height:100svh!important;min-height:100svh!important;margin:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;background:#06130d!important;box-shadow:none!important}
 #titleScreen.illustrated-home .beastborn-home-art{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;display:block!important;z-index:0!important;pointer-events:none!important;user-select:none!important;-webkit-user-drag:none!important}
 #titleScreen.illustrated-home .title-shell:before{content:""!important;position:absolute!important;inset:0!important;z-index:2!important;pointer-events:none!important;background:linear-gradient(180deg,transparent 72%,rgba(2,10,6,.03) 81%,rgba(2,10,6,.46) 100%)!important}
 #titleScreen.illustrated-home .title-shell:after,#titleScreen.illustrated-home .title-sky,#titleScreen.illustrated-home .title-brand,#titleScreen.illustrated-home .title-sanctuary,#titleScreen.illustrated-home .title-secondary-grid,#titleScreen.illustrated-home .save-summary-card,#titleScreen.illustrated-home .title-motto{display:none!important}
 #titleScreen.illustrated-home .title-menu{position:absolute!important;left:50%!important;right:auto!important;top:auto!important;bottom:max(24px,env(safe-area-inset-bottom))!important;width:min(620px,calc(100% - 34px))!important;margin:0!important;padding:0!important;transform:translateX(-50%)!important;z-index:8!important}
 #titleScreen.illustrated-home #newGameBtn{width:100%!important;min-height:72px!important;padding:12px 18px!important;border:1px solid rgba(240,215,123,.78)!important;border-radius:16px!important;background:linear-gradient(180deg,rgba(49,91,63,.94),rgba(16,49,32,.97))!important;color:#f7e9b2!important;box-shadow:inset 0 0 0 1px #ffffff10,0 7px 0 #04110ee0,0 16px 36px #0009!important;display:grid!important;grid-template-columns:42px minmax(0,1fr) 30px!important;align-items:center!important;text-align:left!important}
 #titleScreen.illustrated-home #newGameBtn .menu-icon{width:38px!important;height:38px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#061f12e8!important;color:#f2d56f!important;font-size:20px!important}
 #titleScreen.illustrated-home #newGameBtn b{display:block!important;font-family:Georgia,serif!important;font-size:20px!important;letter-spacing:.065em!important;line-height:1.05!important}
 #titleScreen.illustrated-home #newGameBtn small{display:block!important;margin-top:4px!important;color:#b8c8bc!important;font-size:10px!important}
 #titleScreen.illustrated-home #newGameBtn .menu-arrow{color:#edd273!important;font-size:31px!important;text-align:right!important}
 @media(max-width:600px){#titleScreen.illustrated-home .title-menu{width:calc(100% - 26px)!important;bottom:max(18px,env(safe-area-inset-bottom))!important}#titleScreen.illustrated-home #newGameBtn{min-height:66px!important;padding:10px 15px!important;grid-template-columns:38px minmax(0,1fr) 26px!important}#titleScreen.illustrated-home #newGameBtn b{font-size:17px!important}#titleScreen.illustrated-home #newGameBtn small{font-size:9px!important}}
 `;document.head.appendChild(st);document.documentElement.dataset.beastbornHomeArt='v4';
})();