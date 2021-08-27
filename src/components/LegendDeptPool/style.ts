import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  statsListCard: {
    background: colors.navy.component,
    borderRadius: 10,
    height: '100%'
  },
  statsListCardContent: {
    paddingTop: 'auto',
    paddingBottom: '0',
    '&:last-child': {
      paddingBottom: '0'
    }
  },
  listItemIconName: {
    paddingRight: 3,
    alignItems: 'center',
    '&> svg': {
      paddingRight: 5
    }
  },
  listItemIconNumber: {
    alignItems: 'center',
    color: colors.navy.button,

    paddingLeft: 10,
    '&> svg': {
      paddingRight: 5
    },
    '& span': {
      fontSize: 15
    }
  },
  percentNumber: {
    fontSize: 16,
    lineHeight: 1.43,
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles