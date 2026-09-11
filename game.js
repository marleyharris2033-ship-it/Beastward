// BeastBorn loader v61
(() => {
  const core=document.createElement('script');
  core.src='game-core.js?v=20260909-57';
  core.onload=()=>{
    const patch=document.createElement('script');patch.src='range-sprite-patch.js?v=20260909-66';
    patch.onload=()=>{
      const synergy=document.createElement('script');synergy.src='synergy-patch.js?v=20260909-68';
      synergy.onload=()=>{
        const progression=document.createElement('script');progression.src='progression-patch-v4.js?v=20260909-72';
        progression.onload=()=>{
          const brand=document.createElement('script');brand.src='brand-patch.js?v=20260909-73';
          brand.onload=()=>{
            const stats=document.createElement('script');stats.src='beast-stats-patch.js?v=20260910-75';
            stats.onload=()=>{
              const balance=document.createElement('script');balance.src='enemy-balance-patch.js?v=20260910-76';
              balance.onload=()=>{
                const finalEvo=document.createElement('script');finalEvo.src='level100-evolution-patch.js?v=20260910-82';
                finalEvo.onload=()=>{
                  const embercubArt=document.createElement('script');embercubArt.src='embercub-art-patch.js?v=20260910-1';
                  embercubArt.onload=()=>{
                    const sprigpawArt=document.createElement('script');sprigpawArt.src='sprigpaw-art-patch.js?v=20260910-84';
                    sprigpawArt.onload=()=>{
                      const desert=document.createElement('script');desert.src='desert-region-patch.js?v=20260910-4';
                      desert.onload=()=>{
                        const landscape=document.createElement('script');landscape.src='battle-landscape-patch.js?v=20260910-5';
                        landscape.onload=()=>{
                          const ergonomics=document.createElement('script');ergonomics.src='battle-ergonomics-patch.js?v=20260910-2';
                          ergonomics.onload=()=>{
                            const controls=document.createElement('script');controls.src='battle-controls-patch.js?v=20260910-2';
                            controls.onload=()=>{
                              const stage1Art=document.createElement('script');
                              stage1Art.src='stage1-roster-art-patch.js?v=20260911-6';
                              stage1Art.onload=()=>{
                                const battleMainSprites=document.createElement('script');
                                battleMainSprites.src='battle-main-sprite-patch.js?v=20260911-1';
                                battleMainSprites.onload=()=>{
                                  const visualFix=document.createElement('script');
                                  visualFix.src='sprite-visual-fix.js?v=20260910-1';
                                  visualFix.onload=()=>{
                                    const bestiaryVisual=document.createElement('script');
                                    bestiaryVisual.src='bestiary-sprite-visual-patch.js?v=20260911-1';
                                    bestiaryVisual.onload=()=>{
                                      const preview=document.createElement('script');
                                      preview.src='bestiary-preview-patch.js?v=20260911-1';
                                      document.head.appendChild(preview);
                                    };
                                    document.head.appendChild(bestiaryVisual);
                                  };
                                  document.head.appendChild(visualFix);
                                };
                                document.head.appendChild(battleMainSprites);
                              };
                              document.head.appendChild(stage1Art);
                            };
                            document.head.appendChild(controls);
                          };
                          document.head.appendChild(ergonomics);
                        };
                        document.head.appendChild(landscape);
                      };
                      document.head.appendChild(desert);
                    };
                    document.head.appendChild(sprigpawArt);
                  };
                  document.head.appendChild(embercubArt);
                };document.head.appendChild(finalEvo);
              };document.head.appendChild(balance);
            };document.head.appendChild(stats);
          };document.head.appendChild(brand);
        };document.head.appendChild(progression);
      };document.head.appendChild(synergy);
    };document.head.appendChild(patch);
  };document.head.appendChild(core);
})();