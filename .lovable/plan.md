

## Intensify Glow on Title and Button — Light Gray for Contrast

### Changes in `src/components/AboutSection.tsx`

**Title (line 29)**: Boost the glow from subtle white to a stronger light-gray/white multi-layer text-shadow and drop-shadow. Increase opacity and add more shadow layers for a visible halo effect.

Before: `drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] [text-shadow:0_0_25px_rgba(255,255,255,0.12)]`
After: `drop-shadow-[0_0_30px_rgba(220,220,220,0.4)] [text-shadow:0_0_20px_rgba(220,220,220,0.35),0_0_50px_rgba(200,200,200,0.2),0_0_80px_rgba(180,180,180,0.1)]`

**Button divider lines (lines 53, 60)**: Increase the `via` opacity from `neutral-500/30` to `neutral-400/50` for brighter separator glow.

**Button title "Voltar às galerias" (line 54)**: Change from `text-neutral-400` to `text-neutral-300` and add a subtle text-shadow glow: `[text-shadow:0_0_12px_rgba(200,200,200,0.25)]`.

**Button subtitle (line 57)**: Lighten from `text-neutral-500` to `text-neutral-400`.

