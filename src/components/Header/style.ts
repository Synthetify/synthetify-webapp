import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  root: {
    height: 80,
    paddingLeft: 25,
    paddingRight: 25,
    // backgroundColor: colors.black.greyish,
    borderBottom: `2px solid ${colors.green.hover}`
  },
  title: {
    fontWeight: 'bold'
  },
  logo: {
    height: 36,
    marginTop: 6,
    cursor: 'pointer'
  },
  divButton: {
    marginLeft: 70
  },

  button: {
    width: 'auto',
    color: colors.red.pinkish,
    borderColor: colors.red.pinkish,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.red.pinkish}`,
      borderColor: colors.red.pinkish
    }
  },
  navigationRoot: {
    background: 'none'
  },
  navigationTab: {
    color: colors.gray.skeletonBackground,
    width: 150
  },
  navigationTabSelected: {
    color: colors.green.main,
    fontSize: '22px !important'
  },
  navigationTabLabel: {
    fontSize: 20
  },
  drawer: {
    backgroundColor: colors.black.background
  },
  networkButton: {
    color: colors.red.pinkish,
    borderColor: colors.red.pinkish,
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
      color: colors.black.background,
      backgroundColor: `${colors.red.pinkish}`,
      borderColor: colors.red.pinkish
    },
    textAlign: 'left',
    textTransform: 'none',
    transition: '500ms',
    borderRadius: 10
  },
  networkButtonDiv: {
    width: '80%',
    marginTop: 16
  },
  drawerTitle: {
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  drawerTitleDiv: {
    width: '80%'
  },
  networkButtonDisabled: {
    color: colors.gray.skeletonBackground,
    borderColor: colors.gray.skeletonBackground,
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
      color: colors.black.background,
      backgroundColor: `${colors.gray.skeletonBackground}`,
      borderColor: colors.gray.skeletonBackground
    },
    textAlign: 'left',
    textTransform: 'none',
    transition: '500ms',
    borderRadius: 10
  }
}))

export default useStyles
