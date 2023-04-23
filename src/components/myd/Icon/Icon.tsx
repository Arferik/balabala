import React from "react";
import "twin.macro";
import { unit } from "../utils/materialCommon";
import clsx from "clsx";

type IconProps = {
  name: string;
  className?: string;
  size?: "sm" | "md" | "xl" | "lg";
};

export const Icon: React.FC<IconProps> = ({ name, className, size = "md" }) => {
  const sizeWH = React.useMemo(() => {
    switch (size) {
      case "sm":
        return unit(20);
      case "md":
        return unit(24);
      case "lg":
        return unit(40);
      case "xl":
        return unit(48);
    }
  }, [size]);
  return (
    <i
      className={clsx(className, "material-symbols-rounded")}
      aria-hidden="true"
      style={{
        fontSize: sizeWH,
      }}
    >
      {name}
    </i>
  );
};

Icon.defaultProps = {
  className: "",
};
