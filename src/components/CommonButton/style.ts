import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: 10,
    fontWeight: 'normal',
    fontSize: '22px',
    // backgroundColor: colors.black.backgroud,
    lineHeight: '26px',
    transition: '500ms',
    // transitionDuration: '0.4s',
    padding: '10px 19px',
    letterSpacing: 0,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      borderWidth: 2,
      color: colors.black.background,
      backgroundColor: `${theme.palette.primary.main}`
    }
  },
  disabled: {
    color: `${colors.gray.skeletonField} !important`,
    borderWidth: '2px !important',
    borderColor: `${colors.gray.skeletonField} !important`
  }
}))

export default useStyles
