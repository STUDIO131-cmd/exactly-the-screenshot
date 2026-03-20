import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const LeadsPage = () => {
  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads-list"],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold font-epika">Leads</h1>
      {leads && leads.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Objetivo</TableHead>
              <TableHead>Ocasião</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((l: any) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.name || "Anônimo"}</TableCell>
                <TableCell>{l.phone || "—"}</TableCell>
                <TableCell>{l.objective || "—"}</TableCell>
                <TableCell>
                  {l.occasion_type ? <Badge variant="outline">{l.occasion_type}</Badge> : "—"}
                </TableCell>
                <TableCell>{l.source || "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(l.created_at).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-muted-foreground">Nenhum lead registrado ainda.</p>
      )}
    </div>
  );
};

export default LeadsPage;
