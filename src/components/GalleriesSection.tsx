import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";

interface PhotographerSection {
  photographer: string;
  subtitle: string;
  photos: string[];
}

interface Gallery {
  id: string;
  title: string;
  cover: string;
  description: string;
  sections: PhotographerSection[];
}

const makePhotos = (src: string) => Array(6).fill(src);

const galleries: Gallery[] = [
  {
    id: "retratos",
    title: "Retratos Profissionais",
    cover: "/placeholders/retratos-cover.png",
    description:
      "Retratos que traduzem personalidade e presença. Cada clique é pensado para revelar o melhor de você — seja para uso corporativo, redes sociais ou portfólio pessoal.",
    sections: [
      {
        photographer: "Igor Gagliardi",
        subtitle: "10 anos de repertório e olhar cirúrgico",
        photos: makePhotos("/placeholder.svg"),
      },
      {
        photographer: "Equipe Studio 131",
        subtitle: "Sensibilidade e técnica em cada registro",
        photos: makePhotos("/placeholder.svg"),
      },
    ],
  },
  {
    id: "gestantes",
    title: "Gestantes",
    cover: "/placeholders/gestantes-cover.png",
    description:
      "A espera de uma nova vida merece ser eternizada com delicadeza. Fotografamos a beleza da gestação com luz natural e ambientes que acolhem.",
    sections: [
      {
        photographer: "Igor Gagliardi",
        subtitle: "10 anos de repertório e olhar cirúrgico",
        photos: makePhotos("/placeholders/gestantes-cover.jpg"),
      },
      {
        photographer: "Equipe Studio 131",
        subtitle: "Sensibilidade e técnica em cada registro",
        photos: makePhotos("/placeholders/gestantes-cover.jpg"),
      },
    ],
  },
  {
    id: "15anos",
    title: "15 Anos",
    cover: "/placeholders/15anos-cover.png",
    description:
      "Uma celebração única que marca a transição para a vida adulta. Capturamos a essência e a alegria desse momento com autenticidade.",
    sections: [
      {
        photographer: "Igor Gagliardi",
        subtitle: "10 anos de repertório e olhar cirúrgico",
        photos: makePhotos("/placeholders/15anos-cover.jpg"),
      },
      {
        photographer: "Equipe Studio 131",
        subtitle: "Sensibilidade e técnica em cada registro",
        photos: makePhotos("/placeholders/15anos-cover.jpg"),
      },
    ],
  },
  {
    id: "casais",
    title: "Casais",
    cover: "/placeholders/casais-cover.png",
    description:
      "O amor em sua forma mais genuína. Registramos a cumplicidade e a conexão de casais com um olhar sensível e poético.",
    sections: [
      {
        photographer: "Igor Gagliardi",
        subtitle: "10 anos de repertório e olhar cirúrgico",
        photos: makePhotos("/placeholders/casais-cover.jpg"),
      },
      {
        photographer: "Equipe Studio 131",
        subtitle: "Sensibilidade e técnica em cada registro",
        photos: makePhotos("/placeholders/casais-cover.jpg"),
      },
    ],
  },
  {
    id: "pessoal",
    title: "Pessoal",
    cover: "/placeholders/pessoal-cover.png",
    description:
      "Sessões descontraídas que capturam quem você realmente é. Fotos autênticas para guardar momentos que importam.",
    sections: [
      {
        photographer: "Igor Gagliardi",
        subtitle: "10 anos de repertório e olhar cirúrgico",
        photos: makePhotos("/placeholders/pessoal-cover.jpg"),
      },
      {
        photographer: "Equipe Studio 131",
        subtitle: "Sensibilidade e técnica em cada registro",
        photos: makePhotos("/placeholders/pessoal-cover.jpg"),
      },
    ],
  },
  {
    id: "eventos",
    title: "Eventos",
    cover: "/placeholders/eventos-cover.png",
    description:
      "Cobertura completa de eventos sociais e corporativos. Cada momento é registrado com atenção aos detalhes e à emoção do instante.",
    sections: [
      {
        photographer: "Igor Gagliardi",
        subtitle: "10 anos de repertório e olhar cirúrgico",
        photos: makePhotos("/placeholders/eventos-cover.jpg"),
      },
      {
        photographer: "Equipe Studio 131",
        subtitle: "Sensibilidade e técnica em cada registro",
        photos: makePhotos("/placeholders/eventos-cover.jpg"),
      },
    ],
  },
];

