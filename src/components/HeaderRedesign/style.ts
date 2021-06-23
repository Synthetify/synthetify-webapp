import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.background,
    paddingRight: 0,
    height: 100
  },
  snyLogo: {
    width: 80,
    height: 44,
    margin: 10,
    marginLeft: 50
  },
  dotsIcon: {
    fill: colors.gray.C7C9D1
  },
  iconButton: {
    marginRight: 90,
    marginLeft: 50,
    minWidth: 60,

    '&:hover': {
      background: colors.blue.bastille,
      color: colors.gray.skeletonField,
      fontWeight: 700
    }
  },
  divider: {
    width: '100%',
    marginTop: 15,
    marginLeft: -17,
    background: colors.gray.light
  },
  verticalDivider: {
    background: colors.gray.light,
    height: 50,
    marginLeft: 60,
    marginRight: 30
  },
  connectedWalletIcon: {
    width: 21,
    height: 21,
    marginRight: 5
  }
}))

export default useStyles
