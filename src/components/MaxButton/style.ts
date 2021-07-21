import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  maxButton: {
    textTransform: 'none',
    width: 96,
    height: 60,
    fontWeight: 'normal',
    [theme.breakpoints.down('xs')]: {
      width: 70
    }
  }
}))

export default useStyles
