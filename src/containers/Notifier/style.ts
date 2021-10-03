import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({

  button: {
    width: 73,
    height: 33,
    backgroundColor: colors.navy.grey,
    borderRadius: 6,
    marginRight: 16,
    border: 'none',
    color: colors.navy.navButton,
    ...typography.subtitle1,
    paddingBottom: 3,
    transition: '1s all ease-in-out',
    transform:  'perspective(1000px) translateZ(0px)',
    '&:hover': {
      transform:  'perspective(1000px) translateZ(150px)'
    },
    [theme.breakpoints.down('xs')]: {
      width: 36,
      height: 16,
      fontSize: 9,
      lineHeight: '14px',
      marginTop: 2,
      marginRight: 8,
      paddingBottom: 17,
      paddingRight: 36
    }
  }

}))

export default useStyles