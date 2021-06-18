import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  tokenList: {
    borderRadius: 10,
    background: colors.gray.steel,
    overflowX: 'hidden',
    overflowY: 'hidden',
    height: 360,
    padding: 3
  },
  tokenItem: {
    margin: 5,
    borderRadius: 10,
    width: 180,

    '&:hover': {
      background: colors.gray.mulledWine
    }
  },
  tokenName: {
    color: colors.gray.athens,
    fontSize: 16
  },
  tokenIcon: {
    width: 20,
    height: 20,
    marginLeft: 12,
    marginRight: 14
  },
  root: {
    background: colors.blue.charade,
    width: 250,
    borderRadius: 10,
    margin: 20,
    padding: 0,
    paddingTop: 15,
    paddingBottom: 10
  },
  searchIcon: {
    color: colors.gray.C4,
    margin: 8
  },
  searchInput: {
    background: colors.gray.steel,
    height: 40,
    lineHeight: 40,
    paddingLeft: 16,
    fontSize: 16,
    borderRadius: 10
  },
  scrollbar: {
    background: colors.green.main,
    borderRadius: 10
  }
}))

export default useStyles
