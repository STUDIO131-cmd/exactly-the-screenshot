

## Plano: Reformular fluxo "Conferir os dois cenários"

Em vez de redirecionar direto ao WhatsApp, o fluxo passa a ser:

1. **Explicar diferenças** — Mensagem detalhada sobre cenário, repertório, autoria, valor e preço de Igor vs Equipe Studio 131
2. **Perguntar se tem dúvidas** — Opções: "Agendar com Igor", "Agendar com equipe", "Tenho outra dúvida"
3. **Se "Tenho outra dúvida"** → Novo step `faq_in_chat` com as perguntas do FAQ inline (cards simplificados)
4. **Após FAQ** → Opções: "Agendar com Igor", "Agendar com equipe", "Falar no WhatsApp"
5. **Último caso** → WhatsApp só aparece como opção final

### Mudanças técnicas

**`src/components/BookingChat.tsx`**:

- Adicionar novo step `"comparing"` e `"faq_in_chat"` ao tipo `ChatStep`
- Reescrever o bloco `"Conferir os dois cenários"` (linhas 126-136):
  - Enviar mensagem explicativa com diferenças de cenário, repertório, autoria e valores
  - Apresentar opções: "Agendar com Igor", "Agendar com fotógrafo da equipe Studio 131", "Tenho outra dúvida"
  - Step → `"comparing"`
- Adicionar handler para step `"comparing"`:
  - Se escolher fotógrafo → segue fluxo normal (session_type)
  - Se "Tenho outra dúvida" → step `"faq_in_chat"`, exibir FAQ resumido como mensagens do bot com opções finais
- Adicionar handler para step `"faq_in_chat"`:
  - Opções: "Agendar com Igor", "Agendar com equipe", "Falar no WhatsApp"
  - WhatsApp só aqui como último recurso

