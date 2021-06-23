import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 256,
    borderRadius: 10,
    margin: 10,
    padding: 20
  },
  listItem: {
    color: colors.gray.light,
    borderRadius: 10,
    paddingLeft: 16,
    padding: 10,
    minWidth: 220,
    margin: 3,
    cursor: 'pointer',

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '24px'
  },
  network: {
    fontSize: 16,
    lineHeight: '22px'
  }
}))

export default useStyles
