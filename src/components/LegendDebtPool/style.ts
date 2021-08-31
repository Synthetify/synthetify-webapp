import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  statsListCard: {
    background: colors.navy.component,
    borderRadius: 10,
    height: 'auto',
    fontFamily: 'Inter',
    marginLeft: '12px',
    width: '459px',

    [theme.breakpoints.down('md')]: {
      width: '311px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '46.3%',
      marginLeft: '8px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: '0',
      marginTop: '8px'
    }
  },
  statsListCardContent: {
    padding: '0 0 0 8px',
    height: '100%',
    '&:last-child': {
      paddingBottom: '0px'
    }
  },
  listItemIconName: {
    width: 'max-content',

    paddingRight: 15,
    alignItems: 'center',
    '&> svg': {
      paddingRight: 5
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 1
    }
  },
  titleLabel: {
    fontSize: '21px',
    fontWeight: 400,
    lineHeight: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '24px'
    }
  },
  listItemIconNumber: {
    alignItems: 'center',
    color: '#6261A3',
    paddingLeft: 10,
    fontSize: 15,
    '&> svg': {
      paddingRight: 5
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px',
      lineHeight: '24px',
      paddingLeft: 3
    }
  },

  listItemContainer: {
    width: '100%',
    padding: 0,

    '&:hover': {
      '&> div div span': {
        color: '#7574D6'
      }
    }
  },
  legend: {
    width: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  percentNumber: {
    fontSize: 16,
    width: 'min-content',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '24px'
    }
  }
}))

export default useStyles
