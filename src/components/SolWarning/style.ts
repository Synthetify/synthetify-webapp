import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  warningContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '12px 24px 24px 24px',
    width: 536,
    borderRadius: 20,
    backgroundColor: colors.navy.component
  },
  warningHeader: {
    color: colors.red.error,
    ...typography.body1,
    paddingBottom: 28
  },
  warningText: {
    color: colors.navy.grey,
    ...typography.subtitle1,
    textAlign: 'center',
    paddingBottom: 28
  },
  warningButton: {
    backgroundColor: colors.navy.button,
    color: colors.navy.veryLightGrey,
    ...typography.subtitle1,
    borderRadius: 8,
    padding: '10px 28px',
    '&:hover': {
      backgroundColor: colors.navy.button
    }
  }
}))

export default useStyles
