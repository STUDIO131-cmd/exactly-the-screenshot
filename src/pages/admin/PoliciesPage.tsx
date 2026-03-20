import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PoliciesPage = () => {
  const { data: policies, isLoading } = useQuery({
    queryKey: ["policies-list"],
    queryFn: async () => {
      const { data } = await supabase.from("policies").select("*").order("is_global", { ascending: false });
      return data || [];
    },
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold font-epika">Políticas</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Escopo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(policies || []).map((p: any) => (
            <TableRow key={p.id}>
              <TableCell className="font-mono text-xs">{p.code}</TableCell>
              <TableCell className="font-medium">{p.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-md">{p.description}</TableCell>
              <TableCell>
                <Badge variant={p.is_global ? "default" : "outline"}>
                  {p.is_global ? "Global" : "Específica"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PoliciesPage;
