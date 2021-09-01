import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        justifyContent: 'center',
        backgroundColor: colors.navy.component,
        width: 1072,
        height: 336
      },
}))  

export default useStyles
