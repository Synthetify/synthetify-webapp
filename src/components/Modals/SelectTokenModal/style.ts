import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 'calc(50vh - 258px)',
    marginLeft: 'calc(50vw - 231px)',

    [theme.breakpoints.down('md')]: {
      marginTop: 'calc(50vh - 213px)',
      marginLeft: 'calc(50vw - 189px)'
    }
  },
  root: {
    background: colors.navy.component,
    width: 456,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 3,
    paddingInline: 15,
    paddingBlock: 20,

    [theme.breakpoints.down('md')]: {
      width: 372,
      paddingInline: 10,
      paddingBottom: 10
    }
  },
  tokenList: {
    borderRadius: 10,
    background: colors.navy.dark,
    height: 376,
    padding: 5,
    overflowY: 'hidden',
    width: 'calc(100% - 10px)',

    [theme.breakpoints.down('md')]: {
      height: 320
    }
  },
  tokenItem: {
    margin: 5,
    marginBottom: 14,
    borderRadius: 10,
    width: 392,
    height: 62,
    cursor: 'pointer',

    '&:hover': {
      background: colors.navy.navButton
    },

    [theme.breakpoints.down('md')]: {
      marginBottom: 7,
      width: 318,
      height: 56
    }
  },
  tokenName: {
    color: colors.navy.veryLightGrey,
    ...typography.heading3
  },
  tokenData: {
    position: 'relative',
    top: -2
  },
  tokenDescrpiption: {
    color: colors.navy.grey,
    ...typography.body4,
    position: 'relative',
    top: -4,
    whiteSpace: 'nowrap'
  },
  tokenIcon: {
    width: 48,
    height: 48,
    marginLeft: 6,
    marginRight: 14,

    [theme.breakpoints.down('md')]: {
      marginRight: 6,
      width: 44,
      height: 44
    }
  },
  tokenBalance: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    whiteSpace: 'nowrap'
  },
  searchIcon: {
    color: colors.navy.grey,
    margin: 8
  },
  searchInput: {
    background: colors.navy.dark,
    color: colors.navy.grey,
    height: 46,
    paddingLeft: 16,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    ...typography.body2
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
    maxWidth: 456,

    [theme.breakpoints.down('md')]: {
      maxWidth: 372
    }
  },
  clearIcon: {
    minWidth: 12,
    height: 12,
    marginLeft: 8,
    cursor: 'pointer'
  }
}))

export default useStyles
