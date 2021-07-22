import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  popover: {
    marginTop: 150,
    marginLeft: 'calc(50vw - 130px)'
  },
  root: {
    background: colors.navy.component,
    width: 350,
    borderRadius: 10,
    marginTop: 20,
    margin: 3,
    paddingInline: 8,
    paddingBlock: 20
  },
  tokenList: {
    borderRadius: 10,
    background: colors.navy.dark,
    height: 260,
    paddingBlock: 3,
    overflowY: 'hidden',
    width: '100%'
  },
  tokenItem: {
    margin: 5,
    marginLeft: 7,
    borderRadius: 10,
    width: '98%',
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
  tokenBalance: {
    fontSize: 13,
    color: colors.navy.grey
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
    borderRadius: 10,
    width: '100%',
    marginBottom: 16
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
    height: '96%',
    margin: 5,
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
