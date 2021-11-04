import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: colors.navy.component,
    borderRadius: 10,
    padding: '20px 24px 5px 24px',
    [theme.breakpoints.down('xs')]: {
      padding: '12px 16px 12px 16px'
    }
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
    width: '100%',
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
    width: '100%',
    padding: '8px 8px',
    backgroundColor: colors.navy.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      height: 84,
      padding: '4px 4px'
    },
    [theme.breakpoints.down('xs')]: {
      height: 404,
      width: 103
    }
  },
  legendWrapper: {
    padding: '24px 0px 10px 0px',
    fontSize: 18,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 25
    },
    [theme.breakpoints.down('xs')]: {
      width: 'fit-content',
      alignItems: 'flex-end',
      paddingBlock: 16,
      height: '100%',
      display: 'block'
    }
  },

  legendItem: {
    margin: '0 35px 10px 0',
    ...typography.body2,
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 0 0',
      ...typography.subtitle2,
      display: 'flex',
      '&:not(:first-child)': {
        marginTop: 16
      }
    },
    [theme.breakpoints.down('md')]: {
      ...typography.subtitle2
    },
    '& svg': {
      paddingBottom: 2,
      [theme.breakpoints.down('md')]: {
        paddingBottom: 0
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: 5
      }
    }
  }
}))

export default useStyles
