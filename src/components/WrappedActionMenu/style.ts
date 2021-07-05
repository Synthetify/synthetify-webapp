import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: colors.gray.component
  },
  cardContent: {
    paddingTop: 40,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 10,
      paddingRight: 10
    }
  }
}))

export default useStyles
