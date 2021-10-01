import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 163,
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
    maxWidth: 147,
    margin: 3,
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton,
      color: colors.navy.veryLightGrey,
      '& $icon': {
        opacity: 1
      },
      '& $name': {
        ...typography.subtitle1
      }
    }
  },
  name: {
    textTransform: 'capitalize',
    ...typography.subtitle2
  },
  network: {
    ...typography.caption1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  icon: {
    width: 20,
    height: 20,
    display: 'inline',
    float: 'left',
    marginRight: 8,
    marginTop: 3,
    opacity: 0.6
  }
}))

export default useStyles
