import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 200,
    [theme.breakpoints.down('sm')]: {
      minHeight: 320,
      flexWrap: 'wrap'
    }
  },
  available: {
    minWidth: 202,
    maxHeight: 60,
    overflow: 'hidden',
    '& *': {
      margin: 0
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 165
    }
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  secondHalf: {
    paddingTop: 22,
    maxWidth: 400,
    '& > *': {
      marginLeft: 5,
      marginRight: 5
    }
  },
  amountInput: {
    maxWidth: 375
  },
  divider: {
    backgroundColor: colors.gray.light,
    height: 60
  },
  bottom: {
    // '& > *': {
    //   overflow: 'hidden'
    // }
    //   display: 'flex',
    //   alignItems: 'center',
    //   flexDirection: 'row',
    //   [theme.breakpoints.down('xs')]: {
    //     paddingTop: 15,
    //     flexDirection: 'column',
    //     justifyContent: 'space-around',
    //     alignItems: 'flex-start'
    //   }
  },
  actionButton: {
    padding: '11px 40px',
    [theme.breakpoints.down('xs')]: {
      padding: '11px 15px'
    }
  }
}))

export default useStyles
