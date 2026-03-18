import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5517992595117?text=Olá! Gostaria de mais informações sobre as sessões de fotos."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300"
    >
      <MessageCircle size={20} fill="currentColor" />
      <span className="font-ui text-sm hidden sm:block">Agende sua sessão</span>
    </a>
  );
};

export default WhatsAppFloat;
