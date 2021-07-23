import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 200,
    borderRadius: 10,
    marginTop: 13,
    padding: 20,

    [theme.breakpoints.down('md')]: {
      marginTop: 24
    }
  },
  listItem: {
    color: colors.gray.C7C9D1,
    borderRadius: 10,
    padding: 6,
    paddingLeft: 12,
    minWidth: 160,
    margin: 3,
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton,
      color: colors.navy.veryLightGrey
    }
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 22,
    lineHeight: '40px',
    color: colors.navy.grey
  },
  current: {
    textTransform: 'capitalize',
    fontSize: 22,
    lineHeight: '40px',
    fontWeight: 600,
    color: colors.navy.veryLightGrey
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
