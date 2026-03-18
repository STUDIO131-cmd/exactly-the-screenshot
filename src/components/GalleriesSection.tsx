import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleries = [
  { id: "retratos", title: "Retratos Profissionais", cover: "/placeholders/retratos-cover.jpg" },
  { id: "gestantes", title: "Gestantes", cover: "/placeholders/gestantes-cover.jpg" },
  { id: "15anos", title: "15 Anos", cover: "/placeholders/15anos-cover.jpg" },
  { id: "casais", title: "Casais", cover: "/placeholders/casais-cover.jpg" },
  { id: "pessoal", title: "Pessoal", cover: "/placeholders/pessoal-cover.jpg" },
  { id: "eventos", title: "Eventos", cover: "/placeholders/eventos-cover.jpg" },
];

const GalleriesSection = () => {
  const [openGallery, setOpenGallery] = useState<string | null>(null);

  const currentGallery = galleries.find((g) => g.id === openGallery);

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12 text-foreground">
          Galerias
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setOpenGallery(gallery.id)}
            >
              <img
                src={gallery.cover}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/80 to-transparent">
                <h3 className="font-display text-primary-foreground text-xl md:text-2xl">
                  {gallery.title}
                </h3>
              </div>
              <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-3 bg-background text-foreground font-ui text-sm tracking-wider uppercase rounded-full">
                  Ver Galeria
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openGallery && currentGallery && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenGallery(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenGallery(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
              >
                <X size={24} className="text-foreground" />
              </button>
              <h3 className="font-display text-2xl text-foreground text-center mb-6">
                {currentGallery.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                      <img
                        src={currentGallery.cover}
                        alt={`${currentGallery.title} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleriesSection;
