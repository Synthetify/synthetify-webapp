import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    borderRadius: '0 0 10px 10px',
    marginBottom: '24px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '16px'
    }
  },
  topGrid: {
    padding: '16px 24px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '16px 16px'
    }
  },
  buttonGrid: {
    background: colors.navy.background,
    width: 'min-content',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '34px'
  },
  buttonBorrow: {
    ...typography.subtitle1,
    color: colors.white.main,
    borderRadius: '5px',
    minWidth: '95px'
  },
  repayButton: {
    ...typography.subtitle1,
    color: colors.navy.background,
    borderRadius: '5px',
    minWidth: '95px'
  },
  noActiveButton: {
    colors: colors.navy.info,
    background: 'transparent'
  },
  middleGrid: {
    display: 'flex',
    flexDirection: 'row',
    padding: '18px 24px 24px 24px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '18px 16px 24px 16px'
    }
  },
  collateralContainer: {
    display: 'flex',
    width: '130%',
    [theme.breakpoints.down('md')]: {
      paddingBottom: 28,
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 20
    }
  },
  title: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    paddingBottom: 12,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      paddingBottom: 6
    }
  },
  desc: {
    ...typography.subtitle2,
    color: colors.navy.info,
    paddingTop: 12,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      paddingTop: 8
    }
  },
  divider: {
    background: colors.navy.darkGrey
  },
  cRatioGrid: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 'max-content',
    padding: '0 16px',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '0 0 0 16px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 0 4px'
    }
  },
  cRatioBack: {
    maxHeight: '64px',
    marginTop: '3px',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('xs')]: {
      maxHeight: '48px',
      marginTop: '1px'
    }
  },
  cRatioButton: {
    ...typography.body1,
    background: colors.navy.dark,
    borderRadius: '0 0 8px 8px',
    width: '100%',
    padding: '4px 6px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      ...typography.body3
    }
  },
  endIcon: {
    color: colors.white.main,
    width: '24px',
    margin: '0 0 0 2px',
    [theme.breakpoints.down('xs')]: {
      width: '13px'
    }
  },
  cRatioTitle: {
    ...typography.body4,
    color: colors.navy.grey,
    background: colors.navy.dark,
    padding: ' 4px 21px 5px 21px',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      padding: ' 4px 10px 5px 10px'
    }
  },
  input: {
    minHeight: '64px',
    '& $button:first-child': {
      margin: '0 10px 0 0',
      [theme.breakpoints.up('md')]: {
        minWidth: '107px',
        borderRadius: '6px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: '48px'
    }
  },

  bottomGrid: {
    display: 'flex',
    flexDirection: 'row',
    padding: '24px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '16px'
    }
  },
  bottomInfo: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '50%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  minValue: {
    paddingLeft: '3px'
  },
  infoTitle: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  infoValueFrom: {
    ...typography.subtitle2,
    color: colors.white.main,
    paddingTop: '2px',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      ...typography.caption2
    }
  },
  infoValueTo: {
    ...typography.subtitle1,
    color: colors.white.main,
    paddingTop: '2px',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      ...typography.caption2
    }
  },
  flatIcon: {
    padding: '0px 3px',
    width: '18px',
    [theme.breakpoints.down('md')]: {
      width: '0.7em',
      height: 'min-content'
    }
  },
  actionButton: {
    padding: '10px 0',
    minWidth: '170px',
    ...typography.body1,
    fontSize: '22px',
    marginLeft: '30px',
    textTransform: 'capitalize',
    '&:hover': {
      background: '#4ADFBA'
    },
    '&:disabled': {
      pointerEvents: 'auto !important'
    },

    '&:disabled:hover': {
      backgroundColor: `${colors.navy.darkGrey} !important`,
      pointerEvents: 'auto !important'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '104px',
      padding: '5px 0',
      ...typography.subtitle1
    }
  },
  fontRepay: {
    fontSize: '18px'
  },
  buttonAction: {
    justifyContent: 'flex-end',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      paddingTop: '24px'
    },
    [theme.breakpoints.down('xs')]: {
      '& > span  > div': {
        height: '36px!important'
      }
    }
  }
}))
export default useStyles
