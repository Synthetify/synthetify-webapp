import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({

  button: {
    width: 73,
    height: 33,
    backgroundColor: colors.navy.grey,
    borderRadius: 6,
    marginRight: 16,
    paddingTop: 3,
    border: 'none',
    color: colors.navy.navButton,
    ...typography.subtitle1,
    cursor: 'pointer',
    transition: '0.2s all cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    backfaceVisibility: 'hidden',
    fontSmoothing: 'subpixel-antialiased',
    '&:hover': {
      transform: 'scale(1.1) translateY(1px)'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body3,
      maxWidth: 56,
      maxHeight: 25,
      marginRight: 12
    }
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      top: -1
    }
  }

}))

export default useStyles
