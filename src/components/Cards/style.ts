import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  valueCard: {
    backgroundColor: colors.gray.balticSea,
    borderRadius: 10
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
  }
}))

export default useStyles
