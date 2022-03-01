import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    borderRadius: '0 0 10px 10px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '16px'
    }
  },
  middleGrid: {
    display: 'flex',
    flexDirection: 'column',
    padding: '18px 24px 14px 24px',
    [theme.breakpoints.down('md')]: {
      padding: '8px 16px 4px 16px'
    }
  },
  bottomGrid: {
    padding: '8px 24px 24px 24px',
    [theme.breakpoints.down('md')]: {
      padding: '8px 16px 24px 16px'
    }
  },

  collateralContainer: {
    display: 'flex',
    width: '130%',
    [theme.breakpoints.down('md')]: {
      paddingBottom: '16px',
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 10
    }
  },

  title: {
    ...typography.subtitle2,
    minWidth: 'max-content',
    color: colors.navy.grey,
    paddingBottom: 6,
    paddingTop: 12,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  balance: {
    ...typography.subtitle2,
    color: colors.navy.info,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  inputGrid: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  input: {
    // maxWidth: 'min-content',
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
  selectGrid: {
    background: colors.navy.background,
    padding: '12px',
    borderRadius: '10px',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      padding: '6px',
      borderRadius: '6px'
    }
  },
  select: {
    minWidth: '107px',
    borderRadius: '6px'
  },
  tokenName: {
    paddingLeft: '12px',
    ...typography.body2,
    color: colors.navy.grey,
    [theme.breakpoints.down('md')]: {
      ...typography.subtitle2
    }
  },

  syntheticWord: {
    paddingLeft: '8px',
    ...typography.body2,
    color: colors.green.button,
    [theme.breakpoints.down('md')]: {
      ...typography.subtitle2
    }
  },
  divider: {
    background: colors.navy.darkGrey,
    margin: '10px 0'
  },
  infoGrid: {
    display: 'flex',
    paddingRight: '16px',
    paddingTop: '6px'
  },
  infoValueTo: {
    ...typography.body3,
    color: colors.white.main,
    paddingTop: '2px',
    paddingLeft: '8px',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      ...typography.caption2
    }
  },
  valueContainer: {
    display: 'flex'
  },
  infoTitle: {
    ...typography.body4,
    color: colors.navy.grey,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  tooltipTitle: {
    ...typography.subtitle1
  },
  exclamationMark: {
    height: 14,
    width: 14,
    paddingBottom: 11,
    marginLeft: 8,

    [theme.breakpoints.down('sm')]: {
      marginTop: 2
    },

    '&:hover': {
      cursor: 'pointer'
    }
  },
  tootlipMain: {
    padding: 0,
    background: colors.red.error
  }
}))

export default useStyles
