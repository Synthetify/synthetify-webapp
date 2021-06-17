import { pink } from '@material-ui/core/colors'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.cinder,
    width: 400,
    height: 500,
    borderRadius: 10,
    margin: 20,
    paddingTop: 25,
    paddingLeft: 35
  },
  modalName: {
    color: colors.gray.C4,
    fontSize: 22,
    lineHeight: '40px',
    float: 'left'
  },
  divider: {
    width: '340px',
    background: `linear-gradient(90deg, ${colors.green.main}, rgba(98, 126, 234, 0))`
  },
  closeIcon: {
    color: colors.gray.C4
  },
  closeButton: {
    float: 'right',
    marginRight: 25
  }
}))

export default useStyles
