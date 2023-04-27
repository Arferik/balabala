import tw, { css, styled } from "twin.macro";
import { useThemeContext } from "../utils/themeProvider";
import { paletteAlpha } from "../utils/materialYouColorToken";
import { useRef, type ReactNode } from "react";
import TouchRipple from "../Ripple/TouchRipple";
import useEventCallback from "~/hooks/useEventCallback";
type CardType = "elevated" | "filled" | "outlined";
interface CardProps {
  type?: CardType;
  children?: ReactNode;
  disabled?: boolean;
}

const CardRoot = styled.div<CardProps>(({ type = "elevated", disabled }) => {
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

const Card: React.FC<CardProps> = ({ children, disabled, ...props }) => {
  const rippleRef = useRef<any>(null);

  function useRippleHandler(
    rippleAction: "start" | "stop" | "pulsate",
    eventCallback?: (event: React.MouseEvent<HTMLDivElement>) => void,
    skipRippleAction = false
  ) {
    return useEventCallback((event) => {
      if (eventCallback) {
        eventCallback(event);
      }

      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
    });
  }

  const handleMouseDown = useRippleHandler("start", undefined, disabled);
  const handleContextMenu = useRippleHandler("stop", undefined, disabled);
  const handleDragLeave = useRippleHandler("stop", undefined, disabled);
  const handleMouseUp = useRippleHandler("stop", undefined, disabled);
  const handleMouseLeave = useRippleHandler("stop", undefined, disabled);
  const handleTouchStart = useRippleHandler("start", undefined, disabled);
  const handleTouchEnd = useRippleHandler("stop", undefined, disabled);
  const handleTouchMove = useRippleHandler("stop", undefined, disabled);

  return (
    <CardRoot
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      onDragLeave={handleDragLeave}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      disabled={disabled}
      {...props}
    >
      {children}
      <TouchRipple
        ref={rippleRef}
        classes={{
          rippleVisible: "rippleVisible",
          child: "child",
          childLeaving: "childLeaving",
          childPulsate: "childPulsate",
          ripplePulsate: "ripplePulsate",
        }}
      ></TouchRipple>
    </CardRoot>
  );
};
export default Card;
