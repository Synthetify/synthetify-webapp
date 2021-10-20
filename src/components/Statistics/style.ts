import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  reset: {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box'
  },
  gridContainer: {
    width: '100%'
  },
  container: {
    width: '100%',
    margin: '0 auto',
    '& #collateral': {
      padding: '0px 0px 0px 0px'
    },
    '& #debt': {
      padding: '0px 0px 0px 24px'
    },
    '& #mint': {
      padding: '24px 12px 24px 0'
    },
    '& #volume': {
      padding: '24px 12px 24px 12px'
    },
    '& #fee': {
      padding: '24px 0px 24px 12px'
    },
    [theme.breakpoints.down('sm')]: {
      '& #debt': {
        padding: '0px 0px 0px 16px'
      },
      '& #mint': {
        padding: '16px 8px 16px 0'
      },
      '& #volume': {
        padding: '16px 8px 16px 8px'
      },
      '& #fee': {
        padding: '16px 0px 16px 8px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      '& #debt': {
        padding: '16px 0px 0px 0px'
      },
      '& #mint': {
        padding: '16px 0px 16px 0px'
      },
      '& #volume': {
        padding: '0px 0px 0px 0px'
      },
      '& #fee': {
        padding: '16px 0px 16px 0px'
      }
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    '&:last-child': {
      padding: '6.5px 16px 8.5px 16px',
      [theme.breakpoints.down('sm')]: {
        padding: '2.5px 8px'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '3px 8px 5px 8px'
      }
    }
  },
  card: {
    background: colors.navy.component,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    '& *': {
      padding: 0,
      margin: 0
    }
  },
  cardContent: {
    padding: '10.5px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardName: {
    ...typography.body1,

    color: colors.navy.veryLightGrey,
    [theme.breakpoints.down('md')]: {
      ...typography.heading4
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.subtitle1
    }
  },
  cardTime: {
    ...typography.body2,
    color: colors.navy.info,
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: '30px'
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.subtitle2
    }
  },
  cardValue: {
    color: colors.navy.button,
    fontSize: 52,
    lineHeight: '52px',
    textAlign: 'center',
    fontWeight: 800,
    margin: '20px 0 21px 0',
    transition: 'transform 300ms linear, color 300ms linear, box-shadow 300ms linear',
    [theme.breakpoints.down('md')]: {
      margin: '18px 0',
      ...typography.heading1
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.heading3,
      margin: '4px 0'
    },
    '&:hover': {
      color: '#7C76DA',
      textShadow: '0px 0px 12px rgba(124, 118, 218, 0.5)',
      transform: 'scale(1.1)'
    }
  },
  cardDesc: {
    color: colors.navy.info,
    ...typography.subtitle2,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      minHeight: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.body4
    }
  },
  collItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default useStyles
