import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  valueCard: {
    backgroundColor: colors.gray.balticSea,
  },
  valueCardTitle: {
    color: colors.gray.manatee,

  },
  valueCardAmount: {
    color: colors.gray.skeletonField,

  }
}))

export default useStyles
