import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  infoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(5px)',
    filter: 'blur(5px)',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    zIndex: 2
  },
  info: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '60%',
    transform: 'translateX(-50%) translateY(-50%)',
    zIndex: 3,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },

  infoLogo: {
    width: '215px',
    height: 'auto',
    margin: '0 0 42px 0',
    [theme.breakpoints.down('md')]: {
      width: '168px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '128px'
    }
  },

  infoContainer: {
    margin: '0 54px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  infoHeader: {
    lineHeight: '40px',
    fontSize: 96,
    fontWeight: 800,
    alignSelf: 'start',
    [theme.breakpoints.down('md')]: {
      alignSelf: 'center',
      fontSize: 64,
      lineHeight: '35px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 48
    }
  },

  infoParagraph: {
    padding: '56px 0 0 0',
    fontSize: '35px',
    lineHeight: '50px',
    alignSelf: 'start',
    [theme.breakpoints.down('md')]: {
      alignSelf: 'center',
      padding: '38px 0 0 0',
      lineHeight: '36px',
      fontSize: 28
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '28px'
    }
  },

  infoBtn: {
    background: 'linear-gradient(180deg, rgba(0,197,173,1) 0%, rgba(0,249,187,1) 0%, rgba(0,220,179,1) 75%)',
    fontSize: 32,
    lineHeight: '40px',
    fontWeight: 700,
    padding: '5px 30px 11px 30px',
    margin: '78px 0',
    borderRadius: '10px',
    textTransform: 'capitalize',
    color: colors.navy.background
  }
}))

export default useStyles
