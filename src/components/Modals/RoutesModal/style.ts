import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 160,
    borderRadius: 10,
    marginTop: 13,
    paddingInline: 19,
    paddingBlock: 9,

    [theme.breakpoints.down('md')]: {
      marginTop: 24
    }
  },
  listItem: {
    color: colors.gray.C7C9D1,
    borderRadius: 10,
    paddingBlock: 8,
    paddingLeft: 8,
    minWidth: 122,
    cursor: 'pointer',

    '&:not(:last-child)': {
      marginBottom: 6
    },

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
