import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { id: 1, name: "Maria S." },
  { id: 2, name: "Ana P." },
  { id: 3, name: "Juliana R." },
  { id: 4, name: "Camila L." },
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const maxSlide = Math.max(0, testimonials.length - 1);

  return (
    <section className="py-16 px-6 font-sans font-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-4 text-neutral-200">
          O que se vive através da fotografia
        </h2>
        <p className="text-center text-neutral-400 mb-12">
          Bastidores e depoimentos
        </p>

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
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/30 flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <p className="text-neutral-200 text-xl mb-4">
                      "{item.name}"
                    </p>
                    <p className="text-neutral-400 text-sm">
                      Vídeo de depoimento em breve
                    </p>
                  </div>
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
    </section>
  );
};

export default TestimonialsSection;
