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
  userStats: {
    backgroundColor: 'rgba(7,46,90,0.5)',
    padding: 80,
    borderRadius: 10
  },
  gutter: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 20,
      marginBottom: 0,
      '&:first-child': {
        marginLeft: 0
      }
    }
  }
}))

export default useStyles
