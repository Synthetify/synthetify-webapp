import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  diagramCard: {
    overflow: 'unset',
    background: colors.navy.component,
    borderRadius: 10,
    fontFamily: 'Be Vietnam',
    width: '100%'
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  },

  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end'
  },
  optionLabel: {
    height: '100px'
  },
  buttonSelect: {
    minWidth: 120,
    height: 36,
    marginBottom: '6px',
    background: colors.navy.navButton,
    borderRadius: '5px',
    textTransform: 'none',
    ...typography.subtitle1,
    color: colors.navy.veryLightGrey,
    '&:hover': {
      background: colors.navy.info,
      '& span div': {
        display: 'block'
      },
      '&> span >span': {
        transform: 'rotate(0.5turn)'
      }
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body3,
      minWidth: 95,
      height: 28
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
    width: 10,
    marginTop: 2,
    [theme.breakpoints.down('xs')]: {
      marginTop: 4
    }
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
    ...typography.subtitle2,
    width: '100%',
    textTransform: 'none',
    padding: '0 0 0 6px',
    justifyContent: 'start',
    color: colors.navy.grey,
    '&:hover': {
      background: colors.navy.info,
      ...typography.subtitle1,
      color: colors.navy.veryLightGrey
    },
    '&:last-child': {
      marginBottom: '5px'
    },
    [theme.breakpoints.down('xs')]: {
      ...typography.body4,

      '&:hover': {
        ...typography.body3
      }
    }
  }
}))

export default useStyles
