import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    boxShadow: 'none',
    borderRadius: '10px'
  },
  rootHeader: {
    borderColor: colors.navy.darkGrey,
    ...typography.subtitle2,
    color: colors.navy.info,
    padding: '14px 0 14px 10px ',
    '&:first-child': {
      paddingLeft: '10px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '13px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '14px 0 14px 4px',
      '&:first-child': {
        paddingLeft: '8px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      padding: '10px 0 10px 4px',
      '&:first-child': {
        paddingLeft: '8px'
      }
    }
  },
  rootCell: {
    border: 'none',
    ...typography.body3,
    color: colors.navy.veryLightGrey,
    padding: '12px 0 12px 10px',
    cursor: 'pointer',
    '&:first-child': {
      paddingLeft: '10px'
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.caption2,
      padding: '12px 0 12px 4px',
      '&:first-child': {
        paddingLeft: '8px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      padding: '10px 0 10px 4px',
      '&:first-child': {
        paddingLeft: '8px'
      }
    }
  },
  icon: {
    width: '1.2em',
    height: '1.2em',
    marginRight: 4,
    [theme.breakpoints.down('xs')]: {
      width: '1.5em',
      height: '1.5em'
    }
  },
  gridRow: {
    justifyContent: 'space-between',
    transition: 'box-shadow 300ms',
    padding: '5px 0px',
    '&:hover': {
      background: `${colors.navy.navButton}40`,
      boxShadow: `0px 0px 6px ${colors.navy.button}`
    },
    '&:hover:last-child': {
      borderRadius: '0px 0px 10px 10px'
    }
  },
  active: {
    background: `${colors.navy.navButton}85`,
    '&:last-child': {
      borderRadius: ' 0px 0px 10px 10px'
    },
    '&:hover': {
      background: `${colors.navy.navButton}90`
    }
  },
  tooltipNumber: {
    background: colors.navy.navButton,
    barderRadius: '5px',
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey,
    padding: '3px 5px',

    [theme.breakpoints.down('sm')]: {
      ...typography.caption2,
      padding: '2px 4px'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      margin: '6px 0px'
    }
  },
  dualIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content'
  },
  secondIcon: {
    marginLeft: '-0.35em'
  },
  headerRow: {
    justifyContent: 'space-between'
  },

  symbolColumn: {
    minWidth: '105px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      minWidth: '40px'
    }
  },
  typeColumn: {
    minWidth: '40px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      minWidth: '25px'
    }
  },
  amountColumn: {
    minWidth: '95px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      minWidth: '65px'
    }
  },
  cRatioColumn: {
    minWidth: '55px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      minWidth: '35px'
    }
  },
  LeverColumn: {
    minWidth: '55px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      minWidth: '30px'
    }
  },
  interestDebtColumn: {
    minWidth: '85px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      minWidth: '65px'
    }
  },
  liquidationColumn: {
    minWidth: '110px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      minWidth: '80px'
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '60px'
    }
  },
  maxBorrowColumn: {
    minWidth: '135px',
    justifyContent: 'flex-start'
  },
  buttonColumn: {
    minWidth: '110px',
    padding: '6px 6px 6px 5px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      minWidth: '80px'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '40px',
      paddingLeft: '0px'
    }
  },
  closeButton: {
    minWidth: '80px',
    ...typography.body3,
    background: colors.red.error,
    textTransform: 'capitalize',
    padding: '4px 0',
    [theme.breakpoints.down('sm')]: {
      ...typography.caption2,
      padding: '2px 0',
      minWidth: '60px'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      minWidth: '40px',
      padding: '0px 0'
    },
    '&:hover': {
      background: `${colors.red.error}95`
    },
    '&:disabled': {
      pointerEvents: 'auto !important'
    },

    '&:disabled:hover': {
      backgroundColor: `${colors.navy.darkGrey} !important`,
      pointerEvents: 'auto !important'
    }
  }
}))

export default useStyles
