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
      marginTop: '8px',
      padding: '8px 0 8px 0'
    }
  },
  statsListCardContent: {
    padding: '0 16px 0 16px',
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
      paddingRight: 6
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 6
    }
  },
  titleLabel: {
    fontSize: '21px',
    fontWeight: 400,
    lineHeight: '40px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '2.3vw',
      lineHeight: '24px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      lineHeight: '28px'
    }
  },
  listItemIconNumber: {
    alignItems: 'center',
    color: '#6261A3',
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: 600,
    '&> svg': {
      paddingRight: 5
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5vw',
      lineHeight: '24px',
      paddingLeft: 3
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
      lineHeight: '28px',
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
    padding: '0 4px 0 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7vw',
      lineHeight: '28px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      lineHeight: '28px'
    }
  }
}))

export default useStyles
