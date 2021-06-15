import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const fontStyle = {
  fontSize: 22,
  fontWeight: 400,
  color: colors.gray.C4
}

const useStyles = makeStyles(() => ({
  tokenSymbol: {
    ...fontStyle
  },
  balance: {
    ...fontStyle
  },
  usdValue: {
    ...fontStyle
  }
}))

export default useStyles
