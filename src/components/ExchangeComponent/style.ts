import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    borderRadius: 10,
    padding: 32,
    paddingTop: 23,

    [theme.breakpoints.down('sm')]: {
      padding: 20
    }
  },
  title: {
    fontSize: 22,
    color: colors.navy.lightGrey,
    lineHeight: '40px',
    fontWeight: 600,
    marginBottom: 20
  },
  tokenComponent: {
    background: colors.navy.darkGrey,
    borderRadius: 10,
    padding: 20,
    paddingTop: 6
  },
  tokenComponentText: {
    color: colors.navy.navBar,
    fontWeight: 700,
    fontSize: 16,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  tokenMaxText: {
    color: colors.navy.grey,
    fontSize: 16,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  amountDivider: {
    background: colors.navy.grey,
    height: 57,
    marginLeft: 10,
    marginRight: 18,

    [theme.breakpoints.down('sm')]: {
      height: 37,
      marginTop: 4
    }
  },
  numbersField: {
    marginTop: 30,

    [theme.breakpoints.down('sm')]: {
      marginTop: 20
    }
  },
  numbersFieldTitle: {
    fontSize: 22,
    color: colors.navy.grey,
    lineHeight: '26px',

    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    }
  },
  numbersFieldAmount: {
    fontSize: 22,
    color: colors.navy.veryLightGrey,
    lineHeight: '40px',
    fontWeight: 600,

    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
      lineHeight: '16px'
    }
  },
  discount: {
    fontSize: 22,
    lineHeight: '40px',

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '16px'
    }
  },
  fee: {
    maxWidth: 150,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 100
    }
  },
  swapButton: {
    width: '100%',
    marginTop: 20,
    height: 60,
    fontWeight: 'normal'
  },
  swapIconSquare: {
    background: colors.navy.dark,
    position: 'relative',
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.navy.lightGrey,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: -10,
    marginBottom: -10,
    zIndex: 2,
    padding: 1,
    lineHeight: 45,

    '@media(hover: hover) and (pointer: fine)': {
      '&:hover': {
        background: colors.navy.navButton
      }
    },

    '@media (hover: none)': {
      '&:hover': {
        background: colors.navy.component
      },

      '&:active': {
        background: colors.navy.navButton
      }
    }
  },
  swapIcon: {
    width: 43,
    height: 43,
    fill: colors.navy.veryLightGrey
  },
  button: {
    width: 'calc(100% - 20px)',
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    lineHeight: '40px',
    margin: 10,
    fontWeight: 'normal',
    backgroundColor: colors.navy['5756B3']
  },
  mdDownButton: {
    width: 'calc(100% - 20px)'
  },
  tooltip: {
    fontSize: 13
  },
  exclamationMark: {
    height: 18,
    width: 18,

    '&:hover': {
      cursor: 'pointer'
    }
  },
  questionMark: {
    height: 20,
    width: 20,

    '&:hover': {
      cursor: 'pointer'
    }
  },
  toText: {
    maxWidth: 160,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 220
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: 106
    }
  },
  outputIcon: {
    width: 25,
    height: 16,
    position: 'absolute',
    right: 8
  },
  feeIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8
  },
  tooltipTitle: {
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 700
  },
  tooltipLink: {
    fontWeight: 700,
    color: colors.navy.veryLightGrey,
    cursor: 'pointer'
  }
}))

export default useStyles
