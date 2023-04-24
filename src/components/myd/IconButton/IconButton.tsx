import React, { type ButtonHTMLAttributes } from "react";
import tw, { css, styled } from "twin.macro";
import clsx from "clsx";
import { BaseButton } from "../ButtonBase/ButtonBase";
import { Icon } from "../Icon/Icon";
import { useThemeContext } from "../utils/themeProvider";
import { paletteAlpha } from "../utils/materialYouColorToken";

export type ButtonVariant = "filled" | "outlined" | "standard" | "tonal";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon: string;
  unSelected?: boolean;
}
const IconRoot = styled(Icon)<ButtonProps>(
  ({ variant = "standard", unSelected, disabled }) => {
    const themePalettes = useThemeContext();
    return [
      variant === "filled" && [
        disabled
          ? css`
              & {
                color: ${paletteAlpha(
                  themePalettes.onSurface,
                  0.38
                )} !important;
              }
            `
          : [unSelected ? tw`text-primary` : tw`text-on-primary`],
      ],
      variant === "tonal" && [
        disabled
          ? css`
              & {
                color: ${paletteAlpha(
                  themePalettes.onSurface,
                  0.38
                )} !important;
              }
            `
          : [
              unSelected
                ? tw`text-on-surface-variant`
                : tw`text-on-secondary-container`,
            ],
      ],
      variant === "standard" && [
        disabled
          ? css`
              & {
                color: ${paletteAlpha(
                  themePalettes.onSurface,
                  0.38
                )} !important;
              }
            `
          : [unSelected ? tw`text-on-surface-variant` : tw`text-primary`],
      ],
      variant === "outlined" && [
        disabled
          ? css`
              & {
                color: ${paletteAlpha(
                  themePalettes.onSurface,
                  0.38
                )} !important;
              }
            `
          : [
              unSelected
                ? tw`text-on-surface-variant`
                : tw`text-inverse-on-surface`,
            ],
      ],
    ];
  }
);
const ButtonRoot = styled(BaseButton)<ButtonProps>(
  ({ variant = "standard", size = "md", disabled, unSelected }) => {
    const themePalettes = useThemeContext();
    return [
      tw`flex`,
      size === "sm" && tw`h-[1.5rem]`,
      size === "md" && tw`h-[2.5rem] w-[2.5rem]`,
      size === "lg" && tw`h-[3rem] w-[3rem]`,
      variant === "filled" && [
        !disabled && [
          unSelected
            ? tw`bg-surface-container-highest
          hover:after:(w-[200%] h-[200%] bg-primary opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-primary opacity-[.12] absolute top-[-50%] left-[-50%])
          `
            : tw`bg-primary
          hover:after:(w-[200%] h-[200%] bg-on-primary opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-on-primary opacity-[.12] absolute top-[-50%] left-[-50%])`,
        ],
        disabled &&
          css`
            &:disabled {
              background-color: ${paletteAlpha(
                themePalettes.onSurface,
                0.12
              )} !important;
            }
          `,
      ],

      variant === "tonal" && [
        !disabled && [
          unSelected
            ? tw`bg-surface-container-highest
          hover:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.12] absolute top-[-50%] left-[-50%])
          `
            : tw`bg-secondary-container
          hover:after:(w-[200%] h-[200%] bg-on-secondary-container opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-on-secondary-container opacity-[.12] absolute top-[-50%] left-[-50%])`,
        ],
        disabled &&
          css`
            &:disabled {
              background-color: ${paletteAlpha(
                themePalettes.onSurface,
                0.12
              )} !important;
            }
          `,
      ],

      variant === "outlined" && [
        !disabled && [
          unSelected
            ? tw`border-outline border
          hover:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.12] absolute top-[-50%] left-[-50%])
          `
            : tw`border-outline border bg-inverse-surface
          hover:after:(w-[200%] h-[200%] bg-inverse-on-surface opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%]  bg-inverse-on-surface opacity-[.12] absolute top-[-50%] left-[-50%])`,
        ],
        disabled &&
          css`
            &:disabled {
              background-color: ${paletteAlpha(
                themePalettes.onSurface,
                0.12
              )} !important;
            }
          `,
      ],
      variant === "standard" && [
        !disabled && [
          unSelected
            ? tw`!bg-transparent 
          hover:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.12] absolute top-[-50%] left-[-50%])
          `
            : tw`!bg-transparent 
          hover:after:(w-[200%] h-[200%] bg-primary opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-primary opacity-[.12] absolute top-[-50%] left-[-50%])`,
        ],
        disabled && tw`disabled:!bg-transparent`,
      ],
    ];
  }
);

const IconButton = React.forwardRef(function MdIconButton(
  props: React.ComponentProps<"button"> & ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonRoot {...props} className={clsx(props.className)} ref={ref}>
      <IconRoot {...props} size="md" name={props.icon}></IconRoot>
    </ButtonRoot>
  );
});

export default IconButton;
