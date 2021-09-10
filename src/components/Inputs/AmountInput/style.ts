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
    minWidth: 150,
    width: '100%'
  },
  currency: {
    fontSize: 22,
    color: colors.navy.grey,
    height: '100%',
    justifyContent: 'flex-end',
    marginLeft: 50,
    width: 160
  },
  divider: {
    backgroundColor: colors.navy.darkGrey,
    height: 40,
    marginRight: 5
  },
  avatarIcon: {
    height: '1.7em',
    width: '1.7em',
    paddingRight: 4

  },
  select: ({ onSelectToken }) => ({
    cursor: onSelectToken ? 'pointer' : 'unset'
  })
}))

export default useStyles
