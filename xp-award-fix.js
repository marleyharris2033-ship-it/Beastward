// Beastward XP award fix v1
// Uses the actual persisted six-beast squad instead of the stale private battleInstanceLoadout closure.
(()=>{
  function validTeam(){
    const ids=[...(save.lastInstanceLoadout||[])].slice(0,6);
    return ids.filter(uid=>(save.beastInstances||[]).some(i=>i&&i.uid===uid));
  }
  function stageTarget(id){id=Math.max(0,Math.min(100,id||0));if(id===0)return 1;if(id<=10)return 1+14*id/10;if(id<=90)return 15+(id-10);return 95+(id-90)*.5}
  function totalTo(level){let n=0;for(let l=1;l<Math.max(1,Math.min(100,level));l++)n+=xpNeeded(l);return n}
  function xpAt(level){if(level<=1)return 0;if(level>=100)return totalTo(100);const whole=Math.floor(level),f=level-whole;return totalTo(whole)+Math.round(xpNeeded(whole)*f)}
  function stageXp(id){return Math.max(40,xpAt(stageTarget(id))-xpAt(stageTarget(id-1)))}

  completeWave=function(){
    const team=validTeam();
    const hard=battleMode==='hard';
    const done=(hard?save.hardCompletedLevels:save.completedLevels).includes(currentLevel.id);
    const modifier=hard?.40:(done?.25:1);
    const total=Math.max(1,Math.round(stageXp(currentLevel.id)*modifier));
    const waves=Math.max(1,currentLevel.waves||10);
    const base=Math.floor(total/waves);
    const amount=wave>=waves?total-base*(waves-1):base;
    const bonus=24+wave*4;

    gold+=bonus;
    battleReport.wavesCleared=Math.max(battleReport.wavesCleared,wave);
    ui();

    team.forEach(uid=>{
      battleReport.xpByBeast[uid]=(battleReport.xpByBeast[uid]||0)+amount;
    });
    const ups=addXP(team,amount);

    const notice=document.querySelector('#waveXpNotice');
    if(notice)notice.textContent=`Wave ${wave} clear • +${amount} XP to each selected beast • +${bonus} gold`;
    if(ups.length){
      showProgressToast(
        ups.some(x=>x.includes('Level 30')||x.includes('Level 60')||x.includes('Level 100'))?'EVOLUTION READY':'BEAST LEVEL UP',
        ups.join(' • '),
        'levelup'
      );
    }
    setTimeout(()=>{const n=document.querySelector('#waveXpNotice');if(n)n.textContent=''},1800);
  };

  document.documentElement.dataset.xpAwardFix='v1';
})();