import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  root: { width: 400, borderRight: `2px solid ${colors.green.hover}`, height: '100%' },
  menuText: {
    color: colors.white.main,
    padding: 16,
    textAlign: 'center'
  },
  menuItem: {
    borderBottom: `2px solid ${colors.black.background}`,
    '&:hover': {
      backgroundColor: `${colors.green.hover}`,
      borderBottom: `2px solid ${colors.green.main}`
    },
    cursor: 'pointer'
  },
  selected: {
    color: colors.green.main
  }
}))

export default useStyles
