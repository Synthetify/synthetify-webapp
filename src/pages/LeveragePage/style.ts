import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    paddingTop: 64,
    paddingBottom: 139,
    display: 'flex',

    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      paddingBottom: 62
    },
    [theme.breakpoints.down('sm')]: {
      paddingBlock: 32
    }
  }
}))
export default useStyles
