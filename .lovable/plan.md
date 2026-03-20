

## Update IntentionText: Center, Dividers, Contrast

### Changes to `src/components/IntentionText.tsx`

1. **Center text** — remove `text-justify`, keep `text-center`
2. **Reinforce contrast** — change `text-muted-foreground` to `text-neutral-300` and the bold span to `text-neutral-100`
3. **Add decorative dividers** above and below the text block — horizontal lines with tapered ends and opacity gradient, achieved via a `div` with `h-px` and a radial/linear gradient background (`bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent`) with slightly thicker center (`h-[2px]`)

### Files Changed
- `src/components/IntentionText.tsx` — all changes in this single file

