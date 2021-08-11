import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: colors.navy.component,
    borderRadius: 10,
    padding: 20,

    [theme.breakpoints.down('md')]: {
      paddingBlock: 17
    },

    [theme.breakpoints.down('sm')]: {
      paddingBlock: 14
    }
  },
  list: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  switch: {
    marginBottom: 10,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 6
    }
  },
  header: {
    height: 66,
    paddingInline: 16,

    [theme.breakpoints.down('sm')]: {
      height: 39
    },

    [theme.breakpoints.down('xs')]: {
      paddingInline: 11
    }
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    color: colors.navy.veryLightGrey,

    [theme.breakpoints.down('sm')]: {
      fontSize: 17
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 15
    }
  },
  addAccount: {
    width: 147,
    height: 36,
    borderRadius: 6,
    backgroundColor: 'rgba(12, 13, 44, 0.4)',
    color: colors.navy.veryLightGrey,
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 15,

    [theme.breakpoints.down('sm')]: {
      height: 30
    },

    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      right: 11,
      width: 119,
      height: 28
    }
  },
  sum: {
    fontSize: 16,
    color: colors.navy.veryLightGrey,
    fontWeight: 600,
    position: 'absolute',
    right: 16,

    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      right: 11
    }
  }
}))

export const useStylesWithProps = makeStyles<Theme, { current: number }>((theme: Theme) => ({
  header: ({ current }) => ({
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    height: 66,
    paddingInline: 16,

    [theme.breakpoints.down('sm')]: {
      height: 39
    },

    [theme.breakpoints.down('xs')]: {
      paddingInline: 11
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '200%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(90deg, #6A6FC5 24.66%, #40BF9F 50%, #40BF9F 78.82%, #6C6BC7 100%)',
      transform: `translateX(${current === 0 ? 0 : -50}%)`,
      transition: 'transform 1s'
    }
  })
}))

export default useStyles
