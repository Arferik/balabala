import React, { type ButtonHTMLAttributes } from "react";
import tw, { styled } from "twin.macro";
import clsx from "clsx";
import { BaseButton } from "../ButtonBase/ButtonBase";
import { Icon } from "../Icon/Icon";

export type FabButtonColor = "primary" | "surface" | "secondary" | "tertiary";
export interface FabButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: FabButtonColor;
  size?: "sm" | "md" | "lg";
  icon: string;
}

const IconRoot = styled(Icon)<FabButtonProps>(({ color = "primary" }) => [
  color === "primary" && tw`text-on-primary-container `,
]);

const ButtonRoot = styled(BaseButton)(({ color = "primary", size = "md" }) => [
  size === "md" && tw`w-14 h-14 rounded-2xl`,
  color === "primary" && tw`bg-primary-container shadow-md`,
]);

const FabButton = React.forwardRef(function FabButton(
  props: React.ComponentProps<"button"> & FabButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonRoot {...props} className={clsx(props.className)} ref={ref}>
      <IconRoot {...props} size="md" name={props.icon}></IconRoot>
    </ButtonRoot>
  );
});

export default FabButton;
