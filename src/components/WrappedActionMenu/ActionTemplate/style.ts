import { importantStyles } from '@consts/uiUtils'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 200,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  available: {
    minWidth: 202,
    maxHeight: 60,
    overflow: 'hidden',
    '& *': {
      margin: 0
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 132,
      marginBlock: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      width: '50%'
    }
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
    paddingTop: 24,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
      maxWidth: 230,
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 360,
      marginLeft: 24
    }
  },
  amountInput: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 275
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 375
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
    }
  },
  actionButton: {
    paddingBlock: 11,
    width: 136,
    maxHeight: 48,
    marginRight: 36,

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
      '&:hover': {
        backgroundColor: '#40BFA0 !important'
      },
      '&:active': {
        backgroundColor: '#4ADFBA !important'
      }
    },
    [theme.breakpoints.up('md')]: {
      '&:hover': {
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
