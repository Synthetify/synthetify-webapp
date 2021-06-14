import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '#static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  info: {
    padding: 32,
    backgroundColor: colors.blue.accent,
    borderRadius: 24
  },
  root: {
    width: '100%'
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
  solanaLogoDiv: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    height: 70,
    width: 70,
    padding: 24,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main,
    marginRight: 25
  },
  solanaLogo: {
    height: 70,
    width: 70
  },
  data: {
    borderBottom: `2px solid ${colors.green.hover}`
  },
  address: {
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'end'
  },
  addressDiv: {
    marginLeft: 25
  },
  buttonDiv: {
    marginTop: 8,
    marginBottom: -8
  },
  airdropButton: {
    color: colors.blue.light,
    borderColor: colors.blue.light,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.blue.light}`,
      borderColor: colors.blue.light
    },
    marginRight: 16
  }
}))

export default useStyles
