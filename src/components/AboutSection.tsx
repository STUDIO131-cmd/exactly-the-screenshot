import { motion } from "framer-motion";
import personalidadesIcon from "@/assets/personalidades-icon.png";

const AboutSection = () => {
  const scrollToGalleries = () => {
    document.getElementById("galleries")?.scrollIntoView({ behavior: "smooth" });
  };

  const openProposal = () => {
    window.dispatchEvent(new CustomEvent("openBookingChat"));
  };

  return (
    <section className="py-20 px-6 font-sans font-light">
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Eye icon — pastel yellow tint */}
        <img
          src={personalidadesIcon}
          alt="Personalidades 131 Fotos"
          className="w-40 mx-auto mb-6 drop-shadow-[0_0_16px_rgba(232,210,150,0.5)] brightness-[0.3] sepia saturate-150"
        />

        <h2 className="text-3xl md:text-4xl mb-8 text-neutral-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] [text-shadow:0_0_20px_rgba(255,255,255,0.4),0_0_50px_rgba(240,240,240,0.25),0_0_80px_rgba(220,220,220,0.15)]">
          O que fotografamos
        </h2>

        {/* Body text — justified + centered feel */}
        <div className="text-sm md:text-base leading-relaxed text-neutral-200 space-y-5 text-justify [text-align-last:center]">
          <p>Momentos reais e importantes da vida.</p>
          <p>
            Trabalhamos com um olhar documental e espontâneo, fruto de repertório
            e conexões.
          </p>
          <p>
            O que muda não é o tipo de sessão.
            <br />
            <strong className="text-white">É o momento vivido.</strong>
          </p>
          <p>Nas galerias você confere nosso portfólio.</p>
        </div>

        {/* Subtle button / divider */}
        <button
          onClick={scrollToGalleries}
          className="mt-10 mb-8 w-full group cursor-pointer"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-400/50 to-transparent mb-4" />
          <span className="block text-[11px] uppercase tracking-[0.25em] text-neutral-300 group-hover:text-neutral-100 transition-colors [text-shadow:0_0_12px_rgba(200,200,200,0.25)]">
            Voltar às galerias
          </span>
          <span className="block text-xs text-neutral-400 mt-1">
            Ensaios pessoais · Casais · Gestantes · Retratos · 15 anos · Pequenos eventos
          </span>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-400/50 to-transparent mt-4" />
        </button>

        {/* Closing line */}
        <p className="text-neutral-400 italic text-sm mb-10">
          Essa é nossa visão.
        </p>

        {/* Repeated icon in neon circle + CTA */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border border-[rgba(232,210,150,0.5)] flex items-center justify-center"
            style={{
              boxShadow: "0 0 18px rgba(232,210,150,0.3), inset 0 0 8px rgba(232,210,150,0.1)",
            }}
          >
            <img
              src={personalidadesIcon}
              alt=""
              className="w-7 h-7 brightness-[0.3] sepia saturate-150"
            />
          </div>
          <button
            onClick={openProposal}
            className="text-sm text-[rgba(232,210,150,0.8)] hover:text-[rgba(232,210,150,1)] transition-colors tracking-wide underline underline-offset-4 decoration-[rgba(232,210,150,0.3)]"
          >
            Quero conhecer proposta
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
