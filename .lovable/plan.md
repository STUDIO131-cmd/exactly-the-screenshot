

## Plano: Glass bar CTA com cantos arredondados (não circular)

**Arquivo:** `src/components/AboutSection.tsx` (linhas 80-92)

Substituir o bloco atual (botão texto + logo) por um `<motion.button>` glass bar com cantos arredondados (`rounded-2xl`, não redondo/circular), seguindo o padrão do botão "Voltar às galerias" já existente na mesma seção.

### Novo elemento

```text
┌────────────────────────────────┐
│  ✦ shimmer animado             │
│                                │
│    Toque e planeje             │
│    uma sessão                  │
│    [logo personalidades]       │
│                                │
└────────────────────────────────┘
```

### Alterações

- Remover linhas 80-92 (div com botão texto + logo)
- Inserir `<motion.button>` com:
  - `rounded-2xl` (cantos arredondados, não redondo)
  - `bg-white/10 backdrop-blur-lg border border-white/15`
  - Shimmer animado diagonal (mesmo padrão do botão galerias)
  - Texto "Toque e planeje" / "uma sessão" em duas linhas, fonte Kapakana cursiva
  - Logo abaixo do texto, dentro do glass bar
  - `onClick={openProposal}`
  - `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`

