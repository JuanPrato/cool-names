"use client";

import { NAME_CATEGORIES } from "@/utils/consts";
import { Check, CopyIcon } from "lucide-react";
import { PropsWithChildren, useState } from "react";

export function ToggleButton(props: PropsWithChildren<{ defaultOn?: boolean, className?: string, activeClassName?: string, inactiveClassName?: string, onClick?: () => void }>) {

  const [isOn, setIsOn] = useState(props.defaultOn || false);

  const handleClick = () => {
    setIsOn(!isOn);
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick} className={`${props.className} ${isOn ? props.activeClassName : props.inactiveClassName}`}>
      {props.children}
    </button>
  );
}

export function CategoryButton({ category, onClick }: { category: typeof NAME_CATEGORIES[number], onClick: () => void }) {
  return (
    <ToggleButton
      key={category.value}
      className="p-4 border-2 rounded-2xl w-full"
      activeClassName="border-primary bg-primary/10 hover:bg-primary/20"
      inactiveClassName="border-black/20 bg-white hover:bg-black/5"
      onClick={onClick}>
      <div className="text-2xl">{category.icon}</div>
      <div className="font-medium text-black/70">{category.label}</div>
    </ToggleButton>
  );
}

export function CopyButton({ value }: { value: string }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="bg-white rounded-xl cursor-pointer p-2 border border-black/10 hover:bg-black/5 transition-colors"
    >
      {copied ? <Check className="size-5 text-green-800" /> : <CopyIcon className="size-5" />}
    </button>
  );
}