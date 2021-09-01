import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.navy.component,
    borderRadius: 10
  },
  dataWrapper: {
    padding: 16
  },
  title: {
    color: colors.white.main,
    fontSize: 22,
    lineHeight: '40px',
    fontWeight: 700
  },
  description: {
    color: colors.navy.info,
    fontSize: 13,
    lineHeight: '16px'
  },
  tokenInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(12, 13, 44, 0.4)',
    border: '1px solid #6261A3',
    borderRadius: 10
  },
  infoPosition: {
    '&:not(:last-child)': {
      marginBottom: 8
    },

    '&:hover $positionTitle': {
      color: colors.navy.lightGrey
    },

    '&:hover $positionValue': {
      fontWeight: 700
    }
  },
  positionTitle: {
    color: colors.navy.grey,
    fontSize: 13,
    lineHeight: '16px'
  },
  positionValue: {
    color: colors.navy.veryLightGrey,
    fontWeight: 600,
    fontSize: 13,
    lineHeight: '16px'
  },
  copyIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
    opacity: 0.7,
    cursor: 'pointer',

    '&:hover': {
      opacity: 1
    }
  },
  copy: {
    width: 'fit-content'
  },
  plotWrapper: {
    height: 220,
    marginTop: 72
  }
}))

export default useStyles
