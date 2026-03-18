import { Check } from "lucide-react";

const packages = [
  {
    name: "Essencial",
    price: "R$ 797",
    description: "Sessão básica para começar",
    features: ["1 hora de sessão", "20 fotos editadas", "Galeria online"],
  },
  {
    name: "Completo",
    price: "R$ 1.450",
    description: "Nossa opção mais popular",
    features: ["2 horas de sessão", "50 fotos editadas", "Galeria online", "Álbum digital"],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "R$ 2.250",
    description: "Experiência completa",
    features: [
      "4 horas de sessão",
      "100+ fotos editadas",
      "Galeria online",
      "Álbum impresso",
      "Making of em vídeo",
    ],
  },
];

const PricingSection = () => {
  return (
    <section className="py-16 px-6 bg-surface-subtle">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-tiktok text-3xl md:text-4xl text-center mb-4 text-foreground">
          Investimento
        </h2>
        <p className="font-tiktok text-center text-muted-foreground mb-12">
          Pacotes a partir de R$ 797
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-2xl transition-transform hover:-translate-y-1 duration-300 ${
                pkg.highlighted
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border"
              }`}
            >
              <h3 className="font-tiktok text-xl mb-2">{pkg.name}</h3>
              <p
                className={`text-sm mb-4 ${
                  pkg.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {pkg.description}
              </p>
              <p className="font-tiktok text-3xl mb-6">{pkg.price}</p>
              <ul className="space-y-2">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`text-sm flex items-center gap-2 font-tiktok ${
                      pkg.highlighted ? "text-primary-foreground/80" : "text-foreground/70"
                    }`}
                  >
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">
          * Valores sujeitos a alteração. Consulte disponibilidade.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
