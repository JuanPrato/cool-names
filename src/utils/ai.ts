import { googleAI } from "@genkit-ai/google-genai";
import { genkit, z } from "genkit";

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.0-flash"),
});

export const generateNamesFlow = ai.defineFlow(
  {
    name: "generateNames",
    inputSchema: z.object({
      categories: z.array(z.string()),
      description: z.string().optional(),
    }),
    outputSchema: z.object({
      names: z.array(z.string()),
    }),
  },
  async (input) => {
    const { categories, description } = input;
    let prompt = `
Actuá como un generador de nombres de usuario creativo para una página web llamada “dameunnombrecool.com”.

Tu tarea es generar una lista de nombres de usuario únicos, memorables y fáciles de leer, según el estilo elegido.

Reglas generales:
- El nombre debe tener entre 4 y 15 caracteres.
- No uses espacios, emojis ni símbolos raros.
- Podés usar combinaciones de letras y números si quedan bien (por ejemplo: ShadowX, Luna77).
- Los nombres deben sonar naturales y atractivos.
- Entregá exactamente 10 nombres distintos, sin explicaciones ni texto adicional.
- Si llega más de una categoría, combiná estilos de esas categorías para crear nombres únicos.

Instrucciones por categoría:
- RANDOM: mezcla estilos, crea nombres que suenen naturales, modernos o originales sin seguir una regla específica.
- FUNNY: nombres con humor o juego de palabras, pueden ser absurdos, irónicos o ligeros (ej: SeñorBanana, PapuDelWifi, LagKing).
- COOL: nombres con estilo moderno, minimalista o estético (ej: NovaX, Ardent, LucidVibe, Kairo).
- GAMER: nombres que encajen en comunidades de juegos (Steam, Discord, Twitch), con energía o fuerza (ej: RageCore, Sn1perX, ToxicSoul, VoidHunter).

Si el usuario agregó contexto, incorporá ese tema de forma sutil en los nombres.
Ejemplo de contexto: “algo relacionado con gatos” → nombres como CatVortex, MiauLord, DarkWhisker.

Formato de salida:
Nombre1
Nombre2
Nombre3
... hasta 10 nombres.
`;

    if (categories.length > 0) {
      prompt += ` Categorías: ${categories.join(", ")}.`;
    }

    if (description) {
      prompt += ` Contexto: ${description}.`;
    }

    const { text } = await ai.generate(prompt);

    return { names: text.split("\n").filter((name) => name.trim() !== "") };
  }
);

// Export only the type of the flow so client code can reference it without
// importing server runtime (which pulls `genkit` into client bundles).
export type GenerateNamesFlow = typeof generateNamesFlow;
