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
    width: 100,
    backgroundColor: colors.navy.darkGrey,
    borderRadius: 7,
    border: `0.5px solid ${colors.navy.grey}`,
    padding: 4,
    position: 'relative',
    top: -6
  },
  tooltipDate: {
    color: colors.navy.veryLightGrey,
    ...typography.caption3,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  tooltipValue: {
    color: colors.green.main,
    textAlign: 'center',
    ...typography.caption2
  },
  tooltipPoint: {
    height: 5,
    color: colors.navy.veryLightGrey,
    zIndex: 2,
    position: 'absolute',
    bottom: -23,
    left: 42
  }
}))

export default useStyles
