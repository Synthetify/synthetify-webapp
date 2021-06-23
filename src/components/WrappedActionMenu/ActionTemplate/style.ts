import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 200,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  available: {
    minWidth: 202,
    maxHeight: 60,
    overflow: 'hidden',
    '& *': {
      margin: 0
    }
  },
  amountInput: {
    maxWidth: 375,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 310
    }
  },
  divider: {
    backgroundColor: colors.gray.light,
    height: 60
  }
}))

export default useStyles
