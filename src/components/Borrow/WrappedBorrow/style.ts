import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  actionGrid: {
    width: '100%'
  },
  borrowInfoGrid: {
    minWidth: '380px',
    [theme.breakpoints.down('md')]: {
      minWidth: '277px'
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '200px'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%'
    }
  }
}))
export default useStyles
