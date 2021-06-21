import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 226,
    borderRadius: 10,
    margin: 20,
    padding: 25
  },
  listItem: {
    borderRadius: 10,
    padding: 0,

    '&:hover': {
      background: colors.gray.mid
    }
  },
  icon: {
    width: 24,
    height: 24,
    display: 'inline',
    margin: '0 9px',
    float: 'left'

  },
  name: {
    color: colors.gray.veryLight,
    textTransform: 'capitalize',
    fontSize: 16,
    float: 'left'
  }
}))

export default useStyles
