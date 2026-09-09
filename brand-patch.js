// BEASTBORN title and brand redesign v1
(() => {
  document.title='BeastBorn';

  const title=document.querySelector('#titleScreen');
  if(title){
    const brand=title.querySelector('.title-brand');
    if(brand){
      const over=brand.querySelector('.title-overline');
      const h1=brand.querySelector('h1');
      const tag=brand.querySelector('.title-tagline');
      if(over)over.textContent='AWAKEN THE WILD';
      if(h1)h1.textContent='BEASTBORN';
      if(tag)tag.textContent='HATCH • EVOLVE • DEFEND';
    }

    const sanctuary=title.querySelector('.title-sanctuary');
    if(sanctuary && !sanctuary.querySelector('.title-beast-centre')){
      const centre=document.createElement('div');
      centre.className='title-beast title-beast-centre';
      centre.innerHTML='<img src="assets/pixel/sprigpaw.png" alt="Sprigpaw">';
      const right=sanctuary.querySelector('.title-beast-right');
      sanctuary.insertBefore(centre,right||null);
    }

    const left=title.querySelector('.left-banner');
    const right=title.querySelector('.right-banner');
    if(left)left.innerHTML='BOND<br>WITH THE WILD<span>RAISE YOUR LEGENDS</span>';
    if(right)right.innerHTML='DEFEND<br>THE ANCIENT CORE<span>FORGE YOUR PACK</span>';

    const primary=title.querySelector('#newGameBtn');
    if(primary){
      primary.innerHTML='<span class="menu-icon">✦</span><span><b>ENTER SANCTUARY</b><small>Continue your BeastBorn journey</small></span><span class="menu-arrow">›</span>';
    }

    const motto=title.querySelector('.title-motto');
    if(motto)motto.textContent='BORN OF THE WILD • BOUND TO DEFEND';
  }

  document.querySelectorAll('.mini-logo').forEach(el=>el.textContent='BEASTBORN');
  document.querySelectorAll('.setting-card').forEach(card=>{
    const b=card.querySelector('b');
    if(b&&b.textContent.trim()==='About Beastward')b.textContent='About BeastBorn';
  });
  document.querySelectorAll('p').forEach(p=>{
    if(p.textContent.includes('presentation of Beastward'))p.textContent=p.textContent.replace('Beastward','BeastBorn');
  });

  const style=document.createElement('style');
  style.textContent=`
    #titleScreen{padding:0!important;min-height:100svh;align-items:stretch;justify-content:stretch;background:#07100c!important;overflow:hidden}
    #titleScreen .title-shell{position:relative;width:100%;min-height:100svh;border:0;border-radius:0;overflow:hidden;background:
      radial-gradient(circle at 50% 43%,rgba(95,232,152,.22),transparent 18%),
      radial-gradient(circle at 50% 80%,rgba(227,177,66,.16),transparent 28%),
      linear-gradient(180deg,#0e241b 0%,#102f22 35%,#0b1d15 68%,#050b08 100%)}
    #titleScreen .title-shell:before{content:"";position:absolute;inset:0;pointer-events:none;background:
      linear-gradient(180deg,rgba(2,8,5,.05),rgba(2,8,5,.4)),
      radial-gradient(ellipse at 18% 58%,rgba(38,111,70,.34),transparent 25%),
      radial-gradient(ellipse at 82% 58%,rgba(28,88,61,.3),transparent 24%);z-index:0}
    #titleScreen .title-shell:after{content:"";position:absolute;left:50%;bottom:172px;width:min(760px,82vw);height:180px;transform:translateX(-50%);background:radial-gradient(ellipse at center,rgba(128,231,151,.18),transparent 68%);filter:blur(8px);pointer-events:none;z-index:1}

    #titleScreen .title-sky{position:absolute;inset:0;z-index:0;overflow:hidden}
    #titleScreen .mountain{opacity:.52;filter:drop-shadow(0 14px 18px #0008)}
    #titleScreen .sun-glow{position:absolute;left:50%;top:29%;width:320px;height:320px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(133,255,174,.18),rgba(78,180,114,.07) 38%,transparent 70%);filter:blur(5px)}
    #titleScreen .ruin-column{opacity:.5}

    #titleScreen .title-brand{position:relative;z-index:5;padding:max(34px,env(safe-area-inset-top)) 20px 0;text-align:center}
    #titleScreen .crest-orb{width:58px;height:58px;margin:0 auto 12px;border:1px solid #e3c76899;background:radial-gradient(circle,#244c34,#0c1d14 70%);box-shadow:0 0 32px #5bdb8c35,inset 0 0 18px #d6bd5630;transform:rotate(45deg);display:grid;place-items:center}
    #titleScreen .crest-orb span{transform:rotate(-45deg);font-size:27px;color:#f1d778;text-shadow:0 0 14px #e7cb6b88}
    #titleScreen .title-overline{font-size:11px;letter-spacing:.42em;color:#8fcfa5;font-weight:900;margin-bottom:5px}
    #titleScreen .title-brand h1{margin:0;font-family:Georgia,serif;font-size:clamp(58px,10vw,112px);line-height:.92;letter-spacing:.035em;color:#ecd06b;text-shadow:0 2px 0 #6d511d,0 7px 0 #2b2313,0 16px 34px #000b,0 0 42px #d6b94922}
    #titleScreen .title-tagline{margin-top:11px;font:800 12px Georgia,serif;letter-spacing:.28em;color:#d8d0aa}

    #titleScreen .title-sanctuary{position:absolute!important;left:0;right:0;top:238px;bottom:190px;margin:0!important;height:auto!important;min-height:0!important;overflow:visible!important;z-index:2}
    #titleScreen .portal-arch{position:absolute;left:50%;top:48%;width:260px;height:300px;transform:translate(-50%,-50%);border:2px solid #98d8a15e;border-bottom:0;border-radius:50% 50% 12% 12%/38% 38% 8% 8%;background:radial-gradient(ellipse at 50% 54%,rgba(110,242,151,.18),rgba(16,68,42,.08) 46%,transparent 67%);box-shadow:0 0 45px #49bb7130,inset 0 0 40px #83e79f12}
    #titleScreen .portal-arch:before,#titleScreen .portal-arch:after{content:"";position:absolute;inset:18px;border:1px solid #dbc66d33;border-bottom:0;border-radius:inherit}
    #titleScreen .portal-core{position:absolute;left:50%;top:43%;transform:translate(-50%,-50%);font-size:54px;color:#b5f2bf;text-shadow:0 0 12px #8bf3a0,0 0 36px #4acb72,0 0 70px #f2c95666;animation:beastbornCore 3.2s ease-in-out infinite}
    @keyframes beastbornCore{50%{transform:translate(-50%,-50%) scale(1.08);filter:brightness(1.18)}}

    #titleScreen .title-beast{position:absolute!important;bottom:0!important;top:auto!important;z-index:4!important;display:grid;place-items:end center;filter:drop-shadow(0 18px 17px #000a)}
    #titleScreen .title-beast img{width:100%;height:100%;object-fit:contain;image-rendering:auto;transform-origin:50% 100%}
    #titleScreen .title-beast-left{left:calc(50% - 250px)!important;width:200px!important;height:200px!important;transform:rotate(-3deg)}
    #titleScreen .title-beast-centre{left:50%!important;width:230px!important;height:230px!important;transform:translateX(-50%) translateY(-10px);z-index:5!important}
    #titleScreen .title-beast-right{right:calc(50% - 250px)!important;left:auto!important;width:200px!important;height:200px!important;transform:rotate(3deg)}
    #titleScreen .title-beast-centre:after{content:"";position:absolute;left:50%;bottom:3px;width:170px;height:26px;transform:translateX(-50%);border-radius:50%;background:#80df9e20;filter:blur(8px);z-index:-1}

    #titleScreen .title-banner{position:absolute!important;top:50%!important;width:175px!important;padding:10px 12px!important;border-top:1px solid #dfca713b;border-bottom:1px solid #dfca711f;background:linear-gradient(90deg,transparent,#10271db8,transparent)!important;color:#e6d996!important;font:800 10px Georgia,serif!important;letter-spacing:.12em!important;line-height:1.35!important;text-align:center!important;opacity:.82}
    #titleScreen .left-banner{left:max(22px,5vw)!important;right:auto!important;transform:translateY(-50%)!important}
    #titleScreen .right-banner{right:max(22px,5vw)!important;left:auto!important;transform:translateY(-50%)!important}
    #titleScreen .title-banner span{display:block;margin-top:4px;color:#8fc7a2;font-size:7px;letter-spacing:.1em}

    #titleScreen .title-menu{position:absolute;left:50%;bottom:max(18px,env(safe-area-inset-bottom));width:min(680px,calc(100% - 28px));transform:translateX(-50%);z-index:8;text-align:center}
    #titleScreen .title-primary{width:100%;min-height:72px;padding:11px 19px;border:1px solid #f0d77b88;border-radius:14px;background:linear-gradient(180deg,#355941,#1c3828);color:#f5e8b1;box-shadow:inset 0 0 0 1px #ffffff10,0 5px 0 #09170f,0 14px 30px #0008,0 0 28px #6dda8d12;display:grid;grid-template-columns:42px 1fr 30px;align-items:center;text-align:left;cursor:pointer}
    #titleScreen .title-primary:hover{filter:brightness(1.1);border-color:#f0d77bcc}
    #titleScreen .title-primary .menu-icon{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#0e281b;color:#edd16c;font-size:21px;box-shadow:inset 0 0 13px #7de79a1f}
    #titleScreen .title-primary b{display:block;font-family:Georgia,serif;font-size:20px;letter-spacing:.07em}
    #titleScreen .title-primary small{display:block;color:#aebdaf;font-size:10px;margin-top:3px}
    #titleScreen .menu-arrow{font-size:30px;color:#e7cd70;text-align:right}

    #titleScreen .title-secondary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:9px}
    #titleScreen .title-tile{min-height:50px;padding:8px;border:1px solid #455b4c;border-radius:10px;background:#0e1d16dc;color:#d9ddcf;display:grid;grid-template-columns:24px 1fr;grid-template-rows:auto auto;text-align:left;column-gap:6px;cursor:pointer}
    #titleScreen .title-tile:hover{background:#162a20;border-color:#76886e}
    #titleScreen .title-tile .ui-glyph{grid-row:1/3;font-size:20px;align-self:center;color:#d9bd5f}
    #titleScreen .title-tile b{font-size:10px;align-self:end}
    #titleScreen .title-tile small{font-size:7px;color:#809187;align-self:start;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    #titleScreen .save-summary-card{display:none!important}
    #titleScreen .title-motto{margin-top:10px;color:#6f8b79;font-size:8px;letter-spacing:.26em;font-weight:800}

    @media(max-width:760px){
      #titleScreen .title-brand{padding-top:max(20px,env(safe-area-inset-top))}
      #titleScreen .crest-orb{width:44px;height:44px;margin-bottom:8px}
      #titleScreen .crest-orb span{font-size:21px}
      #titleScreen .title-overline{font-size:8px;letter-spacing:.3em}
      #titleScreen .title-brand h1{font-size:clamp(46px,15vw,68px)}
      #titleScreen .title-tagline{font-size:8px;letter-spacing:.2em;margin-top:7px}
      #titleScreen .title-sanctuary{top:165px;bottom:181px}
      #titleScreen .portal-arch{width:190px;height:225px;top:48%}
      #titleScreen .portal-core{font-size:40px}
      #titleScreen .title-beast-left{left:calc(50% - 155px)!important;width:125px!important;height:125px!important}
      #titleScreen .title-beast-centre{width:150px!important;height:150px!important;transform:translateX(-50%) translateY(-8px)}
      #titleScreen .title-beast-right{right:calc(50% - 155px)!important;width:125px!important;height:125px!important}
      #titleScreen .title-banner{display:none!important}
      #titleScreen .title-menu{width:calc(100% - 22px);bottom:max(10px,env(safe-area-inset-bottom))}
      #titleScreen .title-primary{min-height:61px;border-radius:12px;grid-template-columns:36px 1fr 24px}
      #titleScreen .title-primary .menu-icon{width:31px;height:31px;font-size:17px}
      #titleScreen .title-primary b{font-size:15px}
      #titleScreen .title-primary small{font-size:8px}
      #titleScreen .title-secondary-grid{gap:5px;margin-top:7px}
      #titleScreen .title-tile{min-height:45px;padding:6px;grid-template-columns:1fr;grid-template-rows:20px auto}
      #titleScreen .title-tile .ui-glyph{grid-row:auto;text-align:center;font-size:16px}
      #titleScreen .title-tile b{text-align:center;font-size:8px}
      #titleScreen .title-tile small{display:none}
      #titleScreen .title-motto{font-size:6px;margin-top:7px}
    }

    @media(max-height:700px){
      #titleScreen .crest-orb{display:none}
      #titleScreen .title-brand{padding-top:18px}
      #titleScreen .title-brand h1{font-size:54px}
      #titleScreen .title-sanctuary{top:110px;bottom:160px}
      #titleScreen .title-beast-left,#titleScreen .title-beast-right{width:105px!important;height:105px!important}
      #titleScreen .title-beast-centre{width:125px!important;height:125px!important}
      #titleScreen .title-secondary-grid{display:none}
    }
  `;
  document.head.appendChild(style);
})();
