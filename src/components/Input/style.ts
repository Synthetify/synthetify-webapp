import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: colors.gray.dark,
    color: colors.gray.light,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 32,
    height: 60,
    fontSize: 22,
    minWidth: 150,
    width: '100%'
  },
  currency: {
    fontSize: 22,
    color: colors.gray.light,
    width: 70
  },
  inputLabel: {
    color: colors.gray.veryLight,
    fontSize: 22,
    lineHeight: '26px',
    fontWeight: 600
  }
}))

export default useStyles
