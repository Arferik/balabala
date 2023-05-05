// @ts-nocheck
const plugin = require("tailwindcss/plugin");

const colorTokens = {
  "surface-dim": "",
  "surface-bright": "",
  "surface-container-lowest": "",
  "surface-container-low": "",
  "surface-container": "",
  "surface-container-high": "",
  "surface-container-highest": "",
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

const themeColors = () => {
  Object.keys(colorTokens).forEach((tokenKey) => {
    colorTokens[tokenKey] = `var(--md-sys-color-${tokenKey})`;
  });
  return colorTokens;
};

const unit = (/** @type {number} */ size) => {
  return `${size / 16}rem`;
};

const typography = plugin(({ addComponents, theme }) => {
  addComponents({
    ".display-xxl": {
      lineHeight: unit(112),
      fontSize: unit(112),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".display-xl": {
      lineHeight: unit(96),
      fontSize: unit(88),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".display-large": {
      lineHeight: unit(64),
      fontSize: unit(57),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".display-medium": {
      lineHeight: unit(52),
      fontSize: unit(45),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".display-small": {
      lineHeight: unit(44),
      fontSize: unit(36),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".headline-large": {
      lineHeight: unit(40),
      fontSize: unit(32),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".headline-medium": {
      lineHeight: unit(36),
      fontSize: unit(28),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".headline-small": {
      lineHeight: unit(32),
      fontSize: unit(24),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".title-large": {
      lineHeight: unit(28),
      fontSize: unit(22),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".title-medium": {
      lineHeight: unit(24),
      fontSize: unit(16),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.15),
    },
    ".title-small": {
      lineHeight: unit(20),
      fontSize: unit(14),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.1),
    },
    ".label-large": {
      lineHeight: unit(20),
      fontSize: unit(14),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.1),
    },
    ".label-medium": {
      lineHeight: unit(16),
      fontSize: unit(12),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.5),
    },
    ".label-small": {
      lineHeight: unit(6),
      fontSize: unit(11),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.5),
    },
    ".body-large": {
      lineHeight: unit(24),
      fontSize: unit(16),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.15),
    },
    ".body-medium": {
      lineHeight: unit(20),
      fontSize: unit(14),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.25),
    },
    ".body-small": {
      lineHeight: unit(16),
      fontSize: unit(12),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: unit(0.4),
    },
  });
});

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...themeColors(),
      },
      boxShadow: {
        el1: `0px ${unit(1)} ${unit(1)} 0px rgba(0,0,0,0.05)`,
        el2: `0px ${unit(3)} ${unit(3)} 0px rgba(0,0,0,0.05)`,
        el3: `0px ${unit(6)} ${unit(6)} 0px rgba(0,0,0,0.05)`,
        el4: `0px ${unit(8)} ${unit(8)}  0px rgba(0,0,0,0.05)`,
        el5: `0px ${unit(12)} ${unit(12)}  0px rgba(0,0,0,0.05)`,
      },
    },
  },
  plugins: [typography],
};

module.exports = config;
