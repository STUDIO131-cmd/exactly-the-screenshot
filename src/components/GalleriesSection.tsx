import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowLeft } from "lucide-react";

interface Album {
  id: string;
  title: string;
  cover: string;
  photos: string[];
}

interface PhotographerSection {
  photographer: string;
  subtitle: string;
  albums: Album[];
}

interface Gallery {
  id: string;
  title: string;
  cover: string;
  description: string;
  sections: PhotographerSection[];
}

const galleries: Gallery[] = [
{
  id: "retratos",
  title: "Retratos Profissionais",
  cover: "/placeholders/retratos-cover.png",
  description: "Retratos que traduzem personalidade e presença. Cada clique é pensado para revelar o melhor de você — seja para uso corporativo, redes sociais ou portfólio pessoal.",
  sections: [
  {
    photographer: "Igor Gagliardi",
    subtitle: "10 anos de repertório e olhar cirúrgico",
    albums: [
    { id: "ret-igor-1", title: "Sessão Ana Paula", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-igor-2", title: "Sessão Carlos Mendes", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-igor-3", title: "Sessão Juliana Costa", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-igor-4", title: "Sessão Roberto Lima", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-igor-5", title: "Sessão Mariana Souza", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-igor-6", title: "Sessão Pedro Alves", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") }]

  },
  {
    photographer: "Equipe Studio 131",
    subtitle: "Sensibilidade e técnica em cada registro",
    albums: [
    { id: "ret-eq-1", title: "Sessão Fernanda Rocha", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-eq-2", title: "Sessão Lucas Martins", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-eq-3", title: "Sessão Beatriz Nunes", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-eq-4", title: "Sessão Thiago Reis", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-eq-5", title: "Sessão Camila Dias", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") },
    { id: "ret-eq-6", title: "Sessão André Oliveira", cover: "/placeholder.svg", photos: Array(6).fill("/placeholder.svg") }]

  }]

},
{
  id: "gestantes",
  title: "Gestantes",
  cover: "/placeholders/gestantes-cover.png",
  description: "A espera de uma nova vida merece ser eternizada com delicadeza. Fotografamos a beleza da gestação com luz natural e ambientes que acolhem.",
  sections: [
  {
    photographer: "Igor Gagliardi",
    subtitle: "10 anos de repertório e olhar cirúrgico",
    albums: [
    { id: "gest-igor-1", title: "Sessão Larissa & Pedro", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill("/placeholders/gestantes-cover.jpg") },
    { id: "gest-igor-2", title: "Sessão Rafaela", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill("/placeholders/gestantes-cover.jpg") },
    { id: "gest-igor-3", title: "Sessão Patrícia & Marcos", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill("/placeholders/gestantes-cover.jpg") }]

  },
  {
    photographer: "Equipe Studio 131",
    subtitle: "Sensibilidade e técnica em cada registro",
    albums: [
    { id: "gest-eq-1", title: "Sessão Daniela", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill("/placeholders/gestantes-cover.jpg") },
    { id: "gest-eq-2", title: "Sessão Carla & Bruno", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill("/placeholders/gestantes-cover.jpg") },
    { id: "gest-eq-3", title: "Sessão Amanda", cover: "/placeholders/gestantes-cover.jpg", photos: Array(6).fill("/placeholders/gestantes-cover.jpg") }]

  }]

},
{
  id: "15anos",
  title: "15 Anos",
  cover: "/placeholders/15anos-cover.png",
  description: "Uma celebração única que marca a transição para a vida adulta. Capturamos a essência e a alegria desse momento com autenticidade.",
  sections: [
  {
    photographer: "Igor Gagliardi",
    subtitle: "10 anos de repertório e olhar cirúrgico",
    albums: [
    { id: "15-igor-1", title: "Sessão Isabella", cover: "/placeholders/15anos-cover.jpg", photos: Array(6).fill("/placeholders/15anos-cover.jpg") },
    { id: "15-igor-2", title: "Sessão Valentina", cover: "/placeholders/15anos-cover.jpg", photos: Array(6).fill("/placeholders/15anos-cover.jpg") }]

  },
  {
    photographer: "Equipe Studio 131",
    subtitle: "Sensibilidade e técnica em cada registro",
    albums: [
    { id: "15-eq-1", title: "Sessão Giovanna", cover: "/placeholders/15anos-cover.jpg", photos: Array(6).fill("/placeholders/15anos-cover.jpg") },
    { id: "15-eq-2", title: "Sessão Laura", cover: "/placeholders/15anos-cover.jpg", photos: Array(6).fill("/placeholders/15anos-cover.jpg") }]

  }]

},
{
  id: "casais",
  title: "Casais",
  cover: "/placeholders/casais-cover.png",
  description: "O amor em sua forma mais genuína. Registramos a cumplicidade e a conexão de casais com um olhar sensível e poético.",
  sections: [
  {
    photographer: "Igor Gagliardi",
    subtitle: "10 anos de repertório e olhar cirúrgico",
    albums: [
    { id: "cas-igor-1", title: "Sessão Marina & Gustavo", cover: "/placeholders/casais-cover.jpg", photos: Array(6).fill("/placeholders/casais-cover.jpg") },
    { id: "cas-igor-2", title: "Sessão Priscila & Diego", cover: "/placeholders/casais-cover.jpg", photos: Array(6).fill("/placeholders/casais-cover.jpg") }]

  },
  {
    photographer: "Equipe Studio 131",
    subtitle: "Sensibilidade e técnica em cada registro",
    albums: [
    { id: "cas-eq-1", title: "Sessão Letícia & Felipe", cover: "/placeholders/casais-cover.jpg", photos: Array(6).fill("/placeholders/casais-cover.jpg") },
    { id: "cas-eq-2", title: "Sessão Renata & Vinícius", cover: "/placeholders/casais-cover.jpg", photos: Array(6).fill("/placeholders/casais-cover.jpg") }]

  }]

},
{
  id: "pessoal",
  title: "Pessoal",
  cover: "/placeholders/pessoal-cover.png",
  description: "Sessões descontraídas que capturam quem você realmente é. Fotos autênticas para guardar momentos que importam.",
  sections: [
  {
    photographer: "Igor Gagliardi",
    subtitle: "10 anos de repertório e olhar cirúrgico",
    albums: [
    { id: "pes-igor-1", title: "Sessão Gabriel Santos", cover: "/placeholders/pessoal-cover.jpg", photos: Array(6).fill("/placeholders/pessoal-cover.jpg") },
    { id: "pes-igor-2", title: "Sessão Natália Ferreira", cover: "/placeholders/pessoal-cover.jpg", photos: Array(6).fill("/placeholders/pessoal-cover.jpg") }]

  },
  {
    photographer: "Equipe Studio 131",
    subtitle: "Sensibilidade e técnica em cada registro",
    albums: [
    { id: "pes-eq-1", title: "Sessão Ricardo Lopes", cover: "/placeholders/pessoal-cover.jpg", photos: Array(6).fill("/placeholders/pessoal-cover.jpg") },
    { id: "pes-eq-2", title: "Sessão Aline Moreira", cover: "/placeholders/pessoal-cover.jpg", photos: Array(6).fill("/placeholders/pessoal-cover.jpg") }]

  }]

},
{
  id: "eventos",
  title: "Eventos",
  cover: "/placeholders/eventos-cover.png",
  description: "Cobertura completa de eventos sociais e corporativos. Cada momento é registrado com atenção aos detalhes e à emoção do instante.",
  sections: [
  {
    photographer: "Igor Gagliardi",
    subtitle: "10 anos de repertório e olhar cirúrgico",
    albums: [
    { id: "ev-igor-1", title: "Formatura Medicina USP", cover: "/placeholders/eventos-cover.jpg", photos: Array(6).fill("/placeholders/eventos-cover.jpg") },
    { id: "ev-igor-2", title: "Evento Corporativo ACME", cover: "/placeholders/eventos-cover.jpg", photos: Array(6).fill("/placeholders/eventos-cover.jpg") }]

  },
  {
    photographer: "Equipe Studio 131",
    subtitle: "Sensibilidade e técnica em cada registro",
    albums: [
    { id: "ev-eq-1", title: "Aniversário 50 anos Sr. João", cover: "/placeholders/eventos-cover.jpg", photos: Array(6).fill("/placeholders/eventos-cover.jpg") },
    { id: "ev-eq-2", title: "Workshop Criativo 2024", cover: "/placeholders/eventos-cover.jpg", photos: Array(6).fill("/placeholders/eventos-cover.jpg") }]

  }]

}];


