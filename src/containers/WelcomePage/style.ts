import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    background: {
      minHeight: '100vh',
      minWidth: '100%',
      position: 'relative',
      background: '#030313',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    contentContainer: {
      width: '100%'
    },
    contentWrapper: {
      maxWidth: 1160,
      padding: 16
    }

  })
)
export default useStyles
