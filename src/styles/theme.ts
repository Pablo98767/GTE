import { createTheme } from '@mui/material/styles';

// Documentação: https://mui.com/material-ui/customization/default-theme/

declare module '@mui/material/styles' {
  interface Theme {
    foodExplorer: {
      light: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
      },
      dark: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        1000: string;
      },
      tints: {
        tomato: {
          100: string;
          200: string;
          300: string;
          400: string;
        },
        carrot: {
          100: string;
        },
        mint: {
          100: string;
        },
        cake: {
          100: string;
          200: string;
        }
      },
    },
  }
  
  interface ThemeOptions {
    foodExplorer?: {
      light?: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
      },
      dark: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        1000: string;
      },
      tints: {
        tomato: {
          100: string;
          200: string;
          300: string;
          400: string;
        },
        carrot: {
          100: string;
        },
        mint: {
          100: string;
        },
        cake: {
          100: string;
          200: string;
        }
      },
    },
  }
}

const theme = createTheme({
  foodExplorer: {
    light: {
      100: '#FFFFFF',
      200: '#FFFAF1',
      300: '#E1E1E6',
      400: '#C4C4CC',
      500: '#7C7C8A',
      600: '#76797B',
      700: '#4D585E',
    },
    dark: {
      100: '#000405',
      200: '#00070A',
      300: '#000204',
      400: '#000A0F',
      500: '#000C12',
      600: '#00111A',
      700: '#001119',
      800: '#0D161B',
      900: '#0D1D25',
      1000: '#192227',
    },
    tints: {
      tomato: {
        100: '#750310',
        200: '#92000E',
        300: '#AB222E',
        400: '#AB4D55',
      },
      carrot: {
        100: '#FBA94C',
      },
      mint: {
        100: '#04D361',
      },
      cake: {
        100: '#065E7C',
        200: '#82F3FF',
      },
    },
  },
});

export {
  theme,
  };
