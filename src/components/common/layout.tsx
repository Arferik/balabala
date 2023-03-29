import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import React, { type ReactNode, useEffect } from "react";
import BackToTopBtn from "./back_to_top";
import { TopAppBar } from "./top_app_bar";
import "twin.macro";
import Footer from "./footer";
import { Snackbar } from "..";

export interface LayoutProps {
  children: ReactNode;
  themeColor?: string;
  //default: false
  hiddenTopFooter?: boolean;
}

export const Layout = ({
  children,
  themeColor,
  hiddenTopFooter,
}: LayoutProps) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(themeColor || "#066bf8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(theme, { target: document.body, dark: systemDark });
  }, [themeColor]);
  return (
    <div tw="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      {!hiddenTopFooter && <TopAppBar></TopAppBar>}
      <section tw="bg-background flex-1 pb-20 box-border">{children}</section>
      {!hiddenTopFooter && (
        <Footer
          footers={[
            {
              name: "关于",
              icon: "github",
              url: "dss",
            },
          ]}
        />
      )}
      <BackToTopBtn />
      <Snackbar />
    </div>
  );
};
