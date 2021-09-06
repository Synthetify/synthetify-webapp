import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

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
    marginTop: 22,

    [theme.breakpoints.down('sm')]: {
      marginTop: 14
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
    fontSize: 22,
    lineHeight: '26px',
    fontWeight: 600,
    marginTop: 34,

    [theme.breakpoints.down('sm')]: {
      marginTop: 22
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
    marginRight: 36,

    '&:hover': {
      backgroundColor: '#4ADFBA !important'
    },

    '&:disabled': {
      pointerEvents: 'auto !important'
    },

    '&:disabled:hover': {
      backgroundColor: `${colors.navy.darkGrey} !important`,
      pointerEvents: 'auto !important'
    },

    [theme.breakpoints.down('sm')]: {
      marginRight: 24
    },
    [theme.breakpoints.down('xs')]: {
      paddingBlock: 15,
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
      marginLeft: 12
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(50% - 8px)',
      marginRight: 8,
      marginLeft: 0,
      height: 56
    }
  }
}))

export default useStyles
