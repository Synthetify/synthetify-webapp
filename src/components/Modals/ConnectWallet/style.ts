import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 226,
    borderRadius: 10,
    margin: 20,
    padding: 20
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
  logout: {
    fill: colors.gray.C7C9D1,
    float: 'right',
    padding: 3,
    margin: 0,
    height: 26,
    width: 26,

    '&:hover': {
      background: colors.gray.light
    }
  },
  logoutIcon: {
    fill: colors.gray.C7C9D1,
    height: 20,
    width: 20
  }
}))

export default useStyles
