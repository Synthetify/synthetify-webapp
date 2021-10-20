import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'fit-content',
    marginLeft: 'auto',
    borderRadius: 10,
    paddingBlock: 11,
    paddingInline: 16,
    backgroundColor: colors.navy.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingBlock: 8,
      paddingInline: 7
    }
  },
  text: {
    ...typography.subtitle2,
    color: colors.navy.grey,
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  title: {
    ...typography.subtitle1,
    marginBottom: 10
  },
  questionMark: {
    height: 22,
    width: 22,
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
