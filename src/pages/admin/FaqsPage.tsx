import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FaqsPage = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs-list"],
    queryFn: async () => {
      const { data } = await supabase.from("faq_entries").select("*").order("category");
      return data || [];
    },
  });

  if (isLoading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold font-epika">Perguntas Frequentes</h1>
      <div className="grid gap-4">
        {(faqs || []).map((f: any) => (
          <Card key={f.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{f.question}</CardTitle>
                {f.category && <Badge variant="outline">{f.category}</Badge>}
                <Badge variant={f.is_active ? "default" : "secondary"}>
                  {f.is_active ? "Ativa" : "Inativa"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{f.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FaqsPage;
