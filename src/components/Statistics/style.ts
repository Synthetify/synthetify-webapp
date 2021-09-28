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
    '&:last-child': {
      padding: '10.5px 16px',
      [theme.breakpoints.down('sm')]: {
        padding: '5.5px 8px'
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
    '& *': {
      padding: 0,
      margin: 0
    }
  },
  cardContent: {
    padding: '10.5px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
      fontSize: 20
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4
    }
  },
  cardTime: {
    ...typography.body2,
    color: colors.navy.info,
    [theme.breakpoints.down('md')]: {
      fontSize: 20
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      lineHeight: '16px'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption3
    }
  },
  cardValue: {
    color: colors.navy.button,
    fontSize: 48,
    lineHeight: '40px',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '25.5px 0 18px 0',
    [theme.breakpoints.down('md')]: {
      margin: '16.5px 0 11px 0',
      fontSize: 38
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
      margin: '10.5px 0 4px 0',
      lineHeight: '28px'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.subtitle1,
      margin: '10.5px 0 10px 0'
    }
  },
  cardDesc: {
    color: colors.navy.info,
    ...typography.subtitle2,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      fontWeight: 500,
      lineHeight: '24px',
      minHeight: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 9,
      fontWeight: 500,
      lineHeight: '12px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 8,
      lineHeight: '8px'
    }
  },
  collItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default useStyles
