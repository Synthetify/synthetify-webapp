import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  popover: {
    minWidth: '328px',
    borderRadius: '20px',
    backgroundColor: 'transparent'
  },
  popoverBack: {
    background: colors.navy.darkGrey,
    border: `1px solid ${colors.navy.darkGrey}`,
    boxSizing: 'border-box',
    borderRadius: '5px',
    padding: 14
  },

  customInput: {
    textAlign: 'end'
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
    paddingTop: '4px',
    maxWidth: '100px'
  },
  percentSign: {
    ...typography.subtitle1
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
    opacity: 1,
    border: '0.5px solid transparent',
    background: 'linear-gradient(#1C1C1C, #505050)',
    borderRadius: '10px',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-0.5px',
      bottom: '-0.5px',
      left: '-0.5px',
      right: '-0.5px',
      borderRadius: '10px',
      background: colors.navy.dark
    }
  },
  sliderTrack: {
    height: '4px',
    opacity: 1,
    border: '0.5px solid transparent',
    background: 'linear-gradient(#1C1C1C, #505050)',
    borderRadius: '10px',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-0.5px',
      bottom: '-0.5px',
      left: '-0.5px',
      right: '-0.5px',
      borderRadius: '10px',
      background: colors.navy.dark
    }
  },
  sliderThumb: {
    marginTop: '-5px',
    width: '16px',
    height: '16px',
    border: '5px solid transparent',
    background: '#7A73EA',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      bottom: '-1px',
      left: '-1px',
      right: '-1px',
      background: '#FFFFFF'
    },
    '&:hover': {
      boxShadow: 'none'
    }
  }
}))
export default useStyles
