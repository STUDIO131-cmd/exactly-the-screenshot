import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { MessageCircle } from "lucide-react";

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleBooking = () => {
    if (!selectedDate) return;
    const formattedDate = selectedDate.toLocaleDateString("pt-BR");
    const message = encodeURIComponent(
      `Olá! Gostaria de agendar uma sessão de fotos para o dia ${formattedDate}. Pode me passar mais informações?`
    );
    window.open(`https://wa.me/5517992595117?text=${message}`, "_blank");
  };

  return (
    <section id="booking-section" className="py-16 px-6 font-sans font-light">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-4 text-neutral-200">Agende sua sessão</h2>
        <p className="text-neutral-400 mb-12">
          Selecione uma data e entre em contato pelo WhatsApp
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/30 rounded-2xl p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="text-neutral-200"
            />
          </div>

          <div className="text-left space-y-4">
            {selectedDate && (
              <p className="text-lg text-neutral-300">
                Data selecionada:{" "}
                <strong>{selectedDate.toLocaleDateString("pt-BR")}</strong>
              </p>
            )}

            <button
              onClick={handleBooking}
              disabled={!selectedDate}
              className={`flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-wider uppercase transition-all ${
                selectedDate
                  ? "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                  : "bg-neutral-700/50 text-neutral-500 cursor-not-allowed"
              }`}
            >
              <MessageCircle size={20} />
              Continuar no WhatsApp
            </button>

            <p className="text-neutral-500 text-sm">
              Responderemos em até 24 horas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
