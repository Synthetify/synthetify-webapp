import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  amountInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    borderRadius: 10,
    paddingInline: 10,
    height: 56,
    fontSize: 22,
    fontWeight: 600,
    minWidth: 148,

    [theme.breakpoints.down('xs')]: {
      height: 48,
      fontSize: 13,
      paddingInline: 8,
      borderRadius: 6
    }
  },
  maxButton: {
    fontSize: 15,
    width: 64,
    height: 36,
    borderRadius: 5,

    '&:hover': {
      backgroundColor: '#7C76DA'
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 48,
      width: 48,
      height: 32,
      fontSize: 13,
      padding: 0
    }
  }
}))

export default useStyles
