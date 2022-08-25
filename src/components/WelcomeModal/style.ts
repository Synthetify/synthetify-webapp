import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'
import headerImage from '../../static/png/headerImage.png'
import footerImage from '../../static/png/footerImage.png'

const useStyles = makeStyles((theme: Theme) => ({
  backgroundHeader: {
    backgroundImage: `url("${headerImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 102,
    width: 456,
    backgroundPosition: 'center'
  },
  container: {
    position: 'relative',
    background: 'none',
    overflow: 'hidden',
    zIndex: 1
  },
  textContainer: {
    width: 456,
    height: 638,
    backgroundColor: colors.navy.component,
    paddingRight: 24,
    paddingLeft: 24
  },
  textInfo: {},
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
    width: 456
  },
  closeButton: {
    width: 408,
    height: 56,
    borderRadius: 8,
    ...typography.body1,
    color: colors.black.background,
    margin: 26,
    border: 'none'
  }
}))

export default useStyles
