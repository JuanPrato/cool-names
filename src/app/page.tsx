import { Header } from "@/components/header"
import { NameForm } from "@/components/name_form";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Header />
      <main className="flex flex-col items-center">
        <NameForm />
      </main>
      <footer className="text-center text-black/60">
        <p className="text-sm">Genera nombres únicos para tus redes sociales, juegos y más</p>
      </footer>
    </div>
  );
}
