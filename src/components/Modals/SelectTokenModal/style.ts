import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  popover: {
    marginTop: 150,
    marginLeft: 'calc(50vw - 130px)'
  },
  root: {
    background: colors.navy.component,
    width: 250,
    borderRadius: 10,
    marginTop: 20,
    margin: 3,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 10
  },
  tokenList: {
    borderRadius: 10,
    background: colors.navy.dark,
    height: 260,
    padding: 3,
    overflowY: 'hidden'
  },
  tokenItem: {
    margin: 5,
    marginLeft: 7,
    borderRadius: 10,
    width: '89%',
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton
    }
  },
  tokenName: {
    color: colors.navy.veryLightGrey,
    fontSize: 16
  },
  tokenIcon: {
    width: 22,
    height: 22,
    marginLeft: 12,
    marginRight: 14
  },
  searchIcon: {
    color: colors.navy.grey,
    margin: 8
  },
  searchInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    height: 40,
    lineHeight: 40,
    paddingLeft: 16,
    fontSize: 16,
    borderRadius: 10
  },
  hideScroll: {
    '& > *:first-child': {
      paddingRight: '20px'
    }
  },
  scrollbarThumb: {
    background: colors.green.main,
    borderRadius: 10,
    width: 9
  },
  scrollbarTrack: {
    background: colors.navy.navButton,
    borderRadius: 10,
    height: 'calc(100% - 30px)',
    margin: 15,
    float: 'right',
    width: 9
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  clearIcon: {
    minWidth: 12,
    height: 12,
    marginLeft: 8,
    cursor: 'pointer'
  }
}))

export default useStyles
