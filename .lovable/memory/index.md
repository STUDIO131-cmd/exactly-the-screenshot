# Memory: index.md
Updated: now

# Project Memory

## Core
All content and SEO strictly localized in Brazilian Portuguese (pt-BR).
Dark theme, glass-morphism. Global font: TikTok Sans Light. Decorative: Kapakana. Light gray for text.
Standard padding: py-10 mobile, py-16 desktop. Adjust hero/titles to avoid gaps.
Catalog tiers: Igor Gagliardi (exclusive) vs Studio 131 Team (standard).
All images converted to .webp at q=40 (60% reduction). Stored in public/galleries/{category}/.

## Memories
- [Visual Identity](mem://style/visual-identity) — Global typography, dark theme, and glass-morphism aesthetics
- [Hero Section](mem://style/hero-section) — Minimalist design rules for the hero component
- [Gallery Cards Design](mem://features/galleries) — Visual styling and responsiveness for gallery covers
- [Responsive Vertical Spacing](mem://constraints/responsive-design) — Standardized vertical padding for mobile vs desktop
- [Landing Page Structure](mem://project/page-structure) — Required sequential order of landing page sections
- [FAQ System](mem://features/faq-system) — Bottom-sheet FAQ detailing service tiers
- [Product Offerings & Rules](mem://business/product-offerings) — Studio catalog tiers and standard operational rules
- [Studio Info Knowledge Base](mem://business/studio-info) — Key/value entries consumed by AI agent, editable at /admin/info
- [Booking Flow & Agenda](mem://features/booking-flow) — Scarcity framing and AI to WhatsApp funnel
- [AI Booking Agent](mem://tech/ai-chat-agent) — Logic and UI behavior for the generative AI chat (now consumes studio_info dynamically)
- [Admin Dashboard](mem://tech/admin-dashboard) — Management and simulator tools at /admin
- [Admin Auth & Roles](mem://tech/admin-auth) — Email/password login + user_roles RLS guarding all admin tables
- [Google Calendar Integration](mem://tech/google-calendar) — Requirements for calendar availability filtering
- [Supabase Schema Structure](mem://tech/studio-database-schema) — Granular relational model for catalog and pricing
- [Lead Capture Edge Function](mem://features/launch-priority-section) — Supabase Edge Functions for lead notifications
- [Image Optimization Standard](mem://constraints/image-optimization) — WebP conversion presets and storage paths for gallery/site images
