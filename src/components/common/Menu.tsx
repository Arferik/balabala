import { useRouter } from "next/router";
import { forwardRef } from "react";
import tw, { styled } from "twin.macro";
import { Icon } from "../myd";

interface MenuProps {
  title: string;
  icon?: string;
  href: string;
  exact?: boolean;
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
  function CustomMenuItem({ title, icon, href, onClick, exact = false }, ref) {
    return (
      <ItemContainer exact={exact} href={href} onClick={onClick} ref={ref}>
        {icon ? <Icon name={icon} size="md" tw="mr-3"></Icon> : []}
        <div tw="label-large flex-1 text-on-secondary-container">{title}</div>
      </ItemContainer>
    );
  }
);
