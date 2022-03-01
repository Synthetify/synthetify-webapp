import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '10px 10px',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    paddingBottom: '24px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      paddingBottom: '16px'
    }
  },
  header: {
    borderRadius: '10px 10px 0 0',
    background: colors.navy.component,
    padding: '24px 24px 24px 20px',
    [theme.breakpoints.down('xs')]: {
      padding: '16px'
    }
  },
  tooltipTitle: {
    ...typography.subtitle1,
    marginBottom: 10
  },
  tooltipDescription: {
    ...typography.body4,
    color: colors.navy.lightGrey
  },
  questionMark: {
    height: 12,
    width: 12
  }
}))
export default useStyles
