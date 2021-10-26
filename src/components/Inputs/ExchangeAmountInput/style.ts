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
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        backgroundColor: '#7C76DA'
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:active': {
        backgroundColor: '#7C76DA'
      },
      '&:hover': {
        backgroundColor: colors.navy.button
      }
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
    marginRight: 24,

    [theme.breakpoints.down('xs')]: {
      marginRight: 16
    }
  },
  label: {
    top: -1
  }
}))

export default useStyles
