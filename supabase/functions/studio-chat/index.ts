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

    const [familiesRes, productsRes, variantsRes, pricingRes, policiesRes, faqsRes, campaignsRes, studioInfoRes] = await Promise.all([
      supabase.from("product_families").select("*").eq("is_active", true),
      supabase.from("products").select("*").eq("is_active", true),
      supabase.from("variants").select("*").eq("is_active", true),
      supabase.from("pricing").select("*"),
      supabase.from("policies").select("*"),
      supabase.from("faq_entries").select("*").eq("is_active", true),
      supabase.from("campaign_rules").select("*"),
      supabase.from("studio_info").select("*"),
    ]);

    const families = familiesRes.data || [];
    const products = productsRes.data || [];
    const variants = variantsRes.data || [];
    const pricing = pricingRes.data || [];
    const policies = policiesRes.data || [];
    const faqs = faqsRes.data || [];
    const campaigns = campaignsRes.data || [];
    const studioInfo = studioInfoRes.data || [];

    const keyLabels: Record<string, string> = {
      endereco: "Endereço do estúdio",
      cidades_atendidas: "Cidades atendidas",
      pagamento_e_cancelamento: "Pagamento, remarcação e cancelamento",
      diferenciais: "Diferenciais",
      cabelo_e_maquiagem: "Cabelo e maquiagem",
      prazo_entrega: "Prazo de entrega",
      selecao_fotos: "Seleção de fotos",
      presente: "Presentear alguém",
      acompanhantes: "Acompanhantes na sessão",
      guia_de_preparo: "Guia de preparo",
      duracao_sessao: "Duração da sessão",
      idiomas: "Idiomas de atendimento",
    };
    const studioInfoText = studioInfo
      .map((s: any) => `- ${keyLabels[s.key] || s.key}: ${s.value}`)
      .join("\n");

    const catalogText = products.map((p: any) => {
      const family = families.find((f: any) => f.id === p.family_id);
      const productVariants = variants.filter((v: any) => v.product_id === p.id);
      const variantLines = productVariants.map((v: any) => {
        const price = pricing.find((pr: any) => pr.variant_id === v.id);
        let line = `  • ${v.name}`;
        if (v.duration_minutes) line += ` | ${v.duration_minutes}min`;
        if (v.edited_photos) line += ` | ${v.edited_photos} fotos editadas`;
        if (v.printed_photos) line += ` | ${v.printed_photos} fotos reveladas`;
        if (v.video_included) line += ` | inclui vídeo`;
        if (v.strategy_included) line += ` | inclui estratégia de imagem`;
        if (v.photographer_type) line += ` | Fotógrafo: ${v.photographer_type}`;
        if (v.max_people) line += ` | até ${v.max_people} pessoas`;
        if (v.outfit_changes) line += ` | ${v.outfit_changes} trocas de roupa`;
        if (v.outfit_changes_rule) line += ` | trocas: ${v.outfit_changes_rule}`;
        if (v.venue_type) line += ` | local: ${v.venue_type}`;
        if (v.limited_slots) line += ` | ⚠️ apenas ${v.limited_slots} vagas`;
        if (price) {
          line += ` | R$${price.price_cash} à vista`;
          if (price.installments_qty) line += ` ou ${price.installments_qty}x de R$${price.installment_value}`;
          if (price.extra_photo_price) line += ` | foto extra: R$${price.extra_photo_price}`;
          if (price.extra_hour_price) line += ` | hora extra: R$${price.extra_hour_price}`;
          if (price.video_addon_price) line += ` | vídeo adicional: R$${price.video_addon_price}`;
        }
        return line;
      }).join("\n");
      return `📸 ${p.name} (${family?.name || ""})\nObjetivo: ${p.objective || ""}\n${variantLines}`;
    }).join("\n\n");

    const policiesText = policies.filter((p: any) => p.is_global).map((p: any) => `- ${p.title}: ${p.description}`).join("\n");
    const faqsText = faqs.map((f: any) => `P: ${f.question}\nR: ${f.answer}`).join("\n\n");

    const activeCampaigns = campaigns.filter((c: any) => {
      const now = new Date().toISOString().split("T")[0];
      return (!c.start_date || c.start_date <= now) && (!c.end_date || c.end_date >= now);
    });
    const campaignText = activeCampaigns.length > 0
      ? activeCampaigns.map((c: any) => `🎯 ${c.campaign_name}${c.slot_limit ? ` — ${c.slot_limit} vagas` : ""}`).join("\n")
      : "";

    const systemPrompt = `Você é a assistente virtual do Studio 131 Fotos, um estúdio de fotografia em Catanduva-SP. Responda de forma simpática, breve e objetiva. Use emojis com moderação. Sempre em português do Brasil.

CATÁLOGO COMPLETO DE OFERTAS:

${catalogText}

INFORMAÇÕES DO ESTÚDIO:
${studioInfoText}

REGRAS OPERACIONAIS:
${policiesText}

${campaignText ? `CAMPANHAS ATIVAS:\n${campaignText}\n` : ""}
AGENDA:
- Atendemos de segunda a sexta normalmente, e o primeiro sábado de cada mês.
- Domingos e feriados nacionais/municipais de Catanduva-SP são fechados.
- O cliente escolhe a data desejada no calendário e nosso atendimento confirma o horário pelo WhatsApp.
- Se o cliente perguntar sobre datas específicas, oriente a registrar interesse pelo calendário ou WhatsApp.

PERGUNTAS FREQUENTES:
${faqsText}

LÓGICA DE RECOMENDAÇÃO:
- Se o cliente quer atualizar foto profissional sem estratégia → Retratos Base (R$797)
- Se quer construir posicionamento ou estratégia de imagem → Posicionamento Profissional (R$2.250)
- Se é evento → Cobertura de Eventos (R$999)
- Se é Dia das Mães e quer na casa → Dia das Mães Experience (R$1.789)
- Se é Dia das Mães e busca economia → Dia das Mães Studio (R$699)
- Se é casal/gestante/15 anos e quer vídeo ou fotos reveladas → Experience (R$2.250)
- Se é casal/gestante/15 anos e busca economia → Studio (R$999)
- Sessões com Igor: Experience, Posicionamento. Sessões com Equipe: Studio, Base, Eventos.

REGRAS:
- Seja breve (máx 3-4 frases).
- Nunca invente informações que não estão acima.
- Sempre explique a recomendação em linguagem humana.
- Se o cliente quiser agendar, incentive a continuar no chat.
- Use as INFORMAÇÕES DO ESTÚDIO acima para responder dúvidas sobre endereço, prazo, acompanhantes, idiomas, preparo etc.

ESCALAR PARA WHATSAPP — REGRA CRÍTICA:
Use o marcador [ESCALAR_WHATSAPP] nas seguintes situações:
1. A pergunta sair do escopo (não for sobre catálogo, preços, agenda, políticas, recomendações ou o estúdio).
2. Você NÃO TIVER DADOS suficientes para responder com segurança.
3. A pergunta for sobre formas de pagamento, parcelamento, remarcação ou cancelamento — esses detalhes são tratados exclusivamente pelo atendimento humano.
4. O cliente quiser negociar quantidade de acompanhantes, sessão fora de Catanduva ou condições personalizadas.

Quando escalar, responda EXATAMENTE neste formato (sem nada além disso):

[ESCALAR_WHATSAPP] <um resumo curto em primeira pessoa do cliente, com a dúvida dele>

Exemplo:
[ESCALAR_WHATSAPP] Quero saber se vocês fazem ensaio newborn com bebê de 7 dias.

Não use esse marcador se a pergunta for respondível com os dados acima.`;

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
