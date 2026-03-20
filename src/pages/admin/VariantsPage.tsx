import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const VariantsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["variants-full"],
    queryFn: async () => {
      const [varRes, priceRes, prodRes] = await Promise.all([
        supabase.from("variants").select("*").order("product_id"),
        supabase.from("pricing").select("*"),
        supabase.from("products").select("id, name"),
      ]);
      return {
        variants: varRes.data || [],
        pricing: priceRes.data || [],
        products: prodRes.data || [],
      };
    },
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;

  const { variants, pricing, products } = data || { variants: [], pricing: [], products: [] };
  const getProduct = (id: string) => products.find((p: any) => p.id === id);
  const getPrice = (vid: string) => pricing.find((p: any) => p.variant_id === vid);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold font-epika">Variantes</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Variante</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Fotos</TableHead>
              <TableHead>Vídeo</TableHead>
              <TableHead>Estratégia</TableHead>
              <TableHead>Fotógrafo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((v: any) => {
              const prod = getProduct(v.product_id);
              const price = getPrice(v.id);
              return (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{prod?.name || "—"}</TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.duration_minutes ? `${v.duration_minutes}min` : "—"}</TableCell>
                  <TableCell>
                    {v.edited_photos || v.minimum_edited_photos || "—"}
                    {v.printed_photos ? ` + ${v.printed_photos} rev.` : ""}
                  </TableCell>
                  <TableCell>{v.video_included ? "✓" : "—"}</TableCell>
                  <TableCell>{v.strategy_included ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <Badge variant={v.photographer_type === "Igor Gagliardi" ? "default" : "outline"}>
                      {v.photographer_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {price ? `R$${price.price_cash}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={v.is_active ? "default" : "secondary"}>
                      {v.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VariantsPage;
