import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  warningContainer: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px) brightness(1.2)'
  },
  warningCard: {
    backgroundColor: colors.navy.component,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 11,
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
    color: colors.navy.background,
    marginRight: 16,
    '&:hover': {
      backgroundColor: colors.green.button
    }
  },
  btnCancel: {
    backgroundColor: colors.navy.button,
    color: colors.navy.veryLightGrey,
    '&:hover': {
      backgroundColor: colors.navy.button
    }
  }
}))

export default useStyles
