import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    boxShadow: 'none',
    borderRadius: '10px'
  },
  rootHeader: {
    borderColor: colors.navy.darkGrey,
    ...typography.subtitle2,
    color: colors.navy.info,
    padding: '14px 10px',
    '&:first-child': {
      paddingLeft: '14px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '13px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '14px 4px',
      '&:first-child': {
        paddingLeft: '12px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      padding: '10px 4px',
      '&:first-child': {
        paddingLeft: '12px'
      }
    }
  },
  rootCell: {
    border: 'none',
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey,
    padding: '10px 10px',
    '&:first-child': {
      paddingLeft: '12px'
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.caption2,
      padding: '10px 4px',
      '&:first-child': {
        paddingLeft: '12px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      padding: '10px 4px',
      '&:first-child': {
        paddingLeft: '12px'
      }
    }
  },
  icon: {
    width: '1.2em',
    height: '1.2em',
    marginRight: 4,
    [theme.breakpoints.down('xs')]: {
      width: '1.5em',
      height: '1.5em'
    }
  },
  row: {
    '&:hover': {
      background: colors.navy.navButton
    }
  },
  active: {
    background: colors.navy.navButton
  }
}))

export default useStyles
