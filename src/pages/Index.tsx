import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CategoriesTicker from "@/components/CategoriesTicker";
import GalleriesSection from "@/components/GalleriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import BookingPromoBar from "@/components/BookingPromoBar";
import IntentionText from "@/components/IntentionText";
import BookingSection from "@/components/BookingSection";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BookingChat from "@/components/BookingChat";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Listener para evento customizado
  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('openBookingChat', handleOpenChat);
    return () => window.removeEventListener('openBookingChat', handleOpenChat);
  }, []);

  return (
    <main>
      <HeroSection />
      <CategoriesTicker />
      <GalleriesSection onOpenBookingChat={() => setIsChatOpen(true)} />
      <IntentionText />
      <BookingPromoBar />
      <TestimonialsSection />
      <AboutSection />
      <BookingSection />
      <FooterSection />
      <WhatsAppFloat onClick={() => setIsChatOpen(true)} />
      <BookingChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
};

export default Index;
