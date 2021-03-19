import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

export default extendTheme({
  //   config: {
  //     initialColorMode: 'dark',
  //     useSystemColorMode: false,
  //   },
  // color shades generated with https://maketintsandshades.com/
  colors: {
    black: {
      50: '#202020',
      100: '#202020',
      200: '#202020',
      300: '#070707',
      400: '#070707',
      500: '#070707',
      600: '#070707',
      700: '#060606',
      800: '#060606',
      900: '#060606',
    },
    gray: {
      50: '#535660',
      100: '#535660',
      200: '#535660',
      300: '#40434e',
      400: '#40434e',
      500: '#40434e',
      600: '#40434e',
      700: '#3a3c46',
      800: '#3a3c46',
      900: '#3a3c46',
    },
    pink: {
      50: '#e91a87',
      100: '#e91a87',
      200: '#e91a87',
      300: '#e6007a',
      400: '#e6007a',
      500: '#e6007a',
      600: '#e6007a',
      700: '#cf006e',
      800: '#cf006e',
      900: '#cf006e',
    },
    blue: {
      50: '#4465ed',
      100: '#4465ed',
      200: '#4465ed',
      300: '#2f54eb',
      400: '#2f54eb',
      500: '#2f54eb',
      600: '#2f54eb',
      700: '#2a4cd4',
      800: '#2a4cd4',
      900: '#2a4cd4',
    },
    white: {
      50: '#f3f3f3',
      100: '#f3f3f3',
      200: '#f3f3f3',
      300: '#f2f2f2',
      400: '#f2f2f2',
      500: '#f2f2f2',
      600: '#f2f2f2',
      700: '#dadada',
      800: '#dadada',
      900: '#dadada',
    },
  },
});

export const GlobalStyles = css`
  * {
    box-sizing: border-box;
  }

  html {
    /* overflow: hidden; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    min-width: 300px;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
  }
`;
