import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Target, AlertTriangle, MessageSquare } from "lucide-react";
import { recommend, parseLeadFromText, type RecommendationResult, type LeadInput } from "@/lib/recommendation-engine";

const SimulatorPage = () => {
  const [input, setInput] = useState("");
  const [parsedLead, setParsedLead] = useState<LeadInput | null>(null);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const { data } = useQuery({
    queryKey: ["simulator-data"],
    queryFn: async () => {
      const [prodRes, varRes, priceRes, famRes] = await Promise.all([
        supabase.from("products").select("*, product_families(slug)").eq("is_active", true),
        supabase.from("variants").select("*").eq("is_active", true),
        supabase.from("pricing").select("*"),
        supabase.from("product_families").select("*"),
      ]);
      return {
        products: (prodRes.data || []).map((p: any) => ({ ...p, family_slug: (p as any).product_families?.slug })),
        variants: varRes.data || [],
        pricing: priceRes.data || [],
      };
    },
  });

  const handleSimulate = () => {
    if (!input.trim() || !data) return;
    const lead = parseLeadFromText(input);
    setParsedLead(lead);
    const rec = recommend(lead, data.products, data.variants, data.pricing);
    setResult(rec);
    setNoMatch(!rec);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-semibold font-epika">Simulador do Agente</h1>
      <p className="text-sm text-muted-foreground">
        Digite o contexto de um lead como se fosse uma conversa no WhatsApp. O sistema vai identificar intenção, restrições e recomendar a melhor oferta.
      </p>

      <div className="space-y-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Quero fazer um ensaio de casal com vídeo, temos disponibilidade no próximo mês..."
          className="min-h-[100px]"
        />
        <Button onClick={handleSimulate} disabled={!input.trim()}>
          <Bot className="h-4 w-4 mr-2" />
          Simular Recomendação
        </Button>
      </div>

      {parsedLead && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4" /> Intenção Identificada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {parsedLead.objective && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Objetivo</span>
                  <Badge variant="outline">{parsedLead.objective}</Badge>
                </div>
              )}
              {parsedLead.occasion_type && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ocasião</span>
                  <Badge variant="outline">{parsedLead.occasion_type}</Badge>
                </div>
              )}
              {!parsedLead.objective && !parsedLead.occasion_type && (
                <p className="text-sm text-muted-foreground">Nenhuma intenção clara identificada.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Restrições Detectadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {parsedLead.wants_video && <Badge className="mr-1">Quer vídeo</Badge>}
              {parsedLead.wants_prints && <Badge className="mr-1">Quer fotos reveladas</Badge>}
              {parsedLead.wants_strategy && <Badge className="mr-1">Quer estratégia</Badge>}
              {parsedLead.desired_location && <Badge className="mr-1" variant="outline">Local: {parsedLead.desired_location}</Badge>}
              {parsedLead.people_count && <Badge className="mr-1" variant="outline">{parsedLead.people_count} pessoas</Badge>}
              {parsedLead.budget_range && <Badge className="mr-1" variant="outline">Budget: {parsedLead.budget_range}</Badge>}
              {!parsedLead.wants_video && !parsedLead.wants_prints && !parsedLead.wants_strategy && !parsedLead.desired_location && !parsedLead.people_count && !parsedLead.budget_range && (
                <p className="text-sm text-muted-foreground">Nenhuma restrição detectada.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {result && (
        <Card className="border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Send className="h-4 w-4" />
              Recomendação: {result.product_name} — {result.variant_name}
              <Badge className="ml-auto">{Math.round(result.confidence * 100)}% confiança</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Justificativa:</p>
              <p className="text-sm text-muted-foreground">{result.reason}</p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-sm font-medium mb-1 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Resposta pronta para WhatsApp:
              </p>
              <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-line">{result.commercial_response}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {noMatch && (
        <Card className="border-destructive">
          <CardContent className="py-4">
            <p className="text-sm text-destructive">
              Não foi possível identificar uma recomendação clara. Tente adicionar mais contexto: tipo de sessão, objetivo, orçamento ou preferências.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimulatorPage;
