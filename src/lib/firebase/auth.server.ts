import { auth } from "firebase-admin";
import { app } from "./init.server";
import { RequestData } from "genkit/context";

const a = auth(app);

export async function getCurrentUser(req: RequestData) {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const user = await a.verifyIdToken(token);
      return user;
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  return null;
}
