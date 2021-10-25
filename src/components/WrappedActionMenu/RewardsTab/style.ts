import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    background: colors.navy.navButton,
    marginBlock: 16,

    [theme.breakpoints.down('sm')]: {
      marginBlock: 20
    },

    [theme.breakpoints.down('xs')]: {
      marginBlock: 16
    }
  },
  button: {
    ...typography.subtitle1,
    width: 130
  },
  amount: {
    display: 'flex',
    marginTop: 24,
    marginBottom: 18,

    [theme.breakpoints.down('sm')]: {
      marginTop: 16
    }
  },
  buttonsWrapper: {
    marginTop: 8,

    [theme.breakpoints.down('sm')]: {
      marginTop: 4
    },

    [theme.breakpoints.down('xs')]: {
      marginTop: 8
    }
  },
  line: {},
  label: {
    top: -1
  },
  timeGrid: {
    display: 'flex',
    flexDirection: 'row'
  },
  time: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  rootTimer: {
    width: 'fit-content',
    borderRadius: 10,
    paddingBlock: 11,
    paddingInline: 16,
    backgroundColor: colors.navy.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '87px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '60px',
      paddingBlock: 8,
      paddingInline: 7
    }
  },
  clockIcon: {
    width: 21,
    height: 21,
    opacity: 0.75,
    paddingRight: '6px',
    [theme.breakpoints.down('xs')]: {
      width: 13,
      height: 13,
      paddingRight: '3px',
      fontSize: '13px'
    }
  }
}))

export default useStyles
