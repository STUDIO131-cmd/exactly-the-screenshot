

## New BookingPromoBar Section (Below Galerias)

### What we're building
A promotional section placed directly below GalleriesSection with:
- Glass bar with subtle neon glow + dusty grain texture overlay
- "Agende sua sessão" title with text glow
- Price range display (R$797 – R$2.250)
- Vintage SVG calendar icon/button that scrolls to BookingSection
- Two rounded buttons with circular photo placeholders side by side, separated by a clean vertical divider:
  **[ 🔵 Agendar com Igor ]  |  [ 🔵 Agendar com Equipe Studio 131 ]**

```text
┌──────────────────────────────────────────────────┐
│  ░░░░░░░ dusty grain texture ░░░░░░░░░░░░░░░░░░ │
│  ┌────────────────────────────────────────────┐  │
│  │  glass bar (blur + neon glow border)       │  │
│  │                                            │  │
│  │  "Agende sua sessão"                       │  │
│  │  "Sessões a partir de R$797 – R$2.250"     │  │
│  │                                            │  │
│  │  [ 📅 vintage calendar SVG ]               │  │
│  │                                            │  │
│  │  [🔵 Agendar com Igor] | [🔵 Agendar ...] │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Technical Steps

1. **Create `src/components/BookingPromoBar.tsx`**
   - Glass container: `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl` with `shadow-[0_0_30px_rgba(255,255,255,0.08)]`
   - Dusty grain overlay via CSS class (SVG noise filter as pseudo-element)
   - Title "Agende sua sessão" with `drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]`
   - Price range subtitle
   - Inline vintage calendar SVG button → scrolls to `#booking-section`
   - Two rounded pill buttons, each with a circular placeholder (for photo) on the left:
     - "Agendar com Igor" → opens WhatsApp to Igor's number
     - "Agendar com Equipe Studio 131" → opens WhatsApp to studio number
   - Between the two buttons: a thin vertical divider `w-px h-8 bg-white/20`
   - Buttons styled: `rounded-full bg-white/10 border border-white/10 hover:bg-white/15 px-5 py-2.5` with `flex items-center gap-3`
   - Circular photo placeholder: `w-8 h-8 rounded-full bg-white/20` (ready for real photos later)

2. **Update `src/components/BookingSection.tsx`**
   - Add `id="booking-section"` to the section element

3. **Update `src/pages/Index.tsx`**
   - Import `BookingPromoBar`
   - Place it between `GalleriesSection` and `TestimonialsSection`

4. **Update `src/index.css`**
   - Add `.dusty-texture::before` pseudo-element with SVG noise filter for grain effect

### Files Changed
- `src/components/BookingPromoBar.tsx` (new)
- `src/components/BookingSection.tsx` (add id)
- `src/pages/Index.tsx` (add component)
- `src/index.css` (grain texture)

