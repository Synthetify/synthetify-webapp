import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({

  buttonAccent: {
    minWidth: '115px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontFamily: theme.typography.fontFamily,
    color: colors.gray.manatee,
    padding: '5px 20px',
    lineHeight: '40px',
    borderRadius: 5,
    fontSize: '18px',
    textTransform: 'none',
    boxShadow: 'none',

    '&:hover': {
      background: colors.blue.bastille,
      color: colors.gray.skeletonField,
      fontWeight: 600
    }
  }

}))

export default useStyles
