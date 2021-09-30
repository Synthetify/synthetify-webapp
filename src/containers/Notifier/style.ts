import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({

  button: {
    width: 73,
    height: 33,
    backgroundColor: colors.navy.grey,
    borderRadius: 6,
    marginRight: 16,
    border: 'none',
    color: colors.navy.navButton,
    fontFamily: 'Be Vietnam',
    fontSize: 16,
    fontWeight: 800,
    lineHeight: '24px',
    paddingBottom: 3,
    transition: '1s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.125)'
    },
    [theme.breakpoints.down('xs')]: {
      width: 36,
      height: 16,
      fontSize: 9,
      lineHeight: '14px',
      paddingBottom: 3
    }
  }

}))

export default useStyles
