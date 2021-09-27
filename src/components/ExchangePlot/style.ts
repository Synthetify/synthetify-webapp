import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

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
    ...typography.body1
  },
  description: {
    color: colors.navy.info,
    ...typography.body4
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
      marginBottom: 4
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
    ...typography.body4
  },
  positionValue: {
    color: colors.navy.veryLightGrey,
    ...typography.body4
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
    width: 100,
    backgroundColor: colors.navy.darkGrey,
    borderRadius: 7,
    border: `0.5px solid ${colors.navy.grey}`,
    padding: 4,
    position: 'relative',
    top: -6
  },
  tooltipDate: {
    color: colors.navy.veryLightGrey,
    ...typography.caption3,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  tooltipValue: {
    color: colors.green.main,
    textAlign: 'center',
    ...typography.caption2
  },
  tooltipPoint: {
    height: 5,
    color: colors.navy.veryLightGrey,
    zIndex: 2,
    position: 'absolute',
    bottom: -23,
    left: 42
  }
}))

export default useStyles
