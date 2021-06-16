import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  root: {
    background: colors.black.cinder,
    paddingRight: 0,
    height: 100
  },
  snyLogo: {
    width: 60,
    height: 44,
    margin: 20
  },
  dotsIcon: {
    fill: colors.gray.C4
  },
  iconButton: {
    marginLeft: 30,
    marginRight: 50,

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
