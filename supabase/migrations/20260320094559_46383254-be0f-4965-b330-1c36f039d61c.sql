
-- 1. Product Families
CREATE TABLE public.product_families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.product_families ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_families" ON public.product_families FOR SELECT TO public USING (true);

-- 2. Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES public.product_families(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  theme text,
  objective text,
  audience text,
  is_seasonal boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON public.products FOR SELECT TO public USING (true);
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Variants
CREATE TABLE public.variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  format_type text,
  venue_type text,
  duration_minutes integer,
  max_people integer,
  edited_photos integer,
  minimum_edited_photos integer,
  expected_photo_range text,
  printed_photos integer,
  printed_format text,
  video_included boolean NOT NULL DEFAULT false,
  video_minutes integer,
  video_type text,
  strategy_included boolean NOT NULL DEFAULT false,
  photographer_type text NOT NULL DEFAULT 'equipe',
  team_type text,
  outfit_changes integer,
  outfit_changes_rule text,
  selection_required boolean NOT NULL DEFAULT true,
  all_photos_edited boolean NOT NULL DEFAULT false,
  delivery_business_days integer NOT NULL DEFAULT 5,
  limited_slots integer,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(product_id, slug)
);
ALTER TABLE public.variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read variants" ON public.variants FOR SELECT TO public USING (true);
CREATE TRIGGER update_variants_updated_at BEFORE UPDATE ON public.variants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Pricing
CREATE TABLE public.pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id uuid NOT NULL REFERENCES public.variants(id) ON DELETE CASCADE,
  price_cash numeric NOT NULL,
  installments_qty integer,
  installment_value numeric,
  booking_rule text,
  balance_rule text,
  extra_photo_price numeric,
  extra_hour_price numeric,
  video_addon_price numeric,
  currency text NOT NULL DEFAULT 'BRL',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pricing" ON public.pricing FOR SELECT TO public USING (true);
CREATE TRIGGER update_pricing_updated_at BEFORE UPDATE ON public.pricing FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Policies
CREATE TABLE public.policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  is_global boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read policies" ON public.policies FOR SELECT TO public USING (true);

-- 6. Variant Policies
CREATE TABLE public.variant_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id uuid NOT NULL REFERENCES public.variants(id) ON DELETE CASCADE,
  policy_id uuid NOT NULL REFERENCES public.policies(id) ON DELETE CASCADE,
  UNIQUE(variant_id, policy_id)
);
ALTER TABLE public.variant_policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read variant_policies" ON public.variant_policies FOR SELECT TO public USING (true);

-- 7. Copy Blocks
CREATE TABLE public.copy_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  hero_headline text,
  manifesto text,
  audience_trigger text,
  differentiation text,
  cta text,
  closing_phrase text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.copy_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read copy_blocks" ON public.copy_blocks FOR SELECT TO public USING (true);
CREATE TRIGGER update_copy_blocks_updated_at BEFORE UPDATE ON public.copy_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Campaign Rules
CREATE TABLE public.campaign_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  seasonality text,
  start_date date,
  end_date date,
  slot_limit integer,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.campaign_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read campaign_rules" ON public.campaign_rules FOR SELECT TO public USING (true);

-- 9. Leads
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text,
  email text,
  city text,
  objective text,
  occasion_type text,
  people_count integer,
  desired_location text,
  wants_video boolean DEFAULT false,
  wants_prints boolean DEFAULT false,
  wants_strategy boolean DEFAULT false,
  budget_range text,
  notes text,
  source text DEFAULT 'chat',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read leads" ON public.leads FOR SELECT TO public USING (true);
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT TO public WITH CHECK (true);

-- 10. Recommendations
CREATE TABLE public.recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  recommended_product_id uuid REFERENCES public.products(id),
  recommended_variant_id uuid REFERENCES public.variants(id),
  recommendation_reason text,
  confidence_score numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read recommendations" ON public.recommendations FOR SELECT TO public USING (true);
CREATE POLICY "Public insert recommendations" ON public.recommendations FOR INSERT TO public WITH CHECK (true);

-- 11. FAQ Entries
CREATE TABLE public.faq_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text,
  question text NOT NULL,
  answer text NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id uuid REFERENCES public.variants(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.faq_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faq_entries" ON public.faq_entries FOR SELECT TO public USING (true);

-- 12. Agent Logs
CREATE TABLE public.agent_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  input_message text,
  parsed_intent text,
  parsed_constraints jsonb,
  recommended_variant_id uuid REFERENCES public.variants(id) ON DELETE SET NULL,
  response_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read agent_logs" ON public.agent_logs FOR SELECT TO public USING (true);
CREATE POLICY "Public insert agent_logs" ON public.agent_logs FOR INSERT TO public WITH CHECK (true);
