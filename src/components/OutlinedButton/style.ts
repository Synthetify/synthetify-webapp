import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  general: {
    borderRadius: 10,
    textAlign: 'center',
    textTransform: 'none',
    fontSize: '22px',
    lineHeight: '26px',
    transition: 'all 500ms ease',
    padding: '10px 19px',
    fontWeight: 100,
    '&:hover': {
      opacity: 0.9
    }
  },
  disabled: {
    background: `${colors.navy.navButton} !important`,
    color: `${colors.navy.background} !important`,
    fontWeight: 500
  }
}))

export default useStyles
