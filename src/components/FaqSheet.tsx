import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Camera, Users, DollarSign, Sparkles } from "lucide-react";

interface FaqSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    icon: Camera,
    title: "Igor vs. Equipe Studio 131",
    description:
      "Igor é o fotógrafo principal, com estilo autoral e abordagem intimista. A equipe Studio 131 conta com fotógrafos talentosos que seguem a mesma linguagem visual do estúdio.",
  },
  {
    icon: DollarSign,
    title: "Faixa de preço",
    description:
      "Sessões com Igor possuem valor diferenciado pelo trabalho autoral e exclusividade. Sessões com a equipe têm ótimo custo-benefício, mantendo a qualidade Studio 131.",
  },
  {
    icon: Sparkles,
    title: "Tipos de sessões",
    description:
      "Oferecemos Retratos Profissionais, Gestantes, 15 Anos, Casais, Ensaio Pessoal e Eventos — todos com direção de arte e edição profissional.",
  },
  {
    icon: Users,
    title: "Como funciona o agendamento",
    description:
      "Trabalhamos com antecipação e poucas vagas. Escolha o profissional, o tipo de sessão e a data — finalizamos os detalhes pelo WhatsApp.",
  },
];

const FaqSheet = ({ isOpen, onClose }: FaqSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="bg-background border-border max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-xl font-light tracking-wide text-foreground">
            Entenda como funciona
          </SheetTitle>
          <SheetDescription className="text-muted-foreground text-sm">
            Dúvidas comuns sobre nossos serviços e agendamento
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 pb-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border/50"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <faq.icon size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">{faq.title}</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">{faq.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 pb-2">
          <p className="text-center text-xs text-muted-foreground">
            Ainda tem dúvidas?{" "}
            <a
              href="https://wa.me/5517992595117?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20do%20Studio%20131."
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Fale conosco no WhatsApp
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FaqSheet;
