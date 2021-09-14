import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
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
  exchange: {
    width: 1064,
    [theme.breakpoints.down('md')]: {
      width: 886
    },
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      paddingInline: 20
    }
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '40px',
    color: colors.navy.veryLightGrey,
    marginBottom: 16
  },
  row: {
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  plotWrapper: {
    marginLeft: 24,
    maxWidth: 312,

    [theme.breakpoints.down('md')]: {
      marginLeft: 32,
      maxWidth: 272
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
      marginLeft: 0,
      marginTop: 24
    },

    [theme.breakpoints.down('xs')]: {
      marginTop: 16
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