interface GalleriesSectionProps {
  onOpenBookingChat?: () => void;
}

const GalleriesSection = ({ onOpenBookingChat }: GalleriesSectionProps) => {
  const [openGalleryId, setOpenGalleryId] = useState<string | null>(null);

  const currentGallery = galleries.find((g) => g.id === openGalleryId);

  const handleAgendarClick = () => {
    setOpenGalleryId(null);
    if (onOpenBookingChat) {
      onOpenBookingChat();
    } else {
      window.dispatchEvent(new CustomEvent("openBookingChat"));
    }
  };

  return (
    <section className="py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-5xl text-center mb-8 text-neutral-200 font-sans mx-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          Galerias
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] transition-shadow duration-500"
              onClick={() => setOpenGalleryId(gallery.id)}
            >
              <img
                src={gallery.cover}
                alt={gallery.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-neutral-800/30 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-center">
                  <h3 className="text-neutral-100 text-xs md:text-base drop-shadow-sm font-sans">
                    {gallery.title}
                  </h3>
                  <p className="text-neutral-300/60 text-[9px] md:text-[10px] tracking-widest uppercase mt-0.5 font-sans">
                    Ver fotos
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Galeria com seções por fotógrafo */}
      <AnimatePresence>
        {openGalleryId && currentGallery && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-2 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenGalleryId(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenGalleryId(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-20"
              >
                <X size={24} className="text-foreground" />
              </button>

              <div className="p-4 md:p-6 lg:p-10">
                <h3 className="text-2xl text-neutral-200 text-center mb-3 md:text-4xl font-sans">
                  {currentGallery.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm md:text-base max-w-2xl mx-auto mb-10 font-sans">
                  {currentGallery.description}
                </p>

                {currentGallery.sections.map((section, sIdx) => (
                  <div key={section.photographer}>
                    {sIdx > 0 && (
                      <div className="flex items-center gap-4 my-10">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground tracking-widest">•••</span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                    )}

                    <div className="mb-6 text-center">
                      <h4 className="text-foreground/70 text-base md:text-lg font-sans">
                        Fotografia assinada por{" "}
                        <span className="text-foreground font-sans font-thin">{section.photographer}</span>
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1 font-sans">{section.subtitle}</p>
                    </div>

                    {/* Grid de 6 fotos placeholder */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {section.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="aspect-[4/5] rounded-xl overflow-hidden bg-muted"
                        >
                          <img
                            src={photo}
                            alt={`${section.photographer} - Foto ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Botão Ver mais */}
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="text-foreground/70 hover:text-foreground text-xs md:text-sm tracking-widest uppercase underline-offset-4 hover:underline transition-colors font-sans"
                      >
                        Ver mais
                      </button>
                    </div>
                  </div>
                ))}

                {/* CTA agendar */}
                <div className="sticky bottom-0 left-0 right-0 mt-10 -mx-4 md:-mx-6 lg:-mx-10 bg-primary/90 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-4 rounded-b-2xl">
                  <p className="text-primary-foreground text-xs md:text-sm lg:text-base text-center sm:text-left">
                    Sessões a partir de <span className="font-semibold">R$797,00</span> a{" "}
                    <span className="font-semibold">R$2.250,00</span>
                  </p>
                  <button
                    onClick={handleAgendarClick}
                    className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-background text-foreground text-xs md:text-sm tracking-wider uppercase rounded-full hover:bg-background/90 transition-colors whitespace-nowrap"
                  >
                    <Calendar size={16} />
                    Agendar agora
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleriesSection;
