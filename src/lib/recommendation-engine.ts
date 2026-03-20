export interface LeadInput {
  objective?: string;
  occasion_type?: string;
  people_count?: number;
  desired_location?: string;
  wants_video?: boolean;
  wants_prints?: boolean;
  wants_strategy?: boolean;
  budget_range?: string;
}

export interface RecommendationResult {
  product_id: string;
  variant_id: string;
  product_name: string;
  variant_name: string;
  reason: string;
  confidence: number;
  commercial_response: string;
}

interface ProductData {
  id: string;
  name: string;
  slug: string;
  family_slug: string;
  objective: string;
}

interface VariantData {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  venue_type: string | null;
  video_included: boolean;
  printed_photos: number | null;
  strategy_included: boolean;
  photographer_type: string;
  max_people: number | null;
  limited_slots: number | null;
  edited_photos: number | null;
}

interface PricingData {
  variant_id: string;
  price_cash: number;
  installments_qty: number | null;
  installment_value: number | null;
  extra_photo_price: number | null;
}

export function recommend(
  lead: LeadInput,
  products: ProductData[],
  variants: VariantData[],
  pricing: PricingData[]
): RecommendationResult | null {
  const { objective, occasion_type, wants_video, wants_prints, wants_strategy, budget_range, desired_location } = lead;

  // Helper to find variant + pricing
  const findVariant = (productSlug: string, variantSlug: string) => {
    const product = products.find(p => p.slug === productSlug);
    if (!product) return null;
    const variant = variants.find(v => v.product_id === product.id && v.slug === variantSlug);
    if (!variant) return null;
    const price = pricing.find(p => p.variant_id === variant.id);
    return { product, variant, price };
  };

  const buildResult = (
    product: ProductData,
    variant: VariantData,
    price: PricingData | undefined,
    reason: string,
    confidence: number,
    deliverables: string
  ): RecommendationResult => {
    const priceText = price
      ? `R$${price.price_cash} à vista${price.installments_qty ? `, ou ${price.installments_qty}x de R$${price.installment_value}` : ""}`
      : "consulte valores";

    return {
      product_id: product.id,
      variant_id: variant.id,
      product_name: product.name,
      variant_name: variant.name,
      reason,
      confidence,
      commercial_response: `Pelo que você me contou, a opção que mais faz sentido para você é **${product.name} — ${variant.name}**.\n\nEla foi pensada para ${product.objective?.toLowerCase() || "atender sua necessidade"}.\n\nNela estão incluídos ${deliverables}.\n\nO investimento é ${priceText}, com possibilidade de parcelamento.\n\nSe quiser, posso te explicar a diferença para outras opções.`,
    };
  };

  // Rule 1: Professional positioning
  if (objective === "construir_posicionamento" || wants_strategy) {
    const match = findVariant("retratos-profissionais", "posicionamento");
    if (match) {
      return buildResult(match.product, match.variant, match.price,
        "Você quer construir uma imagem alinhada com sua trajetória e marca pessoal. O Posicionamento Profissional inclui reunião estratégica, sessão e entrega guiada por Igor.",
        0.95,
        "reunião prévia de estratégia, sessão fotográfica com Igor Gagliardi, 35 fotos editadas e reunião de entrega da estratégia"
      );
    }
  }

  // Rule 2: Professional update without strategy
  if (objective === "atualizar_imagem_profissional" && !wants_strategy) {
    const match = findVariant("retratos-profissionais", "base");
    if (match) {
      return buildResult(match.product, match.variant, match.price,
        "Você quer atualizar sua foto profissional de forma prática. O Retrato Base é ideal para WhatsApp, LinkedIn e portfólio.",
        0.9,
        "sessão de 1h20 em estúdio, 10 fotos editadas e 2 trocas de roupa"
      );
    }
  }

  // Rule 3: Events
  if (occasion_type === "evento") {
    const match = findVariant("eventos", "cobertura");
    if (match) {
      return buildResult(match.product, match.variant, match.price,
        "Para coberturas de eventos, temos um pacote completo com até 2h de cobertura e todas as fotos editadas.",
        0.9,
        "até 2h de cobertura, 80 a 100 fotos editadas, com opção de vídeo adicional"
      );
    }
  }

  // Rule 4: Dia das Mães
  if (occasion_type === "dia_das_maes") {
    if (desired_location === "casa") {
      const match = findVariant("dia-das-maes", "experience");
      if (match) {
        return buildResult(match.product, match.variant, match.price,
          "Você quer uma experiência íntima em casa! A sessão Experience do Dia das Mães é perfeita: Igor vai até a casa da família.",
          0.95,
          "sessão de 3h na sua casa, 40 fotos editadas, videoclipe bônus e 10 fotos reveladas em caixa decorativa"
        );
      }
    }
    const budgetLow = budget_range === "ate_1000" || budget_range === "ate_700";
    const match = findVariant("dia-das-maes", budgetLow ? "studio" : "experience");
    if (match) {
      return buildResult(match.product, match.variant, match.price,
        budgetLow
          ? "A sessão Studio do Dia das Mães é perfeita para presentear com carinho e cabe no orçamento."
          : "A sessão Experience do Dia das Mães é a opção mais completa e exclusiva, conduzida por Igor.",
        0.85,
        budgetLow
          ? "sessão de 1h em estúdio, 15 fotos editadas e até 4 pessoas"
          : "sessão de 3h, 40 fotos editadas, videoclipe e fotos reveladas"
      );
    }
  }

  // Rule 5: Thematic sessions (casais, gestantes, 15 anos)
  const thematicOccasions = ["casais", "gestante", "15_anos"];
  if (occasion_type && thematicOccasions.includes(occasion_type)) {
    const slugMap: Record<string, string> = { casais: "casais", gestante: "gestantes", "15_anos": "15-anos" };
    const productSlug = slugMap[occasion_type];
    const wantsExperience = wants_video || wants_prints;
    const budgetLow = budget_range === "ate_1000";
    const variantSlug = wantsExperience && !budgetLow ? "experience" : "studio";

    const match = findVariant(productSlug, variantSlug);
    if (match) {
      return buildResult(match.product, match.variant, match.price,
        variantSlug === "experience"
          ? `Você quer uma experiência completa com ${wants_video ? "vídeo" : ""}${wants_video && wants_prints ? " e " : ""}${wants_prints ? "fotos reveladas" : ""}. A versão Experience é conduzida por Igor Gagliardi.`
          : "A versão Studio oferece excelente qualidade com ótimo custo-benefício.",
        0.85,
        variantSlug === "experience"
          ? "35 fotos editadas, videoclipe, 10 fotos reveladas e sessão com Igor"
          : "sessão de 2h em estúdio, 20 fotos editadas e 2 trocas de roupa"
      );
    }
  }

  return null;
}

