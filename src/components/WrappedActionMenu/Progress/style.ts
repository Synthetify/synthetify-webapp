import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    [theme.breakpoints.down('xs')]: {
      ...typography.body4
    }
  },
  icon: {
    paddingRight: 10,
    minWidth: 42
  }
}))

export default useStyles
