import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  statsListCard: {
    background: 'none',
    borderRadius: 10,
    height: 'auto',
    fontFamily: 'Be Vietnam',
    marginLeft: '24px',
    width: '459px',

    [theme.breakpoints.down('md')]: {
      width: '331px'
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
    paddingTop: '8px'
  },
  listItemIconName: {
    width: 'max-content',

    paddingRight: 8,
    alignItems: 'center',
    '&> svg': {
      paddingRight: 8
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 8
    }
  },
  titleLabel: {
    fontSize: '21px',
    fontWeight: 500,
    lineHeight: '40px',
    [theme.breakpoints.down('md')]: {
      fontSize: '19px',
      lineHeight: '30px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.3vw',
      lineHeight: '24px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      lineHeight: '38px'
    }
  },
  listItemIconNumber: {
    alignItems: 'center',
    color: colors.navy.info,
    paddingLeft: 4,
    fontSize: 21,
    fontWeight: 600,
    '&> svg': {
      paddingRight: 6
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '15px',
      lineHeight: '28px',
      paddingLeft: 3
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5vw',
      lineHeight: '28px',
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
    padding: '4px 0',
    '&:hover': {
      '&> div div': {
        color: '#7574D6'
      }
    }
  },
  listItemGrid: {
    padding: '0 8px 0 8px'
  },
  legend: {
    width: '100%',
    height: 'max-content',
    padding: '0 8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  percentNumber: {
    fontSize: 21,
    width: 'min-content',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px 0 0',
    [theme.breakpoints.down('md')]: {
      fontSize: '19px',
      lineHeight: '30px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.3vw',
      lineHeight: '24px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  }
}))

export default useStyles
