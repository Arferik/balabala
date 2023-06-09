import * as React from "react";
import { TransitionGroup } from "react-transition-group";
import clsx from "clsx";
import Ripple, { type RipplePropTypes } from "./Ripple";
import tw, { css, styled } from "twin.macro";
import { keyframes } from "styled-components";

const DURATION = 550;
export const DELAY_RIPPLE = 80;

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;

const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;

export const TouchRippleRoot = tw.span`overflow-hidden pointer-events-none absolute z-0 top-0 right-0 bottom-0 left-0 rounded-[inherit]`;

export const TouchRippleRipple = styled(Ripple)<RipplePropTypes>(() => {
  return [
    tw`opacity-0 absolute `,
    css`
      &.rippleVisible {
        opacity: 0.3;
        transform: scale(1);
        animation-name: ${enterKeyframe};
        animation-duration: ${DURATION}ms;
        animation-timing-function: ease-in-out;
      }

      &.ripplePulsate {
        animation-duration: ${DURATION}ms;
      }

      & .child {
        opacity: 1;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: currentColor;
      }

      & .childLeaving {
        opacity: 0;
        animation-name: ${exitKeyframe};
        animation-duration: ${DURATION}ms;
        animation-timing-function: ease-in-out;
      }

      & .childPulsate {
        position: absolute;
        /* @noflip */
        left: 0px;
        top: 0;
        animation-name: ${pulsateKeyframe};
        animation-duration: 2500ms;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-delay: 200ms;
      }
    `,
  ];
});

/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */
const TouchRipple = React.forwardRef(function TouchRipple(
  inProps: TouchRipplePropTypes,
  ref
) {
  const props = inProps;

  const {
    center: centerProp = false,
    classes = {},
    className,
    ...other
  } = props;
  const [ripples, setRipples] = React.useState<any[]>([]);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef<() => void>();

  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = void 0;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = React.useRef<NodeJS.Timeout>();

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = React.useRef<() => void>();
  const container = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);

  const startCommit = React.useCallback<
    (params: {
      pulsate: boolean;
      rippleX: number;
      rippleY: number;
      rippleSize: number;
      cb?: () => void;
    }) => void
  >(
    (params) => {
      const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
      setRipples((oldRipples) => [
        ...oldRipples,
        <TouchRippleRipple
          key={nextKey.current}
          classes={{
            ripple: clsx(classes.ripple),
            rippleVisible: clsx(classes.rippleVisible),
            ripplePulsate: clsx(classes.ripplePulsate),
            child: clsx(classes.child),
            childLeaving: clsx(classes.childLeaving),
            childPulsate: clsx(classes.childPulsate),
          }}
          timeout={DURATION}
          pulsate={pulsate}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]);
      nextKey.current += 1;
      rippleCallback.current = cb;
    },
    [classes]
  );

  const start = React.useCallback<
    (
      event: React.MouseEvent<HTMLElement> & {
        touches: React.MouseEvent<HTMLElement>[];
      } & any,
      options: any,
      callback?: () => void
    ) => void
  >(
    (event, options = {}, cb) => {
      const {
        pulsate = false,
        center = centerProp || options.pulsate,
        fakeElement = false, // For test purposes
      } = options;

      if (event?.type === "mousedown" && ignoringMouseDown.current) {
        ignoringMouseDown.current = false;
        return;
      }

      if (event?.type === "touchstart") {
        ignoringMouseDown.current = true;
      }

      const element = fakeElement ? null : (container.current as HTMLElement);
      const rect = element
        ? element.getBoundingClientRect()
        : {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          };

      // Get the size of the ripple
      let rippleX = 0;
      let rippleY = 0;
      let rippleSize = 0;

      if (
        center ||
        !event ||
        (event?.clientX === 0 && event.clientY === 0) ||
        (!event.clientX && !event.touches)
      ) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        const { clientX = 0, clientY = 0 } =
          Array.isArray(event.touches) && event.touches.length > 0
            ? event.touches[0] || {}
            : event;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }

      if (center) {
        rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

        // For some reason the animation is broken on Mobile Chrome if the size is even.
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        const sizeX =
          Math.max(
            Math.abs((element ? element.clientWidth : 0) - rippleX),
            rippleX
          ) *
            2 +
          2;
        const sizeY =
          Math.max(
            Math.abs((element ? element.clientHeight : 0) - rippleY),
            rippleY
          ) *
            2 +
          2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
      }

      // Touche devices
      if (event?.touches) {
        // check that this isn't another touchstart due to multitouch
        // otherwise we will only clear a single timer when unmounting while two
        // are running
        if (startTimerCommit.current === null) {
          // Prepare the ripple effect.
          startTimerCommit.current = () => {
            startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
          };
          // Delay the execution of the ripple effect.
          startTimer.current = setTimeout(() => {
            if (startTimerCommit.current) {
              startTimerCommit.current();
              startTimerCommit.current = void 0;
            }
          }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
        }
      } else {
        startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
      }
    },
    [centerProp, startCommit]
  );

  const pulsate = React.useCallback(() => {
    start({}, { pulsate: true });
  }, [start]);

  const stop = React.useCallback<(event: Event, callback: () => void) => void>(
    (event, cb) => {
      clearTimeout(startTimer.current);

      // The touch interaction occurs too quickly.
      // We still want to show ripple effect.
      if (event?.type === "touchend" && startTimerCommit.current) {
        startTimerCommit.current();
        startTimerCommit.current = void 0;
        startTimer.current = setTimeout(() => {
          stop(event, cb);
        });
        return;
      }

      startTimerCommit.current = void 0;

      setRipples((oldRipples) => {
        if (oldRipples.length > 0) {
          return oldRipples.slice(1);
        }
        return oldRipples;
      });
      rippleCallback.current = cb;
    },
    []
  );

  React.useImperativeHandle(
    ref,
    () => ({
      pulsate,
      start,
      stop,
    }),
    [pulsate, start, stop]
  );

  return (
    <TouchRippleRoot
      className={clsx(classes.root, className)}
      ref={container}
      {...other}
    >
      <TransitionGroup component={null} exit>
        {ripples}
      </TransitionGroup>
    </TouchRippleRoot>
  );
});

type TouchRipplePropTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center?: boolean;
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: Record<string, any>;
  /**
   * @ignore
   */
  className?: string;
};

export default TouchRipple;
