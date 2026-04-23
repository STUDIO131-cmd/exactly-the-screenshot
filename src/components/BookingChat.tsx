import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import {
  isDateAvailable,
  toISODate,
  AVAILABILITY_HINT,
  type AvailabilityOverride,
} from "@/lib/availability";
import { openWhatsApp as openWA } from "@/lib/whatsapp";

type ChatStep =
  | "welcome"
  | "photographer_choice"
  | "difference"
  | "session_type"
  | "has_date"
  | "select_date"
  | "register_interest"
  | "confirm"
  | "done"
  | "comparing"
  | "faq_in_chat"
  | "ai_chat"
  | "ai_escalated";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  options?: string[];
  variant?: "default" | "calendar" | "interest_form" | "whatsapp_cta";
  ctaPayload?: string;
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
  const [freeTextInput, setFreeTextInput] = useState("");
  const [aiConversation, setAiConversation] = useState<{ role: string; content: string }[]>([]);
  const [overrides, setOverrides] = useState<AvailabilityOverride[]>([]);
  const [interestName, setInterestName] = useState("");
  const [interestPhone, setInterestPhone] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startChat();
      // load availability overrides
      supabase
        .from("available_dates")
        .select("date, is_available")
        .then(({ data }) => {
          if (data) setOverrides(data as AvailabilityOverride[]);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedDateState(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (step === "ai_chat" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, messages]);

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

  const addBotMessageImmediate = (text: string, options?: string[]) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "bot", text, options },
    ]);
  };

  const addBotSpecial = (text: string, variant: Message["variant"], ctaPayload?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "bot", text, variant, ctaPayload },
      ]);
      setIsTyping(false);
    }, 600);
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



  const askAI = async (question: string) => {
    setIsTyping(true);
    try {
      const { data, error } = await supabase.functions.invoke("studio-chat", {
        body: { question, conversationHistory: aiConversation },
      });

      if (error) throw error;

      const answer: string = data?.answer || "Desculpe, não consegui processar. Tente novamente!";

      // Detect escalation marker
      if (answer.trim().startsWith("[ESCALAR_WHATSAPP]")) {
        const summary = answer.replace("[ESCALAR_WHATSAPP]", "").trim();
        setAiConversation((prev) => [
          ...prev,
          { role: "user", content: question },
          { role: "assistant", content: answer },
        ]);
        setIsTyping(false);
        addBotMessageImmediate(
          "Resumi sua dúvida e estou chamando nosso atendimento. Clique no botão para iniciar a conversa no WhatsApp agora 👇"
        );
        const waText = `Olá! Vim pelo site 131 Fotos. ${summary}`;
        addBotSpecial("", "whatsapp_cta", waText);
        setStep("ai_escalated");
        return;
      }

      setAiConversation((prev) => [
        ...prev,
        { role: "user", content: question },
        { role: "assistant", content: answer },
      ]);

      setIsTyping(false);
      addBotMessageImmediate(answer);
    } catch (e) {
      console.error("AI chat error:", e);
      setIsTyping(false);
      addBotMessageImmediate(
        "Desculpe, tive um problema ao processar sua pergunta. Vou te direcionar para o WhatsApp."
      );
      addBotSpecial(
        "",
        "whatsapp_cta",
        "Olá! Tive uma dúvida no chat do site 131 Fotos e gostaria de falar com o atendimento."
      );
      setStep("ai_escalated");
    }
  };

  const handleFreeTextSubmit = () => {
    const text = freeTextInput.trim();
    if (!text) return;
    addUserMessage(text);
    setFreeTextInput("");
    askAI(text);
  };

  const handlePhotographerSelected = (option: string) => {
    setSelectedPhotographer(option);
    setTimeout(() => {
      addBotMessage(
        `Ótima escolha! ${option.includes("Igor") ? "Igor vai adorar registrar seus momentos" : "Nossa equipe está pronta para te atender"}. 📸`
      );
      setTimeout(() => {
        addBotMessage("Qual tipo de sessão você tem interesse?", sessionTypes);
        setStep("session_type");
      }, 1000);
    }, 500);
  };

  const handleCalendarPick = (date: Date | undefined) => {
    if (!date) return;
    const formatted = date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
    setSelectedDateState(formatted);
    addUserMessage(formatted);
    setTimeout(() => {
      addBotMessage(
        `Perfeito! Para confirmarmos o horário disponível em ${formatted}, preciso só do seu nome e WhatsApp.`
      );
      setTimeout(() => {
        addBotSpecial("", "interest_form");
        setStep("register_interest");
      }, 800);
    }, 400);
  };

  const submitInterest = async () => {
    if (!interestName.trim() || !interestPhone.trim()) return;
    try {
      await supabase.from("leads").insert({
        name: interestName.trim(),
        phone: interestPhone.trim(),
        source: "chat",
        objective: selectedSession || null,
        notes: `Interesse em ${selectedDateState}${selectedPhotographer ? ` | Preferência: ${selectedPhotographer}` : ""}`,
      });
    } catch (e) {
      console.error("lead save error", e);
    }

    addUserMessage(`${interestName} • ${interestPhone}`);
    setTimeout(() => {
      addBotMessage(
        "Pronto! Estou te direcionando para nosso atendimento confirmar o horário e o período. 💬"
      );
      const waText = `Olá! Sou ${interestName}. Tenho interesse em agendar uma sessão${
        selectedSession ? ` de ${selectedSession}` : ""
      } no dia ${selectedDateState}${
        selectedPhotographer ? ` (preferência: ${selectedPhotographer})` : ""
      }. Pode confirmar o horário disponível?`;
      addBotSpecial("", "whatsapp_cta", waText);
      setStep("confirm");
    }, 600);
  };

  const handleOptionSelect = (option: string) => {
    if (step === "ai_chat" || step === "faq_in_chat") {
      if (option === "Falar no WhatsApp") {
        addUserMessage(option);
        openWhatsApp("Olá! Gostaria de saber mais sobre os serviços do Studio 131. Vim pelo site 131 Fotos.");
        onClose();
        return;
      }
      if (option === "Tenho outra dúvida") {
        addUserMessage(option);
        setTimeout(() => {
          addBotMessage("Claro! Digite sua dúvida abaixo que eu respondo na hora 👇");
          setStep("ai_chat");
        }, 300);
        return;
      }
      if (option.includes("Agendar")) {
        addUserMessage(option);
        handlePhotographerSelected(option);
        return;
      }
    }

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
            "Ótima ideia! Vou te explicar as diferenças:\n\n📸 **Igor (Fotógrafo Principal)**\n• Estilo autoral e direção intimista\n• Repertório consolidado com anos de experiência\n• Cada ensaio é uma obra única com sua assinatura\n• Valor diferenciado pela exclusividade\n\n🎯 **Equipe Studio 131**\n• Fotógrafos talentosos treinados na linguagem do estúdio\n• Repertório versátil e em constante evolução\n• Ótimo custo-benefício com qualidade profissional\n• Mesma estrutura e pós-produção do estúdio"
          );
          setTimeout(() => {
            addBotMessage(
              "Com essas informações, o que gostaria de fazer?",
              ["Agendar com Igor", "Agendar com fotógrafo da equipe Studio 131", "Tenho outra dúvida"]
            );
            setStep("comparing");
          }, 1200);
        }, 500);
        return;
      }
      addUserMessage(option);
      handlePhotographerSelected(option);
    } else if (step === "comparing") {
      addUserMessage(option);
      if (option === "Tenho outra dúvida") {
        setTimeout(() => {
          addBotMessage("Claro! Digite sua dúvida abaixo que eu respondo na hora 👇");
          setStep("ai_chat");
        }, 300);
      } else {
        handlePhotographerSelected(option);
      }
    } else if (step === "session_type") {
      addUserMessage(option);
      setSelectedSession(option);
      if (selectedDateState) {
        setTimeout(() => {
          addBotMessage(`Perfeito! Sessão de ${option} no dia ${selectedDateState}.`);
          setTimeout(() => {
            addBotMessage(
              `Para registrar seu interesse, preciso só do seu nome e WhatsApp 👇`
            );
            addBotSpecial("", "interest_form");
            setStep("register_interest");
          }, 800);
        }, 500);
      } else {
        setTimeout(() => {
          addBotMessage(`Ótima escolha! ${option} é uma das nossas especialidades. 📸`);
          setTimeout(() => {
            addBotMessage(AVAILABILITY_HINT);
            addBotSpecial("", "calendar");
            setStep("select_date");
          }, 1000);
        }, 500);
      }
    }
  };

  const showInput = step === "ai_chat";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-tiktok font-semibold">131 Fotos</h3>
                  <p className="text-xs text-primary-foreground/70">
                    {showInput ? "Assistente IA" : "Agendamento"}
                  </p>
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
                    className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-background text-foreground shadow-sm rounded-bl-md"
                    }`}
                  >
                    {msg.text && (
                      <p className="text-sm font-sans whitespace-pre-line">{msg.text}</p>
                    )}

                    {msg.variant === "calendar" && (
                      <div className="bg-white rounded-xl p-2 mt-1">
                        <Calendar
                          mode="single"
                          onSelect={handleCalendarPick}
                          disabled={(date) => {
                            const d = new Date(date);
                            d.setHours(0, 0, 0, 0);
                            if (d < today) return true;
                            return !isDateAvailable(d, overrides);
                          }}
                          modifiers={{
                            available: (date) => {
                              const d = new Date(date);
                              d.setHours(0, 0, 0, 0);
                              return d >= today && isDateAvailable(d, overrides);
                            },
                          }}
                          modifiersClassNames={{
                            available:
                              "!bg-emerald-100 !text-emerald-900 font-semibold ring-1 ring-emerald-300 hover:!bg-emerald-200",
                          }}
                          locale={ptBR}
                          className="!text-neutral-900 [&_.rdp-day_selected]:!bg-neutral-900 [&_.rdp-day_selected]:!text-white"
                        />
                      </div>
                    )}

                    {msg.variant === "interest_form" && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitInterest();
                        }}
                        className="space-y-2 mt-1"
                      >
                        <input
                          type="text"
                          value={interestName}
                          onChange={(e) => setInterestName(e.target.value)}
                          placeholder="Seu nome"
                          required
                          className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <input
                          type="tel"
                          value={interestPhone}
                          onChange={(e) => setInterestPhone(e.target.value)}
                          placeholder="WhatsApp (com DDD)"
                          required
                          className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Registrar interesse
                        </button>
                      </form>
                    )}

                    {msg.variant === "whatsapp_cta" && (
                      <button
                        onClick={() => {
                          if (msg.ctaPayload) openWhatsApp(msg.ctaPayload);
                        }}
                        className="w-full bg-emerald-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mt-1"
                      >
                        <MessageCircle size={16} />
                        Falar no WhatsApp agora
                      </button>
                    )}

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
            {showInput ? (
              <div className="bg-background border-t border-border px-3 py-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFreeTextSubmit();
                  }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={freeTextInput}
                    onChange={(e) => setFreeTextInput(e.target.value)}
                    placeholder="Digite sua dúvida..."
                    disabled={isTyping}
                    className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!freeTextInput.trim() || isTyping}
                    className="bg-primary text-primary-foreground rounded-xl p-2.5 hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-background border-t border-border px-4 py-3">
                <p className="text-center text-xs text-muted-foreground font-tiktok">
                  Powered by 131 Fotos • Studio 131
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingChat;
