

## Plano: Agenda inteligente + fallback IA → WhatsApp

### 1. Lógica de disponibilidade da agenda

Regra automática (sem precisar cadastrar data por data):
- **Aberto:** apenas **um sábado por mês**, das **08h30 às 18h00**
- **Fechado:** todos os outros dias da semana, todos os domingos, demais sábados do mês
- **Fechado em feriados:** nacionais + municipais de Catanduva-SP, mesmo se caírem em sábado disponível
- **Override manual:** painel admin pode liberar/bloquear datas específicas (mantém tabela `available_dates` como exceção)

**Feriados considerados:**
- Nacionais: Confraternização (01/01), Carnaval (seg+ter), Sexta Santa, Tiradentes (21/04), Dia do Trabalho (01/05), Corpus Christi, Independência (07/09), N. Sra. Aparecida (12/10), Finados (02/11), Proclamação da República (15/11), Consciência Negra (20/11), Natal (25/12)
- Catanduva-SP: Aniversário da cidade (14/04), Padroeira São Domingos (08/08)

**Qual sábado do mês fica aberto:** primeiro sábado do mês por padrão. Se for feriado, cai para o próximo sábado válido.

### 2. UI do calendário (2 lugares)

**A) `BookingSection` (landing page — "Consultar disponibilidade"):**
- Calendário mostra mês inteiro
- Apenas o sábado liberado fica clicável e destacado
- Demais dias: visualmente cinza/desabilitados
- Ao clicar no dia liberado → abre `BookingChat` já com a data pré-selecionada (comportamento atual mantido)

**B) `BookingChat` (passo `select_date`):**
- Mesmo calendário restrito
- Texto auxiliar: *"Atendemos um sábado por mês, das 08h30 às 18h. Escolha a data desejada e nosso atendimento confirma horário pelo WhatsApp."*
- Após escolher: passo de **registro de interesse** (nome + telefone + data desejada) → grava em `leads` com `notes` = "Interesse em [data]" → abre WhatsApp com mensagem pronta

### 3. Registro de interesse na data

Novo passo no chat após seleção de data:
```
Bot: "Perfeito! Para confirmarmos o horário disponível em [DATA], 
      preciso só do seu nome e WhatsApp."
User: digita nome + telefone
Bot: "Pronto! Estou te direcionando para nosso atendimento confirmar 
      o horário e período."
[Botão: Abrir WhatsApp]
```
Mensagem pré-formatada para WhatsApp:
> "Olá! Sou [NOME]. Tenho interesse em agendar uma sessão no dia [DATA]. Pode confirmar o horário disponível?"

Salva em `leads` (já existe a tabela com `name`, `phone`, `notes`, `source='chat'`).

### 4. Fallback inteligente da IA → WhatsApp

Atualizar **edge function `studio-chat`** para detectar quando não tem resposta confiável:
- Adicionar instrução no system prompt: *"Se a pergunta sair do escopo (catálogo, preços, datas, políticas) OU você não tiver dados suficientes, responda EXATAMENTE com o marcador `[ESCALAR_WHATSAPP]` seguido de um resumo curto da dúvida do cliente."*
- No frontend `BookingChat`, ao receber resposta com `[ESCALAR_WHATSAPP]`:
  - Exibir mensagem do bot: *"Resumi sua dúvida e estou chamando nosso atendimento."*
  - Mostrar botão destacado: **"Falar no WhatsApp agora"**
  - WhatsApp abre com o resumo extraído já preenchido

### 5. Painel admin — gestão de datas (mínimo viável)

Nova página `/admin/agenda`:
- Mostra os próximos 6 meses com o sábado padrão calculado
- Permite **bloquear** um sábado específico (vira exceção em `available_dates` com `is_available=false`)
- Permite **liberar** uma data extra fora do sábado padrão (insere em `available_dates` com `is_available=true`)
- Lista de feriados aplicados (somente leitura nesta versão)

### 6. Detalhes técnicos

**Novo arquivo:** `src/lib/availability.ts`
- `getCatanduvaHolidays(year)` — calcula feriados móveis (Carnaval, Páscoa, Corpus Christi via algoritmo de Meeus) + fixos
- `getDefaultOpenSaturday(year, month)` — primeiro sábado válido do mês
- `isDateAvailable(date, overrides)` — combina regra padrão + exceções da tabela `available_dates`

**Atualizar:**
- `src/components/BookingSection.tsx` — usar `isDateAvailable` no `disabled` do Calendar; destacar dias abertos
- `src/components/BookingChat.tsx` — mesmo calendário restrito + novo passo `register_interest` + tratamento de `[ESCALAR_WHATSAPP]`
- `supabase/functions/studio-chat/index.ts` — instrução de escalar + remover lista hardcoded de datas (passa a explicar a regra "1 sábado/mês, 08h30–18h")
- `src/App.tsx` — registrar rota `/admin/agenda`
- `src/pages/admin/AdminLayout.tsx` — adicionar item de menu "Agenda"

**Criar:**
- `src/lib/availability.ts`
- `src/pages/admin/AgendaPage.tsx`

**Banco:** mantém `available_dates` como tabela de **exceções** (não precisa mudança de schema). Adicionar política de `INSERT/UPDATE/DELETE` para `available_dates` (hoje só tem `SELECT`) — necessário para o admin gerenciar exceções.

### 7. Fluxo final consolidado

```text
Landing → calendário restrito (sábados liberados)
   ↓ clica numa data
Chat abre com data → confirma → pede nome + WhatsApp
   ↓ registra lead
Abre WhatsApp com mensagem pronta de interesse

Chat IA → pergunta fora do escopo
   ↓ IA responde com [ESCALAR_WHATSAPP] + resumo
Chat mostra "Resumi sua dúvida, chamando atendimento"
   ↓ botão WhatsApp com resumo preenchido
```

