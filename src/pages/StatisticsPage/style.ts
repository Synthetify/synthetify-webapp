import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0
  },
  container: {
    background: colors.navy.background,
    minHeight: 'calc(100vh - 77px)',
    paddingTop: 64,
    paddingBottom: 139,
    [theme.breakpoints.down('md')]: {
      paddingBottom: 62,
      minHeight: 'calc(100vh - 122px)'
    },
    [theme.breakpoints.down('sm')]: {
      paddingBlock: 32
    }
  },
  innerWrapper: {
    width: 1064,
    [theme.breakpoints.down('md')]: {
      width: 886
    },
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      paddingInline: 20
    }
  },
  linePlot: {
    paddingBottom: 24,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 16
    }
  },
  header: {
    ...typography.heading1,
    color: colors.navy.veryLightGrey,
    padding: '0 0 24px 0'
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
