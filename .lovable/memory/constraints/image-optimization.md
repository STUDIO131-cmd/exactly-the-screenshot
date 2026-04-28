---
name: Image Optimization Standard
description: WebP conversion rules, quality presets, and storage paths for all gallery and site images
type: constraint
---

All images uploaded to the project MUST be converted to `.webp` before being referenced in code.

## Quality preset (cwebp -q)
User directive: reduce quality by 60% from JPEG baseline → use **q=40** for ALL images by default.

- Gallery covers (4:5 cards): max width 800px, q=40
- Gallery photos (modal grid 4:5): max width 1200px, q=40
- Hero / full-width banners: max width 1920px, q=40
- Thumbs / avatars: max width 400px, q=40

If a specific image looks visibly degraded after conversion, raise q in steps of 5 (max 60) and re-check. Never go above q=60 without user approval.

## Process
1. Receive original (JPG/PNG/HEIC/etc.)
2. Resize to max width for category (preserve aspect ratio)
3. Strip EXIF metadata
4. Encode as WebP at q=40
5. Save to `public/galleries/{category}/` with semantic kebab-case name (e.g. `retratos-igor-01.webp`)
6. Always keep `loading="lazy"` and `decoding="async"` on `<img>` tags

## Categories (folders)
retratos, gestantes, 15anos, casais, pessoal, eventos

## Per upload, user provides
- Gallery (category)
- Photographer (Igor Gagliardi or Equipe Studio 131)
- Whether image is a cover
