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



        <h2 className="text-2xl md:text-3xl mb-8 text-neutral-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] [text-shadow:0_0_20px_rgba(255,255,255,0.4),0_0_50px_rgba(240,240,240,0.25),0_0_80px_rgba(220,220,220,0.15)]">
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

        {/* Divider top */}
        <div className="mt-14 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Glass bar button */}
        <motion.button
          onClick={scrollToGalleries}
          className="mt-6 mb-6 w-full group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/15 px-6 py-6">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />
            <span className="relative block text-3xl md:text-4xl normal-case tracking-normal text-neutral-200 group-hover:text-white transition-colors [text-shadow:0_0_12px_rgba(255,255,255,0.3)]" style={{ fontFamily: "'Kapakana', cursive" }}>
              Voltar às galerias
            </span>
            <span className="relative block text-[0.5rem] sm:text-[0.65rem] md:text-xs text-neutral-300 mt-3 text-center tracking-tight">
              Ensaios pessoais · Casais · Gestantes · Retratos · 15 anos · Eventos
            </span>
          </div>
        </motion.button>

        {/* Divider bottom */}
        <div className="mb-14 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Closing line */}
        <p className="text-neutral-300 italic text-sm mb-14">
          Essa é a nossa visão.
          <br />
          Agora, que tal compartilhar a sua?
        </p>

        <motion.button
          onClick={openProposal}
          className="group cursor-pointer mx-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative overflow-hidden rounded-full bg-white/10 backdrop-blur-lg border border-white/15 w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />
            <div className="relative flex flex-col items-center justify-center">
              <span className="block text-2xl md:text-3xl leading-tight text-neutral-200 group-hover:text-white transition-colors [text-shadow:0_0_12px_rgba(255,255,255,0.3)]">
                Toque e planeje
                <br />
                uma sessão
              </span>
              <img
                src={personalidadesLogo}
                alt="Personalidades Logo"
                className="mx-auto mt-3 opacity-80 object-contain"
                style={{ width: '9rem' }}
              />
            </div>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default AboutSection;
