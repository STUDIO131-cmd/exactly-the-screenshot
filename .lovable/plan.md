

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
- A IA consulta dados dinâmicos do banco (products, variants, pricing, policies, faq_entries, campaign_rules)

## Modelo de Dados

### Estrutura normalizada
- `product_families` → famílias de produto (ensaio_tematico, retrato_profissional, cobertura_evento, campanha_sazonal)
- `products` → produtos individuais com objetivo e público
- `variants` → variantes de cada produto (Studio vs Experience, Base vs Posicionamento)
- `pricing` → preços, parcelamento e regras de pagamento por variante
- `policies` → regras operacionais globais e específicas
- `variant_policies` → ligação M:N entre variantes e políticas
- `copy_blocks` → textos comerciais por produto
- `campaign_rules` → campanhas sazonais com datas e limite de vagas
- `leads` → cadastro de leads do chat e WhatsApp
- `recommendations` → recomendações geradas pelo motor
- `faq_entries` → perguntas frequentes
- `agent_logs` → logs de interações do agente

### Motor de Recomendação
- Regras determinísticas (sem IA obscura)
- Parse de texto para identificar objetivo, ocasião e restrições
- Recomendação com justificativa em linguagem humana
- Resposta comercial pronta para WhatsApp
