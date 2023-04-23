export type ColorTokenType =
  | "primary"
  | "on-primary"
  | "primary-container"
  | "on-primary-container"
  | "error"
  | "on-error"
  | "error-container"
  | "on-error-container"
  | "secondary"
  | "on-secondary"
  | "secondary-container"
  | "on-secondary-container"
  | "surface"
  | "surface-dim"
  | "surface-bright"
  | "surface-container-lowest"
  | "surface-container-low"
  | "surface-container"
  | "surface-container-high"
  | "surface-container-highest"
  | "on-surface"
  | "surface-variant"
  | "on-surface-variant"
  | "tertiary"
  | "on-tertiary"
  | "tertiary-container"
  | "on-tertiary-container"
  | "background"
  | "on-background"
  | "outline"
  | "shadow"
  | "inverse-on-surface"
  | "inverse-primary"
  | "inverse-surface";

export const ColorTokens: Record<ColorTokenType, string> = {
  primary: "",
  "on-primary": "",
  "primary-container": "",
  "on-primary-container": "",
  error: "",
  "on-error": "",
  "error-container": "",
  "on-error-container": "",
  secondary: "",
  "on-secondary": "",
  "secondary-container": "",
  "on-secondary-container": "",
  surface: "",
  "surface-dim": "",
  "surface-bright": "",
  "surface-container-lowest": "",
  "surface-container-low": "",
  "surface-container": "",
  "surface-container-high": "",
  "surface-container-highest": "",
  "on-surface": "",
  "surface-variant": "",
  "on-surface-variant": "",
  tertiary: "",
  "on-tertiary": "",
  "tertiary-container": "",
  "on-tertiary-container": "",
  background: "",
  "on-background": "",
  outline: "",
  shadow: "",
  "inverse-on-surface": "",
  "inverse-primary": "",
  "inverse-surface": "",
};

export const getCssVariableForTailwind = () => {
  const variableCss: Record<string, string> = {};
  Object.keys(ColorTokens).map((item) => {
    const token = item.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    variableCss[item] = `var(--md-sys-color-${token})`;
  });
  return variableCss as Record<ColorTokenType, string>;
};

export const paletteAlpha = (
  colorPalette: Record<ColorTokenType, string>,
  colorTokens: ColorTokenType,
  alpha: number
) => {
  const curColor = colorPalette[colorTokens];
  if (!curColor) {
    return "";
  }
  const r = parseInt(curColor.slice(1, 3), 16);
  const g = parseInt(curColor.slice(3, 5), 16);
  const b = parseInt(curColor.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};
