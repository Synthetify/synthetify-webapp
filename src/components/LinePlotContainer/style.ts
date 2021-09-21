import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  diagramCard: {
    background: colors.navy.component,
    borderRadius: 10,
    fontFamily: 'Inter',
    width: 1073,
    [theme.breakpoints.down('md')]: {
      width: 854
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  },

  selectContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  optionLabel: {
    height: '100px'
  },
  menuItem: {
    background: colors.navy.navButton,
    fontWeight: 400,
    lineHeight: '40px',
    fontSize: '13px',
    '&:hover': {
      background: colors.navy.info
    }
  },
  buttonSelect: {
    minWidth: '120px',
    marginBottom: '6px',
    background: colors.navy.navButton,
    borderRadius: '5px',
    textTransform: 'none',
    height: 'min-content',
    fontSize: '16px',
    fontWeight: 600,
    maxHeight: '40px',
    color: colors.navy.veryLightGrey,
    '&:hover': {
      background: colors.navy.info,
      '& span div': {
        display: 'block'
      },
      '&> span >span': {
        transform: 'rotate(0.5turn)'
      }
    }
  },
  hoverGrid: {
    margin: '0 16px 0 16px',
    position: 'relative',
    padding: '6px 4px 6px 4px',
    '&:hover': {
      '&> div': {
        display: 'block'
      }
    }
  },
  arrowIcon: {
    transform: 'rotate(0.25turn)',
    width: '10px'
  },
  paperMenu: {
    display: 'none',
    zIndex: 10,
    position: 'absolute',
    left: '0',
    width: '135px',
    backgroundColor: colors.navy.navButton
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 4px 0 4px'
  },
  optionItem: {
    marginTop: '5px',
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 400,
    width: '100%',
    textTransform: 'none',
    padding: '0 0 0 6px',
    justifyContent: 'start',
    color: colors.navy.grey,
    '&:hover': {
      background: colors.navy.info,
      fontWeight: 700,
      color: colors.navy.veryLightGrey
    },
    '&:last-child': {
      marginBottom: '5px'
    }
  },
  buttonOption: {
    color: colors.navy.grey,
    margin: 'auto',
    padding: '2px 2px',
    minWidth: 40,
    lineHeight: '40px',
    border: 0,
    fontSize: '20px',
    fontWeight: 400,
    textTransform: 'capitalize',
    boxShadow: 'none',
    height: 'min-content',
    width: '42px',
    '&:hover': {
      color: colors.navy.veryLightGrey,
      background: 'none'
    }
  },
  buttonContainer: {
    marginRight: 24
  }
}))

export default useStyles
