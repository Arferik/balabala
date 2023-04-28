export type ColorTokenType =
  | "primary"
  | "onPrimary"
  | "primaryContainer"
  | "onPrimaryContainer"
  | "error"
  | "onError"
  | "errorContainer"
  | "onErrorContainer"
  | "secondary"
  | "onSecondary"
  | "secondaryContainer"
  | "onSecondaryContainer"
  | "surface"
  | "surfaceDim"
  | "surfaceBright"
  | "surfaceContainerLowest"
  | "surfaceContainerLow"
  | "surfaceContainer"
  | "surfaceContainerHigh"
  | "surfaceContainerHighest"
  | "onSurface"
  | "surfaceVariant"
  | "onSurfaceVariant"
  | "tertiary"
  | "onTertiary"
  | "tertiaryContainer"
  | "onTertiaryContainer"
  | "background"
  | "onBackground"
  | "outline"
  | "shadow"
  | "inverseOnSurface"
  | "inversePrimary"
  | "inverseSurface";

export const ColorTokens: Record<ColorTokenType, string> = {
  primary: "",
  onPrimary: "",
  primaryContainer: "",
  onPrimaryContainer: "",
  error: "",
  onError: "",
  errorContainer: "",
  onErrorContainer: "",
  secondary: "",
  onSecondary: "",
  secondaryContainer: "",
  onSecondaryContainer: "",
  surface: "",
  surfaceDim: "",
  surfaceBright: "",
  surfaceContainerLowest: "",
  surfaceContainerLow: "",
  surfaceContainer: "",
  surfaceContainerHigh: "",
  surfaceContainerHighest: "",
  onSurface: "",
  surfaceVariant: "",
  onSurfaceVariant: "",
  tertiary: "",
  onTertiary: "",
  tertiaryContainer: "",
  onTertiaryContainer: "",
  background: "",
  onBackground: "",
  outline: "",
  shadow: "",
  inverseOnSurface: "",
  inversePrimary: "",
  inverseSurface: "",
};

export const getCssVariableForTailwind = () => {
  const variableCss: Record<string, string> = {};
  Object.keys(ColorTokens).map((item) => {
    const token = item.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    variableCss[item] = `var(--md-sys-color-${token})`;
  });
  return variableCss as Record<ColorTokenType, string>;
};

export const paletteAlpha = (paletteAlphaHex: string, alpha: number) => {
  if (!paletteAlphaHex) {
    return "";
  }
  const r = parseInt(paletteAlphaHex.slice(1, 3), 16);
  const g = parseInt(paletteAlphaHex.slice(3, 5), 16);
  const b = parseInt(paletteAlphaHex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};
