import "twin.macro";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { api } from "~/utils";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const SVGLine = () => {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern id="a" width="91" height="8" patternUnits="userSpaceOnUse">
        <g clipPath="url(#clip0_2426_11367)">
          <path
            d="M114 4c-5.067 4.667-10.133 4.667-15.2 
          0S88.667-.667 83.6 4 73.467 8.667 68.4 
          4 58.267-.667 53.2 4 43.067 8.667 38 4 
          27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 
          0S-32.933-.667-38 4s-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0-10.133-4.667-15.2 0-10.133 4.667-15.2 
          0"
            stroke="var(--md-sys-color-on-surface-variant)"
            strokeLinecap="square"
          ></path>
        </g>
      </pattern>
      <rect width="100%" height="100%" fill="url(#a)"></rect>
    </svg>
  );
};

const Footer: React.FC = () => {
  const router = useRouter();
  const config = api.config.get.useQuery();
  const { data: session } = useSession();
  console.log("data", session);
  return (
    <footer
      tw="w-full bg-background
     box-border px-10 py-16  text-on-surface-variant md:(h-96 flex flex-col)"
    >
      <SVGLine />
      <div tw="flex flex-col  box-border pt-10 md:(flex-row space-x-4 flex-1)">
        <div tw="flex-1">
          <div>LOGO</div>
          {config.data && (
            <div tw="body-medium">{config.data?.blog_introduce}</div>
          )}
        </div>
        {config.data && Array.isArray(config.data?.socials) && (
          <div tw="w-full md:(w-full flex-1 block)">
            <div tw="body-small my-4">链接</div>
            <div tw="md:flex-1 space-x-2 flex flex-wrap md:(block space-y-2 space-x-0)">
              {config.data &&
                Array.isArray(config.data?.socials) &&
                config.data.socials.map((social) => {
                  return (
                    <Link
                      passHref
                      legacyBehavior
                      href={social.url || "#"}
                      key={social.id}
                    >
                      <div tw="cursor-pointer">
                        <span tw="title-small md:title-medium text-primary cursor-pointer">
                          {social.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <div tw="title-medium flex w-full items-center">
        <span>&copy; {new Date().getFullYear()} tansincosy</span>
        {session ? (
          <Button type="text" onClick={() => signOut()}>
            {session.user.name} 注销
          </Button>
        ) : (
          <Button type="text" onClick={() => router.push("/auth/sign_in")}>
            登录
          </Button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
