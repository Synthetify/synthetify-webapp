import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.79)'
    },
    loader: {
      fontSize: 50
    }
  })
)
export default useStyles
