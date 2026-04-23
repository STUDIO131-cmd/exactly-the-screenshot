---
name: Booking Flow & Agenda
description: Scarcity framing, calendar availability rules, interest registration and AI to WhatsApp funnel
type: feature
---

## Regra de disponibilidade da agenda
- **Aberto:** segunda a sexta, das 08h30–18h00
- **Sábados:** apenas o **primeiro sábado válido do mês** (os demais ficam fechados)
- **Domingos:** sempre fechados
- **Feriados:** nacionais + municipais de Catanduva-SP sempre fechados
- Tabela `available_dates` funciona como **exceções**: bloqueia ou libera datas pontuais (ex.: liberar um domingo, bloquear um dia útil)
- Lógica centralizada em `src/lib/availability.ts` (`isDateAvailable`, `getDefaultOpenSaturday`, `getCatanduvaHolidays`)

## Calendário (BookingSection + BookingChat)
- Datas liberadas aparecem destacadas em verde (emerald-100)
- Demais dias ficam desabilitados
- Texto auxiliar padrão: constante `AVAILABILITY_HINT`

## Fluxo de registro de interesse
1. Cliente escolhe data no calendário
2. Bot pede nome + WhatsApp (formulário inline na bolha do chat)
3. Salva em `leads` com `source='chat'` e `notes="Interesse em [DATA]"`
4. Mostra botão verde "Falar no WhatsApp agora" com mensagem pronta:
   *"Olá! Sou [NOME]. Tenho interesse em agendar uma sessão no dia [DATA]. Pode confirmar o horário disponível?"*

## Fallback IA → WhatsApp
- Edge function `studio-chat` retorna `[ESCALAR_WHATSAPP] <resumo>` quando a pergunta sai do escopo ou falta dado
- Frontend detecta o marcador, exibe *"Resumi sua dúvida e estou chamando nosso atendimento"* e mostra CTA verde com o resumo já preenchido na URL do WhatsApp
- Erros da IA também caem no mesmo fluxo de escalada

## Painel admin
- `/admin/agenda` lista os próximos 6 meses com o sábado padrão calculado
- Permite bloquear sábado padrão ou liberar data extra
- Lista feriados aplicados (somente leitura)
