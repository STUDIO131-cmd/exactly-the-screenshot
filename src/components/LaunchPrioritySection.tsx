import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const PenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5E6A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const formatWhatsApp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const LaunchPrioritySection = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    name.trim().length >= 3 &&
    whatsapp.replace(/\D/g, "").length === 11;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-priority-email", {
        body: { name: name.trim(), whatsapp: whatsapp.trim() },
      });
      if (error) throw error;
      toast.success("Pronto! Você está na lista de prioridade ✨");
      setName("");
      setWhatsapp("");
    } catch {
      toast.error("Não foi possível enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 md:py-16 px-6 font-sans font-light">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">
          Futuros Lançamentos
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Garanta prioridade em nossa próxima agenda especial e receba a proposta antes de todo mundo.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-8"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">
            Campanha
          </p>
          <h3 className="text-6xl md:text-8xl tracking-normal mb-1" style={{ fontFamily: "'Kapakana', cursive", color: '#F5E6A3' }}>
            Esse instante
          </h3>
          <p className="text-xs text-neutral-400 font-sans mb-1">
            Campanha de Dia das Mães
          </p>
          <p className="text-xs text-neutral-500 mb-5">
            Abertura abril · Realização em maio
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-white/25 transition-colors"
              maxLength={100}
            />
            <input
              type="tel"
              placeholder="(XX) XXXXX-XXXX"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-white/25 transition-colors"
            />

            <motion.button
              type="submit"
              disabled={!isValid || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur border border-white/15 px-6 py-3 text-sm text-neutral-200 transition-colors hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <PenIcon />
              <span>{loading ? "Enviando..." : "Entre na lista de prioridade"}</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchPrioritySection;
