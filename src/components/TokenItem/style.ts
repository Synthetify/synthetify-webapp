import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  font: {
    fontSize: 22,
    fontWeight: 400,
    color: colors.gray.C4,
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
}))

export default useStyles
