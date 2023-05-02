import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/index.scss";
import "bytemd/dist/index.css";
import GlobalStyles from "../styles/GlobalStyles";
import { Roboto } from "next/font/google";
import { SnackbarProvider } from "~/components";
import { ThemeProvider } from "~/components/myd";
import "highlight.js/scss/atom-one-dark.scss";

const inter = Roboto({ subsets: ["latin"], weight: "500" });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <SnackbarProvider>
          <style jsx global>{`
            html {
              font-family: ${inter.style.fontFamily};
            }
          `}</style>
          <GlobalStyles />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
