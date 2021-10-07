import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: 'fit-content',
    marginLeft: 'auto',
    borderRadius: 10,
    paddingBlock: 11,
    paddingInline: 16,
    backgroundColor: colors.navy.background
  },
  text: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    position: 'relative',
    top: -1
  },
  title: {
    ...typography.subtitle1,
    marginBottom: 10
  },
  questionMark: {
    height: 22,
    width: 22
  },
  rewardsIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8,
    marginTop: 6
  }
}))

export default useStyles
