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
  time: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    paddingBottom: '3px'
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
    minWidth: '87px'
  },
  clockIcon: {
    width: 16,
    height: 16,
    paddingRight: '6px'
  }
}))

export default useStyles
