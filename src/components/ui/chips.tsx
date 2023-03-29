import { twClass } from "~/utils";
import React from "react";
import { Icon } from "./icon";
import "twin.macro";

type ChipType = "assist" | "filter" | "input" | "suggestion";

interface ChipsProps {
  type: ChipType;
  className?: string;
  icon?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const chipsClasses: Record<ChipType, string> = {
  assist: `hover:bg-on-surface`,
  filter: ``,
  input: ``,
  suggestion: ``,
};

export const Chips: React.FC<ChipsProps> = ({
  type = "assist",
  children,
  className = "",
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      tw="label-large z-10 box-border inline-flex
       h-8 cursor-pointer items-center rounded-md border border-outline bg-surface px-4 text-on-surface hover:bg-on-surface"
    >
      {icon && (
        <Icon name={icon} tw="text-primary text-[1.125rem] mr-2 -ml-2"></Icon>
      )}
      {children}
    </div>
  );
};
