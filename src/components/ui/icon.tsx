import React from "react";

type IconProps = {
  name: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const Icon: React.FC<IconProps> = ({ name, className, onClick }) => {
  return (
    <i
      className={
        className
          ? ` ${className} material-symbols-outlined`
          : `material-symbols-outlined`
      }
      onClick={onClick}
      aria-hidden="true"
    >
      {name}
    </i>
  );
};

Icon.defaultProps = {
  className: "",
};
