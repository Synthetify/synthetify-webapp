import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0
  },
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '86px 0'

  },
  header: {
    fontSize: 32,
    lineHeight: '40px',
    color: colors.navy.veryLightGrey,
    padding: '0 0 24px 0',
    margin: '0 auto',
    width: 1063,
    [theme.breakpoints.down('md')]: {
      width: 846
    }
  },
  gridItem: {
    paddingBottom: 12
  }

}))

export default useStyles
