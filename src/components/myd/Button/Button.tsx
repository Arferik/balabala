import React, { type ButtonHTMLAttributes } from "react";
import tw, { styled, css } from "twin.macro";
import clsx from "clsx";
import { BaseButton } from "../ButtonBase/ButtonBase";
import { useThemeContext } from "../utils/themeProvider";
import { paletteAlpha } from "../utils/materialYouColorToken";

export type ButtonVariant =
  | "elevated"
  | "filled"
  | "outlined"
  | "text"
  | "tonal";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
const ButtonRoot = styled(BaseButton)<ButtonProps>(
  ({ variant = "elevated", disabled }) => {
    const themePalettes = useThemeContext();
    return [
      tw`h-10 px-6`,
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
      disabled &&
        (variant === "elevated" ||
          variant === "filled" ||
          variant === "tonal") &&
        css`
          &:disabled {
            background-color: ${paletteAlpha(
              themePalettes.onSurface,
              0.12
            )} !important;
            color: ${paletteAlpha(themePalettes.onSurface, 0.38)} !important;
            &:hover:after {
              background-color: ${paletteAlpha(
                themePalettes.onSurface,
                0.12
              )} !important;
            }
          }
        `,
      disabled &&
        variant === "text" &&
        css`
          &:disabled {
            color: ${paletteAlpha(themePalettes.onSurface, 0.38)} !important;
            &:hover:after {
              background-color: transparent !important;
            }
          }
        `,
      disabled &&
        variant === "outlined" &&
        css`
          &:disabled {
            border-color: ${paletteAlpha(
              themePalettes.outline,
              0.38
            )} !important;
            background-color: ${paletteAlpha(
              themePalettes.onSurface,
              0.12
            )} !important;
            color: ${paletteAlpha(themePalettes.onSurface, 0.38)} !important;
            &:hover:after {
              background-color: ${paletteAlpha(
                themePalettes.onSurface,
                0.12
              )} !important;
            }
          }
        `,
    ];
  }
);

/**
 * @see https://mui.com/components/buttons/#customized-buttons
 */
const Button = React.forwardRef(function MdButton(
  props: React.ComponentProps<"button"> & ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children } = props;

  return (
    <ButtonRoot {...props} className={clsx(props.className)} ref={ref}>
      {children}
    </ButtonRoot>
  );
});

export default Button;
