import * as React from "react";
import clsx from "clsx";

export type RipplePropTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: Record<string, any>;
  className?: string;
  /**
   * @ignore - injected from TransitionGroup
   */
  in?: boolean;
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited?: () => void;
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate?: boolean;
  /**
   * Diameter of the ripple.
   */
  rippleSize?: number;
  /**
   * Horizontal position of the ripple center.
   */
  rippleX?: number;
  /**
   * Vertical position of the ripple center.
   */
  rippleY?: number;
  /**
   * exit delay
   */
  timeout: number;
};

/**
 * @ignore - internal component.
 * from @mui/material/ButtonBase/TouchRipple
 */
function Ripple(props: RipplePropTypes) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX = 0,
    rippleY = 0,
    rippleSize = 0,
    in: inProp,
    onExited,
    timeout,
  } = props;
  const [leaving, setLeaving] = React.useState(false);

  const rippleClassName = clsx(
    className,
    classes.ripple,
    classes.rippleVisible,
    {
      [classes.ripplePulsate]: pulsate,
    }
  );

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = clsx(classes.child, {
    [classes.childLeaving]: leaving,
    [classes.childPulsate]: pulsate,
  });

  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [onExited, inProp, timeout]);

  return (
    <span className={rippleClassName} style={rippleStyles}>
      <span className={childClassName} />
    </span>
  );
}

export default Ripple;
