import tw, { css, styled } from "twin.macro";
import Icon from "../Icon/Icon";
import { unit } from "../utils/materialCommon";
import { useThemeContext } from "../utils/themeProvider";
import { paletteAlpha } from "../utils/materialYouColorToken";
import useEventCallback from "~/hooks/useEventCallback";
import { useRef } from "react";
import TouchRipple from "../Ripple/TouchRipple";

export type ChipType = "assist" | "filter" | "input" | "suggestion";

interface ChipProps {
  variant?: ChipType;
  icon?: string;
  text?: string;
  elevated?: boolean;
  disabled?: boolean;
}

const ChipBase = tw.button`h-8 rounded-lg flex items-center relative overflow-hidden`;

const ChipRoot = styled(ChipBase)<ChipProps>(({ disabled, icon, elevated }) => {
  const themePalettes = useThemeContext();
  return [
    [icon ? tw`pl-2 pr-4` : tw`px-4`],
    [
      disabled
        ? css`
            &:disabled {
              border: ${paletteAlpha(themePalettes.onSurface, 0.12)} solid
                ${unit(1)};
              color: ${paletteAlpha(themePalettes.onSurface, 0.38)} !important;
            }
          `
        : [
            elevated
              ? tw`bg-surface-container-low shadow`
              : tw`border border-outline`,
            tw`hover:after:(w-[200%] h-[200%] bg-on-surface opacity-[.08] absolute top-[-50%] left-[-50%])
              hover:(shadow-lg)
              active:after:(w-[200%] h-[200%] bg-on-surface opacity-[.12] absolute top-[-50%] left-[-50%])`,
          ],
    ],
  ];
});

const IconRoot = styled(Icon)<{ disabled?: boolean }>(({ disabled }) => {
  return [tw`mr-2`, [!disabled && tw`text-primary`]];
});

const ChipTextRoot = styled.span<ChipProps>(({ disabled }) => {
  const themePalettes = useThemeContext();
  return [
    [
      !disabled
        ? tw`text-on-surface label-large`
        : css`
            &:disabled {
              color: ${paletteAlpha(themePalettes.onSurface, 0.38)} !important;
            }
          `,
    ],
  ];
});

export const Chip: React.FC<ChipProps> = ({
  variant = "assist",
  text = "",
  icon = "",
  elevated = false,
  disabled,
}) => {
  const handleMouseDown = useRippleHandler("start", undefined, disabled);
  const handleContextMenu = useRippleHandler("stop", undefined, disabled);
  const handleDragLeave = useRippleHandler("stop", undefined, disabled);
  const handleMouseUp = useRippleHandler("stop", undefined, disabled);
  const handleMouseLeave = useRippleHandler("stop", undefined, disabled);
  const handleTouchStart = useRippleHandler("start", undefined, disabled);
  const handleTouchEnd = useRippleHandler("stop", undefined, disabled);
  const handleTouchMove = useRippleHandler("stop", undefined, disabled);
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

  return (
    <ChipRoot
      variant={variant}
      disabled={disabled}
      icon={icon}
      elevated={elevated}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      onDragLeave={handleDragLeave}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {icon && <IconRoot size={18} name={icon} disabled={disabled}></IconRoot>}
      <ChipTextRoot disabled={disabled}>{text}</ChipTextRoot>
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
    </ChipRoot>
  );
};
