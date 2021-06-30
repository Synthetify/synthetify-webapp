import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: colors.gray.component
  },
  cardContent: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 5,
      paddingRight: 5
    }
  }
}))

export default useStyles
