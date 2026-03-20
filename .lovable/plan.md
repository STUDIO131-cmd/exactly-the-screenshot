

## Intensify Glow 80% — ICONS ONLY

### Changes in `src/components/AboutSection.tsx`

**Top icon (line ~26)**: Boost drop-shadow opacities by 80% and add a third wider layer for a massive white blur halo:
- Current: `drop-shadow-[0_0_24px_rgba(255,255,255,0.5)] drop-shadow-[0_0_48px_rgba(240,240,240,0.3)]`
- New: `drop-shadow-[0_0_24px_rgba(255,255,255,0.9)] drop-shadow-[0_0_48px_rgba(240,240,240,0.54)] drop-shadow-[0_0_72px_rgba(255,255,255,0.4)]`

**Bottom circular icon (line ~73)**: Boost box-shadow opacities by 80% and add a wider 60px spread layer:
- Current: `0 0 18px rgba(255,255,255,0.35), 0 0 40px rgba(240,240,240,0.2), inset 0 0 8px rgba(255,255,255,0.1)`
- New: `0 0 18px rgba(255,255,255,0.63), 0 0 40px rgba(240,240,240,0.36), 0 0 60px rgba(255,255,255,0.25), inset 0 0 8px rgba(255,255,255,0.18)`

All other elements (title, body text, dividers, button, CTA) remain unchanged.

