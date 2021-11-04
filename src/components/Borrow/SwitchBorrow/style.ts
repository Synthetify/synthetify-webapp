import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    borderRadius: '10px',
    marginBottom: '24px'
  },
  topGrid: {
    padding: '16px 24px 16px 24px'
  },
  buttonGrid: {
    background: colors.navy.background,
    width: 'min-content',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '34px'
  },
  buttonBorrow: {
    ...typography.subtitle1,
    color: colors.white.main,
    borderRadius: '5px',
    minWidth: '95px'
  },
  repayButton: {
    ...typography.subtitle1,
    color: colors.navy.background,
    borderRadius: '5px',
    minWidth: '95px'
  },
  noActiveButton: {
    colors: colors.navy.info,
    background: 'transparent'
  },
  middleGrid: {
    display: 'flex',
    flexDirection: 'row',
    padding: '24px 24px'
  },

  title: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    paddingBottom: 16
  },
  desc: {
    ...typography.subtitle2,
    color: colors.navy.info,
    paddingTop: 12
  },
  divider: {
    background: colors.navy.darkGrey
  },
  cRatioGrid: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 'max-content',
    padding: '0 16px',
    justifyContent: 'center'
  },
  cRatioBack: {
    maxHeight: '64px'
  },
  cRatioButton: {
    ...typography.body1,
    background: colors.navy.dark,
    borderRadius: '0 0 8px 8px',
    width: '100%'
  },
  cRatioTitle: {
    ...typography.body4,
    color: colors.navy.grey,
    background: colors.navy.dark,
    padding: ' 4px 21px 5px 21px',
    borderRadius: '8px 8px 0 0'
  },
  input: {
    minHeight: '64px',

    '& $button:first-child': {
      [theme.breakpoints.up('md')]: {
        minWidth: '107px',
        borderRadius: '6px'
      }
    }
  },
  popover: {
    maxWidth: '90px',
    borderRadius: '5px'
  },
  popoverBack: {
    background: colors.navy.dark,
    border: '1px solid #292956',
    boxSizing: 'border-box',
    borderRadius: '5px',
    padding: '4px'
  },
  popoverButton: {
    width: '100%',
    color: colors.navy.grey,
    ...typography.subtitle2,
    textTransform: 'none',
    padding: '2px',
    minHeight: '28px',
    '&:hover': {
      background: colors.navy.info,
      color: colors.white.main,
      ...typography.body4,
      '& $minValue': {
        ...typography.body3
      }
    }
  },
  popoverInput: {
    color: colors.navy.grey,
    ...typography.subtitle2,
    padding: '2px',
    borderRadius: '5px',
    '&:hover': {
      background: colors.navy.info,
      color: colors.white.main,
      ...typography.body4
    }
  },
  customInput: {
    padding: 0,
    textAlign: 'center',
    minHeight: '28px',
    '&::placeholder': {
      color: colors.navy.grey,
      opacity: 1
    },
    '&:hover': {
      '&::placeholder': {
        background: colors.navy.info,
        color: colors.white.main,
        ...typography.body4
      }
    }
  },
  bottomGrid: {
    display: 'flex',
    flexDirection: 'row',
    padding: '24px',
    justifyContent: 'space-between'
  },
  bottomInfo: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '50%',
    justifyContent: 'space-between'
  },
  minValue: {
    paddingLeft: '3px'
  },
  infoTitle: {
    ...typography.subtitle1,
    color: colors.navy.grey
  },
  infoValueTo: {
    ...typography.subtitle2,
    color: colors.white.main,
    display: 'flex'
  },
  infoValueFrom: {
    ...typography.subtitle1,
    color: colors.white.main,
    display: 'flex'
  },
  flatIcon: {
    padding: '0px 3px',
    width: '18px'
  },
  actionButton: {
    padding: '10px auto',
    minWidth: '170px',
    ...typography.body1,
    marginLeft: '30px',
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
  }
}))
export default useStyles
