import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toLocaleDateString("pt-BR");
      window.dispatchEvent(
        new CustomEvent("openBookingChat", { detail: { date: formattedDate } })
      );
    }
  };

  return (
    <section id="booking-section" className="py-4 px-6 font-sans font-light">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-neutral-400 mb-2 text-sm tracking-widest uppercase">
          Consultar disponibilidade
        </p>
        <p className="text-neutral-500 mb-8 text-[0.65rem] md:text-xs leading-relaxed max-w-md mx-auto">
          Nossa agenda é selecionada para respeitar os clientes que atendemos em outras frentes — trabalhamos com antecipação e poucas vagas.
        </p>

        <div className="flex justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              locale={ptBR}
              className="pointer-events-auto !text-neutral-900 [&_.rdp-caption_label]:text-lg [&_.rdp-caption_label]:font-semibold [&_.rdp-head_cell]:text-neutral-500 [&_.rdp-head_cell]:w-12 [&_.rdp-head_cell]:text-sm [&_.rdp-cell]:w-12 [&_.rdp-cell]:h-12 [&_.rdp-day]:w-12 [&_.rdp-day]:h-12 [&_.rdp-day]:text-base [&_.rdp-nav_button]:h-9 [&_.rdp-nav_button]:w-9 [&_.rdp-table]:w-full [&_.rdp-day_selected]:bg-neutral-900 [&_.rdp-day_selected]:text-white [&_.rdp-day_today]:bg-neutral-200 [&_.rdp-day_today]:text-neutral-900 [&_.rdp-button:hover]:bg-neutral-100 p-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
