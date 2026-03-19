

## Diagnostic: Font Inconsistencies Across the Site

### Problem
The memory states "TikTok Sans is the global default font for all text elements," but the CSS body default is set to `Moneta` serif. Meanwhile, Tailwind's `font-sans` maps to TikTok Sans. This creates a mismatch: components that don't explicitly set `font-sans` or `font-tiktok` render in Moneta (serif), causing visual inconsistency.

### Scope
**DO NOT TOUCH**: HeroSection, CategoriesTicker, GalleriesSection (already adjusted).

**Sections to fix** (all lack explicit `font-sans` on their text):

| Component | Issue |
|---|---|
| **TestimonialsSection** | Title, subtitle, card text all fall back to Moneta serif. No `font-sans` anywhere. |
| **AboutSection** | Title + all body paragraphs in Moneta. Missing `font-sans font-light`. |
| **BookingSection** | Title, subtitle, date text, button text in Moneta. Calendar component inherits serif. |
| **FooterSection** | Title (`font-semibold` but no font-family), links, copyright in Moneta. |
| **PricingSection** | Titles, prices, descriptions, features all in Moneta (not currently rendered on page but should be consistent). |
| **WhatsAppFloat** | Already uses `font-tiktok` -- OK. |
| **BookingChat** | Already uses `font-tiktok` in key spots -- OK, but message text `text-sm` lacks it. |

### Fix: Global CSS Change
Change the body default font from `Moneta` to `TikTok Sans` in `src/index.css`. This is the simplest, most consistent fix -- every element inherits TikTok Sans by default, and only elements that explicitly need serif would use `font-moneta` or `font-epika`.

### Steps

1. **`src/index.css`** -- Change body `font-family` from `'Moneta', Georgia, serif` to `'TikTok Sans', -apple-system, sans-serif` and add `font-weight: 300` (light) for the global default.

2. **`src/components/TestimonialsSection.tsx`** -- Add `font-sans font-light` to the section wrapper so all text inherits properly. Ensure title uses appropriate weight.

3. **`src/components/AboutSection.tsx`** -- Add `font-sans font-light` to body text wrapper. Keep title at normal weight.

4. **`src/components/BookingSection.tsx`** -- Add `font-sans` to section wrapper. Ensure button and date text have `font-sans`.

5. **`src/components/FooterSection.tsx`** -- Add `font-sans` to footer wrapper. Adjust title to `font-sans font-semibold`.

6. **`src/components/PricingSection.tsx`** -- Add `font-sans` to section wrapper for consistency.

7. **`src/components/BookingChat.tsx`** -- Add `font-sans` to message text for consistency.

### Result
All text site-wide will render in TikTok Sans font-light by default, with consistent typography across every section.

