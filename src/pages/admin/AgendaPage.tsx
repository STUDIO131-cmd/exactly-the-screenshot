import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  getDefaultOpenSaturday,
  getCatanduvaHolidays,
  toISODate,
  type AvailabilityOverride,
} from "@/lib/availability";

type DateRow = AvailabilityOverride & { id: string; notes: string | null };

const AgendaPage = () => {
  const { toast } = useToast();
  const [overrides, setOverrides] = useState<DateRow[]>([]);
  const [extraDate, setExtraDate] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("available_dates")
      .select("id, date, is_available, notes")
      .order("date");
    if (data) setOverrides(data as DateRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const upcomingMonths = useMemo(() => {
    const now = new Date();
    const months: { year: number; month: number; saturday: Date | null }[] = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      months.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        saturday: getDefaultOpenSaturday(d.getFullYear(), d.getMonth()),
      });
    }
    return months;
  }, []);

  const holidaysThisYear = useMemo(
    () => getCatanduvaHolidays(new Date().getFullYear()),
    []
  );

  const findOverride = (iso: string) => overrides.find((o) => o.date === iso);

  const toggleBlock = async (date: Date) => {
    setLoading(true);
    const iso = toISODate(date);
    const existing = findOverride(iso);
    if (existing) {
      // remove override → volta ao padrão
      await supabase.from("available_dates").delete().eq("id", existing.id);
    } else {
      await supabase.from("available_dates").insert({
        date: iso,
        is_available: false,
        notes: "Bloqueado pelo admin",
      });
    }
    await load();
    setLoading(false);
    toast({ title: "Agenda atualizada" });
  };

  const addExtraDate = async () => {
    if (!extraDate) return;
    setLoading(true);
    await supabase.from("available_dates").insert({
      date: extraDate,
      is_available: true,
      notes: "Data extra liberada pelo admin",
    });
    setExtraDate("");
    await load();
    setLoading(false);
    toast({ title: "Data extra adicionada" });
  };

  const removeOverride = async (id: string) => {
    setLoading(true);
    await supabase.from("available_dates").delete().eq("id", id);
    await load();
    setLoading(false);
    toast({ title: "Exceção removida" });
  };

  const monthName = (m: number) =>
    new Date(2024, m, 1).toLocaleDateString("pt-BR", { month: "long" });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Agenda</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Regra padrão: <strong>1 sábado por mês</strong> (primeiro sábado válido), das 08h30 às 18h00.
          Use esta tela para bloquear sábados específicos ou liberar datas extras.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Próximos 6 meses</h2>
        <div className="border border-border rounded-lg divide-y divide-border">
          {upcomingMonths.map(({ year, month, saturday }) => {
            const iso = saturday ? toISODate(saturday) : null;
            const override = iso ? findOverride(iso) : null;
            const blocked = override && override.is_available === false;
            return (
              <div
                key={`${year}-${month}`}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="font-medium capitalize">
                    {monthName(month)} {year}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {saturday
                      ? `Sábado padrão: ${saturday.toLocaleDateString("pt-BR")}`
                      : "Sem sábado válido neste mês"}
                  </p>
                </div>
                {saturday && (
                  <Button
                    variant={blocked ? "outline" : "destructive"}
                    size="sm"
                    disabled={loading}
                    onClick={() => toggleBlock(saturday)}
                  >
                    {blocked ? "Reativar" : "Bloquear"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Liberar data extra</h2>
        <div className="flex gap-2">
          <Input
            type="date"
            value={extraDate}
            onChange={(e) => setExtraDate(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={addExtraDate} disabled={!extraDate || loading}>
            Adicionar
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Exceções cadastradas</h2>
        {overrides.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma exceção. Apenas a regra padrão está ativa.</p>
        ) : (
          <div className="border border-border rounded-lg divide-y divide-border">
            {overrides.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium">
                    {new Date(o.date + "T00:00:00").toLocaleDateString("pt-BR")}{" "}
                    <span
                      className={`text-xs ml-2 px-2 py-0.5 rounded ${
                        o.is_available
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {o.is_available ? "Liberada" : "Bloqueada"}
                    </span>
                  </p>
                  {o.notes && <p className="text-xs text-muted-foreground">{o.notes}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOverride(o.id)}
                  disabled={loading}
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Feriados aplicados ({new Date().getFullYear()})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {holidaysThisYear.map((h) => (
            <div key={h.date} className="flex justify-between border border-border rounded px-3 py-1.5">
              <span className="text-muted-foreground">
                {new Date(h.date + "T00:00:00").toLocaleDateString("pt-BR")}
              </span>
              <span>{h.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AgendaPage;
