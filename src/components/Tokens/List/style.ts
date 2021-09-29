import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerFont: {
    ...typography.body1,
    position: 'relative',
    top: -2,
    [theme.breakpoints.down('xs')]: {
      ...typography.body3,
      top: -1
    },
    color: colors.navy.grey
  },
  emptyTokens: {
    paddingBlock: 20,
    textAlign: 'center',
    ...typography.body2,
    color: colors.navy.lightGrey,
    backgroundColor: colors.navy.component,
    [theme.breakpoints.down('xs')]: {
      '& > *': {
        ...typography.body4
      }
    }
  },
  header: {
    height: 69,
    backgroundColor: colors.navy.background,
    paddingInline: 24,

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
