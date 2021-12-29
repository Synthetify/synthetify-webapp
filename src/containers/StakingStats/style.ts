import { makeStyles, Theme } from '@material-ui/core/styles'
import { typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  statsTile: {
    marginBottom: 24,
    '&:last-child': {
      marginBottom: 0
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 24,
      marginBottom: 0,
      '&:first-child': {
        marginLeft: 0
      }
    }
  },
  indicator: {
    ...typography.caption1
  },
  tooltipTitle: {
    ...typography.subtitle1
  },
  tooltipIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8,
    marginTop: 3
  }
}))

export default useStyles
