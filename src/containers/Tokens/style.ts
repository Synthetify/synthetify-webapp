import { makeStyles } from '@material-ui/core/styles'
import { colors } from '#static/theme'

const useStyles = makeStyles(() => ({
  info: {
    backgroundColor: colors.blue.deepAccent,
    minWidth: 800,
    borderRadius: 10,
    overflow: 'hidden'
  },
  root: {
    width: '100%',
    marginTop: 32
  },
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  titleDiv: {
    marginBottom: 16,
    paddingBottom: 8
  },
  headers: {
    paddingTop: 15,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 15
  },
  balanceDiv: {
    minWidth: 300
  },
  addAccountButton: {
    fontSize: 20,
    color: colors.blue.neon,
    borderColor: colors.blue.neon,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.blue.neon}`,
      borderColor: colors.blue.neon
    }
  },
  noTokensDiv: {
    marginTop: 32
  },
  fieldName: {
    fontWeight: 'bold'
  }
}))

export default useStyles
