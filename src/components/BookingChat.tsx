import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

type ChatStep = "welcome" | "photographer_choice" | "difference" | "session_type" | "has_date" | "select_date" | "confirm" | "done" | "comparing" | "faq_in_chat";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  options?: string[];
}

const sessionTypes = [
  "Retratos Profissionais",
  "Gestantes",
  "15 Anos",
  "Casais",
  "Ensaio Pessoal",
  "Eventos",
];

const photographerOptions = [
  "Agendar com Igor",
  "Agendar com fotógrafo da equipe Studio 131",
  "Entender a diferença",
  "Conferir os dois cenários",
];

const availableDates = [
  "Sábado, 22 de Março",
  "Domingo, 23 de Março",
  "Sábado, 29 de Março",
  "Domingo, 30 de Março",
  "Sábado, 05 de Abril",
];

interface BookingChatProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
}

const BookingChat = ({ isOpen, onClose, selectedDate }: BookingChatProps) => {
  const [step, setStep] = useState<ChatStep>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedDateState, setSelectedDateState] = useState<string>("");
  const [selectedPhotographer, setSelectedPhotographer] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (selectedDate) {
      setSelectedDateState(selectedDate);
    }
  }, [selectedDate]);

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "bot", text, options },
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
    const dateText = selectedDate ? ` para o dia ${selectedDate}` : "";
    setTimeout(() => {
      addBotMessage(
        `Olá! 👋 Que bom ter você aqui${dateText}. Vou te ajudar a agendar sua sessão de fotos.`
      );
      setTimeout(() => {
        addBotMessage(
          "Com quem você gostaria de agendar?",
          photographerOptions
        );
        setStep("photographer_choice");
      }, 1200);
    }, 500);
  };

  const handleOptionSelect = (option: string) => {
    if (step === "photographer_choice") {
      if (option === "Entender a diferença") {
        addUserMessage(option);
        setTimeout(() => {
          addBotMessage(
            "📸 **Igor** é o fotógrafo principal do estúdio, com estilo autoral e abordagem mais intimista.\n\n🎯 A **equipe Studio 131** conta com fotógrafos talentosos que seguem a mesma linguagem visual, com ótimo custo-benefício."
          );
          setTimeout(() => {
            addBotMessage(
              "Agora que você conhece a diferença, com quem gostaria de agendar?",
              ["Agendar com Igor", "Agendar com fotógrafo da equipe Studio 131", "Conferir os dois cenários"]
            );
          }, 1200);
        }, 500);
        return;
      }
      if (option === "Conferir os dois cenários") {
        addUserMessage(option);
        setTimeout(() => {
          addBotMessage(
            "Perfeito! Vou te direcionar para o WhatsApp onde podemos apresentar as duas propostas em detalhe. 💬",
            ["Continuar no WhatsApp"]
          );
          setSelectedPhotographer("ambos os cenários");
          setStep("confirm");
        }, 500);
        return;
      }
      addUserMessage(option);
      setSelectedPhotographer(option);
      setTimeout(() => {
        addBotMessage(
          `Ótima escolha! ${option.includes("Igor") ? "Igor vai adorar registrar seus momentos" : "Nossa equipe está pronta para te atender"}. 📸`
        );
        setTimeout(() => {
          addBotMessage(
            "Qual tipo de sessão você tem interesse?",
            sessionTypes
          );
          setStep("session_type");
        }, 1000);
      }, 500);
    } else if (step === "session_type") {
      addUserMessage(option);
      setSelectedSession(option);
      if (selectedDateState) {
        setTimeout(() => {
          addBotMessage(
            `Perfeito! Sessão de ${option} no dia ${selectedDateState}.`
          );
          setTimeout(() => {
            addBotMessage(
              `Para confirmar, vou te direcionar para o WhatsApp para finalizar os detalhes. 💬`,
              ["Continuar no WhatsApp"]
            );
            setStep("confirm");
          }, 1000);
        }, 500);
      } else {
        setTimeout(() => {
          addBotMessage(
            `Ótima escolha! ${option} é uma das nossas especialidades. 📸`
          );
          setTimeout(() => {
            addBotMessage(
              "Você já tem uma data em mente para a sessão?",
              ["Sim, tenho uma data", "Não, quero ver disponibilidade"]
            );
            setStep("has_date");
          }, 1000);
        }, 500);
      }
    } else if (step === "has_date") {
      addUserMessage(option);
      setTimeout(() => {
        addBotMessage(
          "Perfeito! Aqui estão as datas disponíveis para os próximos dias:",
          availableDates
        );
        setStep("select_date");
      }, 500);
    } else if (step === "select_date") {
      addUserMessage(option);
      setSelectedDateState(option);
      setTimeout(() => {
        addBotMessage(`Excelente! Vou reservar ${option} para você.`);
        setTimeout(() => {
          addBotMessage(
            `Para confirmar sua sessão de ${selectedSession} no dia ${option}, vou te direcionar para o WhatsApp para finalizar os detalhes. 💬`,
            ["Continuar no WhatsApp"]
          );
          setStep("confirm");
        }, 1000);
      }, 500);
    } else if (step === "confirm") {
      const message = encodeURIComponent(
        `Olá! Gostaria de agendar uma sessão de ${selectedSession} para o dia ${selectedDateState}. ${selectedPhotographer ? `Preferência: ${selectedPhotographer}.` : ""} Vim pelo site 131 Fotos.`
      );
      window.open(`https://wa.me/5517992595117?text=${message}`, "_blank");
      onClose();
    }
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
            className="w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-tiktok font-semibold">131 Fotos</h3>
                  <p className="text-xs text-primary-foreground/70">Agendamento</p>
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
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-background text-foreground shadow-sm rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm font-sans whitespace-pre-line">{msg.text}</p>
                    
                    {msg.options && msg.type === "bot" && (
                      <div className="mt-3 space-y-2">
                        {msg.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionSelect(option)}
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
                Powered by 131 Fotos • Studio 131
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingChat;
