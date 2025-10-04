"use client";

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