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
import { useMediaQuery } from "~/hooks";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(themeColor || "#066bf8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(theme, { target: document.body, dark: systemDark });
  }, [themeColor]);
  return (
    <div tw="relative  flex flex-col h-screen">
      {!hiddenTopFooter && <TopAppBar></TopAppBar>}
      <section tw="bg-background flex-1 pb-20 box-border">{children}</section>
      {!hiddenTopFooter && isDesktop && <Footer />}
      <BackToTopBtn />
      <Snackbar />
    </div>
  );
};
