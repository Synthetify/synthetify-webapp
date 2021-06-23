import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerButton: {
    background: colors.gray.upperMid,
    color: colors.gray.C7C9D1,
    textTransform: 'none',
    textOverflow: 'ellipsis',
    fontSize: 16,
    lineHeight: '40px',
    padding: '2px 25px',
    borderRadius: 10,

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  disabled: {
    opacity: 0.5
  }
}))

export default useStyles
