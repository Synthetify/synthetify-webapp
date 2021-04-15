import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  root: { width: 100, backgroundColor: colors.blue.subtle, height: '100%' },
  menuText: {
    marginLeft: 20,
    color: colors.white.main
  },
  menuItem: {
    padding: 10,
    '&:hover': {
      backgroundImage: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)'
    },
    cursor: 'pointer'
  },
  selected: {
    fontWeight: 'bold',
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '&:hover': {
      WebkitTextFillColor: colors.black.background
    }
  },
  logo: {
    paddingTop: 50
  },
  icon: {
    background: 'transparent',
    cursor: 'pointer',

    '&:hover path': {
      fill: colors.green.main
    }
  },
  socialsDiv: {
    marginBottom: 40
  }
}))

export default useStyles
