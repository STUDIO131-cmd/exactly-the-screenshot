const categories = [
  "Gestação",
  "Ensaio Pessoal",
  "Pequenos Eventos",
  "Retratos Profissionais",
  "15 anos",
  "Casais",
];

const CategoriesTicker = () => {
  return (
    <section className="py-2 mx-4 md:mx-12 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/15">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {[...categories, ...categories, ...categories].map((cat, i) => (
          <span
            key={i}
            className="text-lg md:text-xl text-stone-800 mx-5 font-sans font-semibold"
          >
            {cat}
            <span className="mx-5 text-stone-600/40">•</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default CategoriesTicker;