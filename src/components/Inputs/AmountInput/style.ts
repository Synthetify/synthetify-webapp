import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles<Theme, { onSelectToken?: (chosen: string) => void }>(() => ({
  amountInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 10,
    height: 60,
    fontSize: 22,
    minWidth: 148,
    width: '100%'
  },
  currency: {
    fontSize: 22,
    color: colors.navy.grey,
    height: '100%',
    justifyContent: 'flex-end',
    marginLeft: 20
  },
  divider: {
    backgroundColor: colors.navy.darkGrey,
    height: 40,
    marginRight: 10
  },
  select: ({ onSelectToken }) => ({
    cursor: onSelectToken ? 'pointer' : 'unset'
  })
}))

export default useStyles
