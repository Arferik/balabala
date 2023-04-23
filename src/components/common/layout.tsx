import React, { type ReactNode } from "react";
import BackToTopBtn from "./back_to_top";
import { TopAppBar } from "./top_app_bar";
import "twin.macro";
import Footer from "./footer";
import { Snackbar } from "..";
import { useMediaQuery } from "~/hooks";
import { api } from "~/utils";

export interface LayoutProps {
  children: ReactNode;
  hiddenTopFooter?: boolean;
}

export const Layout = ({ children, hiddenTopFooter }: LayoutProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const config = api.config.get.useQuery();
  return (
    <div tw="relative flex flex-col h-screen">
      {!hiddenTopFooter && (
        <TopAppBar appTitle={config.data?.blog_title}></TopAppBar>
      )}
      <section tw="bg-background flex-1 pb-20 box-border">{children}</section>
      {!hiddenTopFooter && isDesktop && <Footer />}
      <BackToTopBtn />
      <Snackbar />
    </div>
  );
};
