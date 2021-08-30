import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 700,
    marginBottom: 10
  },
  icon: {
    height: 20,
    minWidth: 20
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
