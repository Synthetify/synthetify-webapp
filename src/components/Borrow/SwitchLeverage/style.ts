import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionMark: {
    height: 12,
    width: 12
  },
  leverText: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    paddingRight: '4px'
  },
  tooltipTitle: {
    ...typography.subtitle1
  },
  tooltipDescription: {
    ...typography.body4,
    color: colors.navy.lightGrey
  },
  switch: {
    width: '60px',
    paddingTop: '11px',
    transform: 'rotate(0.25turn)'
  },
  switchThumb: {
    height: '18px',
    width: '18px',
    border: '1px solid transparent',
    background: 'linear-gradient(#FFFFFF 0%, #979797 100%)',
    position: 'relative',
    borderRadius: '50%',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      bottom: '-1px',
      left: '-1px',
      right: '-1px',
      background: '#CFCFCF',
      borderRadius: '50%'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '4px',
      bottom: '4px',
      left: '4px',
      right: '4px',
      background: '#000000',
      borderRadius: '50%',
      zIndex: 2
    },
    '&:hover': {
      boxShadow: 'none'
    }
  },
  switchBase: {
    '&$switchChecked': {
      transform: 'translateX(22px)',
      '& + $switchTrack': {
        backgroundColor: colors.green.button
      }
    }
  },
  switchTrack: {
    height: '16px',
    width: '46px'
  },
  switchChecked: {}
}))
export default useStyles
