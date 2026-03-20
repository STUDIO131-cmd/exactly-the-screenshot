

## Aprendizados do Chat de Agendamento

### Fluxo do modo IA (ai_chat)
- Quando o usuário entra no modo de perguntas livres com IA, **não exibir botões de ação repetidos** após cada resposta
- O campo de texto livre já está visível — deixar a conversa fluir naturalmente
- Botões de ação (Agendar com Igor, Agendar com equipe, Falar no WhatsApp) devem aparecer **apenas quando o cliente sinalizar que está pronto**, não após cada resposta da IA
- Erros da IA mantêm opção de WhatsApp como fallback

### Fluxo geral
- "Conferir os dois cenários" → explica diferenças → opções de agendar ou "Tenho outra dúvida"
- "Tenho outra dúvida" → abre campo de texto livre (modo IA)
- WhatsApp é sempre o último recurso
- A IA consulta dados dinâmicos do banco (studio_services, available_dates, studio_info)
