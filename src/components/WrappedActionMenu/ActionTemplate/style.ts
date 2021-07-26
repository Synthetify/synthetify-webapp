import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 200,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 20,
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
    [theme.breakpoints.down('sm')]: {
      marginBlock: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      width: 'calc(100% - 111px)'
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
    maxWidth: 375,
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      '& > *': {
        marginLeft: 5,
        marginRight: 5
      }
    }
  },
  amountInput: {
    maxWidth: 375
  },
  divider: {
    backgroundColor: colors.navy.grey,
    height: 60
  },
  actionButton: {
    paddingBlock: 11,
    width: 186,
    marginTop: 32,
    [theme.breakpoints.down('sm')]: {
      width: 136,
      marginTop: 25
    }
  },
  xsTextAlignCenter: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  xsItemCenter: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 110,
      '& > *': {
        marginInline: 20
      }
    }
  },
  progress: {
    marginTop: 32,
    [theme.breakpoints.down('sm')]: {
      marginTop: 25
    }
  }
}))

export default useStyles