export function parseLeadFromText(text: string): LeadInput {
  const lower = text.toLowerCase();
  const lead: LeadInput = {};

  // Objective
  if (lower.includes("posicionamento") || lower.includes("estratégia") || lower.includes("marca pessoal")) {
    lead.objective = "construir_posicionamento";
    lead.wants_strategy = true;
  } else if (lower.includes("profissional") || lower.includes("linkedin") || lower.includes("currículo")) {
    lead.objective = "atualizar_imagem_profissional";
  } else if (lower.includes("presentear") || lower.includes("presente")) {
    lead.objective = "presentear";
  } else if (lower.includes("registrar") || lower.includes("memória")) {
    lead.objective = "registrar_fase";
  } else if (lower.includes("evento") || lower.includes("inauguração") || lower.includes("aniversário") || lower.includes("batizado") || lower.includes("casamento civil")) {
    lead.objective = "cobrir_evento";
  }

  // Occasion
  if (lower.includes("mãe") || lower.includes("dia das mães") || lower.includes("mae")) {
    lead.occasion_type = "dia_das_maes";
  } else if (lower.includes("casal") || lower.includes("namorado") || lower.includes("namorada")) {
    lead.occasion_type = "casais";
  } else if (lower.includes("gestante") || lower.includes("grávida") || lower.includes("gravidez") || lower.includes("bebê")) {
    lead.occasion_type = "gestante";
  } else if (lower.includes("15 anos") || lower.includes("debutante") || lower.includes("quinze")) {
    lead.occasion_type = "15_anos";
  } else if (lower.includes("evento") || lower.includes("inauguração") || lower.includes("aniversário") || lower.includes("batizado")) {
    lead.occasion_type = "evento";
  }

  // Constraints
  if (lower.includes("vídeo") || lower.includes("video") || lower.includes("filmagem")) lead.wants_video = true;
  if (lower.includes("revelada") || lower.includes("impressa") || lower.includes("física")) lead.wants_prints = true;
  if (lower.includes("estratégia") || lower.includes("posicionamento")) lead.wants_strategy = true;
  if (lower.includes("casa") || lower.includes("domicílio")) lead.desired_location = "casa";

  // People count
  const peopleMatch = lower.match(/(\d+)\s*(pessoa|familiar|membro)/);
  if (peopleMatch) lead.people_count = parseInt(peopleMatch[1]);

  // Budget
  if (lower.includes("barato") || lower.includes("econômic") || lower.includes("custo-benefício")) lead.budget_range = "ate_1000";

  return lead;
}
