import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  statsListCard: {
    background: 'none',
    borderRadius: 10,
    height: 'auto',
    marginLeft: '24px',
    width: '459px',

    [theme.breakpoints.down('md')]: {
      width: '386px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '45%',
      marginLeft: '16px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: '0',
      padding: '8px 0 0px 0'
    }
  },
  statsListCardContent: {
    padding: '0px 0px 0 0px',
    height: '100%',
    '&:last-child': {
      paddingBottom: '0px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  listContainer: {
    backgroundColor: colors.navy.component,
    borderRadius: '10px',
    marginBottom: '0px',
    height: '100%',
    paddingTop: '10px'
  },
  listItemIconName: {
    width: 'fit-content',
    paddingRight: 2,
    alignItems: 'center',
    '& svg': {
      paddingBottom: 1,
      [theme.breakpoints.down('md')]: {
        paddingBottom: 0
      }
    },
    '&> svg': {
      paddingRight: 8
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 8
    }
  },
  titleLabel: {
    ...typography.body2,
    [theme.breakpoints.down('md')]: {
      ...typography.subtitle2
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.subtitle2
    }
  },
  listItemIconNumber: {
    alignItems: 'center',
    color: colors.navy.info,
    paddingLeft: 4,
    ...typography.body2,
    '&> svg': {
      padding: '0px 6px 0px 0px',
      [theme.breakpoints.down('md')]: {
        paddingBottom: 5
      }
    },
    [theme.breakpoints.down('md')]: {
      ...typography.subtitle2,
      paddingLeft: 3
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 3
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.subtitle2,
      paddingLeft: 3
    }
  },

  listItemContainer: {
    width: '100%',
    padding: '4px 0',
    '&:hover': {
      '&> div div': {
        color: '#7574D6'
      }
    }
  },
  listItemGrid: {
    padding: '10px 8px 10px 8px',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 8px 6px 8px'
    }
  },
  legend: {
    width: '100%',
    height: 'max-content',
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '0 8px'
    }
  },
  percentNumber: {
    ...typography.body2,
    width: 'min-content',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px 0 0',
    [theme.breakpoints.down('md')]: {
      ...typography.subtitle2
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 2
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.subtitle2
    }
  }
}))

export default useStyles
