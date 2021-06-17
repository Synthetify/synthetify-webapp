import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  textInsidePopover: {
    color: colors.black.cinder,
    fontSize: 18
  },
  headerButton: {
    background: colors.blue.bastille,
    color: colors.gray.DB,
    textTransform: 'none',
    fontSize: 16,
    lineHeight: '40px',
    padding: '2px 25px',
    borderRadius: 10,

    '&:hover': {
      background: colors.black.controls,
      color: colors.gray.skeletonField
    }
  },
  dropdownHeaderButtonText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  dropdownHeaderButton: {
    background: colors.blue.bastille,
    color: colors.gray.DB,
    textTransform: 'none',
    fontSize: 16,
    lineHeight: '40px',
    padding: '2px 15px',
    borderRadius: 12,

    '&:hover': {
      background: colors.black.controls,
      color: colors.gray.skeletonField
    }
  },
  disabled: {
    opacity: 0.5
  }
}))

export default useStyles
