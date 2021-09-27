import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
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
    marginTop: 72,

    [theme.breakpoints.down('sm')]: {
      height: 185
    }
  },
  tooltipRoot: {
    width: 122,
    backgroundColor: colors.navy.darkGrey,
    borderRadius: 7,
    border: `0.5px solid ${colors.navy.grey}`,
    padding: 8,
    position: 'relative',
    top: -6
  },
  tooltipDate: {
    color: colors.navy.veryLightGrey,
    fontSize: 10,
    lineHeight: '12px',
    fontWeight: 'normal',
    marginBottom: 2,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  tooltipValue: {
    color: colors.green.main,
    fontSize: 10,
    lineHeight: '12px',
    textAlign: 'center',
    fontWeight: 700
  },
  tooltipPoint: {
    height: 5,
    color: colors.navy.veryLightGrey,
    zIndex: 2,
    position: 'absolute',
    bottom: -23,
    left: 57
  }
}))

export default useStyles
