import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    backgroundColor: colors.navy.component,
    position: 'relative',
    borderRadius: 20,
    maxWidth: '480px',
    border: '1px solid #6261A3',
    top: '50%!important',
    left: '50%!important',
    marginTop: '-240px',
    marginLeft: '-240px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '95vw',
      marginLeft: '-47.5vw'
    }
  },
  divider: {
    background: colors.navy.darkGrey
  },
  sliderContainer: {
    padding: ' 0px 24px 0px 24px'
  },
  sliderRisk: {
    ...typography.body4
  },
  slider: {
    padding: '10px 0px',
    borderRadius: '10px'
  },
  sliderRail: {
    height: '6px',
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
    height: '6px',
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
    marginTop: '-8px',
    width: '24px',
    height: '24px',
    border: '5px solid transparent',
    background: '#7A73EA',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '1px',
      bottom: '1px',
      left: '1px',
      right: '1px',
      background: '#FFFFFF'
    },
    '&:hover': {
      boxShadow: 'none'
    }
  },
  headerTitle: {
    color: colors.navy.veryLightGrey,
    ...typography.heading3,
    padding: '24px 0 0 24px'
  },
  infoTitle: {
    color: colors.navy.lightGrey,
    ...typography.subtitle2
  },
  infoValue: {
    color: colors.navy.veryLightGrey,
    ...typography.subtitle1
  },
  mainGrid: {
    padding: '24px'
  },
  smallTextHeader: {
    color: colors.navy.lightGrey,
    ...typography.body4
  },
  smallValue: {
    color: colors.navy.veryLightGrey,
    ...typography.body1
  },
  button: {
    width: '100%'
  }
}))

export default useStyles
