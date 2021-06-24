import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    borderRadius: 10,
    padding: 32,
    paddingTop: 23
  },
  title: {
    fontSize: 22,
    color: colors.gray.light,
    lineHeight: '26px'
  },
  titleDivider: {
    background: colors.gray.light,
    marginTop: 13,
    marginBottom: 8
  },
  tokenComponent: {
    background: colors.black.background,
    borderRadius: 10,
    padding: 6,
    paddingLeft: 22,
    marginTop: 32
  },
  tokenComponentText: {
    color: colors.gray.light,
    fontWeight: 700,
    fontSize: 16
  },
  amount: {
    fontSize: 22,
    color: colors.gray.veryLight,
    lineHeight: '40px',
    fontWeight: 600
  },
  amountDivider: {
    background: colors.gray.light,
    height: 57,
    marginLeft: 30,
    marginRight: 30
  },
  numbers: {
    marginTop: 40
  }
}))

export default useStyles
