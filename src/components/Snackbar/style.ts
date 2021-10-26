import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.green.snackbar,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxWidth: 500,
    maxHeight: 65,
    lineHeight: '30px',
    '& SVG': {
      width: 24,
      height: 24,
      color: colors.green.snackbar,
      [theme.breakpoints.down('xs')]: {
        width: 14,
        height: 14,
        marginLeft: 5
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 235,
      maxHeight: 32,
      padding: '0px 8px 0px 0px'
    }
  },
  error: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.red.snackbar,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxWidth: 500,
    maxHeight: 65,
    lineHeight: '30px',
    '& SVG': {
      color: colors.red.snackbar,
      [theme.breakpoints.down('xs')]: {
        width: 14,
        height: 14,
        marginLeft: 5
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 235,
      maxHeight: 32,
      padding: '0px 8px 0px 0px'
    }
  },
  info: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.blue.astel,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxWidth: 500,
    maxHeight: 65,
    lineHeight: '30px',
    '& SVG': {
      color: colors.blue.astel,
      [theme.breakpoints.down('xs')]: {
        width: 14,
        height: 14,
        marginLeft: 5
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 235,
      maxHeight: 32,
      padding: '0px 8px 0px 0px'
    }
  },
  warning: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.yellow.neon,
    borderRadius: 10,
    padding: 10,
    ...typography.heading5,
    maxWidth: 500,
    maxHeight: 65,
    lineHeight: '30px',
    '& SVG': {
      color: colors.yellow.neon,
      [theme.breakpoints.down('xs')]: {
        width: 14,
        height: 14,
        marginLeft: 5
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      maxWidth: 235,
      maxHeight: 32,
      padding: '0px 8px 0px 0px'
    }
  }
}))

export default useStyles
