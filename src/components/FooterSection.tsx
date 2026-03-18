import { Instagram } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 px-6 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h2 className="font-tiktok text-2xl font-bold text-foreground">131 Fotos</h2>

        <a
          href="https://instagram.com/131fotos"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram size={20} />
          <span className="font-tiktok text-sm">@131fotos</span>
        </a>

        <p className="font-tiktok text-sm text-muted-foreground">
          131 Fotos © 2026 — Todos os direitos reservados
        </p>

        <a
          href="https://studio131.com.br"
          className="font-tiktok text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          Uma marca Studio 131
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
