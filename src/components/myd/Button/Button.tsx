import React from "react";
import tw, { styled, css } from "twin.macro";
import { type ButtonUnstyledProps, useButton } from "@mui/base";
import clsx from "clsx";
import { BaseButton } from "../ButtonBase/ButtonBase";
import { useThemeContext } from "../utils/themeProvider";
import { hexToRgba } from "~/utils";

export type ButtonVariant =
  | "elevated"
  | "filled"
  | "outlined"
  | "text"
  | "tonal";
export interface ButtonProps {
  variant?: ButtonVariant;
}
const ButtonRoot = styled(BaseButton)<ButtonProps>(
  ({ variant = "elevated", disabled }) => {
    const themePalettes = useThemeContext();
    return [
      variant === "elevated" &&
        tw`!bg-surface-container-low shadow-md text-primary label-large 
        hover:after:(w-[200%] h-[200%] bg-primary opacity-[.08] absolute top-[-50%] left-[-50%])
        hover:(shadow-lg)
        active:after:(w-[200%] h-[200%] bg-primary opacity-[.12] absolute top-[-50%] left-[-50%])
        `,
      variant === "filled" &&
        tw`!bg-primary text-on-primary label-large
        hover:after:(w-[200%] h-[200%] bg-on-primary opacity-[.08] absolute top-[-50%] left-[-50%])
        hover:shadow-md
        active:after:(w-[200%] h-[200%] bg-on-primary opacity-[.12] absolute top-[-50%] left-[-50%])
      `,
      variant === "outlined" &&
        tw`!bg-transparent border border-outline text-primary label-large
        hover:after:(w-[200%] h-[200%] bg-primary opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-primary opacity-[.12] absolute top-[-50%] left-[-50%])
        `,
      variant === "text" &&
        tw`!bg-transparent text-primary label-large
        hover:after:(w-[200%] h-[200%] bg-primary opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-primary opacity-[.12] absolute top-[-50%] left-[-50%])
      `,
      variant === "tonal" &&
        tw`!bg-secondary-container text-on-secondary-container label-large 
        hover:after:(w-[200%] h-[200%] bg-on-secondary-container opacity-[.08] absolute top-[-50%] left-[-50%])
        hover:shadow-md
        active:after:(w-[200%] h-[200%] bg-on-secondary-container opacity-[.12] absolute top-[-50%] left-[-50%])
        `,
      disabled && tw`!shadow-none !cursor-not-allowed hover:!(shadow-none)`,
      css`
        &:disabled {
          background-color: ${hexToRgba(
            themePalettes["--md-sys-color-on-surface"],
            0.12
          )} !important;
          color: ${hexToRgba(
            themePalettes["--md-sys-color-on-surface"],
            0.38
          )} !important;
        }
      `,
      disabled && variant === "filled" && tw``,
      disabled && variant === "outlined" && tw``,
      disabled && variant === "text" && tw``,
      disabled && variant === "tonal" && tw``,
    ];
  }
);

/**
 * @see https://mui.com/components/buttons/#customized-buttons
 */
const Button = React.forwardRef(function CustomButton(
  props: ButtonUnstyledProps & ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };
  return (
    <ButtonRoot {...props} {...getRootProps()} className={clsx(classes)}>
      {children}
    </ButtonRoot>
  );
});

export default Button;
