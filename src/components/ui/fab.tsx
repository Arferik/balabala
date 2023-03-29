import React from "react";
import { Icon } from "./icon";
import tw, { styled } from "twin.macro";

interface BaseButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  size?: "large" | "small" | "medium";
  color?: "surface" | "secondary" | "tertiary";
  className?: string;
}

interface FabProps extends BaseButtonProps {
  icon: string;
}

const BaseButton = styled.button<BaseButtonProps>(({ size, color }) => [
  tw`m-0 box-border inline-flex cursor-pointer appearance-none items-center justify-center overflow-hidden leading-none outline-none`,
  [size === "large" && tw`w-24 h-24 rounded-[1.75rem] text-[2.25rem]`],
  [size === "medium" && tw`w-14 h-14 rounded-2xl text-[1.5rem]`],
  [size === "small" && tw`w-10 h-10 rounded-xl text-[1.5rem]`],
  [
    color === "secondary" &&
      tw`bg-secondary-container text-on-secondary-container  hover:after:bg-on-secondary-container`,
  ],
  [
    color === "tertiary" &&
      tw`bg-tertiary text-on-tertiary-container hover:after:bg-on-tertiary-container`,
  ],
  [color === "surface" && tw`bg-surface text-primary hover:after:bg-primary`],
  tw`hover:after:h-[200%] hover:after:w-[200%]  hover:shadow-lg hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:after:opacity-[0.08]
  active:after:h-[200%] active:after:w-[200%]  active:shadow-lg active:after:absolute active:after:top-[-50%] active:after:left-[-50%] active:after:opacity-[0.12]`,
]);

export const Fab: React.FC<FabProps> = ({
  icon,
  color = "surface",
  size = "medium",
  onClick,
  className = "",
}) => {
  return (
    <BaseButton
      className={className}
      color={color}
      size={size}
      onClick={onClick}
    >
      <Icon name={icon} className=""></Icon>
    </BaseButton>
  );
};
