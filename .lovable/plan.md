

## Add Near-White Background Glow to Icons

### Changes in `src/components/AboutSection.tsx`

**Top icon (line ~23)**: Add an intense near-white background glow using `drop-shadow` with white/light gray values. Change from the current yellow-tinted shadow to a bright white glow:
- `drop-shadow-[0_0_24px_rgba(255,255,255,0.5)] drop-shadow-[0_0_48px_rgba(240,240,240,0.3)]`

**Bottom circular icon (line ~75)**: Change the border and box-shadow from pastel yellow to near-white:
- Border: `border-[rgba(240,240,240,0.5)]`
- Box-shadow: `0 0 18px rgba(255,255,255,0.35), 0 0 40px rgba(240,240,240,0.2), inset 0 0 8px rgba(255,255,255,0.1)`

### Files Changed
- `src/components/AboutSection.tsx`

