import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  font: {
    fontSize: 22,
    fontWeight: 400,
    color: colors.navy.veryLightGrey,
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      fontSize: 13
    }
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 19,

    [theme.breakpoints.down('sm')]: {
      width: 26,
      height: 26,
      marginRight: 14
    },

    [theme.breakpoints.down('xs')]: {
      width: 19,
      height: 19,
      marginRight: 10
    }
  },
  row: {
    height: 69,
    paddingInline: 24,

    '&:nth-of-type(2n+1)': {
      backgroundColor: colors.navy.background
    },

    '&:nth-of-type(2n)': {
      backgroundColor: colors.navy.component
    },

    [theme.breakpoints.down('sm')]: {
      height: 61,
      paddingInline: 20
    },

    [theme.breakpoints.down('xs')]: {
      paddingInline: 16,
      height: 45
    }
  },
  column: {
    maxWidth: 164,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 141
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: 85
    }
  }
}))

export default useStyles
