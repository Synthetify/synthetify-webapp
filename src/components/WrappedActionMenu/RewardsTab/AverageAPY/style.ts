import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'fit-content',
    borderRadius: 8,
    paddingBlock: 11,
    paddingInline: 16,
    backgroundColor: colors.navy.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80px',
    marginLeft: '16px',
    [theme.breakpoints.down('sm')]: {
      paddingInline: 10,
      marginLeft: 0
    },
    [theme.breakpoints.down('xs')]: {
      paddingBlock: 5,
      paddingInline: 3
    }
  },
  percentIcon: {
    width: 21,
    height: 21,
    paddingRight: '6px',
    opacity: 0.75,
    [theme.breakpoints.down('xs')]: {
      width: 13,
      height: 13,
      paddingRight: '3px',
      fontSize: '13px'
    }
  },
  apy: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption3
    }
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    backgroundColor: colors.navy.tooltip,
    padding: '4px 8px 3px 8px',
    borderRadius: '7px',
    marginTop: -20,
    color: colors.navy.veryLightGrey,
    [theme.breakpoints.down('xs')]: {
      marginTop: -15
    }
  },
  text: {
    ...typography.subtitle2,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  }
}))
export default useStyles
