import Link from "next/link";
import { useRouter } from "next/router";
import Drawer from "rc-drawer";
import "twin.macro";
import React, { forwardRef } from "react";
import tw, { styled } from "twin.macro";
import Footer from "./footer";
import { Icon } from "../myd";
import { MenuItem } from "./Menu";

interface Menu {
  title: string;
  path: string;
  icon: string;
}

interface SideMenuProps {
  isVisible: boolean;
  appTitle?: string;
  onClose: () => void;
  menus: Menu[];
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isVisible,
  onClose,
  appTitle,
  menus,
}) => {
  return (
    <Drawer
      open={isVisible}
      onClose={onClose}
      width="22.5rem"
      prefixCls="drawer"
      placement="left"
    >
      <div tw="text-on-surface-variant title-small box-border px-4 h-14 leading-[3.5rem]">
        {appTitle || "Blog"}
      </div>
      {menus
        .map((menu) => {
          return {
            title: menu.title,
            icon: menu.icon,
            href: menu.path,
            exact: true,
            top: true,
            badge: 0,
          };
        })
        .map((item) => {
          return (
            <Link key={item.title} legacyBehavior href={item.href}>
              <MenuItem {...item}></MenuItem>
            </Link>
          );
        })}
      <Footer />
    </Drawer>
  );
};
