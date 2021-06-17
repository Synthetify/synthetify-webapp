import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.black.cinder,
    width: 400,
    height: 500,
    borderRadius: 10,
    margin: 20,
    padding: 35,
    paddingTop: 25
  },
  modalName: {
    color: colors.gray.C4,
    fontSize: 22,
    lineHeight: '40px',
    float: 'left'
  },
  divider: {
    width: '320px',
    marginTop: -5,
    background: `linear-gradient(90deg, ${colors.green.main}, rgba(98, 126, 234, 0))`
  },
  closeIcon: {
    color: colors.gray.C4
  },
  searchIcon: {
    color: colors.gray.C4,
    margin: 8
  },
  closeButton: {
    float: 'right'
  },
  searchInput: {
    background: colors.black.controls,
    height: 40,
    lineHeight: 40,
    paddingLeft: 16,
    minWidth: 320,
    marginTop: 23,
    fontSize: 16,
    borderRadius: 10
  }
}))

export default useStyles
