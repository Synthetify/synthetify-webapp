import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 300,
    borderRadius: 10,
    marginTop: 13,
    padding: 20,

    [theme.breakpoints.down('md')]: {
      marginTop: 24
    }
  },
  listItem: {
    color: colors.navy.grey,
    borderRadius: 10,
    paddingLeft: 16,
    padding: 10,
    minWidth: 220,
    margin: 3,
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton,
      color: colors.navy.veryLightGrey
    }
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '24px'
  },
  network: {
    fontSize: 16,
    lineHeight: '22px'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
