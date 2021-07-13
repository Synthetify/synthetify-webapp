import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: 'fit-content',
    marginLeft: 'auto',
    borderRadius: 10,
    padding: '0 16px',
    backgroundColor: colors.black.background
  },
  text: {
    fontSize: 16,
    color: colors.gray.C7C9D1
  },
  tooltip: {
    background: colors.gray.mid,
    color: colors.white.main,
    fontWeight: 400,
    fontSize: 13,
    padding: '5px 8px',
    lineHeight: '16px'
  },
  questionMark: {
    height: 17,
    width: 17
  }
}))

export default useStyles
