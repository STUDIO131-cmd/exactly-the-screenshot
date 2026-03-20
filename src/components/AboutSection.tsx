import { motion } from "framer-motion";
import personalidadesLogo from "@/assets/personalidades-logo-white.png";


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

        {/* Subtle button / divider — 3x larger */}
        <button
          onClick={scrollToGalleries}
          className="mt-10 mb-8 w-full group cursor-pointer py-8"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent mb-6" />
          <span className="block text-5xl md:text-6xl normal-case tracking-normal text-neutral-200 group-hover:text-white transition-colors [text-shadow:0_0_12px_rgba(255,255,255,0.3)]" style={{ fontFamily: "'Kapakana', cursive" }}>
            Voltar às galerias
          </span>
          <span className="block text-sm text-neutral-300 mt-3">
            Ensaios pessoais · Casais · Gestantes · Retratos · 15 anos · Pequenos eventos
          </span>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent mt-6" />
        </button>

        {/* Closing line */}
        <p className="text-neutral-300 italic text-sm mb-10">
          Essa é nossa visão.
        </p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={openProposal}
            className="text-sm text-[rgba(232,210,150,0.8)] hover:text-[rgba(232,210,150,1)] transition-colors tracking-wide underline underline-offset-4 decoration-[rgba(232,210,150,0.3)]"
          >
            Quero conhecer proposta
          </button>
          <img
            src={personalidadesLogo}
            alt="Personalidades Logo"
            className="w-96 mt-2 opacity-80 object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
