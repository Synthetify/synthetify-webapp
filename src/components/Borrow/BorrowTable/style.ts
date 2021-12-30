import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    boxShadow: 'none',
    borderRadius: '10px',
    padding: '0px 4px 4px 4px'
  },
  rootHeader: {
    borderColor: colors.navy.darkGrey,
    ...typography.subtitle2,
    color: colors.navy.info,
    padding: '14px 0 14px 10px ',
    '&:first-child': {
      paddingLeft: '10px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '13px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '14px 0 14px 4px',
      '&:first-child': {
        paddingLeft: '8px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1,
      padding: '10px 0 10px 4px',
      '&:first-child': {
        paddingLeft: '8px'
      }
    }
  },
  rootCell: {
    border: 'none',
    ...typography.body3,
    color: colors.navy.veryLightGrey,
    padding: '12px 0 12px 10px',
    cursor: 'pointer',
    '&:first-child': {
      paddingLeft: '10px'
    },
    [theme.breakpoints.down('sm')]: {
      ...typography.caption2,
      padding: '12px 0 12px 4px',
      '&:first-child': {
        paddingLeft: '8px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      padding: '10px 0 10px 4px',
      '&:first-child': {
        paddingLeft: '8px'
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
    transition: 'box-shadow 300ms',
    borderRadius: '5px',
    '&:hover': {
      background: `${colors.navy.navButton}40`,
      boxShadow: `0px 0px 6px ${colors.navy.button}`
    }
  },
  active: {
    '& td': {
      background: `${colors.navy.navButton}85`,
      '&:first-child': {
        borderRadius: '5px 0 0 5px'
      },
      '&:last-child': {
        borderRadius: ' 0 5px 5px 0'
      },
      '&:hover': {
        background: `${colors.navy.navButton}90`
      }
    }
  },
  tooltipNumber: {
    background: colors.navy.navButton,
    barderRadius: '5px',
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey,
    padding: '3px 5px',

    [theme.breakpoints.down('sm')]: {
      ...typography.caption2,
      padding: '2px 4px'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      margin: '6px 0px'
    }
  },
  dualIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content'
  },
  secondIcon: {
    marginLeft: '-0.35em'
  }
}))

export default useStyles
