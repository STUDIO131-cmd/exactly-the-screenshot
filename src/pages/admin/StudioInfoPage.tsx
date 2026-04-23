import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";

interface StudioInfoRow {
  id: string;
  key: string;
  value: string;
  updated_at?: string;
  isNew?: boolean;
}

const StudioInfoPage = () => {
  const [rows, setRows] = useState<StudioInfoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("studio_info")
      .select("*")
      .order("key");
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateRow = (id: string, patch: Partial<StudioInfoRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    const tempId = `new-${Date.now()}`;
    setRows((prev) => [{ id: tempId, key: "", value: "", isNew: true }, ...prev]);
  };

  const saveRow = async (row: StudioInfoRow) => {
    if (!row.key.trim() || !row.value.trim()) {
      toast({ title: "Campos obrigatórios", description: "Informe chave e valor.", variant: "destructive" });
      return;
    }
    setSavingId(row.id);
    if (row.isNew) {
      const { data, error } = await supabase
        .from("studio_info")
        .insert({ key: row.key.trim(), value: row.value.trim() })
        .select()
        .single();
      if (error) {
        toast({ title: "Erro ao criar", description: error.message, variant: "destructive" });
      } else {
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...data, isNew: false } : r)));
        toast({ title: "Criado", description: `Chave "${data.key}" salva.` });
      }
    } else {
      const { error } = await supabase
        .from("studio_info")
        .update({ value: row.value.trim() })
        .eq("id", row.id);
      if (error) {
        toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Salvo", description: `Chave "${row.key}" atualizada.` });
      }
    }
    setSavingId(null);
  };

  const deleteRow = async (row: StudioInfoRow) => {
    if (row.isNew) {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      return;
    }
    if (!confirm(`Excluir a chave "${row.key}"?`)) return;
    const { error } = await supabase.from("studio_info").delete().eq("id", row.id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      toast({ title: "Excluído" });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold font-epika">Informações do Estúdio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Base de conhecimento consumida pela IA do chat. Edite com cuidado.
          </p>
        </div>
        <Button onClick={addRow} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nova chave
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-4">
          {rows.length === 0 && (
            <p className="text-muted-foreground text-sm">Nenhuma informação cadastrada.</p>
          )}
          {rows.map((row) => (
            <Card key={row.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {row.isNew ? (
                    <Input
                      placeholder="chave_em_snake_case"
                      value={row.key}
                      onChange={(e) => updateRow(row.id, { key: e.target.value })}
                      className="max-w-sm"
                    />
                  ) : (
                    <code className="text-primary">{row.key}</code>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={row.value}
                  onChange={(e) => updateRow(row.id, { value: e.target.value })}
                  rows={3}
                  className="resize-y"
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRow(row)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveRow(row)}
                    disabled={savingId === row.id}
                  >
                    {savingId === row.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudioInfoPage;
