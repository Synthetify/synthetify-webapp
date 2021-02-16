import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  titleText: {
    color: colors.green.main,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleValueText: {
    color: colors.white.main,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  root: {
    // paddingLeft: 100,
    // paddingRight: 100
  },
  userStats: {
    backgroundColor: 'rgba(7,46,90,0.5)',
    padding: 80,
    borderRadius: 10
  },
  title: {
    marginLeft: 10,
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: 'bold',
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  titleDiv: {
    marginBottom: 16,
    paddingBottom: 8
  },
  actionsDiv: {
    height: 100,
    backgroundColor: colors.blue.deepAccent,
    borderRadius: 10,
    padding: '16px 30px',
    width: '100%'
  },
  button: {
    backgroundColor: colors.blue.accent,
    color: colors.white.main,
    height: 70,
    padding: 15,
    borderRadius: 2,
    cursor: 'pointer',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.45)',
    '&:hover': {
      // opacity: '0.7',
      color: colors.black.background,
      background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)'
    }
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  divider: {
    width: 80
  },
  info: {
    backgroundColor: colors.blue.deepAccent,
    minWidth: 800,
    borderRadius: 10,
    overflow: 'hidden'
  },
  headers: {
    paddingTop: 15,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 15
  },
  balanceDiv: {
    minWidth: 350
  },
  fieldName: {
    fontWeight: 'bold'
  },
  burnButton: {
    marginLeft: 20,
    marginRight: -20,
    width: 'auto',
    color: colors.red.neon,
    borderColor: colors.red.neon,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.red.neon}`,
      borderColor: colors.red.neon
    }
  }
}))

export default useStyles
