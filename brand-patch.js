// BEASTBORN title screen artwork + mobile layout fix
(() => {
  document.title = 'BeastBorn';

  const title = document.querySelector('#titleScreen');
  if (title) {
    const over = title.querySelector('.title-overline');
    const h1 = title.querySelector('.title-brand h1');
    const tag = title.querySelector('.title-tagline');
    const primary = title.querySelector('#newGameBtn');
    const motto = title.querySelector('.title-motto');

    if (over) over.textContent = 'AWAKEN THE WILD';
    if (h1) h1.textContent = 'BEASTBORN';
    if (tag) tag.textContent = 'HATCH • EVOLVE • DEFEND';
    if (motto) motto.textContent = 'BORN OF THE WILD • BOUND TO DEFEND';
    if (primary) {
      primary.innerHTML = '<span class="menu-icon">✦</span><span><b>ENTER SANCTUARY</b><small>Continue your BeastBorn journey</small></span><span class="menu-arrow">›</span>';
    }
  }

  document.querySelectorAll('.mini-logo').forEach(el => el.textContent = 'BEASTBORN');
  document.querySelectorAll('.setting-card').forEach(card => {
    const b = card.querySelector('b');
    if (b && b.textContent.trim() === 'About Beastward') b.textContent = 'About BeastBorn';
  });

  const style = document.createElement('style');
  style.id = 'beastborn-title-art-fix';
  style.textContent = `
    #titleScreen {
      padding: 0 !important;
      width: 100% !important;
      min-height: 100svh !important;
      height: 100svh !important;
      overflow: hidden !important;
      background: #07100c !important;
      align-items: stretch !important;
      justify-content: stretch !important;
    }

    #titleScreen .title-shell {
      position: relative !important;
      width: 100% !important;
      height: 100svh !important;
      min-height: 100svh !important;
      border: 0 !important;
      border-radius: 0 !important;
      overflow: hidden !important;
      background-color: #07100c !important;
      background-image:
        linear-gradient(180deg, rgba(3,10,7,.08) 0%, rgba(3,10,7,.02) 48%, rgba(3,10,7,.58) 100%),
        url('assets/home-bg/beastborn-home-final.webp?v=20260911-1') !important;
      background-size: cover !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
    }

    /* Remove the old CSS-generated scenery so it cannot cover the artwork. */
    #titleScreen .title-shell::before,
    #titleScreen .title-shell::after {
      display: none !important;
      content: none !important;
    }
    #titleScreen .title-sky,
    #titleScreen .title-sanctuary,
    #titleScreen .title-banner {
      display: none !important;
    }

    /* Keep the BeastBorn identity readable over the artwork. */
    #titleScreen .title-brand {
      display: block !important;
      position: absolute !important;
      z-index: 5 !important;
      left: 0 !important;
      right: 0 !important;
      top: max(22px, env(safe-area-inset-top)) !important;
      padding: 0 18px !important;
      text-align: center !important;
      pointer-events: none !important;
    }
    #titleScreen .crest-orb {
      width: 50px !important;
      height: 50px !important;
      margin: 0 auto 10px !important;
      border: 1px solid rgba(227,199,104,.62) !important;
      background: rgba(8,27,18,.78) !important;
      box-shadow: 0 0 28px rgba(91,219,140,.22) !important;
      transform: rotate(45deg) !important;
      display: grid !important;
      place-items: center !important;
    }
    #titleScreen .crest-orb span {
      transform: rotate(-45deg) !important;
      color: #f1d778 !important;
      font-size: 23px !important;
    }
    #titleScreen .title-overline {
      display: block !important;
      color: #a6d7b5 !important;
      font-size: 9px !important;
      font-weight: 900 !important;
      letter-spacing: .32em !important;
      text-shadow: 0 2px 7px #000 !important;
    }
    #titleScreen .title-brand h1 {
      display: block !important;
      margin: 4px 0 0 !important;
      color: #efd475 !important;
      font-family: Georgia, serif !important;
      font-size: clamp(48px, 12vw, 92px) !important;
      line-height: .95 !important;
      letter-spacing: .025em !important;
      text-shadow: 0 3px 0 #5d4519, 0 8px 22px rgba(0,0,0,.86) !important;
    }
    #titleScreen .title-tagline {
      display: block !important;
      margin-top: 9px !important;
      color: #e7dcae !important;
      font: 800 10px Georgia, serif !important;
      letter-spacing: .24em !important;
      text-shadow: 0 2px 7px #000 !important;
    }

    /* Controls stay on top of the artwork and inside iPhone safe areas. */
    #titleScreen .title-menu {
      display: block !important;
      position: absolute !important;
      z-index: 10 !important;
      left: 50% !important;
      bottom: max(16px, env(safe-area-inset-bottom)) !important;
      width: min(680px, calc(100% - 28px)) !important;
      transform: translateX(-50%) !important;
      text-align: center !important;
    }
    #titleScreen .title-primary {
      width: 100% !important;
      min-height: 72px !important;
      padding: 11px 19px !important;
      border: 1px solid rgba(240,215,123,.72) !important;
      border-radius: 15px !important;
      background: linear-gradient(180deg, rgba(53,89,65,.96), rgba(24,53,36,.97)) !important;
      color: #f5e8b1 !important;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), 0 8px 26px rgba(0,0,0,.7) !important;
      display: grid !important;
      grid-template-columns: 42px 1fr 30px !important;
      align-items: center !important;
      text-align: left !important;
    }
    #titleScreen .title-primary .menu-icon {
      width: 38px !important;
      height: 38px !important;
      border-radius: 50% !important;
      display: grid !important;
      place-items: center !important;
      background: #0e281b !important;
      color: #edd16c !important;
      font-size: 21px !important;
    }
    #titleScreen .title-primary b {
      display: block !important;
      font-family: Georgia, serif !important;
      font-size: 20px !important;
      letter-spacing: .07em !important;
    }
    #titleScreen .title-primary small {
      display: block !important;
      margin-top: 3px !important;
      color: #bdcabe !important;
      font-size: 10px !important;
    }
    #titleScreen .menu-arrow {
      color: #e7cd70 !important;
      font-size: 30px !important;
      text-align: right !important;
    }
    #titleScreen .title-secondary-grid {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 7px !important;
      margin-top: 9px !important;
    }
    #titleScreen .title-tile {
      min-height: 49px !important;
      padding: 7px !important;
      border: 1px solid rgba(105,129,111,.66) !important;
      border-radius: 10px !important;
      background: rgba(8,26,18,.88) !important;
      color: #dde2d3 !important;
    }
    #titleScreen .title-tile small { color: #94a99b !important; }
    #titleScreen .save-summary-card { display: none !important; }
    #titleScreen .title-motto {
      margin-top: 9px !important;
      color: #8ea596 !important;
      font-size: 7px !important;
      letter-spacing: .22em !important;
      font-weight: 800 !important;
      text-shadow: 0 2px 5px #000 !important;
    }

    @media (max-width: 760px) {
      #titleScreen .title-shell {
        background-position: center center !important;
      }
      #titleScreen .title-brand {
        top: max(15px, env(safe-area-inset-top)) !important;
      }
      #titleScreen .crest-orb {
        width: 40px !important;
        height: 40px !important;
        margin-bottom: 7px !important;
      }
      #titleScreen .crest-orb span { font-size: 19px !important; }
      #titleScreen .title-overline { font-size: 7px !important; }
      #titleScreen .title-brand h1 { font-size: clamp(43px, 13vw, 60px) !important; }
      #titleScreen .title-tagline { font-size: 7px !important; margin-top: 6px !important; }
      #titleScreen .title-menu {
        width: calc(100% - 22px) !important;
        bottom: max(10px, env(safe-area-inset-bottom)) !important;
      }
      #titleScreen .title-primary {
        min-height: 62px !important;
        border-radius: 13px !important;
        grid-template-columns: 36px 1fr 24px !important;
      }
      #titleScreen .title-primary .menu-icon {
        width: 31px !important;
        height: 31px !important;
        font-size: 17px !important;
      }
      #titleScreen .title-primary b { font-size: 15px !important; }
      #titleScreen .title-primary small { font-size: 8px !important; }
      #titleScreen .title-secondary-grid { gap: 5px !important; margin-top: 7px !important; }
      #titleScreen .title-tile { min-height: 43px !important; padding: 5px !important; }
      #titleScreen .title-tile small { display: none !important; }
      #titleScreen .title-motto { font-size: 6px !important; margin-top: 6px !important; }
    }

    @media (max-height: 740px) {
      #titleScreen .crest-orb { display: none !important; }
      #titleScreen .title-brand { top: max(10px, env(safe-area-inset-top)) !important; }
      #titleScreen .title-secondary-grid { display: none !important; }
      #titleScreen .title-motto { display: none !important; }
    }
  `;

  document.head.appendChild(style);
})();
