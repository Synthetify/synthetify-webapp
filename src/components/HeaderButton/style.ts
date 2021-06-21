import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  textInsidePopover: {
    color: colors.black.cinder,
    fontSize: 18
  },
  headerButton: {
    background: colors.gray.upperMid,
    color: colors.gray.C7C9D1,
    textTransform: 'none',
    fontSize: 16,
    lineHeight: '40px',
    padding: '2px 25px',
    borderRadius: 10,

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  dropdownHeaderButtonText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'none',
    fontSize: 16
  },
  dropdownHeaderButton: {
    background: colors.gray.upperMid,
    color: colors.gray.C7C9D1,
    lineHeight: '40px',
    padding: '2px 15px',
    borderRadius: 12,

    '&:hover': {
      background: colors.gray.mid,
      color: colors.gray.veryLight
    }
  },
  disabled: {
    opacity: 0.5
  }
}))

export default useStyles
