// BEASTBORN exact uploaded title artwork
(() => {
  document.title = 'BeastBorn';

  const title = document.querySelector('#titleScreen');
  if (title) {
    const primary = title.querySelector('#newGameBtn');
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
  style.id = 'beastborn-exact-title-art';
  style.textContent = `
    #titleScreen {
      padding: 0 !important;
      width: 100% !important;
      height: 100svh !important;
      min-height: 100svh !important;
      overflow: hidden !important;
      background: #000 !important;
      align-items: stretch !important;
      justify-content: stretch !important;
    }

    #titleScreen .title-shell {
      position: relative !important;
      width: 100% !important;
      height: 100svh !important;
      min-height: 100svh !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 0 !important;
      overflow: hidden !important;
      background-color: #000 !important;
      background-image: url('assets/home-bg/D882EEB7-3A80-4526-872C-293D0387E9E3.png?v=20260911-2') !important;
      background-size: cover !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
    }

    /* The uploaded artwork already contains the BeastBorn logo, portal and beasts. */
    #titleScreen .title-shell::before,
    #titleScreen .title-shell::after,
    #titleScreen .title-sky,
    #titleScreen .title-brand,
    #titleScreen .title-sanctuary,
    #titleScreen .title-banner,
    #titleScreen .title-secondary-grid,
    #titleScreen .save-summary-card,
    #titleScreen .title-motto {
      display: none !important;
      content: none !important;
    }

    #titleScreen .title-menu {
      display: block !important;
      position: absolute !important;
      z-index: 20 !important;
      left: 50% !important;
      bottom: max(18px, env(safe-area-inset-bottom)) !important;
      width: min(620px, calc(100% - 28px)) !important;
      transform: translateX(-50%) !important;
      margin: 0 !important;
      text-align: center !important;
    }

    #titleScreen .title-primary {
      display: grid !important;
      width: 100% !important;
      min-height: 64px !important;
      padding: 10px 16px !important;
      grid-template-columns: 38px 1fr 26px !important;
      align-items: center !important;
      border: 1px solid rgba(242,211,105,.88) !important;
      border-radius: 14px !important;
      background: linear-gradient(180deg, rgba(35,88,55,.94), rgba(13,46,29,.97)) !important;
      color: #fff0b0 !important;
      box-shadow: 0 8px 26px rgba(0,0,0,.68), inset 0 0 0 1px rgba(255,255,255,.08) !important;
      text-align: left !important;
      backdrop-filter: blur(5px) !important;
      -webkit-backdrop-filter: blur(5px) !important;
    }

    #titleScreen .title-primary .menu-icon {
      width: 32px !important;
      height: 32px !important;
      display: grid !important;
      place-items: center !important;
      border-radius: 50% !important;
      background: rgba(5,31,18,.84) !important;
      color: #f2d56c !important;
      font-size: 18px !important;
    }

    #titleScreen .title-primary b {
      display: block !important;
      font-family: Georgia, serif !important;
      font-size: 16px !important;
      letter-spacing: .07em !important;
    }

    #titleScreen .title-primary small {
      display: block !important;
      margin-top: 3px !important;
      color: #d3dfd2 !important;
      font-size: 9px !important;
    }

    #titleScreen .menu-arrow {
      color: #f0d06b !important;
      font-size: 28px !important;
      text-align: right !important;
    }

    @media (max-width: 760px) {
      #titleScreen .title-shell {
        background-size: cover !important;
        background-position: 50% 50% !important;
      }
      #titleScreen .title-menu {
        width: calc(100% - 22px) !important;
        bottom: max(12px, env(safe-area-inset-bottom)) !important;
      }
      #titleScreen .title-primary {
        min-height: 60px !important;
        grid-template-columns: 35px 1fr 24px !important;
      }
      #titleScreen .title-primary b { font-size: 15px !important; }
      #titleScreen .title-primary small { font-size: 8px !important; }
    }
  `;

  document.head.appendChild(style);
})();
