import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowLeft } from "lucide-react";

interface Album {
  id: string;
  title: string;
  cover: string;
  photos: string[];
}

interface Gallery {
  id: string;
  title: string;
  cover: string;
  albums: Album[];
}

const galleries: Gallery[] = [
  {
    id: "retratos",
    title: "Retratos Profissionais",
    cover: "/placeholders/retratos-cover.jpg",
    albums: [
      { id: "retratos-igor", title: "Por Igor Gagliardi", cover: "/placeholders/retratos-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/igor-${i + 1}.jpg`) },
      { id: "retratos-equipe", title: "Por Equipe Studio 131", cover: "/placeholders/retratos-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/equipe-${i + 1}.jpg`) },
    ],
  },
  {
    id: "gestantes",
    title: "Gestantes",
    cover: "/placeholders/gestantes-cover.jpg",
    albums: [
      { id: "gestantes-igor", title: "Por Igor Gagliardi", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/igor-${i + 1}.jpg`) },
      { id: "gestantes-equipe", title: "Por Equipe Studio 131", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/equipe-${i + 1}.jpg`) },
    ],
  },
  {
    id: "15anos",
    title: "15 Anos",
    cover: "/placeholders/15anos-cover.jpg",
    albums: [
      { id: "15anos-igor", title: "Por Igor Gagliardi", cover: "/placeholders/15anos-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/igor-${i + 1}.jpg`) },
      { id: "15anos-equipe", title: "Por Equipe Studio 131", cover: "/placeholders/15anos-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/equipe-${i + 1}.jpg`) },
    ],
  },
  {
    id: "casais",
    title: "Casais",
    cover: "/placeholders/casais-cover.jpg",
    albums: [
      { id: "casais-igor", title: "Por Igor Gagliardi", cover: "/placeholders/casais-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/igor-${i + 1}.jpg`) },
      { id: "casais-equipe", title: "Por Equipe Studio 131", cover: "/placeholders/casais-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/equipe-${i + 1}.jpg`) },
    ],
  },
  {
    id: "pessoal",
    title: "Pessoal",
    cover: "/placeholders/pessoal-cover.jpg",
    albums: [
      { id: "pessoal-igor", title: "Por Igor Gagliardi", cover: "/placeholders/pessoal-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/igor-${i + 1}.jpg`) },
      { id: "pessoal-equipe", title: "Por Equipe Studio 131", cover: "/placeholders/pessoal-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/equipe-${i + 1}.jpg`) },
    ],
  },
  {
    id: "eventos",
    title: "Eventos",
    cover: "/placeholders/eventos-cover.jpg",
    albums: [
      { id: "eventos-igor", title: "Por Igor Gagliardi", cover: "/placeholders/eventos-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/igor-${i + 1}.jpg`) },
      { id: "eventos-equipe", title: "Por Equipe Studio 131", cover: "/placeholders/eventos-cover.jpg", photos: Array(6).fill(null).map((_, i) => `/placeholders/equipe-${i + 1}.jpg`) },
    ],
  },
];

interface GalleriesSectionProps {
  onOpenBookingChat?: () => void;
}

const GalleriesSection = ({ onOpenBookingChat }: GalleriesSectionProps) => {
  const [openGalleryId, setOpenGalleryId] = useState<string | null>(null);
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);

  const currentGallery = galleries.find((g) => g.id === openGalleryId);

  const handleAgendarClick = () => {
    setOpenAlbum(null);
    setOpenGalleryId(null);
    if (onOpenBookingChat) {
      onOpenBookingChat();
    } else {
      window.dispatchEvent(new CustomEvent("openBookingChat"));
    }
  };

  const handleBackToGallery = () => {
    setOpenAlbum(null);
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-epika text-3xl md:text-4xl text-center mb-12 text-foreground">
          Galerias
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setOpenGalleryId(gallery.id)}
            >
              <img
                src={gallery.cover}
                alt={gallery.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-primary/40" />
              {/* Centered title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-epika text-primary-foreground text-xl md:text-2xl text-center px-4">
                  {gallery.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Albums dentro da galeria */}
      <AnimatePresence>
        {openGalleryId && currentGallery && !openAlbum && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenGalleryId(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl p-6"
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

              <h3 className="font-epika text-2xl text-foreground text-center mb-8">
                {currentGallery.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentGallery.albums.map((album) => (
                  <div
                    key={album.id}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setOpenAlbum(album)}
                  >
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h4 className="font-epika text-primary-foreground text-lg md:text-xl text-center px-4">
                        {album.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Fotos do álbum */}
      <AnimatePresence>
        {openAlbum && currentGallery && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenAlbum(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-6 py-4 flex items-center gap-4 border-b border-border rounded-t-2xl">
                <button
                  onClick={handleBackToGallery}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <p className="text-sm text-muted-foreground">{currentGallery.title}</p>
                  <h3 className="font-epika text-xl text-foreground">{openAlbum.title}</h3>
                </div>
                <button
                  onClick={() => { setOpenAlbum(null); setOpenGalleryId(null); }}
                  className="ml-auto p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <X size={24} className="text-foreground" />
                </button>
              </div>

              <div className="p-6 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {openAlbum.photos.map((photo, i) => (
                    <div key={i} className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                      <img
                        src={photo}
                        alt={`${openAlbum.title} - Foto ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Barra fixa de preço */}
              <div className="sticky bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between gap-4 rounded-b-2xl">
                <p className="text-primary-foreground text-sm md:text-base">
                  Sessões a partir de <span className="font-semibold">R$797,00</span> a <span className="font-semibold">R$2.250,00</span>
                </p>
                <button
                  onClick={handleAgendarClick}
                  className="flex items-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-wider uppercase rounded-full hover:bg-background/90 transition-colors whitespace-nowrap"
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
