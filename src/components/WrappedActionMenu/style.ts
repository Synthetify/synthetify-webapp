import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: colors.gray.component
  },
  maxWidth375: {
    maxWidth: 375
  },
  available: {
    maxWidth: 240,
    maxHeight: 60,
    overflow: 'hidden',
    '& *': {
      margin: 0
    }
  },
  property: {
    fontSize: 20,
    color: colors.gray.light
  },
  value: {
    fontSize: 20,
    color: colors.gray.veryLight
  },
  lineHeight: {
    lineHeight: 1.5
  },
  dividerWrapper: {
    width: 1
  },
  divider: {
    backgroundColor: colors.gray.light,
    height: 60
  }
}))

export default useStyles
