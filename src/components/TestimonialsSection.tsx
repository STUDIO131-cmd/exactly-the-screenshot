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
    <section className="py-16 px-6 bg-surface-subtle">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4 text-foreground">
          O que se vive através da fotografia
        </h2>
        <p className="font-body text-center text-muted-foreground mb-12">
          Bastidores e depoimentos
        </p>

        <div className="relative">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
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
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 aspect-[9/16] rounded-2xl overflow-hidden bg-primary flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <p className="font-display text-primary-foreground text-xl mb-4">
                      "{item.name}"
                    </p>
                    <p className="font-body text-primary-foreground/60 text-sm">
                      Vídeo de depoimento em breve
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide(Math.min(maxSlide, currentSlide + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
