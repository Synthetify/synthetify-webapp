import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  valueCard: {
    background: colors.gray.balticSea,
    borderRadius: 10,
    padding: '4px 6px'
  },
  valueCardTitle: {
    color: colors.gray.manatee,
    fontFamily: theme.typography.fontFamily,
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 400
  },
  valueCardAmount: {
    color: colors.gray.skeletonField,
    fontFamily: theme.typography.fontFamily,
    fontSize: '35px',
    fontWeight: 700,
    lineHeight: '40px'
  },
  divider: {
    width: 139,
    marginTop: 6,
    marginBottom: 11,
    background: colors.gray.light
  }
}))

export default useStyles
