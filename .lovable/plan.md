

## Plano: Trocar ordem das seções

Inverter a posição de **"Planeje sua sessão"** (BookingPromoBar) e **"Nosso baú de memórias"** (TestimonialsSection) no `Index.tsx`.

### Mudança

**`src/pages/Index.tsx`** — Trocar as linhas para que TestimonialsSection venha antes de BookingPromoBar:

```
Atual:                          Novo:
IntentionText                   IntentionText
BookingPromoBar       →         TestimonialsSection
TestimonialsSection   →         BookingPromoBar
AboutSection                    AboutSection
```

Uma única edição de 2 linhas.

