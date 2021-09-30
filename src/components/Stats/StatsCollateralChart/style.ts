import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: colors.navy.component,
    borderRadius: 10,
    padding: '10px 24px 20px 24px'
  },

  statsWrapper: {
    width: '100%',
    height: 'calc(100% - 90px)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      width: 300,
      height: 'calc(100% - 50px)',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginInline: 'auto'
    }
  },
  headerWrapper: {
    alignSelf: 'flex-start',
    height: 80,
    width: '100%'
  },
  title: {
    ...typography.body1,
    color: colors.navy.veryLightGrey,
    [theme.breakpoints.down('xs')]: {
      ...typography.heading4
    }
  },
  subTitle: {
    ...typography.subtitle2,
    color: colors.navy.info,
    width: 'calc(100% - 16px)',
    [theme.breakpoints.down('xs')]: {
      ...typography.body4
    }
  },
  chartWrapper: {
    width: 'calc(100% - 13.8px)',
    height: 85,
    backgroundColor: colors.navy.background,
    borderRadius: 10,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 8.06px)',
      height: 'calc(100% - 8px)'
    },
    [theme.breakpoints.down('xs')]: {
      width: 95,
      height: 'calc(100% - 10px)'
    },

    '& text': {
      ...typography.body3,

      [theme.breakpoints.down('xs')]: {
        ...typography.caption4
      }
    }
  },

  border: {
    width: 'calc(100% - 48px)',
    height: 103,
    backgroundColor: colors.navy.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      height: 84,
      width: 'calc(100% - 32px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 404,
      width: 103
    }
  },
  legendWrapper: {
    padding: '20px 0px 24px 0px',
    margin: 0,
    fontSize: 18,
    width: 'calc(100% - 20px)',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: 'fit-content',
      alignItems: 'flex-end',
      paddingBlock: 16
    }
  },
  legendList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBlock: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      height: '100%',
      width: '100%'
    }
  },

  legendItem: {
    marginRight: 35,
    ...typography.body2,
    fontFamily: 'Be Vietnam',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      ...typography.subtitle2
    }
  }
}))

export default useStyles
