import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  copy: {
    width: 'fit-content'
  },
  copyIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
    opacity: 0.7,
    cursor: 'pointer',
    marginBottom: 2,

    '&:hover': {
      opacity: 1
    }
  },
  positionValue: {
    color: colors.navy.lightGrey,
    ...typography.subtitle1
  },
  popover: {
    maxWidth: '36px',
    maxHeight: '14px',
    backgroundColor: 'transparent',
    pointerEvents: 'none'
  },
  copiedText: {
    ...typography.caption3,
    color: colors.white.main,
    background: colors.navy.navButton,
    borderRadius: '3px',
    padding: '2px 4px'
  }
}))
export default useStyles
