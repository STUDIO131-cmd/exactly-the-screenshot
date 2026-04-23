/**
 * Lógica de disponibilidade da agenda Studio 131
 *
 * Regra padrão:
 * - Aberto apenas no PRIMEIRO sábado de cada mês, das 08h30 às 18h00
 * - Se o primeiro sábado for feriado, cai para o próximo sábado válido do mês
 * - Fechado em todos os outros dias e em feriados nacionais/municipais (Catanduva-SP)
 *
 * Exceções (tabela `available_dates`):
 * - Linha com is_available=false bloqueia uma data padrão
 * - Linha com is_available=true libera uma data extra fora do padrão
 */

export type AvailabilityOverride = {
  date: string; // YYYY-MM-DD
  is_available: boolean;
};

/** Formata Date como YYYY-MM-DD (timezone local). */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Algoritmo de Meeus para domingo de Páscoa (calendário gregoriano). */
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export type Holiday = { date: string; name: string };

/** Feriados nacionais + municipais de Catanduva-SP para o ano informado. */
export function getCatanduvaHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  const carnavalSeg = addDays(easter, -48);
  const carnavalTer = addDays(easter, -47);
  const sextaSanta = addDays(easter, -2);
  const corpus = addDays(easter, 60);

  const list: Holiday[] = [
    { date: `${year}-01-01`, name: "Confraternização Universal" },
    { date: toISODate(carnavalSeg), name: "Carnaval (segunda)" },
    { date: toISODate(carnavalTer), name: "Carnaval (terça)" },
    { date: toISODate(sextaSanta), name: "Sexta-feira Santa" },
    { date: `${year}-04-14`, name: "Aniversário de Catanduva" },
    { date: `${year}-04-21`, name: "Tiradentes" },
    { date: `${year}-05-01`, name: "Dia do Trabalho" },
    { date: toISODate(corpus), name: "Corpus Christi" },
    { date: `${year}-08-08`, name: "Padroeira São Domingos (Catanduva)" },
    { date: `${year}-09-07`, name: "Independência do Brasil" },
    { date: `${year}-10-12`, name: "Nossa Senhora Aparecida" },
    { date: `${year}-11-02`, name: "Finados" },
    { date: `${year}-11-15`, name: "Proclamação da República" },
    { date: `${year}-11-20`, name: "Consciência Negra" },
    { date: `${year}-12-25`, name: "Natal" },
  ];

  return list;
}

function isHoliday(date: Date): boolean {
  const iso = toISODate(date);
  return getCatanduvaHolidays(date.getFullYear()).some((h) => h.date === iso);
}

/** Retorna o primeiro sábado válido (não feriado) do mês. */
export function getDefaultOpenSaturday(year: number, month: number): Date | null {
  // month: 0-11
  for (let day = 1; day <= 31; day++) {
    const d = new Date(year, month, day);
    if (d.getMonth() !== month) break;
    if (d.getDay() === 6 && !isHoliday(d)) {
      return d;
    }
  }
  return null;
}

/**
 * Verifica se a data está disponível considerando regra padrão + exceções.
 * - Exceção com is_available=false sempre bloqueia
 * - Exceção com is_available=true sempre libera (mesmo fora do padrão)
 * - Sem exceção: usa regra do "1 sábado por mês"
 */
export function isDateAvailable(
  date: Date,
  overrides: AvailabilityOverride[] = []
): boolean {
  const iso = toISODate(date);
  const override = overrides.find((o) => o.date === iso);
  if (override) return override.is_available;

  // Regra padrão: precisa ser o sábado padrão do mês
  const defaultSat = getDefaultOpenSaturday(date.getFullYear(), date.getMonth());
  if (!defaultSat) return false;
  return toISODate(defaultSat) === iso;
}

/** Texto auxiliar padrão para mostrar no calendário. */
export const AVAILABILITY_HINT =
  "Atendemos um sábado por mês, das 08h30 às 18h. Escolha a data desejada e nosso atendimento confirma o horário pelo WhatsApp.";
