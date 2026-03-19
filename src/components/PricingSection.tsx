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
    <section className="py-16 px-6 font-sans font-light">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-4 text-neutral-200">
          Investimento
        </h2>
        <p className="text-center text-neutral-400 mb-12">
          Pacotes a partir de R$ 797
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-2xl transition-transform hover:-translate-y-1 duration-300 ${
                pkg.highlighted
                  ? "bg-neutral-200 text-neutral-900"
                  : "bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/30 text-neutral-200"
              }`}
            >
              <h3 className="text-xl mb-2">{pkg.name}</h3>
              <p
                className={`text-sm mb-4 ${
                  pkg.highlighted ? "text-neutral-600" : "text-neutral-400"
                }`}
              >
                {pkg.description}
              </p>
              <p className="text-3xl mb-6">{pkg.price}</p>
              <ul className="space-y-2">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`text-sm flex items-center gap-2 ${
                      pkg.highlighted ? "text-neutral-700" : "text-neutral-400"
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

        <p className="text-center text-neutral-500 text-sm mt-8">
          * Valores sujeitos a alteração. Consulte disponibilidade.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
