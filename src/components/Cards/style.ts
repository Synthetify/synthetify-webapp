import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  valueCard: {
    background: colors.gray.component,
    borderRadius: 10
  },
  valueCardTitle: {
    color: colors.gray.light,
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 400
  },
  valueCardAmount: {
    color: colors.gray.veryLight,
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '40px'
  },
  divider: {
    width: 139,
    marginTop: 6,
    marginBottom: 15,
    background: colors.gray.light
  },
  questionMark: {
    height: 17,
    width: 17,
    float: 'right'
  },
  tooltip: {
    background: colors.gray.mid,
    color: colors.gray.veryLight,
    fontSize: 13,
    padding: '5px 8px'
  },
  tooltipArrow: {
    color: colors.gray.mid,
    width: 12
  }
}))

export default useStyles
