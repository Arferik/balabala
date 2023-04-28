import { useEffect, useState } from "react";
import {
  type Theme,
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import { type ColorTokenType } from "../utils/materialYouColorToken";

const getTokenColorFromScheme = (
  colorScheme: Record<string, number>
): Record<ColorTokenType, string> => {
  const tokenColorsMap: Record<string, string> = {};
  for (const [key, value] of Object.entries(colorScheme)) {
    const color = hexFromArgb(value);
    tokenColorsMap[key] = color;
  }
  return tokenColorsMap;
};

const setSchemeProperties = (
  target: HTMLElement,
  colorScheme: Record<string, number>,
  suffix = ""
) => {
  for (const [key, value] of Object.entries(colorScheme)) {
    const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    const color = hexFromArgb(value);
    target.style.setProperty(`--md-sys-color-${token}${suffix}`, color);
  }
};

const getPalettes = (theme: Theme, isDark: boolean) => {
  const { palettes } = theme;
  const newSurfaceColorToken = {
    light: {
      surfaceDim: palettes.neutral.tone(87),
      surfaceBright: palettes.neutral.tone(98),
      surfaceContainerLowest: palettes.neutral.tone(100),
      surfaceContainerLow: palettes.neutral.tone(96),
      surfaceContainer: palettes.neutral.tone(94),
      surfaceContainerHigh: palettes.neutral.tone(92),
      surfaceContainerHighest: palettes.neutral.tone(90),
    },
    dark: {
      surfaceDim: palettes.neutral.tone(6),
      surfaceBright: palettes.neutral.tone(24),
      surfaceContainerLowest: palettes.neutral.tone(4),
      surfaceContainerLow: palettes.neutral.tone(10),
      surfaceContainer: palettes.neutral.tone(12),
      surfaceContainerHigh: palettes.neutral.tone(17),
      surfaceContainerHighest: palettes.neutral.tone(22),
    },
  };
  if (isDark) {
    setSchemeProperties(document.body, newSurfaceColorToken.dark);
    return newSurfaceColorToken.dark;
  } else {
    setSchemeProperties(document.body, newSurfaceColorToken.light);
    return newSurfaceColorToken.light;
  }
};

export const useMaterialYouTheme = (color?: string) => {
  const [palettes, setColorPalettes] =
    useState<Record<ColorTokenType, string>>();
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(color || "#066bf8"));
    const isDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches && false;
    const newPalettesSchema = getPalettes(theme, isDark);
    applyTheme(theme, {
      target: document.body,
      dark: isDark,
    });
    const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
    setColorPalettes({
      ...getTokenColorFromScheme(scheme.toJSON()),
      ...getTokenColorFromScheme(newPalettesSchema),
    });
  }, [color]);
  return { palettes };
};
