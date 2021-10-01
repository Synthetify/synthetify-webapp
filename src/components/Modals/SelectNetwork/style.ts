import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.component,
    width: 163,
    height: 180,
    borderRadius: 10,
    marginTop: 13,
    paddingTop: 8,
    [theme.breakpoints.down('md')]: {
      marginTop: 24
    }
  },
  listItem: {
    color: colors.navy.grey,
    borderRadius: 10,
    //paddingLeft: 16,
    paddingLeft: 8,
    padding: 4,
    maxWidth: 147,
    margin: 3,
    cursor: 'pointer',
    '&:hover': {
      background: colors.navy.navButton,
      color: colors.navy.veryLightGrey,
      '& $icon': {
        opacity: 1
      },
      '& $name': {
        ...typography.subtitle1
      },
      '& $network':{
        color: '#9D9CEE'
      }
    }
  },
  name: {
    textTransform: 'capitalize',
    ...typography.subtitle1
  },
  network: {
    ...typography.caption1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: colors.navy.info
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  icon: {
    width: 20,
    height: 20,
    display: 'inline',
    float: 'left',
    margin:'3px 8px 0px 1px',
    opacity: 0.6
  }
}))

export default useStyles
