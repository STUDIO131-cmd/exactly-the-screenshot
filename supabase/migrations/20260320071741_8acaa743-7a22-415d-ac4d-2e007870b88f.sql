
-- Tabela de serviços/sessões com preços
CREATE TABLE public.studio_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_igor NUMERIC,
  price_team NUMERIC,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de datas disponíveis
CREATE TABLE public.available_dates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  photographer TEXT NOT NULL DEFAULT 'both', -- 'igor', 'team', 'both'
  is_available BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de informações gerais (chave-valor)
CREATE TABLE public.studio_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.studio_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.available_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_info ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública (dados do estúdio são públicos)
CREATE POLICY "Public read studio_services" ON public.studio_services FOR SELECT USING (true);
CREATE POLICY "Public read available_dates" ON public.available_dates FOR SELECT USING (true);
CREATE POLICY "Public read studio_info" ON public.studio_info FOR SELECT USING (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_studio_services_updated_at
  BEFORE UPDATE ON public.studio_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_studio_info_updated_at
  BEFORE UPDATE ON public.studio_info
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
