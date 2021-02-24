import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // paddingLeft: 100,
    // paddingRight: 100,
  },

  title: {
    marginLeft: 10,
    paddingTop: 56,
    paddingBottom: 20,
    fontWeight: 'bold',
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subTitle: {
    marginLeft: 10,
    paddingBottom: 20,
    fontWeight: 'bold',
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  wrapper: {
    backgroundColor: colors.blue.deepAccent,
    padding: 20,
    maxWidth: 800,
    position: 'relative',
    borderRadius: 10
  },
  inputDiv: {
    // height: 130,
    borderRadius: 15,
    padding: '15px 25px',
    border: `2px solid ${colors.blue.accent}`
  },
  middleDiv: { minHeight: 60 },
  swapButton: {
    marginTop: 25,
    // opacity: 0.3,
    width: '100%'
  },
  labels: {
    color: colors.gray.base
  },
  input: {
    backgroundColor: 'inherit',
    border: 'none',
    height: 40,
    color: 'white',
    fontSize: 22,
    appearance: 'textfield',
    outline: 'none'
  },
  maxButton: { height: 35, minWidth: 100, padding: '10px 10px', marginRight: 30 },
  tokenInput: {
    color: 'white',
    outline: 'none',
    width: 'auto',
    minWidth: 140,
    minHeight: 45,
    '& .MuiSelect-icon': {
      color: 'white',
      fontSize: 35,
      marginTop: -6,
      marginLeft: 15
    },
    '& .MuiSelect-selectMenu': {
      marginRight: 15
    }
  },
  selectMenu: { minWidth: 150, backgroundColor: colors.black.background },
  menuOption: {
    padding: '10px 30px',
    '&:hover': {
      color: colors.black.background,
      fontSize: 'bold',
      background: 'linear-gradient(225deg, #627EEA -0.21%,#10F9BB 100.21%)'
    }
  },
  loaderWrapper: {
    // padding: 20,
    borderRadius: 10,
    zIndex: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxWidth: 800,
    backgroundColor: 'rgba(7, 0, 0, 0.5)'
  },
  loader: {
    width: 300,
    height: 300
  },
  titleDiv: {
    marginTop: 35,
    maxWidth: 330,
    textAlign: 'center'
  },
  swapIcon: {
    marginTop:20,
    marginBottom:20,
    cursor: 'pointer',
    border: '1px solid white',
    borderRadius: 10,
    padding: '8px 18px',
    '&:hover': {
      background: 'linear-gradient(225deg, #627EEA -0.21%,#10F9BB 100.21%)'
    }
  },
  infoTitle: {
    fontWeight: 'bold',
    background: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
}))

export default useStyles
