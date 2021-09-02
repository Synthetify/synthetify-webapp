import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: colors.navy.component,
    borderRadius: 10
  },
  cardContent: {
    padding: 24,
    boxSizing: 'border-box',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: 16
    }
  }
}))

export default useStyles
