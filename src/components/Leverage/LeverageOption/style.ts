import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapperOption: {
    width: '100%',
    maxWidth: '480px'
  },
  root: {
    background: colors.navy.component,
    borderRadius: '10px 10px',
    margin: ' 0px 0px 24px 24px'
  },
  header: {
    padding: '24px 0px 15px 24px'
  },
  headerTitle: {
    ...typography.heading4,
    color: colors.navy.veryLightGrey
  },
  infoTitle: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  infoValue: {
    ...typography.body1,
    color: colors.navy.veryLightGrey,
    [theme.breakpoints.down('xs')]: {
      ...typography.subtitle1
    }
  },
  divider: {
    background: colors.navy.darkGrey
  },
  actionButton: {
    padding: '5px 0',
    minWidth: '116px',
    ...typography.subtitle1,
    marginLeft: '16px',
    textTransform: 'capitalize',
    '&:hover': {
      background: '#4ADFBA'
    },
    '&:disabled': {
      pointerEvents: 'auto !important'
    },

    '&:disabled:hover': {
      backgroundColor: `${colors.navy.darkGrey} !important`,
      pointerEvents: 'auto !important'
    }
  },
  resetButton: {
    color: colors.navy.background,
    background: colors.navy.grey,
    padding: '5px 0',
    minWidth: '116px',
    ...typography.subtitle1,
    '&:hover': {
      background: '#c8cdf5'
    },
    '&:disabled': {
      pointerEvents: 'auto !important'
    },

    '&:disabled:hover': {
      backgroundColor: `${colors.navy.darkGrey} !important`,
      pointerEvents: 'auto !important'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '104px',
      padding: '5px 0',
      ...typography.subtitle1
    }
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
  }
}))
export default useStyles
