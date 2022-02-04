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
    ...typography.body2,
    maxWidth: 550,
    maxHeight: 65,
    lineHeight: '30px',
    '& div': {
      '& svg': {
        width: 24,
        height: 24,
        fill: colors.green.snackbar,
        [theme.breakpoints.down('xs')]: {
          width: 22,
          height: 22,
          margin: '0 0 1px 5px'
        }
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body4,
      maxWidth: 360,
      height: 50,
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
    '& div': {
      '& svg': {
        width: 24,
        height: 24,
        fill: colors.red.snackbar,
        [theme.breakpoints.down('xs')]: {
          width: 22,
          height: 22,
          margin: '0 0 1px 5px'
        }
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body4,
      maxWidth: 360,
      height: 50,
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
    '& div': {
      '& svg': {
        width: 24,
        height: 24,
        fill: colors.blue.astel,
        [theme.breakpoints.down('xs')]: {
          width: 22,
          height: 22,
          margin: '0 0 1px 5px'
        }
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body4,
      maxWidth: 360,
      height: 50,
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
    '& div': {
      '& svg': {
        width: 24,
        height: 24,
        fill: colors.yellow.neon,
        [theme.breakpoints.down('xs')]: {
          width: 22,
          height: 22,
          margin: '0 0 1px 5px'
        }
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body4,
      maxWidth: 360,
      height: 50,
      padding: '0px 8px 0px 0px'
    }
  }
}))

export default useStyles
