import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  tokenDivDark: {
    backgroundColor: colors.blue.deepAccent,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 12,
    paddingBottom: 12,
    '&:hover': {
      backgroundColor: 'rgba(9,11,27,0.3)'
    }
  },
  tokenDivLight: {
    backgroundColor: colors.blue.accent,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 8,
    paddingBottom: 8,
    '&:hover': {
      backgroundColor: 'rgba(9,11,27,0.3)'
    }
  },
  field: {
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 16
  },
  balance: {
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  swapButton: {
    marginLeft: 8,
    color: colors.purple.orchid,
    borderColor: colors.purple.orchid,
    '&:hover': {
      borderWidth: 2,
      color: colors.black.background,
      backgroundColor: `${colors.purple.orchid}`,
      borderColor: colors.purple.orchid
    }
  },
  balanceDiv: {
    minWidth: 350
  },
  tokenName: {
    fontWeight: 'bold',
    color: colors.green.main
  }
}))

export default useStyles
