import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'fit-content',
    marginLeft: 'auto',
    borderRadius: 8,
    paddingBlock: 11,
    paddingInline: 16,
    backgroundColor: colors.navy.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingInline: 10,
      marginLeft: 0
    },
    [theme.breakpoints.down('xs')]: {
      paddingBlock: 5,
      paddingInline: 7
    }
  },
  text: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    marginRight: 15,
    [theme.breakpoints.down('sm')]: {
      marginRight: 10
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 5,
      ...typography.caption3
    }
  },
  title: {
    ...typography.subtitle1,
    marginBottom: 10
  },
  questionMark: {
    height: 21,
    width: 21,
    opacity: 0.75,
    [theme.breakpoints.down('xs')]: {
      width: 13,
      height: 13,
      fontSize: '13px'
    }
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
