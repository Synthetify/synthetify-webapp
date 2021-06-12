import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/redesign-theme'

const useStyles = makeStyles((theme: Theme) => ({
  general: {
    borderRadius: 10,
    backgroundColor: colors.black.black1,
    color: colors.gray.C4C4C4,
    fontWeight: 600,
    textAlign: 'center',
    textTransform: 'none',
    fontSize: '22px',
    lineHeight: '26px',
    transition: 'all 500ms ease',
    padding: '6px 14px',
    boxShadow: '2px 2px 0px rgba(24, 22, 29, 0.5), -2px -2px 0px rgba(137, 139, 156, 0.5)'
  },
  disabled: {
    opacity: 0.5
  }
}))

export default useStyles
