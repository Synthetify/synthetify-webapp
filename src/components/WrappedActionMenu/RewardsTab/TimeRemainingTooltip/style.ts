import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 700,
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
    float: 'right'
  },
  tooltipPlacementLeft: {
    marginRight: 16
  },
  tooltipPlacementRight: {
    marginLeft: 16
  }
}))

export default useStyles
