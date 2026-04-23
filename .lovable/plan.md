

## Plano: Enriquecer IA com base de conhecimento do 131 Fotos

### Objetivo
Carregar todas as informações estratégicas que você enviou na tabela `studio_info` (key/value) e fazer a edge function `studio-chat` injetar isso no prompt da IA, para que ela responda de forma consultiva e completa.

### 1. Popular tabela `studio_info` (migration)

Insert das chaves abaixo (com `upsert` em `key`):

| key | value |
|---|---|
| `endereco` | "Dentro do Hotel Ibis Catanduva (SP), com estacionamento amplo e seguro." |
| `cidades_atendidas` | "Atendimento presencial no estúdio em Catanduva-SP. Sessões fora de Catanduva são projetos personalizados — alinhamos proposta e logística sob medida via WhatsApp." |
| `pagamento_e_cancelamento` | "Formas de pagamento, política de remarcação e cancelamento são detalhadas pelo nosso atendimento no WhatsApp." |
| `diferenciais` | "10 anos de carreira do Igor garantindo repertório para capturar espontaneidade. Clientes relatam que é 'tranquilo fotografar conosco' — deixamos todos à vontade. A maioria dos nossos clientes nunca foi fotografada antes e se surpreende com o resultado." |
| `cabelo_e_maquiagem` | "Não oferecemos serviço de beleza no local, mas indicamos parceiros de confiança em Catanduva." |
| `prazo_entrega` | "1 semana útil após a seleção das fotos pelo cliente." |
| `selecao_fotos` | "Fotografamos várias imagens na sessão. O cliente recebe uma galeria privada para escolher suas preferidas, que então recebem edição final." |
| `presente` | "Nossos produtos são excelentes para presentear. Fazemos abordagem-surpresa ao presenteado com mensagem especial e cartão digital." |
| `acompanhantes` | "É possível levar acompanhantes para apoio emocional. A quantidade de pessoas participando da sessão depende do objetivo e é negociada via WhatsApp." |
| `guia_de_preparo` | "Todos os clientes recebem um guia completo de preparo: como escolher as roupas, o que evitar, o que priorizar e recomendações práticas finais." |
| `duracao_sessao` | "Entre 1h e 2h30, dependendo do escopo do produto contratado." |
| `idiomas` | "Atendimento em português e inglês." |

### 2. Atualizar `supabase/functions/studio-chat/index.ts`

- Adicionar query: `supabase.from("studio_info").select("*")`
- Montar bloco `INFORMAÇÕES DO ESTÚDIO` no system prompt com todos os pares `key: value` formatados de forma legível
- Posicionar essa seção **logo após** o catálogo, antes de políticas
- Atualizar a regra de escalada: "Se a pergunta for sobre formas de pagamento, parcelamento, remarcação ou cancelamento, responda que esses detalhes são tratados pelo atendimento e use `[ESCALAR_WHATSAPP]` com o resumo."

### 3. Página admin para editar (mínimo viável)

Nova página `/admin/info` (`src/pages/admin/StudioInfoPage.tsx`):
- Lista todos os registros de `studio_info` em formato editável (key readonly + textarea para `value`)
- Botão "Salvar" por linha → `update`
- Botão "Adicionar nova chave" → cria registro novo
- Adicionar item "Informações" no menu de `AdminLayout.tsx`

### 4. RLS

Verificar políticas de `studio_info`:
- `SELECT` público (edge function usa service role, mas frontend admin lê com anon key)
- `INSERT/UPDATE/DELETE` permitidos para gestão (mesma estratégia das outras tabelas admin)

Se faltar, criar migration com as policies.

### 5. Atualização de memória

Atualizar `mem://tech/ai-chat-agent` registrando que a IA agora consome `studio_info` dinamicamente, e criar referência nova `mem://business/studio-info` listando as chaves cadastradas.

### Arquivos

**Criar:**
- `src/pages/admin/StudioInfoPage.tsx`
- Migration SQL (insert/upsert dos 12 registros + policies se necessário)

**Editar:**
- `supabase/functions/studio-chat/index.ts` — ler `studio_info` + injetar no prompt
- `src/App.tsx` — registrar rota `/admin/info`
- `src/pages/admin/AdminLayout.tsx` — adicionar item de menu

### Vantagens

- IA passa a responder com endereço, prazo, política de acompanhantes, idiomas, etc. com naturalidade
- Tudo editável pelo admin sem precisar mexer em código
- Pagamento/cancelamento conscientemente caem no fluxo de WhatsApp (mantém o atendimento humano no fechamento)
- Base pronta para crescer (basta adicionar nova chave em `studio_info`)

