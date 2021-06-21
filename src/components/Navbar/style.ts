import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: '115px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontFamily: theme.typography.fontFamily,
    color: colors.gray.C7C9D1,
    padding: '5px 20px',
    lineHeight: '40px',
    borderRadius: 5,
    fontSize: '16px',
    textTransform: 'none',
    boxShadow: 'none',

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight,
      fontWeight: 600
    }
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
