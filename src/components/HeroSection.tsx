import { motion } from "framer-motion";
import logoWhite from "@/assets/logo-white.svg";

const HeroSection = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center gap-8"
      >
        <motion.div
          className="px-10 py-5 rounded-2xl border border-foreground/15 bg-foreground/5 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <img
            src={logoWhite}
            alt="131 Fotos"
            className="w-28 md:w-36 h-auto invert"
          />
        </motion.div>

        <div className="text-foreground/80 text-base md:text-lg leading-relaxed tracking-wide">
          <p>Poesia, sensibilidade e eternidade.</p>
          <p>Esse é o nosso olhar para a sua história.</p>
        </div>

        <div className="px-6 py-3 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-sm">
          <span className="text-foreground/70 text-sm md:text-base tracking-[0.2em] uppercase">
            Fotografia documental
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
