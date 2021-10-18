import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'fit-content',
    borderRadius: 10,
    paddingBlock: 11,
    paddingInline: 16,
    backgroundColor: colors.navy.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80px',
    marginLeft: '16px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '4px',
      paddingBlock: 8,
      paddingInline: 7
    }
  },
  percentIcon: {
    width: 16,
    height: 16,
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
      ...typography.caption1
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
