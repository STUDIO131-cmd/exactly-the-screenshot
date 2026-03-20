import { useState } from "react";
import FaqSheet from "@/components/FaqSheet";

const BookingPromoBar = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const openBookingChat = () => {
    window.dispatchEvent(new CustomEvent("openBookingChat"));
  };

  return (
    <>
      <section className="py-10 md:py-16 px-6 font-sans font-light">
        <div className="max-w-3xl mx-auto">
          <div className="dusty-texture relative bg-white/[0.07] backdrop-blur-md border border-white/[0.15] rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.12),0_0_120px_rgba(200,180,255,0.08),0_0_200px_rgba(180,160,255,0.05),inset_0_0_80px_rgba(255,255,255,0.05)] p-10 md:p-14 text-center overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-3">
              Planeje sua sessão:
            </h2>

            <p className="text-sm md:text-base text-white/50 tracking-widest uppercase mb-10">
              Simule datas, planos e entenda como funciona
            </p>

            {/* Vintage calendar SVG button */}
            <button
              onClick={openBookingChat}
              className="mx-auto mb-10 block group transition-transform hover:scale-105"
              aria-label="Ver agenda"
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/60 group-hover:text-white/90 transition-colors drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
              >
                <rect x="6" y="12" width="44" height="38" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M6 20H50" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M38 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="18" cy="28" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="28" cy="28" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="38" cy="28" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="18" cy="36" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="28" cy="36" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="38" cy="36" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="18" cy="44" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="28" cy="44" r="1.5" fill="currentColor" opacity="0.5" />
              </svg>
            </button>

            {/* Booking buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <button
                onClick={openBookingChat}
                className="flex items-center gap-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 px-5 py-2.5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
                <span className="text-sm text-white/80 tracking-wide whitespace-nowrap">
                  Conferir agenda da equipe
                </span>
              </button>

              <div className="hidden sm:block w-px h-8 bg-white/20" />
              <div className="block sm:hidden w-8 h-px bg-white/20" />

              <button
                onClick={() => setIsFaqOpen(true)}
                className="flex items-center gap-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 px-5 py-2.5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
                <span className="text-sm text-white/80 tracking-wide whitespace-nowrap">
                  Entender como funciona
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <FaqSheet isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </>
  );
};

export default BookingPromoBar;