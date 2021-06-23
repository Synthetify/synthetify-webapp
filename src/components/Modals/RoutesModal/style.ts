import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 220,
    borderRadius: 10,
    margin: 20,
    padding: 20
  },
  listItem: {
    color: colors.gray.C7C9D1,
    borderRadius: 10,
    paddingLeft: 8,
    padding: 10,
    minWidth: 180,
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
