import { generateNamesFlow } from "@/utils/ai";
import appRoute from "@genkit-ai/next";

export const POST = appRoute(generateNamesFlow);
