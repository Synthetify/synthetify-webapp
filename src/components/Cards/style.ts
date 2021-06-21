import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  valueCard: {
    background: colors.gray.component,
    borderRadius: 10,
    padding: '4px 6px'
  },
  valueCardTitle: {
    color: colors.gray.manatee,
    fontFamily: theme.typography.fontFamily,
    fontSize: '22px',
    lineHeight: '26px',
    fontWeight: 400
  },
  valueCardAmount: {
    color: colors.gray.skeletonField,
    fontFamily: theme.typography.fontFamily,
    fontSize: '35px',
    fontWeight: 700
  },
  divider: {
    width: '177px',
    marginTop: '8px',
    marginBottom: '15px',
    background: `linear-gradient(90deg, ${colors.green.main}, rgba(98, 126, 234, 0))`
  }
}))

export default useStyles
