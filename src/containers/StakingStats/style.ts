import { makeStyles, Theme } from '@material-ui/core/styles'

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
    fontSize: 10,
    lineHeight: '12px',
    fontWeight: 700
  },
  tooltipTitle: {
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 700
  },
  tooltipIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8
  }
}))

export default useStyles
