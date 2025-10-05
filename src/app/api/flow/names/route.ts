import { getCurrentUser } from "@/lib/firebase/auth.server";
import { generateNamesFlow } from "@/utils/ai";
import appRoute from "@genkit-ai/next";

export const POST = appRoute(generateNamesFlow, {
  contextProvider: async (req) => {
    return { user: await getCurrentUser(req) };
  },
});
