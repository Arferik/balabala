import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Icon } from "../index";
import "twin.macro";
import Drawer from "rc-drawer";

const themeColors = () => {
  return [
    "primary",
    "on-primary",
    "primary-container",
    "on-primary-container",
    "error",
    "on-error",
    "error-container",
    "on-error-container",
    "secondary",
    "on-secondary",
    "secondary-container",
    "on-secondary-container",
    "surface",
    "on-surface",
    "surface-variant",
    "on-surface-variant",
    "tertiary",
    "on-tertiary",
    "tertiary-container",
    "on-tertiary-container",
    "background",
    "on-background",
    "outline",
    "shadow",
    "inverse-on-surface",
    "inverse-primary",
    "inverse-surface",
  ].reduce((total, item) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    total[`${item}`] = `var(--md-sys-color-${item})`;
    return total;
  }, {});
};

export interface TopAppBarProps {
  appTitle?: string;
  category?: any;
}

export const TopAppBar = ({ appTitle = "", category = {} }: TopAppBarProps) => {
  const [isShowSideBar, setShowSideBar] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [activeClass, setActiveClass] = useState("active");
  const { asPath, isReady, push, query } = useRouter();

  const mainNavs = useMemo(() => {
    const staticMenu = [
      {
        title: "主页",
        path: "/",
      },
      {
        title: "所有标签",
        path: "/tags",
      },
      {
        title: "关于",
        path: "/about",
      },
    ];
    return staticMenu.map((cate) => (
      <Link href={`${cate.path}`} key={cate.title}>
        <Button
          className="title-medium text-on-surface-variant"
          type={
            cate.path === "/" && activeClass === cate.path
              ? "filled"
              : cate.path + "/" === activeClass
              ? "filled"
              : "text"
          }
        >
          {cate.title}
        </Button>
      </Link>
    ));
  }, [activeClass, category]);

  useEffect(() => {
    if (isReady) {
      const activePathname = new URL(asPath, location.href).pathname;
      setActiveClass(decodeURI(activePathname));
    }
  }, [asPath, isReady]);

  const onClickHandle = () => {
    if (query.source) {
      onRequestClose();
    } else {
      setShowSideBar(true);
    }
  };

  const onRequestClose = () => {
    // push(`genre/${query.genreId}`);
  };

  const targetHomePage = () => {
    push("/");
  };

  const openSearchDialog = () => {
    setSearchVisible(true);
  };

  const [debugSide, setDebugSide] = useState<boolean>(false);

  return (
    <div tw="flex fixed h-16  top-0 left-0 w-full box-border px-4 md:px-0 z-30 bg-surface backdrop-filter backdrop-blur backdrop-saturate-50">
      <div tw="container mx-auto flex h-full items-center justify-between">
        <Icon
          onClick={onClickHandle}
          name={query.source ? "arrow-left-s" : "menu"}
          tw="h-12 w-12 cursor-pointer text-[1.5rem] leading-[3rem] text-on-surface md:hidden"
        ></Icon>
        <div
          tw="title-large ml-6 mr-6 w-full cursor-pointer text-center text-on-surface md:w-auto"
          onClick={targetHomePage}
        >
          {appTitle || "Blog"}
        </div>
        <div tw="title-medium hidden w-full text-on-surface md:block">
          <div tw="mr-8 flex justify-end space-x-2">{mainNavs}</div>
        </div>
        <Icon
          onClick={openSearchDialog}
          name="search"
          tw="h-12 w-12 cursor-pointer text-[1.5rem] leading-[3rem] text-on-surface"
        ></Icon>
        <Icon
          onClick={() => {
            setDebugSide(true);
          }}
          name="pest_control"
          tw="h-12 w-12 cursor-pointer text-[1.5rem] leading-[3rem] text-on-surface"
        ></Icon>
      </div>
      <Drawer
        open={debugSide}
        onClose={() => {
          setDebugSide(false);
        }}
        autoFocus={true}
        prefixCls="drawer"
      >
        <div tw="title-small box-border py-4 space-y-3 leading-[3.5rem] text-on-surface-variant flex flex-col items-center">
          <Card tw="w-full">
            <div tw="display-small">colors</div>
            {Object.keys(themeColors()).map((item) => {
              const obj = themeColors() as Record<string, string>;
              return (
                <div
                  tw="text-center"
                  key={item}
                  style={{
                    backgroundColor: obj[item],
                  }}
                >
                  {item}
                </div>
              );
            })}
          </Card>
        </div>
      </Drawer>
    </div>
  );
};
