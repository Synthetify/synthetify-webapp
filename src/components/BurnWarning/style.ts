import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  test: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      margin: '0 18px'
    }
  },
  warningCard: {
    backgroundColor: colors.navy.component,
    position: 'relative',
    zIndex: 11,
    background: 'transparent',
    padding: '36px 35px',
    borderRadius: 20,
    textAlign: 'center',
    color: colors.navy.grey
  },
  warningHeader: {
    color: colors.navy.veryLightGrey,
    ...typography.body1,
    paddingBottom: 28
  },
  warningInfo: {
    paddingBottom: 14,
    ...typography.subtitle1
  },
  infoLosingRewars: {
    color: colors.red.error,
    display: 'block',
    ...typography.subtitle1
  },
  warningConfirm: {
    ...typography.subtitle1,
    paddingBottom: 28
  },
  warninigButtons: {
    '& > *': {
      width: 120,
      height: 44
    }
  },
  btnBurn: {
    backgroundColor: colors.green.button,
    ...typography.subtitle1,
    color: colors.navy.background,
    marginRight: 16,
    '&:hover': {
      backgroundColor: '#4ADFBA !important'
    }
  },
  btnCancel: {
    backgroundColor: colors.navy.button,
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey
  }
}))

export default useStyles
