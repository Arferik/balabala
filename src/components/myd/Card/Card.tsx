import tw, { css, styled } from "twin.macro";
import { useThemeContext } from "../utils/themeProvider";
import { paletteAlpha } from "../utils/materialYouColorToken";
type CardType = "elevated" | "filled" | "outlined";
interface CardProps {
  type?: CardType;
  disabled?: boolean;
}

const Card = styled.div<CardProps>(({ type = "elevated", disabled }) => {
  const themePalettes = useThemeContext();
  return [
    tw`overflow-hidden relative box-border rounded-xl`,
    type === "elevated" && [
      !disabled
        ? tw`bg-surface-container-low shadow 
            hover:after:(w-[200%] h-[200%] bg-on-surface opacity-[.08] absolute top-[-50%] left-[-50%])
            hover:shadow-md
            active:after:(w-[200%] h-[200%] bg-on-surface opacity-[.12] absolute top-[-50%] left-[-50%])
            active:shadow-md`
        : css`
            & {
              background-color: ${paletteAlpha(
                themePalettes.surfaceVariant,
                0.38
              )}!important;
            }
          `,
      ,
    ],
    type === "filled" && [
      !disabled
        ? tw`bg-surface-container-highest hover:shadow
        hover:after:(w-[200%] h-[200%] bg-on-surface  opacity-[.08] absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%] bg-on-surface  opacity-[.12] absolute top-[-50%] left-[-50%])`
        : css`
            & {
              background-color: ${paletteAlpha(
                themePalettes.surface,
                0.38
              )}!important;
            }
          `,
    ],
    type === "outlined" && [
      !disabled
        ? tw`bg-surface border border-solid border-outline
            hover:after:(w-[200%] h-[200%] bg-on-surface opacity-[.08] absolute top-[-50%] left-[-50%])
          active:after:(w-[200%] h-[200%] bg-on-surface opacity-[.12] absolute top-[-50%] left-[-50%])`
        : css`
            & {
              border: 1px solid ${paletteAlpha(themePalettes.outline, 0.12)};
            }
          `,
    ],
  ];
});

export default Card;
