import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'
import headerImage from '../../static/png/headerImage.png'
import footerImage from '../../static/png/footerImage.png'

const useStyles = makeStyles(() => ({
  backgroundHeader: {
    backgroundImage: `url("${headerImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 102,
    width: '100%',
    backgroundPosition: 'center'
  },
  container: {
    position: 'relative',
    background: 'none',
    overflow: 'hidden',
    zIndex: 1,
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  textContainer: {
    maxWidth: 456,
    backgroundColor: colors.navy.component,
    paddingRight: 24,
    paddingLeft: 24
  },
  oneListItem: {
    margin: 0,
    '&:first-child': {
      marginTop: 16
    },
    '&:last-child': {
      marginBottom: 16
    }
  },
  heading: {
    ...typography.heading4,
    color: colors.white.main,
    paddingBottom: 16
  },
  link: {
    color: colors.green.main
  },
  text: {
    ...typography.subtitle2,
    color: colors.white.main,
    paddingTop: 12
  },
  textPoint: {
    ...typography.subtitle2,
    color: colors.white.main
  },
  pointer: {
    color: colors.white.main
  },
  backgroundFooter: {
    backgroundColor: colors.navy.component,
    backgroundImage: `url("${footerImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 102,
    width: 456,
    borderRadius: '0 0 20px 20px'
  },
  buttonContainer: {
    width: '100%',
    padding: '26px 24px 28px 24px'
  },
  closeButton: {
    width: 456,
    height: 56,
    borderRadius: 8,
    ...typography.body1,
    color: colors.black.background,
    border: 'none'
  }
}))

export default useStyles
