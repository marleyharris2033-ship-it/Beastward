// Beastward v22: improved custom sprites + placement/selection range preview
(() => {
  const custom = {
    shadepup: {
      sprite: 'assets/pixel/shadepup.png',
      tower: 'assets/pixel/shadepup_tower.png'
    },
    scorchick: {
      sprite: 'assets/pixel/scorchick.png',
      tower: 'assets/pixel/scorchick_tower.png'
    },
    voidling: {
      sprite: 'assets/pixel/voidling.png',
      tower: 'assets/pixel/voidling_tower.png'
    }
  };

  Object.entries(custom).forEach(([id, art]) => {
    if (!beasts[id]) return;
    beasts[id].sprite = art.sprite;
    beasts[id].towerSprite = art.tower;
    const img = new Image();
    img.onerror = () => { img.src = 'assets/sprites/' + id + '.svg'; };
    img.src = art.tower;
    spriteImgs[id] = img;
  });

  // Refresh any already-rendered menus so the improved art appears immediately.
  try { renderCollection(); } catch (_) {}
  try { renderBestiary(); } catch (_) {}
  try { choices(); } catch (_) {}

  let pointer = null;
  const pointerPos = e => {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * canvas.width / r.width,
      y: (e.clientY - r.top) * canvas.height / r.height
    };
  };
  canvas.addEventListener('pointermove', e => { pointer = pointerPos(e); });
  canvas.addEventListener('pointerleave', () => { pointer = null; });
  canvas.addEventListener('pointercancel', () => { pointer = null; });

  function placementValid(x, y, b) {
    return !!b && gold >= b.cost && distPath(x, y) >= 55 && !blockedByScenery(x, y) && !towers.some(t => Math.hypot(t.x - x, t.y - y) < 64);
  }

  function rangeRing(x, y, range, colour, valid = true) {
    ctx.save();
    ctx.fillStyle = valid ? colour : '#ff5959';
    ctx.globalAlpha = valid ? .07 : .10;
    ctx.beginPath();
    ctx.arc(x, y, range, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = .62;
    ctx.strokeStyle = valid ? colour : '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.setLineDash([9, 7]);
    ctx.beginPath();
    ctx.arc(x, y, range, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  const baseDraw = draw;
  draw = function () {
    baseDraw();

    // Selecting a placed beast shows its true upgraded range.
    if (selectedTower) {
      rangeRing(selectedTower.x, selectedTower.y, selectedTower.b.range, selectedTower.b.color || '#ffe17b', true);
    }

    // Desktop / pointer preview follows the cursor before placement.
    if (selectedSpecies && pointer) {
      const b = battleStats(selectedSpecies);
      rangeRing(pointer.x, pointer.y, b.range, b.color || '#ffe17b', placementValid(pointer.x, pointer.y, beasts[selectedSpecies]));
      const img = spriteImgs[selectedSpecies];
      if (img && img.complete) {
        ctx.save();
        ctx.globalAlpha = .72;
        ctx.drawImage(img, pointer.x - 30, pointer.y - 30, 60, 60);
        ctx.restore();
      }
    }
  };

  // On touch devices there is no hover. First selecting a beast and touching the
  // battlefield gives an immediate range indication at the touch point.
  canvas.addEventListener('pointerdown', e => {
    if (!selectedSpecies) return;
    pointer = pointerPos(e);
  }, { capture: true });
})();
