

## Redesign AboutSection: New Copy, Icon, Button, Layout

### Overview
Rewrite the "O que fotografamos" section with new copy, the uploaded eye icon at the top, smaller justified+centered text, a subtle inline button to galleries, a closing statement, the icon repeated in a neon circle, and a clickable CTA link.

### Changes to make

**1. Copy the uploaded image to the project**
- Copy `user-uploads://Personalidades_131_fotos_logo.png` to `src/assets/personalidades-icon.png`

**2. Rewrite `src/components/AboutSection.tsx`**

Structure top-to-bottom:
1. **Eye icon** — imported from `@/assets/personalidades-icon.png`, displayed ~80px wide, with a pastel yellow filter/tint (using CSS `filter: sepia(...)` or wrapping with a yellow-tinted overlay, or `mix-blend-mode`) to render in amarelo pastel tone
2. **Title** — "O que fotografamos" (keep h2, same glow style)
3. **Body text** — `text-sm md:text-base`, `text-justify text-center` (justify on wider, centered feel via max-width constraint), `text-neutral-300`:
   - "Momentos reais e importantes da vida."
   - "Trabalhamos com um olhar documental e espontâneo, fruto de repertório e conexões."
   - "O que muda não é o tipo de sessão." / **"É o momento vivido."**
   - "Nas galerias você confere nosso portfólio."
4. **Subtle button/divider** — a slim, low-profile block styled almost like a divider:
   - Title line: "Voltar às galerias" (uppercase, small, tracking-wide)
   - Subtitle: "Ensaios pessoais. Casais. Gestantes. Retratos. 15 anos. Pequenos eventos."
   - Clicks to scroll to the galleries section
5. **Closing line** — "Essa é nossa visão." in neutral-400, italic
6. **Icon repeated** in a round circle with neon pastel yellow border/glow (~48px), followed by clickable text "Quero conhecer proposta" that opens the booking chat (dispatches `openBookingChat` event)

### Files Changed
- `src/assets/personalidades-icon.png` — new asset
- `src/components/AboutSection.tsx` — full rewrite

