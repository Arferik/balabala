import Link from "next/link";
import { useRouter } from "next/router";
import Drawer from "rc-drawer";
import "twin.macro";
import React, { forwardRef } from "react";
import { Icon } from "../ui/icon";
import tw, { styled } from "twin.macro";
import Footer from "./footer";

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

interface MenuProps {
  title: string;
  icon: string;
  href: string;
  exact?: boolean;
  top: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const ItemContainer = styled.a<{ exact: boolean }>(({ exact, href }) => {
  const { asPath } = useRouter();
  const isActive = exact ? asPath === href : asPath.startsWith(href || "");
  return [
    isActive ? tw`bg-secondary-container` : "",
    tw`relative box-border flex h-14 w-full cursor-pointer items-center overflow-hidden rounded-[1.75rem] pl-4 pr-6`,
    tw`hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:after:h-[200%] hover:after:w-[200%] hover:after:bg-on-surface hover:after:opacity-[.16]
        active:after:absolute active:after:top-[-50%] active:after:left-[-50%] active:after:h-[200%] active:after:w-[200%] active:after:bg-on-surface active:after:opacity-[.24]`,
  ];
});

export const MenuItem = forwardRef<HTMLAnchorElement, MenuProps>(
  ({ title, icon, href, onClick, exact = false }, ref) => {
    return (
      <ItemContainer exact={exact} href={href} onClick={onClick} ref={ref}>
        <Icon
          name={icon}
          size="md"
          tw="mr-3 fill-on-surface"
          type="line"
        ></Icon>
        <div tw="label-large flex-1 text-on-secondary-container">{title}</div>
      </ItemContainer>
    );
  }
);
MenuItem.displayName = "MenuItem";
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
