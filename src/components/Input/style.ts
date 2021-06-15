import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  amountInput: {
    background: colors.gray.gunPowder,
    color: colors.gray.skeletonField,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 27,
    height: 60,
    fontSize: 22,
    minWidth: 250,
    marginTop: 14
  },
  currency: {
    fontSize: 22,
    color: colors.gray.manatee,
    width: 70
  },
  inputLabel: {
    color: colors.gray.skeletonField,
    fontSize: 22,
    lineHeight: '26px',
    marginBottom: '14px',
    fontWeight: 600
  }
}))

export default useStyles
