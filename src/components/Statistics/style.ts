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
    '& #volume': {
      padding: '0px 0px 0px 24px'
    },
    '& #mint': {
      padding: '24px 12px 24px 0'
    },
    '& #debt': {
      padding: '24px 12px 24px 12px'
    },
    '& #fee': {
      padding: '24px 0px 24px 12px'
    },
    [theme.breakpoints.down('sm')]: {
      '& #volume': {
        padding: '0px 0px 0px 16px'
      },
      '& #mint': {
        padding: '16px 8px 16px 0'
      },
      '& #debt': {
        padding: '16px 8px 16px 8px'
      },
      '& #fee': {
        padding: '16px 0px 16px 8px'
      }
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    '&:last-child': {
      padding: '8.5px 16px',
      [theme.breakpoints.down('sm')]: {
        padding: '3.5px 8px'
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
    '&:before': {
      content: ' ',
      marginTop: '-3px',
      display: 'block',
      height: 0
    },
    color: colors.navy.veryLightGrey,
    [theme.breakpoints.down('md')]: {
      ...typography.heading4
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.subtitle1
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4
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
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption3
    }
  },
  cardValue: {
    color: colors.navy.button,
    fontSize: 52,
    lineHeight: '52px',
    textAlign: 'center',
    fontWeight: 800,
    margin: '12px 0 19px 0',
    [theme.breakpoints.down('md')]: {
      margin: '11px 0',
      ...typography.heading1
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.heading3,
      margin: '4px 0'
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      ...typography.subtitle1
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
      ...typography.caption3
    }
  },
  collItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default useStyles
