import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    minHeight: 'calc(100vh - 161px)',
    paddingInline: 0,
    [theme.breakpoints.down('sm')]: {
      paddingInline: 20,
      paddingBottom: 72
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: 40,
      minHeight: 'calc(100vh - 122px)'
    }
  },
  exchange: {
    width: 855,
    marginTop: 80,
    [theme.breakpoints.down('md')]: {
      marginTop: 29
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 22,
      maxWidth: 895
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 60
    }
  }
}))

export default useStyles
