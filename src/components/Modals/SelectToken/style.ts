import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  tokenList: {
    borderRadius: 10,
    background: colors.black.background,
    height: 360,
    padding: 3,
    overflowY: 'hidden'
  },
  tokenItem: {
    margin: 5,
    borderRadius: 10,
    width: 258,
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
    width: 20,
    height: 20,
    marginLeft: 12,
    marginRight: 14
  },
  root: {
    background: colors.gray.component,
    width: 350,
    borderRadius: 10,
    margin: 20,
    padding: 0,
    paddingTop: 15,
    paddingBottom: 10
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
