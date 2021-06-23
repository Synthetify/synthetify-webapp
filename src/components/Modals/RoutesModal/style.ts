import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 200,
    borderRadius: '0 0 10px',
    margin: 20,
    padding: 20
  },
  listItem: {
    color: colors.gray.C7C9D1,
    borderRadius: 10,
    paddingLeft: 12,
    padding: 10,
    minWidth: 160,
    margin: 3,
    cursor: 'pointer',

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 22,
    lineHeight: '40px'
  },
  current: {
    textTransform: 'capitalize',
    fontSize: 22,
    lineHeight: '40px',
    fontWeight: 600,
    color: colors.gray.veryLight
  }
}))

export default useStyles
