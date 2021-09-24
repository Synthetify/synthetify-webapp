import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    ...typography.body2,
    [theme.breakpoints.down('sm')]: {
      ...typography.body4
    }
  },
  property: {
    color: colors.navy.grey
  },
  value: {
    color: colors.navy.lightGrey
  }
}))

export default useStyles
