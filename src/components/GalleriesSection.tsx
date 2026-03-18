import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";

import retratosIgor1 from "@/assets/gallery/retratos-igor-1.jpg";
import retratosIgor2 from "@/assets/gallery/retratos-igor-2.jpg";
import retratosIgor3 from "@/assets/gallery/retratos-igor-3.jpg";

const galleries = [
  { id: "retratos", title: "Retratos Profissionais", cover: "/placeholders/retratos-cover.jpg" },
  { id: "gestantes", title: "Gestantes", cover: "/placeholders/gestantes-cover.jpg" },
  { id: "15anos", title: "15 Anos", cover: "/placeholders/15anos-cover.jpg" },
  { id: "casais", title: "Casais", cover: "/placeholders/casais-cover.jpg" },
  { id: "pessoal", title: "Pessoal", cover: "/placeholders/pessoal-cover.jpg" },
  { id: "eventos", title: "Eventos", cover: "/placeholders/eventos-cover.jpg" },
];

// Fotos reais por galeria (Igor)
const igorPhotosByGallery: Record<string, string[]> = {
  retratos: [retratosIgor1, retratosIgor2, retratosIgor3],
};

const defaultIgorPhotos = Array(6).fill(null).map((_, i) => `/placeholders/igor-${i + 1}.jpg`);
const equipePhotos = Array(6).fill(null).map((_, i) => `/placeholders/equipe-${i + 1}.jpg`);

interface GalleriesSectionProps {
  onOpenBookingChat?: () => void;
}

const GalleriesSection = ({ onOpenBookingChat }: GalleriesSectionProps) => {
  const [openGallery, setOpenGallery] = useState<string | null>(null);

  const currentGallery = galleries.find((g) => g.id === openGallery);

  const handleAgendarClick = () => {
    setOpenGallery(null);
    if (onOpenBookingChat) {
      onOpenBookingChat();
    } else {
      // Fallback: dispara evento customizado
      window.dispatchEvent(new CustomEvent('openBookingChat'));
    }
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-tiktok text-3xl md:text-4xl text-center mb-12 text-foreground">
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
                <h3 className="font-tiktok text-primary-foreground text-xl md:text-2xl">
                  {gallery.title}
                </h3>
              </div>
              <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-3 bg-background text-foreground font-tiktok text-sm tracking-wider uppercase rounded-full">
                  Ver Galeria
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal da Galeria */}
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
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar */}
              <button
                onClick={() => setOpenGallery(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-20"
              >
                <X size={24} className="text-foreground" />
              </button>

              {/* Conteúdo com padding para a barra fixa */}
              <div className="p-6 pb-24">
                {/* Título */}
                <h3 className="font-tiktok text-2xl text-foreground text-center mb-8">
                  {currentGallery.title}
                </h3>

                {/* Seção 1: Fotos assinadas por Igor Gagliardi */}
                <div className="mb-10">
                  <h4 className="font-tiktok text-lg text-foreground/70 mb-4 text-center">
                    Fotos assinadas por <span className="text-foreground font-semibold">Igor Gagliardi</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {igorPhotos.map((photo, i) => (
                      <div key={`igor-${i}`} className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                        <img
                          src={currentGallery.cover}
                          alt={`Igor Gagliardi - ${currentGallery.title} ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-10">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="font-tiktok text-xs text-muted-foreground tracking-widest uppercase">
                    •••
                  </span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                {/* Seção 2: Fotos assinadas por Equipe Studio 131 */}
                <div>
                  <h4 className="font-tiktok text-lg text-foreground/70 mb-4 text-center">
                    Fotos assinadas por <span className="text-foreground font-semibold">Equipe Studio 131</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {equipePhotos.map((photo, i) => (
                      <div key={`equipe-${i}`} className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                        <img
                          src={currentGallery.cover}
                          alt={`Equipe Studio 131 - ${currentGallery.title} ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Barra Fixa de Preço (overlay com baixa opacidade) */}
              <div className="sticky bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between gap-4 rounded-b-2xl">
                <p className="font-tiktok text-primary-foreground text-sm md:text-base">
                  Sessões a partir de <span className="font-semibold">R$797,00</span> a <span className="font-semibold">R$2.250,00</span>
                </p>
                <button
                  onClick={handleAgendarClick}
                  className="flex items-center gap-2 px-6 py-3 bg-background text-foreground font-tiktok text-sm tracking-wider uppercase rounded-full hover:bg-background/90 transition-colors whitespace-nowrap"
                >
                  <Calendar size={18} />
                  Agendar agora
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleriesSection;
