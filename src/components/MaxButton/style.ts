import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  maxButton: {
    textTransform: 'none',
    width: 104,
    height: 60,
    fontWeight: 'normal',
    [theme.breakpoints.down('sm')]: {
      width: 74
    }
  }
}))

export default useStyles
