import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  textInsidePopover: {
    color: colors.black.cinder,
    fontSize: 18
  },
  dropdownMenu: {
    color: 'pink',
    background: colors.blue.bastille,
    padding: 20,
    width: 200,
    height: 100,
    position: 'absolute',
    top: 120,
    zIndex: 100
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
      background: colors.black.controls,
      color: colors.gray.skeletonField
    }
  },
  dropdownHeaderButton: {
    background: colors.gray.upperMid,
    color: colors.gray.C7C9D1,
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
