---
name: Studio Info Knowledge Base
description: Key/value entries in studio_info table consumed by AI chat agent
type: feature
---

The `studio_info` table holds general studio knowledge consumed by `studio-chat` edge function and editable at `/admin/info`.

Current keys:
- `endereco` — Hotel Ibis Catanduva, parking
- `cidades_atendidas` — In-studio Catanduva-SP; off-site is custom
- `pagamento_e_cancelamento` — Always escalate to WhatsApp
- `diferenciais` — Igor 10y experience, clients feel at ease
- `cabelo_e_maquiagem` — Not offered, partners indicated
- `prazo_entrega` — 1 business week after selection
- `selecao_fotos` — Private gallery → client picks → final edit
- `presente` — Surprise approach with digital card
- `acompanhantes` — Allowed; quantity negotiated via WhatsApp
- `guia_de_preparo` — Full prep guide sent to all clients
- `duracao_sessao` — 1h to 2h30 depending on scope
- `idiomas` — Portuguese and English

**How to apply:** Edge function `studio-chat` injects all entries under "INFORMAÇÕES DO ESTÚDIO" block in system prompt. Add new key via admin UI to expand AI knowledge — no code change needed.
