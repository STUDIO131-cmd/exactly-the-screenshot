const categories = [
  "Gestação",
  "Ensaio Pessoal",
  "Eventos Intimistas",
  "Batizados",
  "Confraternizações",
  "Família",
  "Retratos",
];

const CategoriesTicker = () => {
  return (
    <section className="py-6 border-y border-neutral-700/30 overflow-hidden">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {[...categories, ...categories, ...categories].map((cat, i) => (
          <span
            key={i}
            className="text-lg md:text-xl text-neutral-300 mx-8"
          >
            {cat}
            <span className="mx-8 text-neutral-500">•</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default CategoriesTicker;
