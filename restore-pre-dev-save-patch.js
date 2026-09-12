// Beastward one-time restore after temporary QA unlock mode
(()=>{
const BACKUP_KEY='beastward-pre-dev-unlock-v1';
let raw=null;
try{raw=localStorage.getItem(BACKUP_KEY)}catch(e){}
if(!raw&&window.__beastwardPreDevBackup)raw=window.__beastwardPreDevBackup;
if(!raw)return;
try{
  const restored=JSON.parse(raw);
  if(!restored||typeof restored!=='object')return;
  Object.keys(save||{}).forEach(k=>delete save[k]);
  Object.assign(save,restored);
  try{persist()}catch(e){}
  try{localStorage.removeItem(BACKUP_KEY)}catch(e){}
  try{delete window.__beastwardPreDevBackup}catch(e){}
  try{renderCollection?.()}catch(e){}
  try{renderCampaign?.()}catch(e){}
  try{choices?.()}catch(e){}
  document.documentElement.dataset.qaUnlockAll='off';
}catch(e){}
})();