import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'
import { color } from '@storybook/addon-knobs'

const useStyles = makeStyles((theme: Theme) => ({
  diagramCard: {
    background: colors.navy.component,
    borderRadius: 10,
    fontFamily: 'Inter'
  },
  cardContent: {
    padding: 0
  },
  formControl: {
    width: '120px',
    fontWeight: 600,
    lineHeight: '40px',
    fontSize: '16px',
    margin: 16,
    background: colors.navy.navButton,
    borderRadius: '10px',
    padding: '5px 10px 5px 10px'
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
  select: {
    color: '#777777'
  },
  // buttonSelect: {
  //   background: colors.navy.button,
  //   color: colors.navy.veryLightGrey,
  //   minWidth: 118,
  //   padding: '2px 10px',
  //   lineHeight: '40px',
  //   borderRadius: 10,
  //   fontSize: '16px',
  //   fontWeight: 700,
  //   textTransform: 'capitalize',
  //   boxShadow: 'none',
  //   margin: '4px 4px 4px 15px',

  //   '&:hover': {
  //     background: colors.navy.button,
  //     color: colors.navy.veryLightGrey
  //   }
  // },
  buttonOption: {
    color: colors.navy.veryLightGrey,
    padding: '2px 2px',
    minWidth: 40,
    lineHeight: '40px',
    borderRadius: 10,
    fontSize: '20px',
    fontWeight: 400,
    textTransform: 'capitalize',
    boxShadow: 'none',

    '&:hover': {
      background: colors.navy.button,
      color: colors.navy.veryLightGrey
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
  }
}))

export default useStyles
