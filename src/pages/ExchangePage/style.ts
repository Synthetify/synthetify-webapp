import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.background,
    minHeight: 'calc(100vh - 161px)',
    [theme.breakpoints.down('md')]: {
      minHeight: 'calc(100vh - 122px)'
    }
  },
  exchange: {
    maxWidth: 855,
    marginTop: 80,
    [theme.breakpoints.down('xs')]: {
      marginTop: 22
    }
  }
}))

export default useStyles
