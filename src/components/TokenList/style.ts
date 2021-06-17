import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.card,
    '& > *': {
      marginTop: 15
    }
  },
  card: {
    background: colors.black.card,
    borderRadius: 10,
    padding: 32
  },
  header: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  ownedTokens: {
    fontWeight: 400,
    color: colors.gray.manatee,
    fontSize: 22
  },
  headerFont: {
    fontWeight: 600,
    fontSize: 22,
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    },
    color: colors.gray.manatee
  },
  divider: {
    background: `linear-gradient(90deg, ${colors.black.controls}, rgba(255, 255, 255, 0))`
  },
  diverMargin: {
    margin: 18
  }
}))

export default useStyles
