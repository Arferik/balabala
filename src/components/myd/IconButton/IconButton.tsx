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
}

const ButtonRoot = styled(BaseButton)<ButtonProps>(
  ({ variant = "standard", size = "md", disabled }) => {
    const themePalettes = useThemeContext();
    return [
      tw`flex`,
      size === "sm" && tw`h-[1.5rem] w-[1.15rem]`,
      size === "md" && tw`h-[2.5rem] w-[2.5rem]`,
      size === "lg" && tw`h-[3rem] w-[3rem]`,
      variant === "standard" &&
        tw`!bg-transparent 
        hover:after:(w-[200%] h-[200%] bg-primary opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-primary opacity-[.12] absolute top-[-50%] left-[-50%])`,
      variant === "standard" && [
        tw`text-on-surface-variant`,
        css`
          &:hover .material-symbols-rounded {
            color: var(--md-sys-color-primary);
          }
        `,
      ],
      disabled &&
        variant === "standard" &&
        css`
          &:disabled {
            cursor: not-allowed;
            .material-symbols-rounded {
              color: ${paletteAlpha(themePalettes, "on-surface", 0.38)};
            }
            :hover:after {
              background: transparent !important;
            }
          }
        `,
      variant === "outlined" &&
        tw`border-outline border
        hover:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.12] absolute top-[-50%] left-[-50%])`,
      variant === "outlined" &&
        css`
          .material-symbols-rounded {
            color: var(--md-sys-color-on-surface-variant);
          }
          &:hover .material-symbols-rounded {
            color: var(--md-sys-color-on-inverse-surface);
          }
        `,
      disabled &&
        variant === "outlined" &&
        css`
          &:disabled {
            cursor: not-allowed;
            background-color: ${paletteAlpha(
              themePalettes,
              "on-surface",
              0.12
            )};
            .material-symbols-rounded {
              color: ${paletteAlpha(themePalettes, "on-surface", 0.38)};
            }
            :hover:after {
              background: transparent !important;
            }
          }
        `,

      variant === "tonal" &&
        tw`bg-secondary-container 
        hover:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-on-surface-variant opacity-[.12] absolute top-[-50%] left-[-50%])`,
      variant === "tonal" &&
        css`
          .material-symbols-rounded {
            color: var(--md-sys-color-on-secondary-container);
          }
          &:hover .material-symbols-rounded {
            color: var(--md-sys-color-on-secondary-container);
          }
        `,
      disabled &&
        variant === "tonal" &&
        css`
          &:disabled {
            cursor: not-allowed;
            background-color: ${paletteAlpha(
              themePalettes,
              "on-surface",
              0.12
            )};
            .material-symbols-rounded {
              color: ${paletteAlpha(themePalettes, "on-surface", 0.38)};
            }
            :hover:after {
              background: transparent !important;
            }
          }
        `,
    ];
  }
);

const IconButton = React.forwardRef(function MdIconButton(
  props: React.ComponentProps<"button"> & ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonRoot {...props} className={clsx(props.className)} ref={ref}>
      <Icon
        name={props.icon}
        tw="text-on-surface-variant hover:text-primary"
      ></Icon>
    </ButtonRoot>
  );
});

export default IconButton;
