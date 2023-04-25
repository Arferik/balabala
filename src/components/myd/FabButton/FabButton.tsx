import React, { type ButtonHTMLAttributes } from "react";
import tw, { styled } from "twin.macro";
import clsx from "clsx";
import { BaseButton } from "../ButtonBase/ButtonBase";
import Icon from "../Icon/Icon";

export type FabButtonColor = "primary" | "surface" | "secondary" | "tertiary";
export interface FabButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: FabButtonColor;
  size?: "sm" | "md" | "lg" | number;
  icon: string;
  elevation?: "default" | "lowered";
}

const IconRoot = styled(Icon)<FabButtonProps>(({ color = "primary", size }) => [
  size === "lg" && tw`text-4xl`,
  color === "primary" && tw`text-on-primary-container `,
  color === "surface" && tw`text-on-surface-variant`,
  color === "secondary" && tw`text-on-secondary-container`,
  color === "tertiary" && tw`text-on-tertiary-container`,
]);

const ButtonRoot = styled(BaseButton)<FabButtonProps>(
  ({ color = "primary", size = "md", elevation = "default" }) => [
    elevation === "default"
      ? tw`shadow-md hover:shadow-lg`
      : tw`shadow hover:shadow-md`,
    size === "md" && tw`w-14 h-14 rounded-2xl`,
    size === "sm" && tw`w-10 h-10 rounded-xl`,
    size === "lg" && tw`w-24 h-24 rounded-[1.75rem]`,
    color === "primary" &&
      tw`bg-primary-container 
        hover:after:(w-[200%] h-[200%] bg-on-primary-container opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-on-primary-container opacity-[.12] absolute top-[-50%] left-[-50%])
    `,
    color === "surface" &&
      tw`bg-surface-variant 
        hover:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-on-surface-variant  opacity-[.12] absolute top-[-50%] left-[-50%])
    `,
    color === "secondary" &&
      tw`bg-secondary-container 
        hover:after:(w-[200%] h-[200%] bg-on-secondary-container opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-on-secondary-container  opacity-[.12] absolute top-[-50%] left-[-50%])
    
    `,
    color === "tertiary" &&
      tw`bg-tertiary-container
        hover:after:(w-[200%] h-[200%] bg-on-tertiary-container opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-on-tertiary-container  opacity-[.12] absolute top-[-50%] left-[-50%])
    `,
  ]
);

const FabButton = React.forwardRef(function MdFabButton(
  props: React.ComponentProps<"button"> & FabButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonRoot {...props} className={clsx(props.className)} ref={ref}>
      <IconRoot
        {...props}
        size={props.size === "lg" ? 36 : "md"}
        name={props.icon}
      ></IconRoot>
    </ButtonRoot>
  );
});

export default FabButton;
