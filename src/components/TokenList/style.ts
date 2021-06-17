import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.card,
    '& > *': {
      marginTop: 20
    }
  },
  card: {
    background: colors.black.card,
    borderRadius: 10,
    padding: 32
  },
  ownedTokens: {
    fontWeight: 400,
    color: colors.gray.manatee,
    fontSize: 22
  },
  headerFont: {
    fontWeight: 600,
    fontSize: 22,
    color: colors.gray.manatee
  }
}))

export default useStyles
