import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerButton: {
    background: colors.gray.upperMid,
    color: colors.gray.C7C9D1,
    padding: '2px 25px',
    borderRadius: 10,
    textTransform: 'none',
    fontSize: 16,
    lineHeight: '40px',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    },

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  headerButtonTextEllipsis: {
    textTransform: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 16,
    lineHeight: '40px',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  disabled: {
    opacity: 0.5
  }
}))

export default useStyles
