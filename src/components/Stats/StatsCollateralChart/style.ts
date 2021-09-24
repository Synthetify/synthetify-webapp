import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: colors.navy.component,
    width: '1072px',
    height: 333,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    padding: 0,
    [theme.breakpoints.down('md')]: {
      width: '846px'
    },
    [theme.breakpoints.down('sm')]: {
      height: 327,
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 500
    }
  },

  statsWrapper: {
    width: '100%',
    height: 'calc(100% - 90px)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 50px)',
      justifyContent: 'center',
      marginLeft: '10%'
    }
  },
  headerWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    left: 24,
    top: 12,
    height: 80,
    width: 'calc(100% - 26px)',
    [theme.breakpoints.down('xs')]: {
      top: 4
    }
  },
  title: {
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 600,
    color: colors.navy.veryLightGrey,
    position: 'relative'
  },
  subTitle: {
    fontSize: 16,
    lineHeight: '40px',
    fontWeight: 500,
    color: colors.navy.info,
    position: 'relative',
    width: 'calc(100% - 16px)',
    top: -8,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      lineHeight: '20px'
    }
  },

  chartWrapper: {
    width: 'calc(100% - 13.8px)',
    height: 85,
    backgroundColor: colors.navy.background,
    borderRadius: 10,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 8.06px)',
      height: 'calc(100% - 8px)'
    },
    [theme.breakpoints.down('xs')]: {
      width: 95,
      height: 'calc(100% - 10px)'
    },

    '& text': {
      fontWeight: 700,
      fontSize: 15
    }
  },

  border: {
    width: 'calc(100% - 48px)',
    height: 103,
    backgroundColor: colors.navy.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
    top: 24,
    [theme.breakpoints.down('sm')]: {
      height: 84,
      width: 'calc(100% - 32px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 404,
      width: 103,
      top: -4,
      left: '2%'
    }
  },
  legendWrapper: {
    height: 120,
    margin: 0,
    top: 20,
    fontSize: 18,
    position: 'relative',
    width: 'calc(100% - 20px)',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      top: 0,
      left: 0,
      width: '50%',
      alignItems: 'flex-end',
      height: 377
    }
  },
  legendList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      height: '100%',
      width: '100%',
      left: -25
    }
  },

  legendItem: {
    marginBottom: -10,
    marginRight: 35,
    fontSize: 18,
    lineHeight: '40px',
    fontFamily: 'Be Vietnam',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: -5,
      fontSize: 16
    }
  }

}))

export default useStyles
