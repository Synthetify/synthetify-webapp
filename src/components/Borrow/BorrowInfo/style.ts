import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: 24,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 16
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingTop: 16
    }
  },
  infoWrapper: {
    marginTop: 24,
    padding: '8px 16px 10px',
    backgroundColor: 'rgba(12, 13, 44, 0.4)',
    border: `1px solid ${colors.navy.info}`,
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
    },
    '&:hover > div p': {
      color: colors.navy.veryLightGrey
    }
  },
  positionTitle: {
    color: colors.navy.grey,
    ...typography.subtitle2,
    [theme.breakpoints.down('md')]: {
      ...typography.body4
    }
  },
  positionValue: {
    display: 'flex',
    alignItems: 'center',
    color: colors.navy.lightGrey,
    ...typography.subtitle1,
    [theme.breakpoints.down('md')]: {
      ...typography.body3
    }
  },

  wrapper: {
    padding: 16,
    paddingTop: 12,
    borderRadius: '10px',
    background: colors.navy.component,

    '&:not(:last-child)': {
      marginBottom: '24px'
    },

    [theme.breakpoints.down('md')]: {
      '&:not(:last-child)': {
        marginBottom: '16px'
      }
    }
  },
  infoTitle: {
    color: colors.navy.veryLightGrey,
    ...typography.body1
  },
  circleIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8,
    marginTop: 6
  },
  tooltipTitle: {
    ...typography.subtitle1
  },
  supplyTooltip: {
    // backgroundColor: `${colors.red.error} !important`
  },
  exclamationMark: {
    height: 14,
    width: 14,
    paddingBottom: 2,
    marginLeft: 8,

    [theme.breakpoints.down('sm')]: {
      marginTop: 2
    },

    '&:hover': {
      cursor: 'pointer'
    }
  }
}))
export default useStyles
