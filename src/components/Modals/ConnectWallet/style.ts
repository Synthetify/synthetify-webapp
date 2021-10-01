import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 226,
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
    padding: 7,
    width: 188,
    margin: 3,
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton,
      color: colors.navy.veryLightGrey,

      '& $name': {
        ...typography.subtitle1
      }
    }
  },
  icon: {
    width: 27,
    height: 27,
    display: 'inline',
    float: 'left',
    marginRight: 8,
    //marginTop: 3
  },
  name: {
    textTransform: 'capitalize',
    ...typography.subtitle2,
    float: 'left'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
