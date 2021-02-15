import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  titleText: {
    color: colors.green.main,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleValueText: {
    color: colors.white.main,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  root: {
    // paddingLeft: 100,
    // paddingRight: 100
  },
  userStats: {
    backgroundColor: 'rgba(7,46,90,0.5)',
    padding: 80,
    borderRadius: 10,
    maxWidth: 1300
  }
}))

export default useStyles
