import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((_theme: Theme) => ({
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '64px 0'
  },
  header: {
    fontSize: 32,
    lineHeight: '40px',
    color: colors.navy.veryLightGrey,
    padding: '0 0 24px 0',
    margin: 0
  },
  gridItem: {
    paddingBottom: 12
  }

}))

export default useStyles
