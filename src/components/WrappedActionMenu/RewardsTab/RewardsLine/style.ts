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
      paddingTop: 2,
      ...typography.body4
    }
  },
  textContainer: {
    margin: '0 -15px 0 15px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 -15px 0 7px'
    }
  },
  tooltip: {
    background: colors.navy.info,
    padding: '5px 8px'
  },
  hint: {
    color: colors.white.main,
    fontWeight: 600,
    fontSize: 13,
    lineHeight: '16px'
  }
}))

export default useStyles
