"use client";

import { NAME_CATEGORIES } from "@/utils/consts";
import { ToggleButton } from "./button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toggleValue } from "@/utils/utils";
import { runFlow } from "@genkit-ai/next/client";
import type { GenerateNamesFlow } from "@/utils/ai";

export function NameForm() {

  const [form, setForm] = useState({
    categories: [] as string[],
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [names, setNames] = useState<string[]>([]);

  async function onSubmit() {
    setLoading(true);
    const { names: generatedNames } = await runFlow<GenerateNamesFlow>({
      url: "/api/flow/names",
      input: form,
    });

    setNames(generatedNames);
    setLoading(false);
  }

  return (
    <section className="bg-white w-4/5 p-6 rounded-2xl">
      <div>
        <label className="block text-sm font-semibold text-black/70 mb-3">Estilo del nombre</label>
        <div className="flex justify-between gap-4 ">
          {
            NAME_CATEGORIES.map((category) => (
              <ToggleButton
                key={category.value}
                className="p-4 border-2 rounded-2xl w-full"
                activeClassName="border-primary bg-primary/10 hover:bg-primary/20"
                inactiveClassName="border-black/20 bg-white hover:bg-black/5"
                onClick={() => setForm((prev) => {
                  return { ...prev, categories: toggleValue(prev.categories, category.value) };
                })}>
                <div className="text-2xl">{category.icon}</div>
                <div className="font-medium text-black/70">{category.label}</div>
              </ToggleButton>
            ))
          }
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-semibold text-black/70 mb-3 mt-6" htmlFor="description">Queres especificar algo más personalizado? (opcional)</label>
        <textarea
          id="description"
          className="w-full border-2 border-black/20 rounded-2xl p-4 resize-none focus:outline-primary" rows={4} placeholder="Escribe aquí tu descripción..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        >
        </textarea>
        <p className="text-xs text-black/60">Se utilizara para dar contexto adicional a tu solicitud.</p>
      </div>
      <button className="cursor-pointer flex items-center justify-center w-full p-4 bg-gradient rounded-2xl text-white gap-2 mt-4 font-bold transition-colors hover:from-primary-accent hover:to-primary shadow-glow disabled:opacity-50 disabled:cursor-not-allowed" type="button" onClick={onSubmit} disabled={loading}><RefreshCcw className={`size-5 ${loading ? "animate-spin" : ""}`} /> Generar nombres</button>
      {
        names.length === 0 && !loading && (
          <div>
            <h4 className="font-semibold text-black/70 mt-6 text-sm">Nombres generados:</h4>
            <ul className="list-none gap-2 flex flex-col">
              {names.map((name) => (
                <li key={name} className="text-black rounded-2xl text-lg font-bold bg-primary/5 border-2 border-primary/30 p-4">{name}</li>
              ))}
            </ul>
          </div>
        )
      }
    </section>
  );
}