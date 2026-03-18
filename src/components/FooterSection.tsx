import { Instagram } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 px-6 border-t border-neutral-700/30">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold text-neutral-200">131 Fotos</h2>

        <a
          href="https://instagram.com/131fotos"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          <Instagram size={20} />
          <span className="text-sm">@131fotos</span>
        </a>

        <p className="text-sm text-neutral-500">
          131 Fotos © 2026 — Todos os direitos reservados
        </p>

        <a
          href="https://studio131.com.br"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
        >
          Uma marca Studio 131
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
