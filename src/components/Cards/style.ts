import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  valueCard: {
    background: colors.navy.component,
    borderRadius: 10
  },
  valueCardTitle: {
    color: colors.navy.lightGrey,
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 600
  },
  valueCardAmount: {
    color: colors.navy.veryLightGrey,
    fontSize: 40,
    fontWeight: 700,
    lineHeight: '40px'
  },
  questionMark: {
    height: 20,
    width: 20,
    float: 'right'
  },
  tooltip: {
    color: colors.navy.lightGrey,
    fontSize: 13,
    fontWeight: 500
  },
  tooltipArrow: {
    color: colors.navy.navButton,
    borderColor: colors.navy.navButton,
    width: 13,
    marginBlock: '-0.67em !important'
  },
  progressContent: {
    paddingBottom: 13,
    '&:last-child': {
      paddingBottom: 13
    }
  },
  minMaxDebt: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 'unset',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16
    }
  },
  progressContainer: {
    width: '100%',
    marginTop: 35,
    marginBottom: 17
  },
  progressRoot: {
    width: '100%',
    height: 16,
    borderRadius: 10,
    background: colors.navy.background
  },
  popper: {
    zIndex: 0
  },
  progressTooltip: {
    background: colors.navy.navButton,
    color: colors.navy.veryLightGrey,
    fontSize: 13,
    padding: '7px 16px',
    fontWeight: 400,
    marginBlock: 5
  }
}))

export const useStylesWithProps = makeStyles<Theme, {
  max: number
  current: number
  topIndicatorValue: number
  bottomIndicatorValue: number
}>(() => ({
  bar: ({ max, current }) => ({
    borderRadius: 10,
    background: `linear-gradient(90deg, #40BFA0 ${100 - (max !== 0 ? Math.min((current / max) * 100, 100) : 0)}%, #C34848 ${200 - (max !== 0 ? Math.min((current / max) * 100, 100) : 0)}%)`
  }),
  topIndicator: ({ max, topIndicatorValue }) => ({
    width: 0.1,
    height: 0.1,
    marginLeft: `${max !== 0 ? Math.min((topIndicatorValue / max) * 100, 100) : 0}%`
  }),
  bottomIndicator: ({ max, bottomIndicatorValue }) => ({
    width: 0.1,
    height: 0.1,
    marginLeft: `${max !== 0 ? Math.min((bottomIndicatorValue / max) * 100, 100) : 0}%`
  })
}))

export default useStyles
