import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  switch: {
    marginBottom: 8
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    color: colors.navy.veryLightGrey,

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
    paddingInline: 0,

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
    position: 'absolute',
    right: 24,

    [theme.breakpoints.down('sm')]: {
      right: 20
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      right: 16
    }
  }
}))

export const useStylesWithProps = makeStyles<Theme, { current: number }>((theme: Theme) => ({
  header: ({ current }) => ({
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    height: 69,
    paddingInline: 24,
    borderRadius: '10px 10px 0 0',

    [theme.breakpoints.down('sm')]: {
      height: 61,
      paddingInline: 20
    },

    [theme.breakpoints.down('xs')]: {
      height: 45,
      paddingInline: 16
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '200%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(90deg, #655ED4 24.66%, #40BF9F 50%, #40BF9F 78.82%, #655ED4 100%)',
      opacity: 0.75,
      transform: `translateX(${current === 0 ? 0 : -50}%)`,
      transition: 'transform 300ms'
    }
  })
}))

export default useStyles
