import { importantStyles } from '@consts/uiUtils'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

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
    paddingTop: 8,

    [theme.breakpoints.down('sm')]: {
      paddingTop: 6
    }
  },
  tokenComponentInfo: {
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8
    }
  },
  tokenComponentText: {
    color: colors.navy.veryLightGrey,
    ...typography.subtitle1,
    whiteSpace: 'nowrap',
    marginTop: 2,
    [theme.breakpoints.down('sm')]: {
      ...typography.body3
    }
  },
  tokenMaxText: {
    color: colors.navy.grey,
    ...typography.subtitle2,
    whiteSpace: 'nowrap',
    marginTop: 2,
    [theme.breakpoints.down('sm')]: {
      ...typography.body4
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
    cursor: 'pointer',

    '&:hover': {
      borderColor: '#7C76DA'
    },

    '&:hover $swapIcon': {
      opacity: 1
    },

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
    transition: 'transform 300ms',
    opacity: 0.9,

    [theme.breakpoints.down('xs')]: {
      maxWidth: 34
    }
  },
  toText: {
    width: 'max-content'
  },
  exclamationMark: {
    height: 18,
    width: 18,
    marginLeft: 16,

    [theme.breakpoints.down('sm')]: {
      marginTop: 2
    },

    '&:hover': {
      cursor: 'pointer'
    }
  },
  outputIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 8,
    top: 3
  },
  tooltipTitle: {
    ...typography.subtitle1
  },
  tooltipLink: {
    fontWeight: 800,
    color: colors.navy.veryLightGrey,
    cursor: 'pointer'
  },
  numbersField: {
    marginTop: 28,
    [theme.breakpoints.down('sm')]: {
      marginTop: 18
    }
  },
  numbersFieldTitle: {
    ...typography.body2,
    color: colors.navy.grey,
    position: 'relative',
    lineHeight: '22px',
    [theme.breakpoints.up('md')]: {
      top: 2
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.subtitle2
    }
  },
  numbersFieldAmount: {
    ...typography.body1,
    color: colors.navy.veryLightGrey,
    lineHeight: '22px',
    [theme.breakpoints.up('md')]: {
      marginTop: 16
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.subtitle1
    }
  },
  numbersFieldGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  discount: {
    ...typography.body2,
    lineHeight: '22px',
    [theme.breakpoints.up('md')]: {
      marginTop: 16
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.subtitle2
    }
  },
  questionMark: {
    height: 20,
    width: 20,

    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.down('xs')]: {
      height: 18,
      width: 18
    }
  },
  circleIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8,
    marginTop: 6
  },
  amountDivider: {
    background: colors.navy.grey,
    height: 52,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,

    [theme.breakpoints.down('sm')]: {
      height: 37
    },

    [theme.breakpoints.down('xs')]: {
      marginLeft: 8,
      marginRight: 8
    }
  },
  arrowsBg: {
    borderRadius: 3,
    padding: 5,
    backgroundColor: colors.navy.navButton,
    marginLeft: 16,
    width: 38,
    height: 22,

    '&:hover': {
      backgroundColor: '#494C8F'
    },

    [theme.breakpoints.down('xs')]: {
      marginLeft: 6
    }
  },
  arrowsIcon: {
    backgroundSize: '1920px 870px',
    maxWidth: '100%',
    cursor: 'pointer'
  },
  swapButton: {
    width: '100%',
    height: 60,
    marginTop: 36,
    ...importantStyles(typography.body1),

    '&:hover': {
      backgroundColor: '#4ADFBA !important'
    },

    '&:disabled': {
      pointerEvents: 'auto !important'
    },

    '&:disabled:hover': {
      backgroundColor: `${colors.navy.darkGrey} !important`,
      pointerEvents: 'auto !important'
    },

    [theme.breakpoints.down('xs')]: {
      ...importantStyles(typography.body3),
      height: 48,
      marginTop: 24
    }
  },
  supplyTooltip: {
    backgroundColor: `${colors.red.error} !important`
  },
  noMarginTop: {
    marginTop: 0
  },
  tooltipBold: {
    color: colors.white.main
  }
}))

export default useStyles
