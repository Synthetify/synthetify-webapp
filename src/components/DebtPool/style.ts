import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  debtPoolCard: {
    background: colors.navy.component,
    borderRadius: 10,
    fontFamily: 'Inter',
    marginRight: '12px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px'
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: '0',
      marginBottom: '8px'
    }
  },
  debtPoolCardTitle: {
    color: colors.navy.lightGrey,
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 600
  },
  debtPoolCardSubTitle: {
    color: colors.navy.info,
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,

    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '20px'
    }
  },
  pieCanvasGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  pieCanvasBackground: {
    height: '100%',
    background: '#000000',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '100%',
    position: 'relative'
  },
  pieContainer: {
    margin: '49px 81px 28px 81px',
    [theme.breakpoints.down('md')]: {
      margin: '12px 65px 6px 65px'
    },

    [theme.breakpoints.down('sm')]: {
      margin: '12px 23px 0px 23px'
    },

    [theme.breakpoints.down('xs')]: {
      margin: '12px 16px 7px 16px'
    }
  }
}))

export default useStyles
