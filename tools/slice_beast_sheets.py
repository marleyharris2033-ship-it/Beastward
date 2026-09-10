#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "sheets" / "manifest.json"


def fit_to_canvas(img, canvas, padding=6):
    img = img.convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    max_w = max(1, canvas - padding * 2)
    max_h = max(1, canvas - padding * 2)
    scale = min(max_w / img.width, max_h / img.height)
    new_size = (max(1, round(img.width * scale)), max(1, round(img.height * scale)))
    img = img.resize(new_size, Image.Resampling.NEAREST)
    out = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    out.alpha_composite(img, ((canvas - img.width) // 2, (canvas - img.height) // 2))
    return out


def process_sheet(spec):
    source = ROOT / spec["source"]
    if not source.exists():
        print(f"SKIP: {source.relative_to(ROOT)} not present")
        return 0

    stage = int(spec["stage"])
    cols = int(spec["cols"])
    rows = int(spec["rows"])
    order = spec["order"]
    out_dir = ROOT / spec.get("output", f"assets/generated/stage{stage}")
    tower_dir = ROOT / spec.get("tower_output", f"assets/generated/towers/stage{stage}")
    out_dir.mkdir(parents=True, exist_ok=True)
    tower_dir.mkdir(parents=True, exist_ok=True)

    sheet = Image.open(source).convert("RGBA")
    cell_w = sheet.width // cols
    cell_h = sheet.height // rows
    expected = cols * rows
    if len(order) > expected:
        raise ValueError(f"{source}: {len(order)} beasts but grid only has {expected} cells")

    sprite_canvas = int(spec.get("sprite_canvas", 128))
    tower_canvas = int(spec.get("tower_canvas", 96))
    padding = int(spec.get("padding", 6))
    made = 0

    for i, beast_id in enumerate(order):
        if not beast_id:
            continue
        col, row = i % cols, i // cols
        cell = sheet.crop((col * cell_w, row * cell_h, (col + 1) * cell_w, (row + 1) * cell_h))
        sprite = fit_to_canvas(cell, sprite_canvas, padding)
        tower = fit_to_canvas(cell, tower_canvas, max(2, padding // 2))
        sprite.save(out_dir / f"{beast_id}.png", optimize=True)
        tower.save(tower_dir / f"{beast_id}.png", optimize=True)
        made += 1

    print(f"OK: {source.relative_to(ROOT)} -> {made} beast sprites + {made} tower sprites")
    return made


def main():
    if not MANIFEST.exists():
        print("No manifest found; nothing to do")
        return 0
    data = json.loads(MANIFEST.read_text())
    total = 0
    for spec in data.get("sheets", []):
        total += process_sheet(spec)
    print(f"Sprite pipeline complete: {total} beasts processed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
