import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  tokenList: {
    borderRadius: 10,
    background: colors.blue.bastille,
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: 360,
    paddingTop: 5
  },
  tokenItem: {
    margin: 5
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
    background: colors.black.cinder,
    width: 400,
    borderRadius: 10,
    margin: 20,
    padding: 35,
    paddingTop: 25
  },
  modalName: {
    color: colors.gray.C4,
    fontSize: 22,
    lineHeight: '40px',
    float: 'left'
  },
  divider: {
    width: '320px',
    marginTop: -5,
    background: `linear-gradient(90deg, ${colors.green.main}, rgba(98, 126, 234, 0))`
  },
  closeIcon: {
    color: colors.gray.C4
  },
  searchIcon: {
    color: colors.gray.C4,
    margin: 8
  },
  closeButton: {
    float: 'right'
  },
  searchInput: {
    background: colors.black.controls,
    height: 40,
    width: 340,
    lineHeight: 40,
    paddingLeft: 16,
    fontSize: 16,
    borderRadius: 10
  }
}))

export default useStyles
