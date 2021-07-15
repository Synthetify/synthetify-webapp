import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: colors.gray.component,
    borderRadius: 10
  },
  cardContent: {
    paddingTop: 40,
    boxSizing: 'border-box',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 36,
    [theme.breakpoints.down('xs')]: {
      paddingInline: 15
    }
  }
}))

export default useStyles
