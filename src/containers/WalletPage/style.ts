import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
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
