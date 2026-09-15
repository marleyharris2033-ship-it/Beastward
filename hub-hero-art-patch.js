// Beastward hub hero artwork v1
(()=>{
 const banner=document.querySelector('#hubScreen .home-banner');if(!banner)return;
 banner.classList.add('illustrated-hub-hero');
 banner.setAttribute('aria-label','Hatch. Evolve. Defend. A Wilder Tomorrow Awaits.');
 const st=document.createElement('style');st.textContent=`
 #hubScreen .home-banner.illustrated-hub-hero{position:relative!important;min-height:0!important;height:auto!important;aspect-ratio:1.7777778!important;padding:0!important;overflow:hidden!important;border:1px solid rgba(229,195,91,.62)!important;border-radius:22px!important;background:#10271b url('assets/sheets/669232EB-021E-45A8-960F-9A0674D66833.png?v=20260915-hubhero-1') center center/cover no-repeat!important;box-shadow:0 14px 32px rgba(0,0,0,.28),inset 0 0 0 1px rgba(255,255,255,.05)!important}
 #hubScreen .home-banner.illustrated-hub-hero .home-banner-copy,#hubScreen .home-banner.illustrated-hub-hero .home-beasts{display:none!important}
 @media(max-width:700px){#hubScreen .home-banner.illustrated-hub-hero{width:100%!important;aspect-ratio:1.7777778!important;border-radius:18px!important}}
 `;document.head.appendChild(st);document.documentElement.dataset.hubHeroArt='v1';
})();