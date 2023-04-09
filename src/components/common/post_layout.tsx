import { type ReactNode, type FC } from "react";

export interface LayoutPostProps {
  children: ReactNode;
}

export const PostLayout: FC<LayoutPostProps> = ({ children }) => {
  return <div>{children}</div>;
};
