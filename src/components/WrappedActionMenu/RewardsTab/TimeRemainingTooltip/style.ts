import { makeStyles, Theme } from '@material-ui/core/styles'
import { typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    ...typography.subtitle1,
    marginBottom: 10
  },
  icon: {
    height: 20,
    minWidth: 20,

    [theme.breakpoints.down('xs')]: {
      height: 14,
      minWidth: 14
    }
  },
  clockIcon: {
    width: 16,
    height: 16,
    float: 'right',
    marginTop: 6
  },
  tooltipPlacementLeft: {
    marginRight: 16
  },
  tooltipPlacementRight: {
    marginLeft: 16
  }
}))

export default useStyles
