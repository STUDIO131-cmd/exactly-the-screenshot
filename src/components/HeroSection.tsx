import { motion } from "framer-motion";
import logoWhite from "@/assets/logo-white.svg";

const HeroSection = () => {
  return (
    <section className="min-h-[60vh] bg-primary flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center gap-8"
      >
        <img
          src={logoWhite}
          alt="131 Fotos"
          className="w-48 md:w-64 h-auto"
        />

        <div className="text-primary-foreground/80 text-base md:text-lg leading-relaxed tracking-wide">
          <p>Poesia, sensibilidade e eternidade.</p>
          <p>Esse é o nosso olhar para a sua história.</p>
        </div>

        <div className="px-6 py-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-sm">
          <span className="text-primary-foreground/70 text-sm md:text-base tracking-[0.2em] uppercase">
            Fotografia documental
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
