import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.cinder,
    paddingRight: 0,
    height: 100
  },
  snyLogo: {
    width: 70,
    height: 40,
    margin: 10,
    marginLeft: 50,
    marginRight: 300,

    [theme.breakpoints.down('sm')]: {
      marginLeft: 20,
      marginRight: 20
    }
  },
  dotsIcon: {
    fill: colors.gray.C4
  },
  iconButton: {
    marginRight: 50,
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
    background: `linear-gradient(90deg, ${colors.green.main}, rgba(98, 126, 234, 0))`
  }
}))

export default useStyles
