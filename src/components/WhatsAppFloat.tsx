import { Calendar } from "lucide-react";

interface WhatsAppFloatProps {
  onClick?: () => void;
}

const WhatsAppFloat = ({ onClick }: WhatsAppFloatProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Fallback: dispara evento customizado
      window.dispatchEvent(new CustomEvent('openBookingChat'));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-8 py-5 bg-primary text-primary-foreground rounded-full shadow-2xl hover:bg-primary/90 hover:scale-105 transition-all duration-300 group"
    >
      <Calendar size={24} className="group-hover:scale-110 transition-transform" />
      <span className="font-tiktok text-base font-semibold">Agende sua sessão</span>
    </button>
  );
};

export default WhatsAppFloat;
