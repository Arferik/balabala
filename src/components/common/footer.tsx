import { Icon } from "../ui/icon";
import "twin.macro";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

type FootLink = {
  name: string;
  id?: string;
  url: string;
  icon: string;
};

const Footer: React.FC<{ footers: FootLink[] }> = ({ footers }) => {
  const router = useRouter();
  const clickHandle = (footerObj: FootLink) => {
    window.open(footerObj.url, "_blank");
  };
  return (
    <footer tw="w-full flex flex-col justify-between items-center bg-background text-on-surface-variant flex-none h-52">
      <div tw="flex space-x-8 flex-1 w-full text-center justify-center items-center border-b border-surface">
        <Button
          type="text"
          onClick={() => {
            router.push("/auth/sign_in");
          }}
        >
          showLogin
        </Button>
        {Array.isArray(footers) &&
          footers.map((footer) => {
            return (
              <div
                key={footer.id}
                onClick={() => {
                  clickHandle(footer);
                }}
                tw="flex flex-col cursor-pointer"
              >
                <Icon
                  name={footer.icon}
                  tw="headline-medium md:headline-large"
                ></Icon>
                <span tw="title-small md:title-medium">{footer.name}</span>
              </div>
            );
          })}
      </div>
      <div tw="title-medium flex h-16 w-full items-center justify-center">
        &copy; {new Date().getFullYear()} tansincosy
      </div>
    </footer>
  );
};

export default Footer;
