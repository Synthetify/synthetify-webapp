import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 'calc(50vh - 258px)',
    marginLeft: 'calc(50vw - 231px)',

    [theme.breakpoints.down('md')]: {
      marginTop: 'calc(50vh - 213px)',
      marginLeft: 'calc(50vw - 179px)'
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
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
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
    margin: '5px 5px 5px 0',
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
    display: 'block',
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
    opacity: 0,
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
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%'
    }
  },
  clearIcon: {
    minWidth: 12,
    height: 12,
    marginLeft: 8,
    cursor: 'pointer'
  },
  dualIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content'
  },
  secondIcon: {
    marginLeft: -15,
    marginRight: 14,

    [theme.breakpoints.down('md')]: {
      marginRight: 6
    }
  },
  emptyName: {
    color: colors.navy.grey,
    width: '100%',
    ...typography.heading3
  },
  emptyIcon: {
    width: 70,
    height: 70
  },
  emptyIconGrid: {
    width: '148px',
    height: '148px',
    marginTop: '36px',
    borderRadius: '50%',
    background: '#3A3A8525',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default useStyles
