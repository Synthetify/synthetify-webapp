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
    background: colors.blue.bastille,
    color: colors.gray.DB,
    textTransform: 'none',
    fontSize: 16,
    lineHeight: '40px',
    padding: '2px 25px',
    borderRadius: 10,
    minWidth: 80,

    '&:hover': {
      background: colors.black.controls,
      color: colors.gray.skeletonField
    }
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
  buttonBlack: {
    borderRadius: 10,
    fontWeight: 'normal',
    fontSize: '22px',
    lineHeight: '26px',
    transition: 'all 500ms ease',
    minWidth: 140,
    padding: '7px 10px',
    letterSpacing: 0,
    color: colors.black.background,
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    '&:hover': {
      color: colors.white.main,
      background: 'linear-gradient(225deg, #627EEA -0.21%,#10F9BB 100.21%)'
    }
  },
  buttonWhite: {
    borderRadius: 10,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '26px',
    transition: 'all 500ms ease',
    minWidth: 163,
    padding: '22px 20px',
    letterSpacing: 0,
    color: colors.white.main,
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    '&:hover': {
      color: colors.black.background,
      background: 'linear-gradient(225deg, #627EEA -0.21%,#10F9BB 100.21%)'
    }
  },
  disabled: {
    opacity: 0.5
  }
}))

export default useStyles
