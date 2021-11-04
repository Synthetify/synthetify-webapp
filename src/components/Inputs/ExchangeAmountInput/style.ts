import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  amountInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    borderRadius: 10,
    paddingInline: 10,
    height: 56,
    fontSize: 24,
    fontWeight: 600,
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      height: 48,
      ...typography.subtitle2,
      paddingInline: 8,
      borderRadius: 6
    }
  },
  maxButton: {
    ...typography.subtitle1,
    width: 64,
    height: 36,
    borderRadius: 5,
    marginLeft: 8,

    '&:hover': {
      backgroundColor: '#7C76DA'
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 48,
      width: 48,
      height: 32,
      ...typography.body3,
      padding: 0
    }
  },
  select: {
    margin: '0 32px 0 -3px',
    maxHeight: 42,
    [theme.breakpoints.down('xs')]: {
      margin: '0 16px 0 -1px'
    }
  },
  label: {
    top: -1
  }
}))

export default useStyles
