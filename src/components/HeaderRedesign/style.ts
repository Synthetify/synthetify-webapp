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
    marginLeft: 50,
    marginRight: 80

    // [theme.breakpoints.down('sm')]: {
    //   marginLeft: 30,
    //   marginRight: 20
    // }
  },
  dotsIcon: {
    fill: colors.gray.C4
  },
  iconButton: {
    marginRight: 90,
    marginLeft: 50,
    minWidth: 60,

    // [theme.breakpoints.down('md')]: {
    //   marginLeft: 30,
    //   marginRight: 50
    // },

    // [theme.breakpoints.down('sm')]: {
    //   marginLeft: 0,
    //   marginRight: 0
    // },

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
    background: `linear-gradient(90deg, ${colors.green.main}, rgba(98, 126, 234, 0))`
  }
}))

export default useStyles
