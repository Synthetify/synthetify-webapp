import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  linePlot: {
    height: '190px',
    '& g > g >line': {
      stroke: '#A3A8CE!important'
    },
    '&  g > text': {
      stroke: 'none',
      fill: '#A3A8CE!important',
      fontFamily: 'Be Vietnam!important'
    }
  },
  tooltipRoot: {
    width: 122,
    backgroundColor: colors.navy.darkGrey,
    borderRadius: 7,
    border: `0.5px solid ${colors.navy.grey}`,
    padding: 8,
    position: 'relative',
    top: -6
  },
  tooltipDate: {
    color: colors.navy.veryLightGrey,
    ...typography.caption3,
    marginBottom: 2,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  tooltipValue: {
    color: colors.green.main,
    ...typography.caption2,
    textAlign: 'center'
  },
  tooltipPoint: {
    height: 5,
    color: colors.navy.veryLightGrey,
    zIndex: 2,
    position: 'absolute',
    bottom: -23,
    left: 57
  }
}))

export default useStyles
