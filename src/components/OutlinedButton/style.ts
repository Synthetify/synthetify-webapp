import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  general: {
    borderRadius: 10,
    textAlign: 'center',
    textTransform: 'none',
    fontSize: '22px',
    lineHeight: '26px',
    transition: 'all 500ms ease',
    padding: '10px 19px',
    '&:hover': {
      opacity: 0.9
    }
  },
  disabled: {
    backgroundColor: `${colors.gray.mid} !important`,
    color: `${colors.gray.background} !important`
  }
}))

export default useStyles
