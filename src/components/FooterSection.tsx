import logoWhite from "@/assets/logo-white.svg";

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 font-sans font-light" style={{ backgroundColor: 'rgba(232, 228, 223, 0.3)', color: '#3E2C1E' }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Logo menor */}
        <img src={logoWhite} alt="Studio 131" className="h-10 opacity-80 invert" />

        {/* Glass bar com 4 botões em 2 linhas */}
        <div
          className="w-full max-w-lg rounded-2xl px-6 py-5 flex flex-col gap-3"
          style={{
            background: 'rgba(62, 44, 30, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(62, 44, 30, 0.12)',
          }}
        >
          {/* Linha 1 */}
          <div className="flex gap-3">
            <a
              href="https://studio131.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs py-2.5 rounded-lg transition-colors"
              style={{
                background: 'rgba(62, 44, 30, 0.07)',
                border: '1px solid rgba(62, 44, 30, 0.1)',
                color: '#3E2C1E',
              }}
            >
              Conheça a agência
            </a>
            <a
              href="https://studio131.com.br/plano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs py-2.5 rounded-lg transition-colors"
              style={{
                background: 'rgba(62, 44, 30, 0.07)',
                border: '1px solid rgba(62, 44, 30, 0.1)',
                color: '#3E2C1E',
              }}
            >
              O Plano Profissional
            </a>
          </div>

          {/* Linha 2 */}
          <div className="flex gap-3">
            <a
              href="https://studio131.com.br/thejourney"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs py-2.5 rounded-lg transition-colors flex flex-col items-center justify-center"
              style={{
                background: 'rgba(62, 44, 30, 0.07)',
                border: '1px solid rgba(62, 44, 30, 0.1)',
                color: '#3E2C1E',
              }}
            >
              <span>The Journey</span>
              <span className="text-[10px] opacity-60 mt-0.5">FRENTE EDUCACIONAL</span>
            </a>
            <button
              onClick={scrollToTop}
              className="flex-1 text-center text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
              style={{
                background: 'rgba(62, 44, 30, 0.07)',
                border: '1px solid rgba(62, 44, 30, 0.1)',
                color: '#3E2C1E',
              }}
            >
              Voltar ao topo
            </button>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: '#3E2C1E', opacity: 0.5 }}>
          131 Fotos © 2026 — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
