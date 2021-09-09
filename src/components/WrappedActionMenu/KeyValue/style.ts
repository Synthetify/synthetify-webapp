import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 14
    }
  },
  property: {
    color: colors.navy.grey
  },
  value: {
    color: colors.navy.lightGrey
  },
  lineHeight: {
    lineHeight: 1.5
  }
}))

export default useStyles
