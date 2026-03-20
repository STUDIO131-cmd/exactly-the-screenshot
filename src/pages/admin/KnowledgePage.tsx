import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KnowledgePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["knowledge-base"],
    queryFn: async () => {
      const [fam, prod, vars, price, pol, faqs, camp] = await Promise.all([
        supabase.from("product_families").select("*"),
        supabase.from("products").select("*, product_families(name)"),
        supabase.from("variants").select("*, products(name)"),
        supabase.from("pricing").select("*, variants(name, products(name))"),
        supabase.from("policies").select("*"),
        supabase.from("faq_entries").select("*"),
        supabase.from("campaign_rules").select("*, products(name)"),
      ]);
      return {
        families: fam.data || [],
        products: prod.data || [],
        variants: vars.data || [],
        pricing: price.data || [],
        policies: pol.data || [],
        faqs: faqs.data || [],
        campaigns: camp.data || [],
      };
    },
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (!data) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold font-epika">Base de Conhecimento</h1>
      <p className="text-sm text-muted-foreground">Visualize toda a base de dados carregada que alimenta o agente de IA.</p>

      <Tabs defaultValue="catalog">
        <TabsList>
          <TabsTrigger value="catalog">Catálogo</TabsTrigger>
          <TabsTrigger value="pricing">Preços</TabsTrigger>
          <TabsTrigger value="policies">Políticas</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4 mt-4">
          {data.families.map((fam: any) => {
            const familyProducts = data.products.filter((p: any) => p.family_id === fam.id);
            return (
              <Card key={fam.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {fam.name}
                    <Badge variant="outline">{fam.slug}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {familyProducts.map((p: any) => {
                    const prodVariants = data.variants.filter((v: any) => v.product_id === p.id);
                    return (
                      <div key={p.id} className="border-l-2 border-primary pl-3">
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.objective}</p>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {prodVariants.map((v: any) => (
                            <Badge key={v.id} variant="secondary" className="text-xs">
                              {v.name} ({v.photographer_type})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="pricing" className="space-y-2 mt-4">
          {data.pricing.map((p: any) => (
            <div key={p.id} className="flex items-center justify-between border-b border-border py-2 text-sm">
              <span className="font-medium">{(p as any).variants?.products?.name} — {(p as any).variants?.name}</span>
              <span>R${p.price_cash} à vista | {p.installments_qty}x R${p.installment_value}</span>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="policies" className="space-y-2 mt-4">
          {data.policies.map((p: any) => (
            <div key={p.id} className="border-b border-border py-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{p.title}</span>
                <Badge variant={p.is_global ? "default" : "outline"} className="text-xs">
                  {p.is_global ? "Global" : "Específica"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="faqs" className="space-y-2 mt-4">
          {data.faqs.map((f: any) => (
            <div key={f.id} className="border-b border-border py-2">
              <p className="font-medium text-sm">{f.question}</p>
              <p className="text-sm text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-2 mt-4">
          {data.campaigns.map((c: any) => (
            <div key={c.id} className="border-b border-border py-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{c.campaign_name}</span>
                {c.slot_limit && <Badge variant="outline">{c.slot_limit} vagas</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">
                {(c as any).products?.name} | {c.start_date} → {c.end_date}
              </p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgePage;
