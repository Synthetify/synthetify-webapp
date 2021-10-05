import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    paddingTop: 32,
    paddingBottom: 48,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 29,
      paddingBottom: 36
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 64,
      paddingBottom: 45
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 124
    }
  },
  innerWrapper: {
    maxWidth: 880,
    paddingInline: 20
  },
  pageRow: {
    '&:not(:last-child)': {
      marginBottom: 24
    },
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
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
