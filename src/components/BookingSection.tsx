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
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Agende sua sessão</h2>
        <p className="font-body text-primary-foreground/70 mb-12">
          Selecione uma data e entre em contato pelo WhatsApp
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="bg-background rounded-2xl p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="text-foreground"
            />
          </div>

          <div className="text-left space-y-4">
            {selectedDate && (
              <p className="font-body text-lg">
                Data selecionada:{" "}
                <strong>{selectedDate.toLocaleDateString("pt-BR")}</strong>
              </p>
            )}

            <button
              onClick={handleBooking}
              disabled={!selectedDate}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-ui text-sm tracking-wider uppercase transition-all ${
                selectedDate
                  ? "bg-background text-foreground hover:bg-background/90"
                  : "bg-primary-foreground/20 text-primary-foreground/50 cursor-not-allowed"
              }`}
            >
              <MessageCircle size={20} />
              Continuar no WhatsApp
            </button>

            <p className="text-primary-foreground/50 text-sm">
              Responderemos em até 24 horas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
