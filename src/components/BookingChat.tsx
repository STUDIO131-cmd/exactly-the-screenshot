import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MessageCircle, Loader2 } from "lucide-react";
import { useGoogleCalendar, type AvailableSlot } from "@/hooks/useGoogleCalendar";

type ChatStep = "welcome" | "session_type" | "has_date" | "select_date" | "select_time" | "confirm" | "done";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  options?: string[];
  isDateSelector?: boolean;
}

const sessionTypes = [
  "Gestação",
  "Ensaio Pessoal",
  "Eventos Intimistas",
  "Batizados",
  "Confraternizações",
  "Família",
  "Retratos",
  "15 Anos",
  "Casais",
];

interface BookingChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingChat = ({ isOpen, onClose }: BookingChatProps) => {
  const [step, setStep] = useState<ChatStep>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDisplayDate, setSelectedDisplayDate] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { availableSlots, loading: calendarLoading, error: calendarError } = useGoogleCalendar(30);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startChat();
    }
  }, [isOpen]);

  const addBotMessage = (text: string, options?: string[], isDateSelector?: boolean) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "bot", text, options, isDateSelector },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text },
    ]);
  };

  const startChat = () => {
    setMessages([]);
    setStep("welcome");
    setTimeout(() => {
      addBotMessage("Olá! 👋 Que bom ter você aqui na 131 Fotos!");
      setTimeout(() => {
        addBotMessage(
          "Vou te ajudar a agendar sua sessão com Igor Gagliardi. Qual tipo de ensaio você tem interesse?",
          sessionTypes
        );
        setStep("session_type");
      }, 1200);
    }, 500);
  };

  const handleOptionSelect = (option: string) => {
    if (step === "session_type") {
      addUserMessage(option);
      setSelectedSession(option);
      setTimeout(() => {
        addBotMessage(`${option}! Adoramos fotografar esse momento. 📸`);
        setTimeout(() => {
          addBotMessage(
            "Você já tem uma data em mente ou quer ver nossa disponibilidade?",
            ["Tenho uma data em mente", "Quero ver datas disponíveis"]
          );
          setStep("has_date");
        }, 1000);
      }, 500);
    } else if (step === "has_date") {
      addUserMessage(option);
      setTimeout(() => {
        if (calendarLoading) {
          addBotMessage("Verificando a agenda de Igor Gagliardi... ⏳");
        } else if (calendarError) {
          addBotMessage(
            "Não consegui acessar a agenda no momento. Escolha uma das datas sugeridas:",
            availableSlots.map(s => `${s.dayOfWeek}, ${s.displayDate}`)
          );
        } else {
          addBotMessage(
            "Aqui estão as datas disponíveis na agenda de Igor Gagliardi:",
            undefined,
            true
          );
        }
        setStep("select_date");
      }, 500);
    } else if (step === "confirm") {
      const message = encodeURIComponent(
        `Olá! Gostaria de agendar uma sessão de ${selectedSession} para ${selectedDisplayDate} às ${selectedTime}. Vim pelo site 131 Fotos.`
      );
      window.open(`https://wa.me/5517992595117?text=${message}`, "_blank");
      onClose();
    }
  };

  const handleDateSelect = (slot: AvailableSlot) => {
    setSelectedDate(slot.date);
    setSelectedDisplayDate(`${slot.dayOfWeek}, ${slot.displayDate}`);
    addUserMessage(`${slot.dayOfWeek}, ${slot.displayDate}`);

    setTimeout(() => {
      addBotMessage(
        "Ótimo! Qual horário funciona melhor para você?",
        slot.slots
      );
      setStep("select_time");
    }, 500);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    addUserMessage(time);

    setTimeout(() => {
      addBotMessage(
        `Perfeito! Vou reservar ${selectedDisplayDate} às ${time} para sua sessão de ${selectedSession}.`
      );
      setTimeout(() => {
        addBotMessage(
          "Para confirmar, vou te direcionar para o WhatsApp onde finalizamos os detalhes e enviamos o contrato. 💬",
          ["Continuar no WhatsApp"]
        );
        setStep("confirm");
      }, 1000);
    }, 500);
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedSession("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedDisplayDate("");
    setStep("welcome");
    startChat();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-tiktok font-semibold">131 Fotos</h3>
                  <p className="text-xs text-primary-foreground/70">Agenda de Igor Gagliardi</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-background text-foreground shadow-sm rounded-bl-md"
                    }`}
                  >
                    <p className="font-tiktok text-sm">{msg.text}</p>

                    {/* Date Selector (Google Calendar) */}
                    {msg.isDateSelector && msg.type === "bot" && (
                      <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                        {calendarLoading ? (
                          <div className="flex items-center justify-center py-4">
                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Carregando agenda...</span>
                          </div>
                        ) : (
                          availableSlots.map((slot, i) => (
                            <button
                              key={i}
                              onClick={() => handleDateSelect(slot)}
                              className="w-full text-left px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg font-tiktok text-sm transition-colors flex justify-between items-center"
                            >
                              <div>
                                <span className="font-semibold capitalize">{slot.dayOfWeek}</span>
                                <span className="text-muted-foreground ml-2">{slot.displayDate}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {slot.slots.length} horários
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    )}

                    {/* Regular Options */}
                    {msg.options && msg.type === "bot" && !msg.isDateSelector && (
                      <div className="mt-3 space-y-2">
                        {msg.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (step === "select_time") {
                                handleTimeSelect(option);
                              } else {
                                handleOptionSelect(option);
                              }
                            }}
                            className="w-full text-left px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-tiktok text-sm transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-background rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="bg-background border-t border-border px-4 py-3">
              <p className="text-center text-xs text-muted-foreground font-tiktok">
                🗓️ Conectado ao Google Calendar • 131 Fotos
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingChat;
