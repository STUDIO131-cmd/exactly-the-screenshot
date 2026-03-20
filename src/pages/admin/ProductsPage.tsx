import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ProductsPage = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products-list"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, product_families(name)")
        .order("name");
      return data || [];
    },
  });

  const { data: variantCounts } = useQuery({
    queryKey: ["variant-counts"],
    queryFn: async () => {
      const { data } = await supabase.from("variants").select("product_id");
      const counts: Record<string, number> = {};
      (data || []).forEach((v: any) => {
        counts[v.product_id] = (counts[v.product_id] || 0) + 1;
      });
      return counts;
    },
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold font-epika">Produtos</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Família</TableHead>
            <TableHead>Objetivo</TableHead>
            <TableHead>Variantes</TableHead>
            <TableHead>Sazonal</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(products || []).map((p: any) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{(p as any).product_families?.name}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{p.objective}</TableCell>
              <TableCell>{variantCounts?.[p.id] || 0}</TableCell>
              <TableCell>{p.is_seasonal ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <Badge variant={p.is_active ? "default" : "secondary"}>
                  {p.is_active ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsPage;
