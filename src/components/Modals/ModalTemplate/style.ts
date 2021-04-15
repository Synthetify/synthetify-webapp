import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    '& .MuiDialogTitle-root': {
      padding: '0'
    },
    '& .MuiDialog-scrollPaper': {
      overflow: 'auto'
    },
    '& .MuiDialog-paper': {
      padding: '0px',
      height: 800,
      maxWidth: 700,
      width: 700,
      background: colors.black.light,
      maxHeight: 'none'
    }
  },
  iconDiv: {
    marginTop: 76,
    height: 220,
    width: 220
  },
  titleDiv: {
    marginTop: 35,
    maxWidth: 330,
    textAlign: 'center'
  },
  helpTextDiv: { marginTop: 35, maxWidth: 470, textAlign: 'center', height: 100 },
  inputDiv: {
    marginTop: 35,
    height: 100
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-root': {
      backgroundColor: colors.white.main,
      borderRadius: 20,
      maxWidth: 360,
      paddingLeft: 18,
      fontSize: 32,
      maxHeight: 70
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.red.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      color: colors.black.light
    },
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none'
    },
    '& .MuiInputBase-input': {
      MozAppearance: 'textfield',
      color: colors.black.light
    }
  },
  marker: {
    color: colors.gray.CDCDCD,
    paddingRight: 18
  },
  buttonsDiv: {
    marginTop: 50
  },
  closeButton: {
    marginLeft: 55,
    height: 40,
    width: 130,
    border: `2px solid ${colors.white.main}`,
    color: colors.white.main,
    '&:hover': {
      borderWidth: 2,
      color: colors.black.background,
      backgroundColor: colors.white.main,
      border: `2px solid ${colors.white.main}`
    }
  },
  loader: {
    width: 300,
    height: 300,
    marginTop: 100,
    marginBottom: 20
  },
  helpTextLoaderDiv: {
    marginTop: 50,
    maxWidth: 400,
    textAlign: 'center'
  },
  closeIcon: {
    cursor: 'pointer',
    position: 'absolute',
    right: 20,
    top: 20,
    fontSize: 40
  }
}))

export default useStyles
