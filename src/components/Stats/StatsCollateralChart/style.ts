import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#1D1D49',
    width: 855,
    height: 333,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: 413,
      height: 500
    }
  },

  statsWrapper: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'nowrap'
    }
  },
  headerWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    left: 24,
    top: 12,
    height: 80,
  },
  title: {
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 600,
    color: colors.navy.veryLightGrey,
    position: 'relative'
  },
  subTitle: {
    fontSize: '16px',
    lineHeight: '40px',
    fontWeight: 400,
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
    // width: 1006.5,
    width: 'calc(100% - 13.8px)',
    height: 110.6,
    backgroundColor: '#0C0D2C',
    borderRadius: 10,
    overflow: 'hidden',
     [theme.breakpoints.down('md')]: {
       width: 'calc(100% - 13.8px)',
       height: 85,
     },

    [theme.breakpoints.down('xs')]: {
      width: 95,
      height: 'calc(100% - 10px)'
    },

    [theme.breakpoints.up('lg')]: {
      opacity: .2
    },

    '& text': {
      fontWeight: 700,
      fontSize: 15
    }
  },

  border: {
    width: 'calc(100% - 48px)',
    height: 128,
    backgroundColor: colors.navy.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: 103,
      width: 'calc(100% - 48px)',
      position: 'relative',
      top: 8
    },
    [theme.breakpoints.down('xs')]: {
      height: 404,
      width: 103,
      position: 'relative',
      left: 2,
      bottom: 0
    }
  },

  legendWrapper: {
    display: 'flex',
    fontSize: 18,
    flexWrap: 'wrap',
    position: 'relative',
    top: -10,
    height:138,
    width: 'calc(100% - 48px)',
    //justifyContent:'space-between',
    alignItems:'center',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
      height: '100%',
      width: '40%',
      position: 'relative',
      top: 0
    },

    '& li': {
      marginRight: 35,
      marginBottom: -10,

      [theme.breakpoints.down('xs')]: {
        margin: '0 10 -5px 10'
      }
    }
  },
  legendItem: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '40px',
    fontFamily: 'Inter'
  }
}))

export default useStyles
