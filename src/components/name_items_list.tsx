import { CopyButton } from "./button";

interface Props {
  names: string[];
  loading: boolean;
}

export function NameItemsList({ names, loading }: Props) {

  if (names.length === 0 || loading) {
    return null;
  }

  return (
    <div>
      <h4 className="font-semibold text-black/70 mt-6 text-sm">Nombres generados:</h4>
      <ul className="list-none gap-2 flex flex-col">
        {names.map((name) => (
          <li key={name} className="text-black rounded-2xl text-lg font-bold bg-primary/5 border-2 border-primary/30 p-4 flex items-center justify-between">{name} <CopyButton value={name} /></li>
        ))}
      </ul>
    </div>
  );
}