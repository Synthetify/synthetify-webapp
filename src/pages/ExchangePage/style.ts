import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    minHeight: 'calc(100vh - 161px)',
    paddingInline: 0,
    [theme.breakpoints.down('sm')]: {
      paddingInline: 20
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: 20,
      minHeight: 'calc(100vh - 122px)'
    }
  },
  exchange: {
    width: 855,
    marginTop: 80,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 22,
      marginBottom: 60
    }
  }
}))

export default useStyles