interface GalleriesSectionProps {
  onOpenBookingChat?: () => void;
}

const PriceBar = ({ onAgendar }: {onAgendar: () => void;}) =>
<div className="sticky bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between gap-4 rounded-b-2xl">
    <p className="text-primary-foreground text-sm md:text-base">
      Sessões a partir de <span className="font-semibold">R$797,00</span> a <span className="font-semibold">R$2.250,00</span>
    </p>
    <button
    onClick={onAgendar}
    className="flex items-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-wider uppercase rounded-full hover:bg-background/90 transition-colors whitespace-nowrap">
    
      <Calendar size={18} />
      Agendar agora
    </button>
  </div>;


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

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center mb-12 text-neutral-200 md:text-5xl font-sans mx-[145px]">
          Galerias
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) =>
          <div
            key={gallery.id}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setOpenGalleryId(gallery.id)}>
            
              <img
              src={gallery.cover}
              alt={gallery.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async" />
            
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h3 className="text-primary-foreground text-xl md:text-2xl drop-shadow-lg font-sans">
                  {gallery.title}
                </h3>
                <p className="text-primary-foreground/70 text-xs tracking-wider uppercase mt-1 drop-shadow-md font-sans">
                  Confira álbuns
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Galeria com seções de fotógrafo e álbuns */}
      <AnimatePresence>
        {openGalleryId && currentGallery && !openAlbum &&
        <motion.div
          className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenGalleryId(null)}>
          
            <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}>
            
              <button
              onClick={() => setOpenGalleryId(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-20">
              
                <X size={24} className="text-foreground" />
              </button>

              <div className="p-6 md:p-10 pb-24">
                {/* Título e descrição */}
                <h3 className="text-2xl md:text-3xl text-neutral-200 text-center mb-3">
                  {currentGallery.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm md:text-base max-w-2xl mx-auto mb-10">
                  {currentGallery.description}
                </p>

                {/* Seções por fotógrafo */}
                {currentGallery.sections.map((section, sIdx) =>
              <div key={section.photographer}>
                    {/* Divisor entre seções */}
                    {sIdx > 0 &&
                <div className="flex items-center gap-4 my-10">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground tracking-widest">•••</span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                }

                    {/* Título do fotógrafo */}
                    <div className="mb-6 text-center">
                      <h4 className="text-foreground/70 text-base md:text-lg">
                        Fotografia assinada por{" "}
                        <span className="text-foreground font-semibold">{section.photographer}</span>
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1">{section.subtitle}</p>
                    </div>

                    {/* Grid de álbuns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {section.albums.map((album) =>
                  <div
                    key={album.id}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setOpenAlbum(album)}>
                    
                          <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover"
                      loading="lazy" />
                    
                          <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transition-colors" />
                          <div className="absolute inset-0 flex items-end p-3">
                            <span className="text-primary-foreground text-xs md:text-sm font-semibold drop-shadow-lg leading-tight">
                              {album.title}
                            </span>
                          </div>
                        </div>
                  )}
                    </div>
                  </div>
              )}
              </div>

              <PriceBar onAgendar={handleAgendarClick} />
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Modal: Fotos do álbum */}
      <AnimatePresence>
        {openAlbum && currentGallery &&
        <motion.div
          className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenAlbum(null)}>
          
            <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}>
            
              {/* Header com voltar */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-6 py-4 flex items-center gap-4 border-b border-border rounded-t-2xl">
                <button
                onClick={() => setOpenAlbum(null)}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <p className="text-sm text-muted-foreground">{currentGallery.title}</p>
                  <h3 className="text-xl text-neutral-200">{openAlbum.title}</h3>
                </div>
                <button
                onClick={() => {setOpenAlbum(null);setOpenGalleryId(null);}}
                className="ml-auto p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                
                  <X size={24} className="text-foreground" />
                </button>
              </div>

              <div className="p-6 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {openAlbum.photos.map((photo, i) =>
                <div key={i} className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                      <img
                    src={photo}
                    alt={`${openAlbum.title} - Foto ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy" />
                  
                    </div>
                )}
                </div>
              </div>

              <PriceBar onAgendar={handleAgendarClick} />
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

};

export default GalleriesSection;