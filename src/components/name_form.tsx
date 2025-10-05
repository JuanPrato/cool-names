"use client";

import { NAME_CATEGORIES } from "@/utils/consts";
import { CategoryButton } from "./button";
import { Lock, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { runFlow } from "@genkit-ai/next/client";
import type { GenerateNamesFlow } from "@/utils/ai";
import { NameItemsList } from "./name_items_list";
import { useAuth } from "@/hooks/auth";

export function NameForm() {

  const { user } = useAuth();

  const [form, setForm] = useState({
    category: NAME_CATEGORIES.filter((c) => c.default)[0] as typeof NAME_CATEGORIES[number],
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [names, setNames] = useState<string[]>([]);

  async function onSubmit() {
    setLoading(true);
    try {
      const { names: generatedNames } = await runFlow<GenerateNamesFlow>({
        url: "/api/flow/names",
        headers: {
          "Authorization": user ? `Bearer ${await user.getIdToken()}` : "",
        },
        input: {
          categories: [form.category.value],
          description: form.description,
        },
      });
      setNames(generatedNames);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <section className="bg-white w-4/5 max-w-[700px] p-6 rounded-2xl">
      <div>
        <label className="block text-sm font-semibold text-black/70 mb-3">Estilo del nombre</label>
        <div className="flex justify-between gap-4 ">
          {
            NAME_CATEGORIES.map((category) => (
              <CategoryButton
                key={category.value}
                category={category}
                on={form.category.value === category.value}
                onClick={() => setForm((prev) => {

                  if (prev.category.value === category.value) {
                    return { ...prev, category: NAME_CATEGORIES.filter((c) => c.default)[0] };
                  }

                  return { ...prev, category };
                })}>
              </CategoryButton>
            ))
          }
        </div>
      </div>
      <div className="mt-6">
        <label className="text-sm font-semibold text-black/70 mb-3 mt-6 flex gap-2" htmlFor="description">Queres especificar algo más personalizado? (opcional)
          {!user && (<span className="text-primary-accent flex gap-1 items-center"><Lock className="size-3" /> Requiere inicio de sesión</span>)}
        </label>
        <textarea
          id="description"
          className="w-full border-2 border-black/20 rounded-2xl p-4 resize-none focus:outline-primary disabled:bg-black/5" rows={4} placeholder="Escribe aquí tu descripción..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          disabled={!user}
        >
        </textarea>
        <p className="text-xs text-black/60">Se utilizara para dar contexto adicional a tu solicitud.</p>
      </div>
      <button className="btn-primary" type="button" onClick={onSubmit} disabled={loading}><RefreshCcw className={`size-5 ${loading ? "animate-spin" : ""}`} /> Generar nombres</button>
      <NameItemsList names={names} loading={loading} />
    </section>
  );
}