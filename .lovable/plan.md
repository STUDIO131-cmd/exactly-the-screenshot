

## Plano: Centralizar WhatsApp + mensagens contextuais

### Objetivo
Substituir todas as referências hardcoded ao número `5517992595117` por um helper único com mensagens pré-formatadas por contexto.

### Novo arquivo: `src/lib/whatsapp.ts`

Constante central + builder de URL + biblioteca de templates por contexto:

```ts
export const WHATSAPP_NUMBER = "5517992595117";

export type WhatsAppContext =
  | "general"              // CTA genérico (header, hero, floating button)
  | "booking_interest"     // após preencher formulário de interesse
  | "booking_date"         // já escolheu data
  | "ai_escalation"        // resumo da IA
  | "ai_error"             // falha técnica da IA
  | "faq_followup"         // dúvida vinda do FAQ
  | "gallery_inquiry"      // contato vindo das galerias
  | "pricing_question"     // dúvida sobre preços
  | "priority_launch"      // lista VIP
  | "custom";              // mensagem livre

interface BuildOpts {
  name?: string;
  date?: string;
  session?: string;
  photographer?: string;
  summary?: string;
  custom?: string;
}

export function buildWhatsAppUrl(context: WhatsAppContext, opts?: BuildOpts): string
export function openWhatsApp(context: WhatsAppContext, opts?: BuildOpts): void
```

### Templates por contexto

| Contexto | Mensagem |
|---|---|
| `general` | "Olá! Vim pelo site 131 Fotos e gostaria de saber mais sobre os serviços." |
| `booking_interest` | "Olá! Sou {name}. Tenho interesse em agendar uma sessão{session?} no dia {date}{photographer?}. Pode confirmar o horário disponível?" |
| `booking_date` | "Olá! Vim pelo site 131 Fotos e gostaria de agendar uma sessão para o dia {date}." |
| `ai_escalation` | "Olá! Vim pelo site 131 Fotos. {summary}" |
| `ai_error` | "Olá! Tive uma dúvida no chat do site 131 Fotos e gostaria de falar com o atendimento." |
| `faq_followup` | "Olá! Estava lendo as perguntas frequentes no site 131 Fotos e gostaria de tirar uma dúvida." |
| `gallery_inquiry` | "Olá! Vi as galerias no site 131 Fotos e me interessei por uma sessão. Podemos conversar?" |
| `pricing_question` | "Olá! Tenho uma dúvida sobre preços e pacotes do Studio 131." |
| `priority_launch` | "Olá! Sou {name}, entrei na lista prioritária do site 131 Fotos e gostaria de mais informações." |
| `custom` | usa `opts.custom` |

### Arquivos a refatorar (substituir hardcoded → helper)

1. **`src/components/BookingChat.tsx`** — já tem `WHATSAPP_NUMBER` local + 3 chamadas `openWhatsApp` → trocar por helper centralizado e usar contextos `general`, `booking_interest`, `ai_escalation`, `ai_error`
2. **`src/components/WhatsAppFloat.tsx`** — verificar e usar contexto `general`
3. **`src/components/HeroSection.tsx`**, **`FooterSection.tsx`**, **`PricingSection.tsx`**, **`FaqSheet.tsx`**, **`GalleriesSection.tsx`**, **`BookingPromoBar.tsx`** — buscar usos e migrar com contexto adequado
4. **`src/components/LaunchPrioritySection.tsx`** — pode usar `priority_launch` como follow-up

### Passos

1. Buscar todos os usos do número/wa.me
2. Criar `src/lib/whatsapp.ts`
3. Refatorar cada arquivo encontrado para usar o helper

### Vantagens
- Trocar o número no futuro = 1 linha
- Mensagens consistentes e estratégicas (sempre dizem "vim pelo site")
- IA já tem fallback estruturado
- Cada CTA tem narrativa coerente com o contexto

