import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 150,
    marginLeft: 'calc(50vw - 130px)'
  },
  root: {
    background: colors.gray.component,
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
    background: colors.black.background,
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
      background: colors.gray.mid
    }
  },
  tokenName: {
    color: colors.gray.veryLight,
    fontSize: 16
  },
  tokenIcon: {
    width: 22,
    height: 22,
    marginLeft: 12,
    marginRight: 14
  },
  searchIcon: {
    color: colors.gray.light,
    margin: 8
  },
  searchInput: {
    background: colors.black.background,
    color: colors.gray.light,
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
    background: colors.gray.mid,
    borderRadius: 10,
    height: 'calc(100% - 30px)',
    margin: 15,
    float: 'right',
    width: 9
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
