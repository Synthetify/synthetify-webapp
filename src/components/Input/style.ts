import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  amountInput: {
    backgroundColor: colors.gray.gunPowder,
    color: colors.gray.skeletonField,
    borderRadius: 10,
    padding: 16,
    height: 60,
    fontSize: 22
  }
}))

export default useStyles
