import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.background,
    paddingRight: 0,
    height: 100,

    [theme.breakpoints.down('sm')]: {
      height: 60
    }
  },
  snyLogo: {
    width: 50,
    height: 44,
    margin: 10,
    marginLeft: 50,

    [theme.breakpoints.down('sm')]: {
      margin: 0
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
    marginRight: 30,

    [theme.breakpoints.down('sm')]: {
      margin: 10
    }
  },
  connectedWalletIcon: {
    width: 21,
    height: 21,
    marginRight: 5
  },
  dehazeButton: {
    borderRadius: 10,
    padding: 4,
    paddingTop: 1,
    paddingBottom: 1,

    '&:hover': {
      background: colors.gray.mid
    }
  },
  dehazeIcon: {
    width: 45,
    height: 38,
    fill: colors.gray.veryLight
  }
}))

export default useStyles
