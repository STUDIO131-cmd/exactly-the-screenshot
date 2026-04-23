---
name: Admin Auth & Roles
description: Authentication and role-based access control for /admin routes
type: feature
---

**Auth model:** Email + senha. Signup público desativado (`disable_signup: true`). Email auto-confirmado. HIBP ativo.

**Roles:**
- `app_role` enum: `admin`, `user`
- `user_roles` table (`user_id` → `auth.users`, `role`, unique on pair)
- `has_role(uid, role)` security-definer SQL function

**RLS pattern em todas as tabelas admin** (studio_info, available_dates, products, variants, product_families, faq_entries, policies, pricing, campaign_rules, copy_blocks, studio_services, variant_policies):
- Leitura pública mantida
- Escrita: `FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'))`

**Tabelas que ainda permitem insert público:** `leads`, `agent_logs`, `recommendations` (captura anônima de chat) — intencional.

**Frontend:**
- `src/hooks/useAuth.tsx` — provider/hook (session, user, isAdmin, signIn, signOut). Usa `onAuthStateChange` antes de `getSession()`. Role check é `setTimeout(0)` para evitar deadlock.
- `src/components/RequireAdmin.tsx` — guarda; redireciona para `/auth` se não autenticado/admin.
- `src/pages/Auth.tsx` — login email/senha em `/auth`.
- `/admin/*` envolto em `<RequireAdmin>` no `App.tsx`.
- AdminLayout mostra email do usuário logado + botão "Sair".

**Para criar o primeiro admin:** criar usuário no Cloud → Users e inserir `INSERT INTO user_roles (user_id, role) VALUES ('<uid>', 'admin')` via SQL.
