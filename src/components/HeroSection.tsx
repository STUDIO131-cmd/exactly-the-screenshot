import { motion } from "framer-motion";
import logoHero from "@/assets/logo-hero.svg";

const HeroSection = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center gap-8">
        
        <motion.div
          className="px-10 py-5 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}>
          
          <img
            src={logoHero}
            alt="131 Fotos"
            className="w-28 md:w-36 h-auto" />
          
        </motion.div>

        <div className="text-neutral-300 text-base md:text-lg leading-relaxed tracking-wide">
          <p className="font-sans font-extralight text-sm">Poesia, sensibilidade e eternidade.</p>
          <p className="font-sans">Esse é o nosso olhar para a sua história.</p>
        </div>

        <div className="px-6 py-3 rounded-full border border-neutral-400/20 bg-neutral-400/5 backdrop-blur-sm">
          <span className="text-neutral-400 text-sm md:text-base tracking-[0.2em] uppercase font-sans">
            Fotografia documental
          </span>
        </div>
      </motion.div>
    </section>);

};

export default HeroSection;