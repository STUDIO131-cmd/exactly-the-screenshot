import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Bot, Layers } from "lucide-react";

const DashboardPage = () => {
  const { data: products } = useQuery({
    queryKey: ["products-count"],
    queryFn: async () => {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true);
      return count || 0;
    },
  });

  const { data: variants } = useQuery({
    queryKey: ["variants-count"],
    queryFn: async () => {
      const { count } = await supabase.from("variants").select("*", { count: "exact", head: true }).eq("is_active", true);
      return count || 0;
    },
  });

  const { data: leads } = useQuery({
    queryKey: ["leads-count"],
    queryFn: async () => {
      const { count } = await supabase.from("leads").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: logs } = useQuery({
    queryKey: ["logs-count"],
    queryFn: async () => {
      const { count } = await supabase.from("agent_logs").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: recentLeads } = useQuery({
    queryKey: ["recent-leads"],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5);
      return data || [];
    },
  });

  const { data: recentRecs } = useQuery({
    queryKey: ["recent-recommendations"],
    queryFn: async () => {
      const { data } = await supabase.from("recommendations").select("*, products(name), variants(name)").order("created_at", { ascending: false }).limit(5);
      return data || [];
    },
  });

  const stats = [
    { label: "Produtos Ativos", value: products, icon: Package },
    { label: "Variantes Ativas", value: variants, icon: Layers },
    { label: "Leads", value: leads, icon: Users },
    { label: "Interações IA", value: logs, icon: Bot },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold font-epika">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value ?? "—"}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentLeads && recentLeads.length > 0 ? (
              <div className="space-y-3">
                {recentLeads.map((lead: any) => (
                  <div key={lead.id} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{lead.name || "Anônimo"}</p>
                      <p className="text-muted-foreground text-xs">{lead.occasion_type || lead.objective || "—"}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum lead registrado ainda.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recomendações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentRecs && recentRecs.length > 0 ? (
              <div className="space-y-3">
                {recentRecs.map((rec: any) => (
                  <div key={rec.id} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{(rec as any).products?.name} — {(rec as any).variants?.name}</p>
                      <p className="text-muted-foreground text-xs truncate max-w-xs">{rec.recommendation_reason}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.round((rec.confidence_score || 0) * 100)}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma recomendação gerada ainda.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
