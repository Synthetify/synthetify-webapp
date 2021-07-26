import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontSize: 16,
    color: colors.navy.grey,
    lineHeight: 1.5,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13
    }
  },
  icon: {
    paddingRight: 10,
    minWidth: 42
  }
}))

export default useStyles
