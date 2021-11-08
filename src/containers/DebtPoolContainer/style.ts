import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '0 0 12px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      padding: '0 0 4px 0'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  debtcontainer: {
    width: '589px',
    [theme.breakpoints.down('md')]: {
      width: '500px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '55.0%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: 16
    }
  }
}))

export default useStyles
