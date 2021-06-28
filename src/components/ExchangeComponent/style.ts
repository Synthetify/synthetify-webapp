import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    borderRadius: 10,
    padding: 32,
    paddingTop: 23,

    [theme.breakpoints.down('md')]: {
      padding: 20
    }
  },
  title: {
    fontSize: 22,
    color: colors.gray.light,
    lineHeight: '26px'
  },
  titleDivider: {
    background: colors.gray.light,
    marginTop: 13,
    marginBottom: 40,

    [theme.breakpoints.down('md')]: {
      marginBottom: 20
    }
  },
  tokenComponent: {
    background: colors.gray.upperMid,
    borderRadius: 10,
    padding: 20,
    paddingTop: 6
  },
  tokenComponentText: {
    color: colors.gray.C7C9D1,
    fontWeight: 700,
    fontSize: 16
  },
  amountDivider: {
    background: colors.gray.light,
    height: 57,
    marginLeft: 30,
    marginRight: 30,

    [theme.breakpoints.down('md')]: {
      height: 37,
      marginLeft: 20,
      marginRight: 10
    }
  },
  numbersField: {
    marginTop: 30,

    [theme.breakpoints.down('md')]: {
      marginTop: 20
    }
  },
  numbersFieldTitle: {
    fontSize: 22,
    color: colors.gray.light,
    lineHeight: '26px',

    [theme.breakpoints.down('md')]: {
      fontSize: 16
    }
  },
  numbersFieldAmount: {
    fontSize: 22,
    color: colors.gray.veryLight,
    lineHeight: '40px',
    fontWeight: 600,

    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      lineHeight: '15px'
    }
  },
  swapButton: {
    width: '100%',
    marginTop: 20
  },
  swapIconSquare: {
    background: colors.gray.component,
    position: 'relative',
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.gray.veryLight,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: -10,
    marginBottom: -10,
    zIndex: 2,
    padding: 1,

    '&:hover': {
      background: colors.gray.mid
    }
  },
  swapIcon: {
    width: 43,
    height: 43,
    fill: colors.gray.veryLight
  },
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    lineHeight: '30px',
    margin: 10
  }
}))

export default useStyles
