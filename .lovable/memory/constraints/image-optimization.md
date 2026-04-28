---
name: Image Optimization Standard
description: WebP conversion rules, quality presets, and storage paths for all gallery and site images
type: constraint
---

All images uploaded to the project MUST be converted to `.webp` before being referenced in code.

## Quality presets (cwebp -q)
- Gallery covers (4:5 cards): max width 800px, q=82, target <80KB
- Gallery photos (modal grid 4:5): max width 1200px, q=80, target <150KB
- Hero / full-width banners: max width 1920px, q=85, target <250KB
- Thumbs / avatars: max width 400px, q=78

## Process
1. Receive original (JPG/PNG/HEIC/etc.)
2. Resize to max width for category (preserve aspect ratio)
3. Strip EXIF metadata
4. Encode as WebP with quality from table
5. Save to `public/galleries/{category}/` with semantic kebab-case name (e.g. `retratos-igor-01.webp`)
6. Always keep `loading="lazy"` and `decoding="async"` on `<img>` tags

## Categories (folders)
retratos, gestantes, 15anos, casais, pessoal, eventos

## Per upload, user provides
- Gallery (category)
- Photographer (Igor Gagliardi or Equipe Studio 131)
- Whether image is a cover
