import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  deptPoolCard: {
    background: colors.navy.component,
    borderRadius: 10,
    width: 'min-content',
    color: '#000000',
    font: 'inter'
  },
  deptPoolCardTitle: {
    color: colors.navy.lightGrey,
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 600
  },
  deptPoolCardSubTitle: {
    color: colors.navy.info,
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400
  },
  pipeCanvasGrid: {
    height: '390px',
    width: '390px'
  },
  pipeCanvasBackground: {
    height: '392px',
    width: '392px',
    background: '#000000',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '44px 96px 15px 96px'
  }
}))

export default useStyles