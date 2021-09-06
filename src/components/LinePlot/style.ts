import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  linePlot: {
    height: '190px'
  },
  tooltipRoot: {
    backgroundColor: colors.navy.darkGrey,
    borderRadius: 7,
    border: `0.5px solid ${colors.navy.grey}`,
    padding: 8,
    position: 'relative',
    top: -6
  },
  tooltipDate: {
    color: colors.navy.veryLightGrey,
    fontSize: 10,
    lineHeight: '12px',
    fontWeight: 700,
    marginBottom: 2,
    textTransform: 'uppercase'
  },
  tooltipValue: {
    color: colors.green.main,
    fontSize: 10,
    lineHeight: '12px',
    textAlign: 'center'
  }
}))

export default useStyles
