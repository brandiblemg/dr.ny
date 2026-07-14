#!/usr/bin/env python3
"""Generate WebP copies for raster images under assets/."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "assets"
LOGO_DIRS = {"company-logos", "Logo"}


def convert(src: Path) -> Path:
    quality = 90 if src.parent.name in LOGO_DIRS else 84
    dst = src.with_suffix(".webp")

    with Image.open(src) as img:
        if img.mode in ("RGBA", "LA") or (
            img.mode == "P" and "transparency" in img.info
        ):
            img = img.convert("RGBA")
        elif img.mode != "RGB":
            img = img.convert("RGB")
        img.save(dst, "WEBP", quality=quality, method=6)

    return dst


def main() -> None:
    converted = 0
    for src in sorted(ROOT.rglob("*")):
        if src.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue
        dst = convert(src)
        converted += 1
        print(f"{src.relative_to(ROOT.parent)} -> {dst.name}")

    print(f"\nGenerated {converted} WebP file(s).")


if __name__ == "__main__":
    main()
