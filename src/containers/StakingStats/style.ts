import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  statsTile: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 30,
      marginBottom: 0,
      '&:first-child': {
        marginLeft: 0
      }
    }
  }
}))

export default useStyles
