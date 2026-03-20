

## Seção "Futuros Lançamentos" — Lista de Prioridade

### O que será criado

Uma nova seção acima do footer com a campanha **"Esse Instante"** (abertura abril, execução maio). Contém um formulário de captura (nome completo + WhatsApp) que envia os dados por email para `igorgagliardi@studio131.com.br`.

### Estrutura visual

```text
┌──────────────────────────────────────┐
│         FUTUROS LANÇAMENTOS          │
│                                      │
│  Garanta prioridade em nossa próxima │
│  agenda especial e receba a proposta │
│  antes de todo mundo.                │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ CAMPANHA: ESSE INSTANTE     │    │
│  │ Abertura abril · Execução maio│   │
│  │                              │    │
│  │ [Nome completo         ]     │    │
│  │ [WhatsApp              ]     │    │
│  │                              │    │
│  │ [✏️ Entre na lista de prioridade]│ │
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

O botão terá um ícone SVG de caneta/assinatura em amarelo pastel ao lado do texto.

### Envio do email

Como o projeto não tem backend (sem Supabase/Cloud), será necessário habilitar o **Lovable Cloud** para criar uma Edge Function que envie o email. A Edge Function receberá nome + WhatsApp e disparará um email para `igorgagliardi@studio131.com.br` com:

- **Assunto**: `Lista Prioridade Fotografia Lancamento: [Nome Completo]`
- **Corpo**: Nome completo e número de WhatsApp do lead

### Arquivos e alterações

| Arquivo | Ação |
|---|---|
| `src/components/LaunchPrioritySection.tsx` | **Criar** — Nova seção com título, subtítulo, card da campanha "Esse Instante", formulário (nome + WhatsApp), botão com ícone SVG de caneta amarelo pastel |
| `src/pages/Index.tsx` | **Editar** — Importar e inserir `LaunchPrioritySection` entre `BookingSection` e `FooterSection` |
| Lovable Cloud + Edge Function | **Criar** — Habilitar Cloud, criar função `send-priority-email` que envia email com os dados do formulário |

### Detalhes técnicos

- Validação client-side com zod (nome não vazio, WhatsApp formato brasileiro)
- Feedback visual: loading state no botão, toast de sucesso/erro
- Ícone de caneta/assinatura inline SVG em `#F5E6A3` (amarelo pastel)
- Estilo consistente com o restante: fundo escuro, `font-sans font-light`, tracking wide, cores neutras
- Máscara de WhatsApp: `(XX) XXXXX-XXXX`

