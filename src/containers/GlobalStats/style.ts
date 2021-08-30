import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    borderRadius: 10,
    padding: 15,
    height: '260px',

    [theme.breakpoints.down('sm')]: {
      padding: 20
    }
  },
  pieRoot: {
    background: colors.navy.component,
    borderRadius: 10,
    padding: 25
  },
  pieLegend: {
    background: colors.navy.component,
    borderRadius: 10,
    paddingRight: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 20
    }
  },
  barRoot: {
    background: colors.navy.component,
    borderRadius: 10,
    padding: 15,

    [theme.breakpoints.down('sm')]: {
      padding: 20
    }
  },
  title: {
    paddingLeft: 15,
    fontSize: 22,
    color: colors.navy.lightGrey,
    fontWeight: 600
  },
  secondTitle: {
    paddingLeft: 15,
    marginTop: -10,
    fontSize: 12,
    color: colors.navy.darkGrey,
    fontWeight: 600
  }
}))

export default useStyles
