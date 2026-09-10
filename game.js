// BeastBorn loader v45
(() => {
  const core=document.createElement('script');
  core.src='game-core.js?v=20260909-57';
  core.onload=()=>{
    const patch=document.createElement('script');
    patch.src='range-sprite-patch.js?v=20260909-66';
    patch.onload=()=>{
      const synergy=document.createElement('script');
      synergy.src='synergy-patch.js?v=20260909-68';
      synergy.onload=()=>{
        const progression=document.createElement('script');
        progression.src='progression-patch-v4.js?v=20260909-72';
        progression.onload=()=>{
          const brand=document.createElement('script');
          brand.src='brand-patch.js?v=20260909-73';
          brand.onload=()=>{
            const stats=document.createElement('script');
            stats.src='beast-stats-patch.js?v=20260910-75';
            stats.onload=()=>{
              const balance=document.createElement('script');
              balance.src='enemy-balance-patch.js?v=20260910-76';
              balance.onload=()=>{
                const finalEvo=document.createElement('script');
                finalEvo.src='level100-evolution-patch.js?v=20260910-82';
                finalEvo.onload=()=>{
                  const sprigpawArt=document.createElement('script');
                  sprigpawArt.src='sprigpaw-art-patch.js?v=20260910-84';
                  sprigpawArt.onload=()=>{
                    const simpleSprites=document.createElement('script');
                    simpleSprites.src='simple-sprite-patch.js?v=20260910-1';
                    document.head.appendChild(simpleSprites);
                  };
                  document.head.appendChild(sprigpawArt);
                };
                document.head.appendChild(finalEvo);
              };
              document.head.appendChild(balance);
            };
            document.head.appendChild(stats);
          };
          document.head.appendChild(brand);
        };
        document.head.appendChild(progression);
      };
      document.head.appendChild(synergy);
    };
    document.head.appendChild(patch);
  };
  document.head.appendChild(core);
})();