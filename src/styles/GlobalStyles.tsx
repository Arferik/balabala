// styles/GlobalStyles.tsx
import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle({
  body: {
    ...tw`antialiased`,
  },
  ".material-symbols-rounded": {
    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
  },
  ".bytemd": {
    height: "100vh",
  },
  "::-moz-selection": {
    /* Code for Firefox */ color: "var(--md-sys-color-on-background)",
    background: "var(--md-sys-color-primary-container)",
  },

  "::selection": {
    color: "var(--md-sys-color-on-background)",
    background: "var(--md-sys-color-primary-container)",
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
