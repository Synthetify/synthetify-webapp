import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: colors.gray.component
  },
  cardContent: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 1,
      paddingRight: 1
    }
  }
}))

export default useStyles
