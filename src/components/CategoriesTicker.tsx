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
    <section className="py-2 mx-4 md:mx-12 rounded-2xl overflow-hidden bg-neutral-800/30 backdrop-blur-md border border-neutral-700/20">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {[...categories, ...categories, ...categories].map((cat, i) => (
          <span
            key={i}
            className="text-lg md:text-xl text-stone-500 mx-8 font-sans"
          >
            {cat}
            <span className="mx-8 text-stone-600/50">•</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default CategoriesTicker;