import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    lineHeight: '30px',
    margin: 10,
    width: 'calc(100% - 20px)',
    height: 60,
    fontWeight: 700
  }
}))

export default useStyles
