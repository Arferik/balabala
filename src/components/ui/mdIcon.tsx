import React from "react";
import "twin.macro";

type IconProps = {
  name: string;
  className?: string;
  type?: "fill" | "line" | "default";
  size?: "sm" | "md" | "xl" | "lg";
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const MdIcon: React.FC<IconProps> = ({
  name,
  className,
  onClick,
  type = "fill",
  size = "md",
}) => {
  const IconLink = React.useMemo(() => {
    return type === "default"
      ? `/remixicon.symbol.svg#ri-${name}`
      : `/remixicon.symbol.svg#ri-${name}-${type}`;
  }, [name, type]);
  const sizeWH = React.useMemo(() => {
    switch (size) {
      case "sm":
        return "1.25rem";
      case "md":
        return "1.5rem";
      case "lg":
        return "2.5rem";
      case "xl":
        return "3rem";
    }
  }, [size]);
  return (
    <i
      className={className}
      tw="flex items-center justify-center"
      onClick={onClick}
      aria-hidden="true"
    >
      <svg
        style={{
          width: sizeWH,
          height: sizeWH,
        }}
      >
        <use xlinkHref={IconLink}></use>
      </svg>
    </i>
  );
};

MdIcon.defaultProps = {
  className: "",
};
