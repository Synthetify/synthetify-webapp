import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  popover: {
    marginTop: 150,
    marginLeft: 'calc(50vw - 178px)'
  },
  root: {
    background: colors.navy.component,
    width: 350,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 3,
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
    marginLeft: 16,
    marginBottom: 12,
    borderRadius: 10,
    width: 296,
    height: 40,
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton
    }
  },
  tokenName: {
    color: colors.navy.veryLightGrey,
    fontSize: 16,
    lineHeight: '16px',
    marginBottom: 5
  },
  tokenDescrpiption: {
    color: colors.navy.grey,
    fontSize: 10,
    lineHeight: '10px'
  },
  tokenIcon: {
    width: 26,
    height: 26,
    marginInline: 5
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
    fontSize: 22,
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
    boxShadow: 'none',
    maxWidth: 350
  },
  clearIcon: {
    minWidth: 12,
    height: 12,
    marginLeft: 8,
    cursor: 'pointer'
  }
}))

export default useStyles
