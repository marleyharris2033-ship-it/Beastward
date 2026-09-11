// Beastward cross-browser save transfer for in-app browsers (Messenger/Facebook/Instagram)
(() => {
  if (window.__beastwardSaveTransferV1) return;
  window.__beastwardSaveTransferV1 = true;

  const SAVE_KEYS = ['beastward-save-1','beastward-save-2','beastward-save-3'];
  const ACTIVE_KEY = 'beastward-active-slot';
  const ua = navigator.userAgent || '';
  const inMetaBrowser = /FBAN|FBAV|FB_IAB|Messenger|Instagram/i.test(ua);

  function bytesToB64Url(text){
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    for (let i=0;i<bytes.length;i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }
  function b64UrlToText(code){
    let s = code.replace(/-/g,'+').replace(/_/g,'/');
    while (s.length % 4) s += '=';
    const binary = atob(s);
    const bytes = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  function exportBundle(){
    const saves = {};
    SAVE_KEYS.forEach((key,i)=>{
      const raw = localStorage.getItem(key);
      if (raw) saves[String(i+1)] = raw;
    });
    return {
      v:1,
      game:'Beastward',
      exportedAt:Date.now(),
      active:localStorage.getItem(ACTIVE_KEY) || '0',
      saves
    };
  }
  function buildTransferCode(){
    return bytesToB64Url(JSON.stringify(exportBundle()));
  }
  function buildTransferLink(){
    const base = location.origin + location.pathname;
    return base + '?save-transfer=1#bw=' + buildTransferCode();
  }
  function importBundle(bundle){
    if (!bundle || bundle.game !== 'Beastward' || bundle.v !== 1 || !bundle.saves) throw new Error('Invalid Beastward save');
    Object.entries(bundle.saves).forEach(([slot,raw])=>{
      if (!['1','2','3'].includes(String(slot))) return;
      JSON.parse(raw); // validate before writing
      localStorage.setItem('beastward-save-' + slot, raw);
    });
    if (['0','1','2','3'].includes(String(bundle.active))) localStorage.setItem(ACTIVE_KEY,String(bundle.active));
  }
  function showMessage(title,text){
    try { if (typeof showProgressToast === 'function') { showProgressToast(title,text,'normal'); return; } } catch(e){}
    alert(title + '\n\n' + text);
  }
  async function copyText(text){
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch(e) {
      const ta=document.createElement('textarea');
      ta.value=text;ta.setAttribute('readonly','');
      ta.style.position='fixed';ta.style.left='-9999px';
      document.body.appendChild(ta);ta.select();
      let ok=false;try{ok=document.execCommand('copy')}catch(err){}
      ta.remove();return ok;
    }
  }
  async function copyTransferLink(){
    const link=buildTransferLink();
    const ok=await copyText(link);
    if(ok) showMessage('PROGRESS LINK COPIED','Open Safari or Chrome, paste the copied link into the address bar, and Beastward will offer to import these save slots.');
    else openManualModal(link);
  }
  function openManualModal(value){
    let modal=document.querySelector('#bwTransferModal');
    if(!modal){
      modal=document.createElement('div');modal.id='bwTransferModal';modal.className='bw-transfer-modal';
      modal.innerHTML='<div class="bw-transfer-card"><button class="bw-transfer-close" aria-label="Close">×</button><h3>Move Beastward Progress</h3><p>Copy this link, open Safari or Chrome, then paste it into the address bar.</p><textarea id="bwTransferText" readonly></textarea><button id="bwTransferSelect" class="primary">SELECT LINK</button></div>';
      document.body.appendChild(modal);
      modal.querySelector('.bw-transfer-close').onclick=()=>modal.classList.remove('show');
      modal.querySelector('#bwTransferSelect').onclick=()=>{const ta=modal.querySelector('#bwTransferText');ta.focus();ta.select();};
    }
    modal.querySelector('#bwTransferText').value=value;
    modal.classList.add('show');
  }

  function addSettingsCard(){
    const grid=document.querySelector('#settingsScreen .settings-grid');
    if(!grid || document.querySelector('#bwTransferSettingsCard')) return;
    const card=document.createElement('div');card.id='bwTransferSettingsCard';card.className='setting-card bw-transfer-setting';
    card.innerHTML='<div><b>Move Progress to Another Browser</b><small>Messenger, Safari and Chrome keep separate local saves. Copy a transfer link to move all three Beastward save slots safely.</small></div><button id="bwCopyTransferBtn" class="setting-action">Copy Progress Link</button>';
    grid.appendChild(card);
    card.querySelector('#bwCopyTransferBtn').onclick=copyTransferLink;
  }
  function addMetaBrowserBanner(){
    if(!inMetaBrowser || document.querySelector('#bwMetaBrowserBanner')) return;
    const host=document.querySelector('#hubScreen .hub') || document.querySelector('#titleScreen .title-shell');
    if(!host) return;
    const banner=document.createElement('div');banner.id='bwMetaBrowserBanner';banner.className='bw-meta-browser-banner';
    banner.innerHTML='<div><b>Opened inside Facebook / Messenger</b><span>Your progress is stored in this in-app browser. To play in Safari or Chrome without starting again, transfer your save first.</span></div><button id="bwMetaTransferBtn">COPY PROGRESS LINK</button>';
    host.prepend(banner);
    banner.querySelector('#bwMetaTransferBtn').onclick=copyTransferLink;
  }

  function importFromHash(){
    const match=(location.hash||'').match(/^#bw=([A-Za-z0-9_-]+)$/);
    if(!match) return false;
    try{
      const bundle=JSON.parse(b64UrlToText(match[1]));
      const existing=SAVE_KEYS.some(k=>!!localStorage.getItem(k));
      const ok=!existing || confirm('This Beastward transfer link contains saved progress. Import it into this browser? Existing Beastward save slots here will be replaced where the link contains a save.');
      if(!ok){history.replaceState(null,'',location.pathname+location.search);return true;}
      importBundle(bundle);
      history.replaceState(null,'',location.pathname);
      alert('Beastward progress imported successfully. The game will now reload in this browser.');
      location.reload();
      return true;
    }catch(e){
      history.replaceState(null,'',location.pathname+location.search);
      alert('That Beastward progress link could not be imported. Please create a fresh transfer link from the browser that has the save.');
      return true;
    }
  }

  const style=document.createElement('style');style.id='bwSaveTransferStyles';style.textContent=`
    .bw-meta-browser-banner{margin:10px 12px 4px;padding:11px 12px;border:1px solid #d2b65e;border-radius:14px;background:linear-gradient(135deg,#2b2615,#173024);color:#f4e6ad;display:flex;align-items:center;gap:12px;justify-content:space-between;box-shadow:0 8px 24px #0004;position:relative;z-index:20}
    .bw-meta-browser-banner div{display:flex;flex-direction:column;gap:2px;min-width:0}.bw-meta-browser-banner b{font-size:12px;letter-spacing:.04em}.bw-meta-browser-banner span{font-size:10px;color:#cbd3c9;line-height:1.3}.bw-meta-browser-banner button{flex:0 0 auto;border:1px solid #e2c96f;background:#31583f;color:#ffe991;border-radius:10px;padding:9px 10px;font-size:9px;font-weight:900}
    .bw-transfer-setting{grid-column:1/-1}.bw-transfer-modal{display:none;position:fixed;inset:0;background:#000b;z-index:99999;padding:18px;align-items:center;justify-content:center}.bw-transfer-modal.show{display:flex}.bw-transfer-card{width:min(560px,100%);background:#12251b;border:1px solid #9e8a4b;border-radius:20px;padding:20px;position:relative;color:#f3eedb;box-shadow:0 24px 70px #0009}.bw-transfer-card h3{margin:0 32px 8px 0;color:#f0d46e}.bw-transfer-card p{color:#b9c7bc;font-size:12px}.bw-transfer-card textarea{width:100%;height:120px;background:#07140e;color:#dce8df;border:1px solid #4d6756;border-radius:12px;padding:10px;font-size:10px;word-break:break-all}.bw-transfer-close{position:absolute;right:12px;top:10px;border:0;background:transparent;color:#fff;font-size:28px}.bw-transfer-card .primary{width:100%;margin-top:10px}
    @media(max-width:560px){.bw-meta-browser-banner{align-items:stretch;flex-direction:column}.bw-meta-browser-banner button{width:100%}}
  `;document.head.appendChild(style);

  if(importFromHash()) return;
  addSettingsCard();
  addMetaBrowserBanner();

  // Re-add the settings card/banner after screen redraws or save switches.
  const observer=new MutationObserver(()=>{addSettingsCard();addMetaBrowserBanner();});
  observer.observe(document.body,{childList:true,subtree:true});

  window.BeastwardSaveTransfer={copyTransferLink,buildTransferLink,exportBundle};
})();
