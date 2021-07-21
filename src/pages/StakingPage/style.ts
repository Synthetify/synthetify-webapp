import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    paddingTop: 20,
    paddingBottom: 60,
    [theme.breakpoints.up('md')]: {
      paddingTop: 80,
      paddingBottom: 0
    }
  },
  innerWrapper: {
    width: '100%',
    paddingInline: 20,
    [theme.breakpoints.up('md')]: {
      width: 850,
      paddingInline: 0
    }
  },
  pageRow: {
    '&:not(:last-child)': {
      marginBottom: 20
    },
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
      '&:not(:last-child)': {
        marginBottom: 30
      }
    }
  },
  statsTile: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 30,
      marginBottom: 0,
      '&:first-child': {
        marginLeft: 0
      }
    }
  }
}))

export default useStyles
