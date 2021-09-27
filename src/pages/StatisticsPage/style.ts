import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0
  },
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '64px 0',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: '64px 19px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '32px 16px'
    }
  },
  cardContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '100%'
  },
  linePlot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 24,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 16
    }
  },
  header: {
    fontSize: 32,
    fontFamily: 'Be Vietnam',
    lineHeight: '40px',
    color: colors.navy.veryLightGrey,
    padding: '0 0 24px 0',
    margin: '0 auto',
    width: 1063,
    [theme.breakpoints.down('md')]: {
      width: 846
    }
  },
  gridItem: {
    paddingBottom: 12
  },
  '@keyframes slide': {
    from: {
      transform: 'translateX(50px)'
    },
    to: {
      transform: 'translateX(0px)'
    }
  },
  slide: {
    animation: '$slide .2s'
  }
}))

export default useStyles
