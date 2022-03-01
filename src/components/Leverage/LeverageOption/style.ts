import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapperOption: {
    width: '100%',
    maxWidth: '480px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  },
  root: {
    background: colors.navy.component,
    borderRadius: '10px 10px',
    marginLeft: '24px',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px'
    }
  },
  header: {
    padding: '24px 0px 24px 24px',
    [theme.breakpoints.down('md')]: {
      padding: '16px 0px 16px 16px'
    }
  },
  middleGrid: {
    padding: ' 0 24px 24px 24px',
    [theme.breakpoints.down('md')]: {
      padding: ' 0 16px 16px 16px'
    }
  },
  sliderContainer: {
    padding: '12px 24px 24px 24px',
    [theme.breakpoints.down('md')]: {
      padding: ' 12px 16px 6px 16px'
    }
  },
  markActive: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    opacity: 1,
    transform: 'translateX(-35%) translateY(-3px)',
    border: '1px solid transparent',
    background: 'linear-gradient(#1C1C1C, #505050)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px',
      borderRadius: '50%',
      background: colors.navy.dark
    }
  },
  markLabel: {
    color: colors.navy.info,
    ...typography.caption1,
    paddingTop: '2px'
  },
  headerTitle: {
    ...typography.heading4,
    color: colors.navy.veryLightGrey
  },
  smallTitle: {
    ...typography.body4,
    color: colors.navy.grey
  },
  smallValue: {
    ...typography.body3,
    color: colors.navy.veryLightGrey,
    paddingLeft: '5px'
  },
  smallInfoGrid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '8px'
  },
  infoGrid: {
    display: 'flex',
    width: 'max-content',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
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
      background: colors.green.button
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
  sliderRisk: {
    ...typography.body4
  },
  slider: {
    padding: '10px 0px',
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
    marginTop: '-6px',
    width: '16px',
    height: '16px',
    border: '3px solid transparent',
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
  blur: {
    filter: 'blur(4px) brightness(0.7)'
  },
  buttonRed: {
    background: colors.red.error,
    '&:hover': {
      background: '#CC4949'
    }
  },
  buttonGreen: {
    background: colors.green.button,
    color: colors.navy.background,
    '&:hover': {
      background: '#53dbba'
    }
  },
  progress: {
    transform: 'scale(0.7)',
    height: '30px',
    alignItems: 'center',
    '& >div': {
      height: '30px!important'
    }
  },
  circleIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8,
    marginTop: 6
  },
  tooltipTitle: {
    ...typography.subtitle1
  },
  exclamationMark: {
    height: 14,
    width: 14,

    marginLeft: 8,

    [theme.breakpoints.down('sm')]: {
      marginTop: 2
    },

    '&:hover': {
      cursor: 'pointer'
    }
  },
  disabled: {
    backgroundColor: 'transparent',
    filter: 'brightness(0.5)'
  }
}))
export default useStyles
