import React, { useRef, type ButtonHTMLAttributes } from "react";
import tw, { styled } from "twin.macro";
import clsx from "clsx";
import { BaseButton } from "../ButtonBase/ButtonBase";
import Icon from "../Icon/Icon";
import TouchRipple from "../Ripple/TouchRipple";
import useEventCallback from "~/hooks/useEventCallback";

export type FabButtonColor = "primary" | "surface" | "secondary" | "tertiary";
export interface FabButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: FabButtonColor;
  size?: "sm" | "md" | "lg" | number;
  icon: string;
  elevation?: "default" | "lowered";
}

interface IconRootProps {
  color?: FabButtonColor;
  size?: "sm" | "md" | "lg" | number;
}

const IconRoot = styled(Icon)<IconRootProps>(({ color = "primary", size }) => [
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
        hover:after:(w-[200%] h-[200%] opacity-[.08] bg-on-primary-container absolute top-[-50%] left-[-50%])
        active:after:(w-[200%] h-[200%]  opacity-[.12] bg-on-primary-container absolute top-[-50%] left-[-50%])
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

  const handleMouseDown = useRippleHandler("start", undefined, props.disabled);
  const handleContextMenu = useRippleHandler("stop", undefined, props.disabled);
  const handleDragLeave = useRippleHandler("stop", undefined, props.disabled);
  const handleMouseUp = useRippleHandler("stop", undefined, props.disabled);
  const handleMouseLeave = useRippleHandler("stop", undefined, props.disabled);
  const handleTouchStart = useRippleHandler("start", undefined, props.disabled);
  const handleTouchEnd = useRippleHandler("stop", undefined, props.disabled);
  const handleTouchMove = useRippleHandler("stop", undefined, props.disabled);
  return (
    <ButtonRoot
      {...props}
      className={clsx(props.className)}
      ref={ref}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      onDragLeave={handleDragLeave}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <IconRoot
        size={props.size === "lg" ? 36 : "md"}
        name={props.icon}
      ></IconRoot>
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
    </ButtonRoot>
  );
});

export default FabButton;
