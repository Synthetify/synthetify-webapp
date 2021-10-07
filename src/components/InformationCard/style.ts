import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  infoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    zIndex: 2
  },
  info: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    zIndex: 3
  },

  text: {
    color: 'red'
  }
}))

export default useStyles
