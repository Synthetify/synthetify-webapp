import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  valueCard: {
    background: colors.navy.component,
    borderRadius: 10
  },
  valueCardTitle: {
    color: colors.navy.veryLightGrey,
    ...typography.heading4
  },
  valueCardAmount: {
    color: colors.navy.veryLightGrey,
    ...typography.heading1
  },
  questionMark: {
    height: 21,
    width: 21,
    position: 'absolute',
    top: 17,
    right: 20,

    [theme.breakpoints.down('xs')]: {
      height: 29,
      width: 29,
      top: 14
    }
  },
  tooltipArrow: {
    color: colors.navy.navButton,
    borderColor: colors.navy.navButton,
    width: 13,
    marginBlock: '-0.67em !important'
  },
  cardContent: {
    paddingInline: 20,
    paddingTop: 10,
    paddingBottom: 30,
    position: 'relative',
    '&:last-child': {
      paddingTop: 10,
      paddingBottom: 30
    }
  },
  progressCardContent: {
    paddingBottom: 22,
    position: 'relative',
    '&:last-child': {
      paddingBottom: 22
    }
  },
  minMaxDebt: {
    ...typography.body4
  },
  progressContainer: {
    width: '100%',
    marginTop: 40
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
    ...typography.caption1,
    padding: '4px 9px 5px',
    marginBlock: 9
  },
  bottomText: {
    ...typography.caption1,
    color: colors.navy.grey
  }
}))

export const useStylesWithProps = makeStyles<
  Theme,
  {
    max: number
    current: number
    topIndicatorValue: number
    bottomIndicatorValue: number
  }
>(() => ({
  bar: ({ max, current }) => ({
    borderRadius: 10,
    background: `linear-gradient(90deg, #40BFA0 ${
      100 - (max !== 0 ? Math.min((current / max) * 100, 100) : 0)
    }%, #C34848 ${200 - (max !== 0 ? Math.min((current / max) * 100, 100) : 0)}%)`
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
