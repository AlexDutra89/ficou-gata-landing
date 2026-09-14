import os, sys
from PIL import Image, ImageOps, ImageFilter, ImageDraw, ImageChops
from rembg import remove

BASE = os.path.expanduser("~/mnt/ficouGataClaude")
CENARIO_PATH = os.path.join(BASE, "Roupas/Bodys/cenario_ficou_gata.jpg.jpg")
SRC_DIR = os.path.join(BASE, "Roupas/Calças")
OUT_DIR = os.path.join(BASE, "LOJA_FICOU_GATA_FINAL")
os.makedirs(OUT_DIR, exist_ok=True)

cenario = Image.open(CENARIO_PATH).convert("RGB")
CW, CH = cenario.size
FLOOR_Y = int(CH * 0.955)          # onde os pes tocam o chao
TARGET_H = int(CH * 0.85)          # modelo ocupa 85% da altura

def cutout(img_path):
    with open(img_path, "rb") as f:
        data = f.read()
    out = remove(data)
    fg = Image.open(__import__("io").BytesIO(out)).convert("RGBA")
    fg = ImageOps.exif_transpose(fg)
    bbox = fg.getbbox()
    if bbox:
        fg = fg.crop(bbox)
    return fg

def make_shadow(w, h):
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(shadow)
    d.ellipse([0, 0, w, h], fill=(20, 15, 15, 130))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=max(w, h) * 0.12))
    return shadow

def add_neon_rim(fg_rgba, color=(255, 45, 140)):
    alpha = fg_rgba.split()[3]
    edges = alpha.filter(ImageFilter.FIND_EDGES)
    edges = edges.filter(ImageFilter.GaussianBlur(radius=3))
    rim = Image.new("RGBA", fg_rgba.size, color + (0,))
    rim.putalpha(edges.point(lambda p: min(255, int(p * 0.55))))
    combined = Image.alpha_composite(fg_rgba, rim)
    return combined

def process_one(src_path, out_path):
    fg = cutout(src_path)
    fw, fh = fg.size
    scale = TARGET_H / fh
    new_w, new_h = max(1, int(fw * scale)), TARGET_H
    fg = fg.resize((new_w, new_h), Image.LANCZOS)
    fg = add_neon_rim(fg)

    canvas = cenario.copy().convert("RGBA")
    x = (CW - new_w) // 2
    y = FLOOR_Y - new_h

    shadow_w = int(new_w * 0.75)
    shadow_h = max(10, int(shadow_w * 0.16))
    shadow = make_shadow(shadow_w, shadow_h)
    sx = x + (new_w - shadow_w) // 2
    sy = FLOOR_Y - shadow_h // 2
    canvas.alpha_composite(shadow, (sx, sy))

    canvas.alpha_composite(fg, (x, y))
    canvas = canvas.convert("RGB")
    canvas.save(out_path, "JPEG", quality=95)

def main():
    files = sorted(f for f in os.listdir(SRC_DIR) if f.lower().endswith((".jpg", ".jpeg", ".png")))
    for i, fname in enumerate(files, 1):
        src = os.path.join(SRC_DIR, fname)
        base, _ = os.path.splitext(fname)
        out = os.path.join(OUT_DIR, base + "_ficouGata.jpg")
        try:
            process_one(src, out)
            print(f"[{i}/{len(files)}] OK -> {out}")
        except Exception as e:
            print(f"[{i}/{len(files)}] ERRO em {fname}: {e}")

if __name__ == "__main__":
    main()
