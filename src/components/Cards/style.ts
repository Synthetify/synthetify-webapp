import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
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
    padding: '5px 8px',
    fontWeight: 400
  },
  tooltipArrow: {
    color: colors.gray.mid,
    borderColor: colors.gray.mid,
    width: 13,
    marginBlock: '-0.67em !important'
  }
}))

export default useStyles
