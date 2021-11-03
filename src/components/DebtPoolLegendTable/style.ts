import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
  },
  row: {},
  column: {},
  dataCell: {},
  headerText: {
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey,

    [theme.breakpoints.down('sm')]: {
      ...typography.caption2
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.body3
    }
  },
  tokenName: {
    ...typography.subtitle1,

    [theme.breakpoints.down('xs')]: {
      ...typography.body3
    }
  },
  tokenAmount: {},
  tokenValue: {}
}))

export default useStyles
