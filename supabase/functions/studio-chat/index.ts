import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, conversationHistory } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch studio data from database
    const [servicesRes, datesRes, infoRes] = await Promise.all([
      supabase.from("studio_services").select("*").eq("is_active", true),
      supabase.from("available_dates").select("*").eq("is_available", true).gte("date", new Date().toISOString().split("T")[0]).order("date"),
      supabase.from("studio_info").select("*"),
    ]);

    const services = servicesRes.data || [];
    const dates = datesRes.data || [];
    const info = infoRes.data || [];

    const infoMap: Record<string, string> = {};
    info.forEach((i: { key: string; value: string }) => {
      infoMap[i.key] = i.value;
    });

    const servicesText = services
      .map((s: { name: string; description: string; price_igor: number | null; price_team: number | null }) => {
        let line = `- ${s.name}: ${s.description || ""}`;
        if (s.price_igor) line += ` | Com Igor: R$${s.price_igor}`;
        if (s.price_team) line += ` | Com Equipe: R$${s.price_team}`;
        return line;
      })
      .join("\n");

    const datesText = dates
      .map((d: { date: string; photographer: string; notes: string | null }) => `- ${d.date} (${d.photographer})${d.notes ? ` — ${d.notes}` : ""}`)
      .join("\n");

    const systemPrompt = `Você é a assistente virtual do Studio 131 Fotos, um estúdio de fotografia. Responda de forma simpática, breve e objetiva. Use emojis com moderação. Sempre em português do Brasil.

INFORMAÇÕES DO ESTÚDIO:

Sobre Igor (fotógrafo principal):
${infoMap["igor_descricao"] || "Fotógrafo principal com estilo autoral e intimista."}

Sobre a Equipe Studio 131:
${infoMap["equipe_descricao"] || "Fotógrafos talentosos com ótimo custo-benefício."}

Diferença de valor:
${infoMap["diferenca_valor"] || "Igor tem valor diferenciado pela exclusividade. Equipe tem ótimo custo-benefício."}

Horário: ${infoMap["horario_funcionamento"] || "Segunda a Sábado, 9h às 18h"}

SESSÕES DISPONÍVEIS:
${servicesText || "Retratos Profissionais, Gestantes, 15 Anos, Casais, Ensaio Pessoal, Eventos"}

DATAS DISPONÍVEIS:
${datesText || "Consulte disponibilidade pelo WhatsApp."}

REGRAS:
- Seja breve (máx 3-4 frases)
- Se a pergunta não for sobre fotografia/estúdio, redirecione educadamente
- Se não souber o preço exato, diga que os valores variam e sugira contato pelo WhatsApp
- Nunca invente informações que não estão acima
- Se o cliente quiser agendar, incentive a continuar no chat de agendamento`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(conversationHistory || []),
      { role: "user", content: question },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas perguntas de uma vez. Tente novamente em alguns segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Serviço temporariamente indisponível." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua pergunta. Tente novamente!";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("studio-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
