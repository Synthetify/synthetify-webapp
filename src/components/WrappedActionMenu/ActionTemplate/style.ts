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
      minWidth: 132,
      marginBlock: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      width: 'calc(100% - 111px)'
    }
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  secondHalf: {
    paddingTop: 22,
    maxWidth: 375,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 250,
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 375,
      '& > *': {
        marginLeft: 5,
        marginRight: 5
      }
    }
  },
  amountInput: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 275
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 375
    }
  },
  inputRoot: {
    width: '100%'
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
  smTextAlignCenter: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  smItemCenter: {
    [theme.breakpoints.down('sm')]: {
      '& > button': {
        width: 70,
        marginLeft: 10
      }
    },
    [theme.breakpoints.down('xs')]: {
      '& > button': {
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
