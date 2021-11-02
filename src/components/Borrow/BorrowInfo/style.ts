import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: 24
  },
  infoWrapper: {
    marginTop: 24,
    padding: '8px 16px 10px',
    backgroundColor: 'rgba(12, 13, 44, 0.4)',
    border: '1px solid #6261A3',
    borderRadius: 10
  },
  infoPosition: {
    '&:not(:last-child)': {
      marginBottom: 4
    },

    '&:hover $positionTitle': {
      color: colors.navy.lightGrey
    },
    '&:hover $positionValue': {
      color: colors.navy.veryLightGrey
    }
  },
  positionTitle: {
    color: colors.navy.grey,
    ...typography.subtitle2
  },
  positionValue: {
    color: colors.navy.lightGrey,
    ...typography.subtitle1
  },
  copy: {
    width: 'fit-content'
  },
  copyIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
    opacity: 0.7,
    cursor: 'pointer',
    marginTop: 1,

    '&:hover': {
      opacity: 1
    }
  },
  wrapper: {
    padding: 16,
    paddingTop: 12,
    borderRadius: '10px',
    background: colors.navy.component,
    '&:not(:last-child)': {
      marginBottom: '24px'
    }
  },
  infoTitle: {
    color: colors.navy.veryLightGrey,
    ...typography.body1
  },
  copiedText: {
    ...typography.caption3,
    color: colors.white.main,
    background: colors.navy.navButton,
    borderRadius: '3px',
    padding: '2px 4px'
  },
  popover: {
    maxWidth: '36px',
    maxHeight: '14px',
    backgroundColor: 'transparent'
  }
}))
export default useStyles
