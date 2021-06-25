import { createMuiTheme } from '@material-ui/core/styles'

export const colors = {
  black: {
    background: '#1B1C2A', // v2.0
    light: '#090B1B',
    kinda: '#1A1A1A',
    greyish: '#081323',
    cinder: '#0E0C12', // v2.0 background color
    controls: '#44424E', // v2.0 controls background color
    header: '#1A1D28', // v2.0 header
    card: '#28242E' // v2.0 card color
  },
  blue: {
    accent: '#072E5A',
    subtle: 'rgba(7,46,90,0.1)',
    deepAccent: 'rgba(7,46,90,0.5)',
    base: '#0B2545',
    light: '#66AFF5',
    neon: '#08F7FE',
    astel: '#48ADF1',
    bastille: '#1E1A23',
    charade: '#272735' // v2.0 component
  },
  gray: {
    base: '#8DA9C4',
    skeletonBackground: '#8E8B8B',
    skeletonField: '#C4C4C4', // v2.0 primary text color
    CDCDCD: '#CDCDCD',
    gunPowder: '#44424F',
    C4: '#C4C4C4',
    DB: '#DBDBDB', // v2.0 header button text
    manatee: '#898B9C', // v2.0 secondary text color
    balticSea: 'rgba(40, 36, 46, 0.6)', // v2.0 secondary background
    santas: '#9DA0AE', // v2.0 choose-token scrollbar track
    C7C9D1: '#C7C9D1', // v2.0 navbar text
    veryLight: '#E3E4E8', // v2.0 highlighted font
    light: '#9DA0AE', // v2.0 text
    mid: '#4C4C67', // v2.0
    upperMid: '#343446', // v2.0
    dark: '#1E202E', // v2.0 background
    background: '#1C1C29', // v2.0
    component: '#272735' // v2.0
  },
  green: {
    main: '#00F9BB',
    button: '#40BFA0',
    hover: 'rgba(0,249,187,0.15)',
    pastel: '#8AF7E4'
  },
  white: {
    main: '#FFFFFF'
  },
  red: {
    main: '#EB5757',
    error: '#F22F2F',
    neon: '#FF2079',
    pinkish: '#FE53BB'
  },
  purple: {
    magenta: '#A1045A',
    orchid: '#AF69EF',
    pastel: '#C6BDEA'
  },
  yellow: {
    neon: '#F5D300'
  }
}
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.gray.mid, // v2.0
      contrastText: colors.gray.veryLight // v2.0
    },
    secondary: {
      main: colors.green.button,
      contrastText: colors.black.background
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#030313'
    },
    error: {
      main: '#E15757'
    }
  },
  typography: {
    fontFamily: 'Inter',
    body1: {
      fontSize: 22,
      lineHeight: '40px'
    },
    body2: {
      fontSize: 16
    },
    h1: {
      fontSize: 56,
      fontWeight: 700
    },
    h2: {
      fontSize: 40
    },
    h3: {
      fontSize: 32
    },
    h4: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    h5: {
      fontSize: 16
    },
    h6: {
      fontSize: 12
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        MozAppearance: 'textfield',
        '&::-webkit-clear-button, &::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          display: 'none'
        }
      }
    }
  }
})
