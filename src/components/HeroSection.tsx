import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const handleCTA = () => {
    window.dispatchEvent(new Event("openBookingChat"));
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Gradient overlay - dark from left, transparent to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-6"
        >
          {/* Badge / Tag */}
          <div className="flex items-center gap-3">
            <span className="font-tiktok text-xs tracking-[0.3em] uppercase text-primary-foreground/60 border border-primary-foreground/20 px-4 py-1.5 rounded-full">
              Fotografia Lifestyle
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-tiktok text-primary-foreground text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
            Cada momento vivido merece ser{" "}
            <span className="text-accent font-bold">
              eternizado com poesia e sensibilidade.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="font-tiktok text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-xl">
            Fotografamos <strong className="text-primary-foreground">pessoas reais em momentos reais</strong>. Ensaios pessoais, casais, gestantes, retratos e eventos com um olhar documental e autêntico.
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={handleCTA}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="font-tiktok font-semibold text-sm md:text-base bg-accent text-accent-foreground px-8 py-4 rounded-full tracking-wide uppercase transition-all animate-neon-pulse"
          >
            Agendar Sessão
          </motion.button>

          {/* Social proof */}
          <p className="font-tiktok text-primary-foreground/40 text-xs tracking-wider uppercase">
            São José do Rio Preto — SP
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
