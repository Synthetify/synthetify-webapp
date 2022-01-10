import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    minWidth: '328px',
    borderRadius: '20px'
  },
  popoverBack: {
    background: colors.navy.darkGrey,
    border: `1px solid ${colors.navy.darkGrey}`,
    boxSizing: 'border-box',
    borderRadius: '5px',
    padding: 14
  },
  sliderTitle: {
    ...typography.subtitle1,
    paddingBottom: '10px'
  },
  sliderSubTitle: {
    ...typography.body4,
    color: colors.navy.grey
  },
  sliderNumber: {
    ...typography.subtitle1,
    paddingBottom: '5px',
    paddingTop: '4px'
  },
  sliderRisk: {
    ...typography.body4
  },
  slider: {
    padding: '6px 0px',

    borderRadius: '10px'
  },
  sliderRail: {
    height: '4px',

    color: colors.navy.dark,
    opacity: 1,
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderImage: 'linear-gradient(to bottom, #505050, #1C1C1C) 1',
    borderRadius: '10px'
  },
  sliderTrack: {
    height: '4px',
    color: colors.navy.dark,
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderImage: 'linear-gradient(to bottom, #505050, #1C1C1C) 1',
    borderRadius: '10px'
  },
  sliderThumb: {
    marginTop: '-4px',
    width: '14px',
    height: '14px'
  }
}))
export default useStyles
