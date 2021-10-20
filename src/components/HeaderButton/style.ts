import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerButton: {
    background: colors.navy.navButton,
    color: colors.navy.veryLightGrey,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...typography.subtitle1,
    height: 44,
    minWidth: 110,

    '&:not(:last-child)': {
      marginRight: 15
    },

    [theme.breakpoints.down('md')]: {
      minWidth: 80
    },

    [theme.breakpoints.down('sm')]: {
      paddingInline: 0,
      minWidth: 'unset',
      width: 110,
      height: 36,
      ...typography.body3,

      '&:not(:last-child)': {
        marginRight: 0
      }
    },

    [theme.breakpoints.down('xs')]: {
      width: 72
    },

    '&:hover': {
      background: colors.navy['807ADC']
    }
  },
  headerButtonTextEllipsis: {
    textTransform: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...typography.subtitle1,

    [theme.breakpoints.down('sm')]: {
      ...typography.body3
    }
  },
  disabled: {
    opacity: 0.5
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  startIcon: {
    marginLeft: 0,
    marginTop: 2,

    [theme.breakpoints.down('xs')]: {
      marginRight: 2
    }
  },
  endIcon: {
    minWidth: 20,
    marginTop: 0
  },
  innerEndIcon: {
    marginLeft: 0
  }
}))

export default useStyles
