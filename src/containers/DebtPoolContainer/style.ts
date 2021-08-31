import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  debtcontainer: {
    width: '589px',
    [theme.breakpoints.down('md')]: {
      width: '520px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '53.7%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))

export default useStyles
