import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const schema = z.object({
  name: z.string().trim().min(3).max(100),
  whatsapp: z.string().trim().min(14).max(16),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, whatsapp } = schema.parse(body);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY) {
      // Use Resend if available
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "131 Fotos <onboarding@resend.dev>",
          to: ["igorgagliardi@studio131.com.br"],
          subject: `Lista Prioridade Fotografia Lancamento: ${name}`,
          html: `<h2>Novo lead — Lista de Prioridade</h2>
<p><strong>Nome:</strong> ${name}</p>
<p><strong>WhatsApp:</strong> ${whatsapp}</p>
<p><strong>Campanha:</strong> Esse Instante (Abril/Maio)</p>`,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Resend error [${res.status}]: ${errBody}`);
      }
    } else {
      // Fallback: log the lead
      console.log("📩 LEAD CAPTURADO (sem RESEND_API_KEY configurada):");
      console.log(`  Nome: ${name}`);
      console.log(`  WhatsApp: ${whatsapp}`);
      console.log(`  Campanha: Esse Instante`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
