import { importantStyles } from '@consts/uiUtils'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  available: {
    flex: '1 1 0%',
    maxHeight: 60,
    marginBlock: 'auto'
  },
  wrap: {
    flexWrap: 'nowrap',
    marginTop: 16,

    [theme.breakpoints.down('sm')]: {
      marginTop: 8
    },

    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  secondHalf: {
    marginLeft: 24,
    paddingTop: 0,
    maxWidth: 264,
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      maxWidth: 157,
      marginLeft: 12
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      width: '100%',
      marginLeft: 0,
      paddingTop: 24
    }
  },
  inputLabel: {
    color: colors.navy.veryLightGrey,
    ...typography.body1,
    marginTop: 28,

    [theme.breakpoints.down('sm')]: {
      marginTop: 16
    }
  },
  divider: {
    backgroundColor: 'rgba(163, 168, 206, 0.5)',
    height: 60
  },
  bottom: {
    marginTop: 36,
    [theme.breakpoints.down('sm')]: {
      marginTop: 24
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      height: 0,
      transition: 'height 300ms linear',
      overflow: 'hidden'
    }
  },
  progressMobile: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 24,
      marginInline: 'auto'
    }
  },
  actionButton: {
    paddingBlock: 11,
    width: 136,
    maxHeight: 48,
    marginRight: 36,

    '&:hover': {
      backgroundColor: '#40BFA0 !important'
    },

    '&:disabled': {
      pointerEvents: 'auto !important'
    },

    '&:disabled:hover': {
      backgroundColor: `${colors.navy.darkGrey} !important`,
      pointerEvents: 'auto !important'
    },

    [theme.breakpoints.down('sm')]: {
      marginRight: 24,
      maxHeight: 46,
      '&:active': {
        backgroundColor: '#4ADFBA !important'
      }
    },
    [theme.breakpoints.down('xs')]: {
      paddingBlock: 15,
      maxHeight: 56,
      minWidth: 'calc(50% - 8px)',
      marginRight: 16
    }
  },
  textCenter: {
    textAlign: 'center'
  },
  maxButton: {
    textTransform: 'none',
    width: 104,
    height: 60,
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#7C76DA',
      opacity: 1
    },
    [theme.breakpoints.down('sm')]: {
      width: 74,
      marginLeft: 12,
      ...importantStyles(typography.heading4),
      '&:active': {
        backgroundColor: '#7C76DA',
        opacity: 1
      },
      '&:hover': {
        backgroundColor: colors.navy.button
      }
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(50% - 8px)',
      marginRight: 8,
      marginLeft: 0,
      height: 56
    }
  },
  label: {
    marginTop: 1
  }
}))

export default useStyles
