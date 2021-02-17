import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
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
    color: `${colors.gray.skeletonField} !important`,
    borderWidth: '2px !important',
    borderColor: `${colors.gray.skeletonField} !important`
  }
}))

export default useStyles
