import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    ...typography.body2,
    color: colors.navy.lightGrey,
    [theme.breakpoints.down('sm')]: {
      ...typography.subtitle2
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body4
    }
  },
  tooltip: {
    background: colors.navy.info,
    padding: '5px 8px'
  },
  hint: {
    color: colors.white.main,
    fontWeight: 500,
    fontSize: 13,
    lineHeight: '16px'
  }
}))

export default useStyles
