const BookingPromoBar = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = (name: string, number: string) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de agendar uma sessão de fotos com ${name}. Pode me passar mais informações?`
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <section className="py-20 px-6 font-sans font-light">
      <div className="max-w-3xl mx-auto">
        <div className="dusty-texture relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.08)] p-10 md:p-14 text-center overflow-hidden">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-3">
            Agende sua sessão
          </h2>

          {/* Price range */}
          <p className="text-sm md:text-base text-white/50 tracking-widest uppercase mb-10">
            Sessões a partir de R$797 – R$2.250
          </p>

          {/* Vintage calendar SVG button */}
          <button
            onClick={scrollToBooking}
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
              {/* Calendar body */}
              <rect x="6" y="12" width="44" height="38" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              {/* Top bar */}
              <path d="M6 20H50" stroke="currentColor" strokeWidth="1.5" />
              {/* Rings */}
              <path d="M18 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M38 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {/* Grid dots */}
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
              onClick={() => openWhatsApp("Igor", "5517992595117")}
              className="flex items-center gap-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 px-5 py-2.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
              <span className="text-sm text-white/80 tracking-wide whitespace-nowrap">
                Agendar com Igor
              </span>
            </button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div className="block sm:hidden w-8 h-px bg-white/20" />

            <button
              onClick={() => openWhatsApp("Equipe Studio 131", "5517992595117")}
              className="flex items-center gap-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 px-5 py-2.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
              <span className="text-sm text-white/80 tracking-wide whitespace-nowrap">
                Agendar com Equipe Studio 131
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPromoBar;
