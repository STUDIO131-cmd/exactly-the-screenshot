import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      className="min-h-[60vh] relative flex flex-col items-center justify-center px-6 py-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-primary/60" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h1 className="font-tiktok text-primary-foreground text-5xl md:text-7xl font-bold tracking-tight mb-6">
          131 Fotos
        </h1>
        <p className="font-tiktok text-primary-foreground/70 text-sm md:text-base tracking-[0.3em] uppercase">
          Fotografia Lifestyle
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
