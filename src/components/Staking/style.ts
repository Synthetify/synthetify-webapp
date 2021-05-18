import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: 60
    // paddingRight: 100
  },
  statsContainer: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      flexWrap: 'nowrap'
    }
  },
  title: {
    marginLeft: 10,
    paddingTop: 56,
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
    height: 240,
    backgroundColor: colors.blue.deepAccent,
    borderRadius: 10,
    padding: '26px 30px',
    width: '100%'
  },
  button: {
    backgroundColor: colors.blue.accent,
    color: colors.white.main,
    height: '100%',
    // padding: 15,
    paddingTop: 30,
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
    fontWeight: 'bold',
    paddingTop: 10
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
