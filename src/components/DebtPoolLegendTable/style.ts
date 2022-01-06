import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 496,
    borderRadius: 10,
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'scroll',
    zIndex: 1,
    backgroundColor: colors.navy.component,
    marginLeft: 32,
    scrollbarColor: `${colors.green.main} transparent`,
    scrollbarWidth: 'auto',

    [theme.breakpoints.down('md')]: {
      width: 464,
      marginLeft: 24
    },

    [theme.breakpoints.down('sm')]: {
      width: 'calc(45% - 16px)',
      minWidth: 300,
      marginLeft: 16
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      minWidth: 'unset',
      marginLeft: 0
    },
    '&::-webkit-scrollbar': {
      width: 7,
      position: 'absolute',
      top: 0,
      zIndex: -1,
      paddingLeft: 5
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      position: 'absolute',
      borderRadius: 10,
      zIndex: -5,
      left: 10,
      top: 10
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.green.main,
      visibility: 'visible',
      width: 5,
      borderRadius: 10
    }
  },
  header: {
    height: 60,
    position: 'sticky',
    top: 0,
    '& $column:nth-child(1)': {
      backgroundColor: colors.navy.component
    },
    '& $column:nth-child(2)': {
      backgroundColor: '#171740'
    },
    [theme.breakpoints.down('sm')]: {
      height: 40
    }
  },
  row: {
    height: 48,
    backgroundColor: `${colors.navy.background}80`,

    '&:nth-child(2n+1)': {
      backgroundColor: `${colors.navy.background}00`
    },

    '&.light, &:hover': {
      backgroundColor: `${colors.navy.navButton}66`
    },

    '&.light $tokenAmount, &.light $tokenValue, &:hover $tokenAmount, &:hover $tokenValue': {
      color: colors.navy['8E8DEF']
    },

    '&.light $negative, &:hover $negative': {
      color: colors.red.negativeLight
    },

    [theme.breakpoints.down('sm')]: {
      height: 40
    },

    [theme.breakpoints.down('xs')]: {
      height: 34
    }
  },
  column: {
    width: '25%',
    backgroundColor: `${colors.navy.background}4D`,

    '&:nth-child(2n+1)': {
      backgroundColor: `${colors.navy.background}00`
    },
    '&:nth-child(1n)': {
      flexGrow: 1
    },
    '&:nth-child(2n)': {
      flexGrow: 3
    }
  },
  emptyColumn: {
    width: '25%',
    backgroundColor: `${colors.navy.background}4D`,
    '&:nth-child(2n+1)': {
      backgroundColor: `${colors.navy.background}00`
    },
    '&:nth-child(1n)': {
      flexGrow: 1
    },
    '&:nth-child(2n)': {
      flexGrow: 3
    }
  },
  dataCell: {
    paddingLeft: 8,
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: 5
    }
  },
  headerText: {
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey,

    [theme.breakpoints.down('sm')]: {
      ...typography.caption2
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.body3,
      fontSize: 12
    }
  },
  tokenName: {
    ...typography.body3,

    [theme.breakpoints.down('sm')]: {
      ...typography.caption4,
      fontSize: 13
    }
  },
  tokenAmount: {
    color: colors.navy.info,
    ...typography.body3,
    
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down('sm')]: {
      ...typography.caption4,
      fontSize: 13
    }
  },
  tokenValue: {
    color: colors.navy.info,
    ...typography.body4,

    [theme.breakpoints.down('sm')]: {
      ...typography.caption3
    }
  },
  negative: {
    color: colors.red.negative
  }
}))

export default useStyles
