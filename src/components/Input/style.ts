import { makeStyles, Theme } from '@material-ui/core/styles'
import { BN } from '@project-serum/anchor'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 12,
    [theme.breakpoints.down('sm')]: {
      marginTop: -4
    }
  },
  amountInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
    height: 60,
    fontSize: 22,
    minWidth: 150,
    width: '100%',
    marginTop: 5
  },
  currency: {
    fontSize: 22,
    color: colors.navy.grey,
    width: 100,
    height: '100%',
    marginLeft: -4
  },
  inputLabel: {
    color: colors.navy.lightGrey,
    fontSize: 22,
    lineHeight: '26px',
    fontWeight: 600,
    marginTop: 12,
    [theme.breakpoints.down('sm')]: {
      marginTop: -4
    }
  },
  divider: {
    backgroundColor: colors.navy.grey,
    height: 40,
    marginRight: 7
  }
}))

export const useStylesWithProps = makeStyles<Theme, {
  tokens?: Array<{ symbol: string, balance?: BN, decimals?: number }>
  onSelectToken?: (chosen: string) => void
}>(() => ({
  select: ({ tokens, onSelectToken }) => ({
    cursor: (tokens?.length && onSelectToken) ? 'pointer' : 'unset'
  })
}))

export default useStyles
