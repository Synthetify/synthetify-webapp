import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontSize: 22,
    color: colors.navy.lightGrey,
    lineHeight: 1.5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    }
  },
  tooltip: {
    background: colors.navy.info,
    padding: '5px 8px'
  },
  hint: {
    color: colors.white.main,
    fontWeight: 400,
    fontSize: 13,
    lineHeight: '16px'
  }
}))

export default useStyles
