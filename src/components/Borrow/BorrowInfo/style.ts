import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: 24,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
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
    '&:last-child': {
      flexGrow: 1,
      minHeight: '160px'
    }
  },
  infoTitle: {
    color: colors.navy.veryLightGrey,
    ...typography.body1
  }
}))
export default useStyles
