import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 118,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: colors.gray.C7C9D1,
    padding: '2px 10px',
    lineHeight: '40px',
    borderRadius: 5,
    fontSize: '16px',
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: 4,

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  active: {
    background: colors.gray.mid,
    color: colors.gray.veryLight,
    minWidth: 118,
    padding: '2px 10px',
    lineHeight: '40px',
    borderRadius: 5,
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: 4,

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
