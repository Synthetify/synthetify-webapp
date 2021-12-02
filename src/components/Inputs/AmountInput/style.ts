import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles<Theme, { onSelectToken?: (chosen: number) => void }>(() => ({
  amountInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
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
    padding: '6px 0'
  },
  currency: {
    minWidth: 'fit-content',
    height: '100%',
    justifyContent: 'flex-end'
  },
  currencyText: {
    ...typography.body2,
    color: colors.navy.grey
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
  select: ({ onSelectToken }) => ({
    cursor: onSelectToken ? 'pointer' : 'unset',
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    ...typography.subtitle1,
    minWidth: 127,
    height: 42,
    backgroundColor: colors.navy.navButton,
    paddingInline: 0,
  })
}))

export default useStyles
