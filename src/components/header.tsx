import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="flex flex-col items-center gap-2">
      <div className="size-20 bg-gradient rounded-3xl grid place-content-center shadow-glow">
        <Sparkles className="size-10 text-white" />
      </div>
      <h1 className="text-5xl font-bold mt-5">nombrescool<span className="text-primary-accent">.com</span></h1>
      <p className="text-lg text-black/70">Genera nombres cool para lo que necesites</p>
    </header>
  );
}