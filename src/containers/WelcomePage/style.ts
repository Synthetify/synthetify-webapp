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
      maxWidth: 1300,
      // Hackish way TODO fix
      maxHeight: 'calc(100vh - 110px)',
      // padding: 16,
      overflow: 'auto'
    },
    side: {
      width: 400,
      overflow: 'hidden'
    }
  })
)
export default useStyles
