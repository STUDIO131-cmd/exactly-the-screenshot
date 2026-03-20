const IntentionText = () => {
  return (
    <section className="py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent" />

        <div className="space-y-6 py-2">
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed tracking-wide font-sans">
            Tudo começa com uma{" "}
            <span className="font-semibold text-neutral-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]">
              intenção
            </span>
            :
            <br />
            eternizar um momento importante.
          </p>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed tracking-wide font-sans">
            Abaixo temos nosso portfólio com depoimentos e/ou entregas bônus:
          </p>
        </div>

        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent" />
      </div>
    </section>
  );
};

export default IntentionText;
