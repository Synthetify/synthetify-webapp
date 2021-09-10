import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0
  },
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '64px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '64px 19px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '32px 16px'
    }
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
