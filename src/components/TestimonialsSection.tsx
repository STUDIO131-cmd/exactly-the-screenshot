import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface TestimonialItem {
  id: number;
  name: string;
  video?: string;
  title?: string;
  subtitle?: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Carol Segura",
    video: "/videos/carol-segura-inauguracao.mp4",
    title: "Inauguração",
    subtitle: "Segura & Co.",
  },
  { id: 2, name: "Ana P." },
  { id: 3, name: "Juliana R." },
  { id: 4, name: "Camila L." },
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const maxSlide = Math.max(0, testimonials.length - 1);

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideo]);

  return (
    <section className="py-10 md:py-16 px-6 font-sans font-light">
      <div className="max-w-6xl mx-auto">
        {/* Vintage trunk SVG + Title */}
        <div className="flex flex-col items-center mb-3">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 drop-shadow-[0_0_18px_rgba(232,210,150,0.45)]"
          >
            {/* Trunk body */}
            <rect x="8" y="22" width="48" height="28" rx="4" stroke="rgba(232,210,150,0.7)" strokeWidth="1.5" fill="rgba(232,210,150,0.06)" />
            {/* Lid arc */}
            <path d="M8 22 C8 10 56 10 56 22" stroke="rgba(232,210,150,0.7)" strokeWidth="1.5" fill="rgba(232,210,150,0.03)" />
            {/* Center latch */}
            <rect x="28" y="18" width="8" height="8" rx="2" stroke="rgba(232,210,150,0.6)" strokeWidth="1.2" fill="none" />
            <circle cx="32" cy="22" r="1.2" fill="rgba(232,210,150,0.5)" />
            {/* Side straps */}
            <path d="M16 22V50" stroke="rgba(232,210,150,0.25)" strokeWidth="1" />
            <path d="M48 22V50" stroke="rgba(232,210,150,0.25)" strokeWidth="1" />
            {/* Handle */}
            <path d="M24 12 C24 8 40 8 40 12" stroke="rgba(232,210,150,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            {/* Noise texture dots */}
            <circle cx="20" cy="34" r="0.6" fill="rgba(232,210,150,0.2)" />
            <circle cx="35" cy="30" r="0.5" fill="rgba(232,210,150,0.15)" />
            <circle cx="44" cy="38" r="0.7" fill="rgba(232,210,150,0.18)" />
            <circle cx="26" cy="42" r="0.5" fill="rgba(232,210,150,0.12)" />
            <circle cx="38" cy="44" r="0.6" fill="rgba(232,210,150,0.2)" />
            <circle cx="15" cy="40" r="0.4" fill="rgba(232,210,150,0.1)" />
            <circle cx="50" cy="32" r="0.5" fill="rgba(232,210,150,0.14)" />
          </svg>
          <h2 className="text-3xl md:text-4xl text-center font-light tracking-wide text-[rgba(232,210,150,0.85)] drop-shadow-[0_0_20px_rgba(232,210,150,0.3)] [text-shadow:0_0_25px_rgba(232,210,150,0.2),0_0_50px_rgba(232,210,150,0.1)]">
            Baú de Memórias
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 text-center tracking-wide font-light mt-1">
            Confira histórias, depoimentos e vídeos bônus no baú da fotografia
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-neutral-800/50 backdrop-blur-sm text-neutral-300 hover:bg-neutral-700/50 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="overflow-hidden mx-12">
            <div
              className="flex gap-4 transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="relative flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/30"
                >
                  {item.video ? (
                    <>
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                        <p className="text-neutral-100 text-2xl md:text-3xl font-light tracking-wide drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]">
                          {item.title}
                        </p>
                        <p className="text-neutral-300 text-sm md:text-base mt-2 tracking-widest uppercase font-light drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
                          {item.subtitle}
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveVideo(item.video!)}
                          aria-label="Reproduzir vídeo"
                          className="mt-6 group/play flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all hover:scale-110"
                        >
                          <Play size={28} className="text-white ml-1 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]" fill="white" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center p-6">
                        <p className="text-neutral-200 text-xl mb-4">
                          "{item.name}"
                        </p>
                        <p className="text-neutral-400 text-sm">
                          Vídeo de depoimento em breve
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide(Math.min(maxSlide, currentSlide + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-neutral-800/50 backdrop-blur-sm text-neutral-300 hover:bg-neutral-700/50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Popup vídeo expandido com som */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-2 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setActiveVideo(null); }}
              className="absolute top-3 right-3 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
            <motion.video
              key={activeVideo}
              src={activeVideo}
              autoPlay
              controls
              playsInline
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;
