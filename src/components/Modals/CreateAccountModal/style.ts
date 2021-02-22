import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '0'
    },
    '& .MuiDialog-paper': {
      padding: '0px',
      height: 700,
      maxWidth: 700,
      width: 700,
      background: colors.black.light
    }
  },

  titleDiv: {
    marginTop: 35,
    maxWidth: 330,
    textAlign: 'center'
  },
  loader: {
    width: 300,
    height: 300,
    marginTop: 60,
    marginBottom: 20
  },
  helpTextLoaderDiv: {
    marginTop: 50,
    maxWidth: 400,
    textAlign: 'center'
  },
  button: {
    color: colors.white.main,
    width: '100%',
    padding: 20,
    borderRadius: 2,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 22,
    '&:hover': {
      color: colors.black.background,
      background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)'
    }
  }
}))

export default useStyles
