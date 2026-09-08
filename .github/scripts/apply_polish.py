from pathlib import Path
import re

game_path = Path('game.js')
game = game_path.read_text()

paths = {
    1: '[{x:-30,y:310},{x:145,y:310},{x:250,y:185},{x:390,y:185},{x:505,y:405},{x:650,y:405},{x:755,y:255},{x:930,y:255}]',
    2: '[{x:-30,y:90},{x:865,y:90},{x:865,y:505},{x:160,y:505},{x:160,y:215},{x:690,y:215},{x:690,y:390},{x:335,y:390},{x:335,y:305},{x:930,y:305}]',
    3: '[{x:-30,y:500},{x:185,y:500},{x:315,y:390},{x:430,y:330},{x:505,y:310},{x:580,y:240},{x:705,y:145},{x:825,y:145},{x:930,y:255}]',
    4: '[{x:-30,y:160},{x:210,y:160},{x:210,y:500},{x:505,y:500},{x:505,y:285},{x:325,y:285},{x:325,y:80},{x:735,y:80},{x:735,y:390},{x:930,y:390}]',
    5: '[{x:-30,y:300},{x:175,y:120},{x:385,y:300},{x:540,y:105},{x:710,y:300},{x:545,y:500},{x:340,y:365},{x:780,y:365},{x:930,y:245}]',
    6: '[{x:-30,y:475},{x:180,y:475},{x:180,y:155},{x:335,y:155},{x:485,y:275},{x:635,y:155},{x:805,y:155},{x:805,y:470},{x:930,y:470}]',
    7: '[{x:-30,y:115},{x:190,y:115},{x:190,y:470},{x:350,y:470},{x:350,y:190},{x:520,y:190},{x:520,y:505},{x:690,y:505},{x:690,y:120},{x:845,y:120},{x:845,y:430},{x:930,y:430}]',
    8: '[{x:-30,y:525},{x:130,y:525},{x:130,y:410},{x:300,y:410},{x:300,y:290},{x:470,y:290},{x:470,y:170},{x:650,y:170},{x:650,y:300},{x:815,y:300},{x:815,y:145},{x:930,y:145}]',
    9: '[{x:-30,y:105},{x:250,y:105},{x:375,y:250},{x:235,y:410},{x:505,y:500},{x:660,y:340},{x:535,y:185},{x:790,y:80},{x:930,y:220}]',
    10:'[{x:-30,y:300},{x:120,y:300},{x:120,y:75},{x:875,y:75},{x:875,y:525},{x:245,y:525},{x:245,y:185},{x:745,y:185},{x:745,y:410},{x:385,y:410},{x:385,y:285},{x:620,y:285},{x:620,y:350},{x:930,y:350}]'
}
for level_id, new_path in paths.items():
    pat = re.compile(r'(\{\s*id:'+str(level_id)+r',.*?\bpath:)\[[^\]]*\]', re.S)
    game, count = pat.subn(lambda m: m.group(1) + new_path, game, count=1)
    if count != 1:
        raise RuntimeError(f'Could not patch path for level {level_id}')

old_preload = "const spriteImgs={};\nObject.values(beasts).forEach(b=>{const i=new Image();i.src=b.towerSprite||b.sprite;spriteImgs[b.id]=i});"
new_preload = """const spriteImgs={};
Object.values(beasts).forEach(b=>{
  const i=new Image();
  i.onerror=()=>{
    if(!i.dataset.fallback){i.dataset.fallback='1';i.src='assets/sprites/'+b.id+'.svg'}
  };
  i.src=b.sprite;
  spriteImgs[b.id]=i;
});
document.addEventListener('error',e=>{
  const img=e.target;
  if(!img||img.tagName!=='IMG'||!img.src.includes('/assets/pixel/'))return;
  const file=img.src.split('/').pop()||'';
  const id=file.replace('_tower.png','').replace('.png','');
  if(img.dataset.spriteFallback)return;
  img.dataset.spriteFallback='1';
  img.src='assets/sprites/'+id+'.svg';
},true);"""
if old_preload in game:
    game = game.replace(old_preload, new_preload, 1)
elif "i.src=b.sprite;" not in game:
    raise RuntimeError('Sprite preload block not found')

game = game.replace("ctx.arc(t.x,t.y,32,0,Math.PI*2)", "ctx.arc(t.x,t.y,43,0,Math.PI*2)")
game = game.replace("ctx.arc(t.x,t.y,27,0,Math.PI*2)", "ctx.arc(t.x,t.y,36,0,Math.PI*2)")
game = game.replace("ctx.drawImage(img,t.x-23,t.y-23,46,46)", "ctx.drawImage(img,t.x-37,t.y-37,74,74)")
game = game.replace("Math.hypot(t.x-x,t.y-y)<=30", "Math.hypot(t.x-x,t.y-y)<=40")
game = game.replace("Math.hypot(t.x-x,t.y-y)<45", "Math.hypot(t.x-x,t.y-y)<64")
game_path.write_text(game)

style_path = Path('style.css')
style = style_path.read_text()
marker = '/* sprite readability v17 */'
if marker not in style:
    style += '''\n\n/* sprite readability v17 */\n.tower-choice img{width:64px!important;height:64px!important;object-fit:contain!important;image-rendering:pixelated!important}.sprite-wrap img,.best-row img,.best-portrait img,.result-sprite{image-rendering:pixelated!important;object-fit:contain!important}\n'''
style_path.write_text(style)

index_path = Path('index.html')
index = index_path.read_text()
index = re.sub(r'style\.css\?v=[^\"]+', 'style.css?v=20260908-17', index)
index = re.sub(r'game\.js\?v=[^\"]+', 'game.js?v=20260908-17', index)
index_path.write_text(index)
