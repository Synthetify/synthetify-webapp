import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    borderRadius: 10
  },
  dataWrapper: {
    padding: 16,
    paddingTop: 6
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
      ...typography.body3
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
  descWrapper: {
    padding: '24px 4px 0px 4px'
  },
  descTitle: {
    color: colors.navy.veryLightGrey,
    ...typography.subtitle1,
    paddingBottom: 24
  },
  descText: {
    color: colors.navy.grey,
    ...typography.body4
  }
}))
export default useStyles
