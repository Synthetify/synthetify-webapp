import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      backgroundColor: '#1DA1F2',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FBFBFB',
      ...typography.subtitle2,
      padding: '8px',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        height: 'auto'
      }
    },
    textWithIcon: {
      ...typography.subtitle1,
      display: 'flex',

      alignItems: 'center'
    },
    tweet: {
      textDecoration: 'none',
      color: colors.gray.dark
    }
  })
)
export default useStyles
