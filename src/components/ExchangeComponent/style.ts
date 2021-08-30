import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    borderRadius: 10,
    padding: 24,

    [theme.breakpoints.down('sm')]: {
      padding: 16
    }
  },
  tokenComponent: {
    borderRadius: 10,
    border: '1px solid rgba(98, 97, 163, 0.7)',
    padding: 16,

    [theme.breakpoints.down('sm')]: {
      paddingTop: 13
    }
  },
  tokenComponentInfo: {
    marginBottom: 14,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 12
    }
  },
  tokenComponentText: {
    color: colors.navy.veryLightGrey,
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 1,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  tokenMaxText: {
    color: colors.navy.grey,
    fontSize: 16,
    lineHeight: 1,
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  input: {
    marginLeft: 24,

    [theme.breakpoints.down('md')]: {
      marginLeft: 16
    }
  },
  swapIconSquare: {
    background: colors.navy.dark,
    position: 'relative',
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: colors.navy.button,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: -10,
    marginBottom: -10,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      width: 46,
      height: 46,
      marginTop: -6,
      marginBottom: -6
    }
  },
  swapIcon: {
    backgroundSize: '1841.948px 1925px',
    maxWidth: 40,
    fill: colors.navy.veryLightGrey,
    transition: 'transform 300ms',

    [theme.breakpoints.down('xs')]: {
      maxWidth: 34
    }
  },
  toText: {
    maxWidth: 138,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 121
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: 113
    }
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
  outputIcon: {
    width: 25,
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
  questionMark: {
    height: 20,
    width: 20,

    '&:hover': {
      cursor: 'pointer'
    }
  },
  feeIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8
  },
  amountDivider: {
    background: colors.navy.grey,
    height: 52,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,

    [theme.breakpoints.down('sm')]: {
      height: 37
    }
  },
  swapButton: {
    width: '100%',
    height: 60,
    marginTop: 36,

    [theme.breakpoints.down('xs')]: {
      height: 48,
      marginTop: 24
    }
  }
}))

export default useStyles
