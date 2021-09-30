import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({

  button: {
    width: 73,
    height: 33,
    backgroundColor: colors.navy.grey,
    borderRadius: 6,
    marginRight: 16,
    border: 'none',
    color: colors.navy.navButton,
    fontSize: 16,
    fontWeight: 800,
    transition: '1s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.125)'
    }
  }

}))

export default useStyles
