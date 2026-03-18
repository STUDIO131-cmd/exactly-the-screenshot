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
    <section className="py-6 border-y border-border overflow-hidden">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {[...categories, ...categories, ...categories].map((cat, i) => (
          <span
            key={i}
            className="font-display text-lg md:text-xl text-foreground/80 mx-8"
          >
            {cat}
            <span className="mx-8 text-foreground/30">•</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default CategoriesTicker;
