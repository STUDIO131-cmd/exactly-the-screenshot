/**
 * Centralized WhatsApp link builder for 131 Fotos.
 * Single source of truth for the studio's WhatsApp number and contextual messages.
 */

export const WHATSAPP_NUMBER = "5517992595117";

export type WhatsAppContext =
  | "general"
  | "booking_interest"
  | "booking_date"
  | "ai_escalation"
  | "ai_error"
  | "faq_followup"
  | "gallery_inquiry"
  | "pricing_question"
  | "priority_launch"
  | "custom";

export interface BuildOpts {
  name?: string;
  date?: string;
  session?: string;
  photographer?: string;
  summary?: string;
  custom?: string;
}

const buildEncodedMessage = (context: WhatsAppContext, opts?: BuildOpts): string =>
  encodeURIComponent(buildMessage(context, opts));

const buildWhatsAppWebUrl = (context: WhatsAppContext, opts?: BuildOpts): string =>
  `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${buildEncodedMessage(context, opts)}`;

const buildWhatsAppDeepLink = (context: WhatsAppContext, opts?: BuildOpts): string =>
  `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${buildEncodedMessage(context, opts)}`;

const openLink = (href: string, target: "_blank" | "_self" | "_top") => {
  const a = document.createElement("a");
  a.href = href;
  a.target = target;
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const buildMessage = (context: WhatsAppContext, opts: BuildOpts = {}): string => {
  const { name, date, session, photographer, summary, custom } = opts;

  switch (context) {
    case "general":
      return "Olá! Vim pelo site 131 Fotos e gostaria de saber mais sobre os serviços.";

    case "booking_interest": {
      const sessionPart = session ? ` de ${session}` : "";
      const datePart = date ? ` no dia ${date}` : "";
      const photogPart = photographer ? ` (preferência: ${photographer})` : "";
      const greeting = name ? `Olá! Sou ${name}.` : "Olá!";
      return `${greeting} Tenho interesse em agendar uma sessão${sessionPart}${datePart}${photogPart}. Pode confirmar o horário disponível?`;
    }

    case "booking_date":
      return `Olá! Vim pelo site 131 Fotos e gostaria de agendar uma sessão${
        date ? ` para o dia ${date}` : ""
      }.`;

    case "ai_escalation":
      return `Olá! Vim pelo site 131 Fotos.${summary ? ` ${summary}` : ""}`;

    case "ai_error":
      return "Olá! Tive uma dúvida no chat do site 131 Fotos e gostaria de falar com o atendimento.";

    case "faq_followup":
      return "Olá! Estava lendo as perguntas frequentes no site 131 Fotos e gostaria de tirar uma dúvida.";

    case "gallery_inquiry":
      return "Olá! Vi as galerias no site 131 Fotos e me interessei por uma sessão. Podemos conversar?";

    case "pricing_question":
      return "Olá! Tenho uma dúvida sobre preços e pacotes do Studio 131.";

    case "priority_launch":
      return `${
        name ? `Olá! Sou ${name},` : "Olá!"
      } entrei na lista prioritária do site 131 Fotos e gostaria de mais informações.`;

    case "custom":
      return custom || "Olá! Vim pelo site 131 Fotos.";

    default:
      return "Olá! Vim pelo site 131 Fotos.";
  }
};

export const buildWhatsAppUrl = (
  context: WhatsAppContext,
  opts?: BuildOpts
): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${buildEncodedMessage(context, opts)}`;
};

export const openWhatsApp = (
  context: WhatsAppContext,
  opts?: BuildOpts
): void => {
  if (typeof window === "undefined") return;
  const mobileUrl = buildWhatsAppDeepLink(context, opts);
  const browserUrl = /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)
    ? buildWhatsAppUrl(context, opts)
    : buildWhatsAppWebUrl(context, opts);
  const target = window.self !== window.top ? "_top" : "_blank";

  try {
    if (/Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
      openLink(mobileUrl, window.self !== window.top ? "_top" : "_self");
      window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          openLink(browserUrl, target);
        }
      }, 500);
      return;
    }

    openLink(browserUrl, target);
  } catch {
    if (target === "_top") {
      window.location.href = browserUrl;
      return;
    }

    window.open(browserUrl, "_blank", "noopener,noreferrer");
  }
};
