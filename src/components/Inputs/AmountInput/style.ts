import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles<Theme, { onSelectToken?: (chosen: number) => void }>((theme: Theme) => ({
  amountInput: {
    background: colors.navy.dark,
    color: colors.navy.veryLightGrey,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 10,
    height: 60,
    fontSize: 24,
    minWidth: 150,
    width: '100%'
  },
  input: {
    width: 'calc(100% - 102px)',
    padding: '6px 0 6px 24px'
  },
  currency: {
    minWidth: 'fit-content',
    height: '100%',
    justifyContent: 'flex-end'
  },
  currencyText: {
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey
  },
  divider: {
    backgroundColor: colors.navy.darkGrey,
    height: 40,
    marginRight: 5
  },
  avatarIcon: {
    minWidth: 30,
    height: 30,
    marginRight: 7
  },
  maxButton: {
    textTransform: 'none',
    width: 64,
    height: 36,
    marginRight: 6,
    ...typography.subtitle1,
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#7C76DA',
      opacity: 1
    },
    [theme.breakpoints.down('sm')]: {
      width: 74,
      marginLeft: 12,
      '&:active': {
        backgroundColor: '#7C76DA',
        opacity: 1
      },
      '&:hover': {
        backgroundColor: colors.navy.button
      }
    }
  },
  select: ({ onSelectToken }) => ({
    cursor: onSelectToken ? 'pointer' : 'unset',
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    ...typography.subtitle1,
    minWidth: 116,
    height: 42,
    backgroundColor: colors.navy.navButton,
    marginLeft: -7,
    padding: '5px 0 5px',
    color: colors.navy.veryLightGrey,
    justifyContent: 'center'
  })
}))

export default useStyles
