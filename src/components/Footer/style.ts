import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  fixedWrapper: {
    position: 'fixed',
    width: 'fit-content',
    bottom: 22,
    right: 22,
    padding: '17px 18px 15px 18px',
    paddingInline: 13,
    borderRadius: 56.5,
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(157, 160, 174, 0.1)',
    zIndex: 10
  },
  container: {
    justifyContent: 'center',
    backgroundColor: colors.navy.background,
    paddingBlock: 12
  },
  socialMedia: {
    width: 34,
    height: 34,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'transform 300ms',
    '&:hover': {
      transform: 'scale(1.1) rotate(-20deg)'
    },

    [theme.breakpoints.only('md')]: {
      height: 43,
      width: 43
    },

    '&:not(:first-child)': {
      marginLeft: 9
    },

    '&:hover path': {
      // possible in future
    }
  },
  divider: {
    display: 'block',
    backgroundColor: colors.navy.darkGrey
  }
}))

export default useStyles
