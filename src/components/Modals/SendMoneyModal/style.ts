import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '0 8px 10px'
    },
    '& .MuiDialog-paper': {
      padding: 10,
      height: 400,
      width: 430,
      background: colors.green.main
    }
  },
  titleWrapper: {
    color: colors.black.background,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  close: {
    cursor: 'pointer'
  },

  progressWrapper: {
    background: colors.black.background,
    width: '100%',
    height: '100%',
    padding: 32
  },
  contentWrapper: {
    background: colors.black.background,
    padding: 32,
    width: '100%',
    height: '100%'
  },
  progress: {
    marginBottom: 16,
    color: colors.green.main
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: theme.palette.primary.main
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.red.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,249,187,0.25)'
    },
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none'
    },
    '& .MuiInputBase-input': {
      MozAppearance: 'textfield'
    }
  },
  inputDiv: {
    minHeight: 100,
    position: 'relative'
  },
  maxBalance: {
    position: 'absolute',
    right: 0,
    top: 65,
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  txid: {
    wordBreak: 'break-all',
    textAlign: 'center'
  },
  successIcon: {
    color: theme.palette.primary.main,
    fontSize: 120
  }
}))

export default useStyles
