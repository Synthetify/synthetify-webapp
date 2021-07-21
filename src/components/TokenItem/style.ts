import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  font: {
    fontSize: 22,
    fontWeight: 400,
    color: colors.navy.lightGrey,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      fontSize: 13
    }
  }
}))

export default useStyles
