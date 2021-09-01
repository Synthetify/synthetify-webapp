import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  diagramCard: {
    background: colors.navy.component,
    borderRadius: 10
  },
  cardContent: {
    padding: 0
  },

  pipeCanvasGrid: {
    height: '190px',
    color: '#6e6565',
    '& line': {
      stroke: '#6e6565!important'
    },
    '& text': {
      fill: '#6e6565!important'
    }
  },
  buttonSelect: {
    background: colors.navy.button,
    color: colors.navy.veryLightGrey,
    minWidth: 118,
    padding: '2px 10px',
    lineHeight: '40px',
    borderRadius: 10,
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: '4px 4px 4px 15px',

    '&:hover': {
      background: colors.navy.button,
      color: colors.navy.veryLightGrey
    }
  },
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
  }
}))

export default useStyles
