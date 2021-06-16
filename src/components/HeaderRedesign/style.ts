import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  root: {
    background: colors.black.cinder,
    padding: '25px',
    paddingRight: 0,
    height: 100
  },
  snyLogo: {
    width: 60,
    height: 44,
    marginRight: 20
  },
  dotsIcon: {
    fill: colors.gray.C4
  },
  iconButton: {
    margin: 30,
    marginRight: 50,

    '&:hover': {
      background: colors.blue.bastille,
      color: colors.gray.skeletonField,
      fontWeight: 700
    }
  }
}))

export default useStyles
