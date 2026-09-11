// BeastBorn illustrated home screen v2
(() => {
  if (window.__beastbornIllustratedHomeV2) return;
  window.__beastbornIllustratedHomeV2 = true;

  const title = document.querySelector('#titleScreen');
  const shell = title?.querySelector('.title-shell');
  const menu = title?.querySelector('.title-menu');
  const enter = title?.querySelector('#newGameBtn');
  if (!title || !shell || !menu || !enter) return;

  title.classList.add('illustrated-home');

  // Apply the final illustrated background from complete base64 data so there is
  // no dependency on a partially uploaded binary asset.
  fetch('assets/home-bg/beastborn-home-base64.txt?v=20260911-2',{cache:'no-store'})
    .then(r=>r.ok?r.text():Promise.reject(new Error('home art data failed')))
    .then(b64=>{
      const clean=b64.trim();
      if(clean) shell.style.setProperty('background-image',`url("data:image/webp;base64,${clean}")`,'important');
      document.documentElement.dataset.beastbornHomeArt='v2-ready';
    })
    .catch(err=>console.warn('BeastBorn home art fallback',err));

  const style = document.createElement('style');
  style.id = 'beastbornIllustratedHomeStyle';
  style.textContent = `
    #titleScreen.illustrated-home{
      padding:0!important;width:100%!important;min-height:100svh!important;height:100svh!important;
      align-items:stretch!important;justify-content:stretch!important;overflow:hidden!important;background:#06130d!important;
    }
    #titleScreen.illustrated-home .title-shell{
      position:relative!important;width:100%!important;max-width:none!important;height:100svh!important;min-height:100svh!important;
      margin:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;background-color:#06130d!important;
      background-position:center center!important;background-size:cover!important;background-repeat:no-repeat!important;box-shadow:none!important;
    }
    #titleScreen.illustrated-home .title-shell:before{
      content:""!important;position:absolute!important;inset:0!important;z-index:2!important;pointer-events:none!important;
      background:linear-gradient(180deg,transparent 63%,rgba(2,10,6,.08) 75%,rgba(2,10,6,.62) 100%)!important;
    }
    #titleScreen.illustrated-home .title-shell:after{display:none!important}
    #titleScreen.illustrated-home .title-sky,
    #titleScreen.illustrated-home .title-brand,
    #titleScreen.illustrated-home .title-sanctuary,
    #titleScreen.illustrated-home .title-secondary-grid,
    #titleScreen.illustrated-home .save-summary-card,
    #titleScreen.illustrated-home .title-motto{display:none!important}
    #titleScreen.illustrated-home .title-menu{
      position:absolute!important;left:50%!important;right:auto!important;top:auto!important;
      bottom:max(24px,env(safe-area-inset-bottom))!important;width:min(620px,calc(100% - 34px))!important;
      margin:0!important;padding:0!important;transform:translateX(-50%)!important;z-index:8!important;
    }
    #titleScreen.illustrated-home #newGameBtn{
      width:100%!important;min-height:72px!important;padding:12px 18px!important;border:1px solid rgba(240,215,123,.72)!important;
      border-radius:16px!important;background:linear-gradient(180deg,rgba(49,91,63,.93),rgba(16,49,32,.96))!important;
      color:#f7e9b2!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),0 7px 0 rgba(4,17,10,.88),0 16px 36px rgba(0,0,0,.55),0 0 30px rgba(111,220,142,.12)!important;
      backdrop-filter:blur(9px)!important;-webkit-backdrop-filter:blur(9px)!important;display:grid!important;
      grid-template-columns:42px minmax(0,1fr) 30px!important;align-items:center!important;text-align:left!important;cursor:pointer!important;
    }
    #titleScreen.illustrated-home #newGameBtn .menu-icon{width:38px!important;height:38px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:rgba(6,31,18,.88)!important;color:#f2d56f!important;font-size:20px!important;box-shadow:inset 0 0 14px rgba(125,231,154,.14)!important}
    #titleScreen.illustrated-home #newGameBtn b{display:block!important;font-family:Georgia,serif!important;font-size:20px!important;letter-spacing:.065em!important;line-height:1.05!important}
    #titleScreen.illustrated-home #newGameBtn small{display:block!important;margin-top:4px!important;color:#b8c8bc!important;font-size:10px!important}
    #titleScreen.illustrated-home #newGameBtn .menu-arrow{color:#edd273!important;font-size:31px!important;text-align:right!important}
    #titleScreen.illustrated-home #newGameBtn:active{transform:translateY(3px)!important}
    @media(max-width:600px){
      #titleScreen.illustrated-home .title-menu{width:calc(100% - 26px)!important;bottom:max(18px,env(safe-area-inset-bottom))!important}
      #titleScreen.illustrated-home #newGameBtn{min-height:66px!important;border-radius:14px!important;grid-template-columns:38px minmax(0,1fr) 26px!important;padding:10px 15px!important}
      #titleScreen.illustrated-home #newGameBtn .menu-icon{width:34px!important;height:34px!important;font-size:18px!important}
      #titleScreen.illustrated-home #newGameBtn b{font-size:17px!important}
      #titleScreen.illustrated-home #newGameBtn small{font-size:9px!important}
    }
  `;
  document.head.appendChild(style);
})();
