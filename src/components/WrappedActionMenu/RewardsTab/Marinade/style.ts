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
    minWidth: '65px',
    marginLeft: '16px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      paddingInline: 10
    },
    [theme.breakpoints.down('xs')]: {
      paddingBlock: 5,
      paddingInline: 3
    }
  },
  marinadeIcon: {
    width: 28,
    height: 28,
    paddingRight: '6px',
    opacity: 0.75,
    [theme.breakpoints.down('xs')]: {
      width: 14,
      height: 14,
      paddingRight: '3px',
      fontSize: '14px'
    }
  },
  mnde: {
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
  title: {
    ...typography.subtitle1,
    marginBottom: 10
  }
}))
export default useStyles
