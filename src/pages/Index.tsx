import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CategoriesTicker from "@/components/CategoriesTicker";
import GalleriesSection from "@/components/GalleriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import BookingPromoBar from "@/components/BookingPromoBar";
import IntentionText from "@/components/IntentionText";
import BookingSection from "@/components/BookingSection";
import LaunchPrioritySection from "@/components/LaunchPrioritySection";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BookingChat from "@/components/BookingChat";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatDate, setChatDate] = useState<string | undefined>();

  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent<{ date?: string }>;
      if (customEvent.detail?.date) {
        setChatDate(customEvent.detail.date);
      } else {
        setChatDate(undefined);
      }
      setIsChatOpen(true);
    };
    window.addEventListener('openBookingChat', handleOpenChat);
    return () => window.removeEventListener('openBookingChat', handleOpenChat);
  }, []);

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setChatDate(undefined);
  };

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
      <BookingChat isOpen={isChatOpen} onClose={handleCloseChat} selectedDate={chatDate} />
    </main>
  );
};

export default Index;
