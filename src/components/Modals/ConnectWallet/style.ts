import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 226,
    borderRadius: 10,
    margin: 13,
    padding: 20,

    [theme.breakpoints.down('md')]: {
      margin: 24
    }
  },
  listItem: {
    color: colors.gray.light,
    borderRadius: 10,
    padding: 7,
    width: 188,
    margin: 3,
    cursor: 'pointer',

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  icon: {
    width: 24,
    height: 24,
    display: 'inline',
    float: 'left',
    marginRight: 10
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 16,
    lineHeight: '24px',
    float: 'left'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
