#!/usr/bin/env python3
"""
Genera imágenes fotorrealistas y diversas para guia-capilar.com vía la Edge Function guia-capilar-images
(Supabase charlielingan → OpenAI ChatGPT Image API con quality="medium") y las comprime en WebP
ligeros (< 68 KB, siempre < 100 KB) en public/img/.

Uso:
  python3 scripts/gen_images.py home        # genera imágenes de la Home y de los 12 silos
  python3 scripts/gen_images.py articles    # genera imágenes individuales por artículo
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/guia-capilar-images"
TOKEN = "guia-capilar-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

HOME_PROMPTS = {
    "home-hero-capilar": "Photorealistic editorial portrait of a woman from behind showing luminous healthy dimensional honey-blonde balayage hair with mirror shine, next to a white marble vanity tray holding a minimalist peptide pump bottle, a glass bonding oil dropper and a ceramic hair mask jar, warm golden morning sunlight",
    "og-default": "Photorealistic luxury haircare flat lay on travertine stone featuring a molecular peptide leave-in pump bottle, a disulfide bond builder bottle, a rich conditioning mask jar with wooden spatula, and a golden hair oil dropper alongside a glossy blonde hair swatch, natural studio daylight",
    "home-k18-vs-olaplex": "Photorealistic side-by-side comparison on a clean white quartz vanity of a white minimalist airless peptide pump bottle and a sleek bond-repair treatment bottle next to a precision milliliter measuring spoon and a wide-tooth comb, crisp morning light",
    "home-cabello-decolorado": "Photorealistic close-up of hands gently applying a rich white reparative peptide cream mask onto damp towel-dried platinum blonde bleached hair in a bright modern marble bathroom, realistic hair fiber texture",
    "home-mascarillas-capilares": "Photorealistic macro top-down view of two open ceramic hair mask jars—one glossy pearl-white collagen protein cream and one rich golden argan lipid mask—with a wooden spatula on a stone tray",
    "home-champu-violeta": "Photorealistic close-up of rich deep violet toning shampoo foam being lathered into damp cool ash-blonde highlighted hair in a sunlit spa shower, neutralizing yellow tones",
    "home-protector-termico": "Photorealistic backlit action shot of a fine mist of thermal protectant spray hovering over glossy caramel-highlighted hair before blow-drying with a ceramic round brush, warm sunset light",
    "home-costo-aplicacion": "Photorealistic precision flat-lay on white marble showing a 50ml airless pump bottle, a 15ml travel bottle, a glass graduated pipette and exact 1ml and 2ml cream dollops on a digital scale",
    "home-porosidad-capilar": "Photorealistic split editorial view comparing bouncy defined bleached 3B curly hair and sleek fine straight blonde hair with glass-like shine in soft natural window daylight",
    "cat-resenas-tratamientos-y-productos": "Photorealistic luxury bathroom vanity with minimalist hair repair treatment bottles, a ceramic mask jar and a glass dropper with golden oil in warm morning sunlight",
    "cat-comparativas": "Photorealistic side-by-side laboratory comparison of two professional hair bond-building treatment bottles with a milliliter measuring spoon and a healthy hair lock on white quartz",
    "cat-mejores-productos-capilares": "Photorealistic curated collection of professional haircare products on a travertine shelf: peptide leave-in pump, conditioning mask jar, sulfate-free shampoo and heat protectant spray",
    "cat-cabello-decolorado-y-danado": "Photorealistic close-up of platinum blonde and balayage hair being treated with a rich reparative mask in a sunlit marble bathroom, ultra-realistic cuticle sheen",
    "cat-protocolos-k18-olaplex-y-plex": "Photorealistic close-up of hands emulsifying two precise pumps of white peptide leave-in hair treatment in the palms before applying to damp towel-dried hair",
    "cat-cabello-tenido-y-matizacion": "Photorealistic macro shot of deep violet and blue toning shampoo lather on a ceramic dish next to cool ash-blonde and vibrant copper dyed hair locks",
    "cat-mascarillas-hidratacion-y-proteinas": "Photorealistic close-up of a ceramic jar filled with whipped hydrating argan and ceramide hair mask being scooped with a spatula on a wooden vanity",
    "cat-champus-sulfatos-y-lavado": "Photorealistic modern shower scene with a chrome water filter shower head, a sulfate-free chelating cream shampoo bottle and soft foam on wet color-treated hair",
    "cat-protectores-termicos-y-secado": "Photorealistic salon blow-dry scene with a fine mist of heat protectant spray and a ceramic flat iron set to low temperature beside healthy shiny dyed hair",
    "cat-tipo-de-cabello-y-porosidad": "Photorealistic macro photograph of diverse healthy dyed hair textures—fine straight ash blonde, wavy bronde and curly 3C highlighted hair—under soft studio daylight",
    "cat-costo-por-aplicacion-y-dosificacion": "Photorealistic precision dosing setup on marble with airless pump bottles, glass droppers, measuring spoons in milliliters and a clean cosmetic calculator card",
    "cat-ingredientes-y-ciencia-capilar": "Photorealistic trichology laboratory close-up showing a glass petri dish with golden ceramide serum drops, peptide solution in a pipette and a magnified healthy hair fiber",
}


def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json", "x-guia-capilar-token": TOKEN},
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    # Límite estricto: <= 68 KB para la imagen 1200x675 (siempre < 100 KB como pidió el usuario)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out = {}
    for suf, width in sizes.items():
        r = im.resize((width, round(width * 9 / 16)), Image.LANCZOS)
        q = 78
        while True:
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf] or q <= 38:
                break
            q -= 5
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out


def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists():
        return slug, f"skip ({final.stat().st_size // 1024}KB)"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB"


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append((a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos"))
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=5) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)


if __name__ == "__main__":
    main()
