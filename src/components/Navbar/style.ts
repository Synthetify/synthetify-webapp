import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: '115px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: colors.gray.C7C9D1,
    padding: '2px 20px',
    lineHeight: '40px',
    borderRadius: 5,
    fontSize: '16px',
    textTransform: 'capitalize',
    boxShadow: 'none',

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  active: {
    background: colors.gray.mid,
    color: colors.gray.veryLight,
    minWidth: '115px',
    padding: '2px 20px',
    lineHeight: '40px',
    borderRadius: 5,
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'capitalize',
    boxShadow: 'none'
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
