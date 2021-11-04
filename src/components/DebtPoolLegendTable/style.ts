import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 496,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.navy.component,
    marginLeft: 32,

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
    }
  },
  header: {
    height: 60,

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
    }
  },
  dataCell: {
    paddingLeft: 8,

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
    ...typography.subtitle1,

    [theme.breakpoints.down('xs')]: {
      ...typography.body3
    }
  },
  tokenAmount: {
    color: colors.navy.info,
    ...typography.body3,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down('sm')]: {
      ...typography.caption4
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
