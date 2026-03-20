

## Plano: Reformular seção de agendamento

### Mudanças

**1. Reduzir gap entre logo e seção agenda**
- Remover `py-16` do BookingSection e reduzir para `py-4` ou similar
- Reduzir `mt-2` da logo no AboutSection

**2. Remover titulo e atualizar subtitulo**
- Remover h2 "Agende sua sessão"
- Trocar "Selecione uma data e entre em contato pelo WhatsApp" por "Consultar disponibilidade"

**3. Calendário maior, centralizado, branco e em PT-BR**
- Adicionar `react-day-picker` locale pt-BR usando `date-fns/locale/ptBR`
- Aumentar tamanho do calendário com classes customizadas (cells maiores, fonte maior)
- Estilizar com fundo branco/claro, texto escuro, centralizado
- Remover o layout flex row com botão lateral; calendário fica sozinho e centralizado

**4. Ao clicar numa data, abrir chat interativo**
- Ao selecionar data no calendário, abrir o BookingChat (já existente) mas com fluxo diferente
- Modificar o BookingChat para ter um novo primeiro passo: escolher entre "Agendar com Igor" ou "Agendar com fotógrafo da equipe Studio 131"
- Adicionar opção "Entender a diferença" e "Conferir os dois cenários"
- Após escolha, continuar fluxo existente (tipo de sessão → confirmação → WhatsApp)
- Passar a data selecionada do calendário para o chat

### Arquivos modificados
- `src/components/BookingSection.tsx` — layout, calendário maior/branco/pt-BR, ao selecionar data abre chat
- `src/components/BookingChat.tsx` — novo step inicial "photographer_choice" com opções Igor vs Equipe
- `src/components/AboutSection.tsx` — reduzir margin inferior da logo
- `src/components/ui/calendar.tsx` — aceitar locale prop, aumentar tamanho das células

### Detalhes técnicos
- Usar `import { ptBR } from "date-fns/locale"` no calendário
- BookingSection dispara evento `openBookingChat` com data selecionada via CustomEvent detail
- BookingChat recebe data via props ou evento e inicia no step `photographer_choice`
- Opções do novo step: "Agendar com Igor", "Agendar com fotógrafo da equipe", "Entender a diferença", "Conferir os dois cenários"

