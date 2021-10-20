import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 164,
    borderRadius: 10,
    marginTop: 13,
    padding: 8,

    [theme.breakpoints.down('md')]: {
      marginTop: 24
    }
  },
  listItem: {
    color: colors.navy.grey,
    borderRadius: 8,
    padding: 8,
    width: 150,
    display: 'flex',
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
    marginRight: 8,
    float: 'left'
  },
  name: {
    textTransform: 'capitalize',
    margin: 'auto 0px',
    ...typography.subtitle2,
    float: 'left'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
