import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import { useEffect } from "react";

export const useTheme = (themeColor?: string) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(themeColor || "#066bf8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(theme, {
      target: document.body,
      dark: systemDark,
    });
  }, [themeColor]);
};
