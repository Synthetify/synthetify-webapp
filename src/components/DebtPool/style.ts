import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  debtPoolCard: {
    background: colors.navy.component,
    borderRadius: 10,
    marginRight: '12px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px'
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: '0'
    }
  },
  debtPoolCardContent: {
    paddingTop: '18px',
    paddingLeft: '24px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '10px',
      paddingLeft: '16px'
    }
  },
  debtPoolCardTitle: {
    color: colors.navy.veryLightGrey,
    ...typography.body1,

    [theme.breakpoints.down('sm')]: {
      ...typography.heading4
    }
  },
  debtPoolCardSubTitle: {
    color: colors.navy.info,
    ...typography.subtitle2,

    [theme.breakpoints.down('sm')]: {
      ...typography.body4
    }
  },
  pieCanvasGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  pieCanvasBackground: {
    height: '100%',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '100%',
    position: 'relative'
  },
  pieContainer: {
    margin: '49px 81px 28px 81px',
    [theme.breakpoints.down('md')]: {
      margin: '12px 65px 6px 65px'
    },

    [theme.breakpoints.down('sm')]: {
      margin: '12px 0px 0px 0px'
    },

    [theme.breakpoints.down('xs')]: {
      margin: '12px 16px 7px 16px'
    }
  },

  tooltipContainer: {
    borderRadius: '8px',
    filter: 'brightness(120%)',
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipContainerDisable: {
    display: 'none'
  },
  tooltipLabel: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '30px',
    [theme.breakpoints.down('md')]: {
      ...typography.body2
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '30px'
    }
  },
  tooltipValue: {
    ...typography.heading1,
    [theme.breakpoints.down('md')]: {
      ...typography.heading4
    }
  }
}))

export default useStyles
