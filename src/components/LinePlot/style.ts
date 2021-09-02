import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  diagramCard: {
    background: colors.navy.component,
    borderRadius: 5,
    fontFamily: 'Inter'
  },
  cardContent: {
    padding: 0
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
    minWidth: '140px',
    margin: 16,
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
  arrowIcon: {
    transform: 'rotate(0.25turn)',
    width: '10px'
  },
  paperMenu: {
    display: 'none',
    zIndex: 10,
    position: 'absolute',
    top: '40px',
    left: '0',
    width: 'inherit',
    backgroundColor: colors.navy.navButton
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 5px 0 5px'
  },
  optionItem: {
    marginTop: '5px',
    fontSize: '13px',
    lineHeight: '26px',
    fontWeight: 'normal',
    width: '100%',
    textTransform: 'none',
    padding: 0,
    color: colors.navy.grey,
    '&:hover': {
      background: colors.navy.info,
      fontWeight: 'bold',
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
  linePlot: {
    height: '190px',
    color: '#6e6565',
    '& line': {
      stroke: '#6e6565!important'
    },
    '& text': {
      fill: '#6e6565!important'
    }
  },
  buttonContainer: {
    marginRight: 24
  }
}))

export default useStyles
