import React from 'react'
import { Box, Divider, Fade, Grid, makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import HintIcon from '@static/svg/questionMark.svg'

export interface IProps {
  menuItems: IMenuItem
  setAction: (value: string) => void
}

export interface IMenuItem {
  [item: string]: React.ReactNode
}

interface ITabPanelProps {
  children?: React.ReactNode
  index: number
  value: any
}

const TabPanel = ({ children, value, index, ...other }: ITabPanelProps) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRadius: '10px 10px 0 0 ',
    background: colors.navy.component,
    display: 'flex',
    flexDirection: 'row',
    padding: '16px 24px',
    [theme.breakpoints.down('md')]: {
      padding: '16px 16px'
    }
  },
  root: {
    borderRadius: '10px 10px 0 0',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  },
  wrapper: {
    width: '100%'
  },
  '@keyframes slide': {
    from: {
      transform: 'translateX(50px)'
    },
    to: {
      transform: 'translateX(0px)'
    }
  },
  slide: {
    animation: '$slide .2s'
  },

  tooltipTitle: {
    ...typography.subtitle1
  },
  tooltipDescription: {
    ...typography.body4,
    color: colors.navy.lightGrey
  },
  questionMark: {
    height: 12,
    width: 12
  }
}))

export const SwitchLeverage: React.FC<IProps> = ({ menuItems, setAction }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [fadeIn, setFadeIn] = React.useState(true)
  const [slide, setSlide] = React.useState(true)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTimeout(() => {
      setValue(newValue)
      setAction(newValue === 0 ? 'open' : 'close')
    }, 100)
    setTimeout(() => {
      setFadeIn(true)
      setSlide(true)
    }, 200)
    setFadeIn(!fadeIn)
    setSlide(!slide)
  }

  const tabsContent = Object.keys(menuItems).map((key, index) => {
    return (
      <TabPanel key={index} value={value} index={index}>
        {menuItems[key]}
      </TabPanel>
    )
  })
  const useSingleTabStyles = makeStyles<Theme, { value: number }>(() => ({
    root: {
      zIndex: 1,
      textTransform: 'capitalize',
      ...typography.subtitle2,
      minWidth: '95px',
      color: colors.navy.info,
      maxHeight: '34px',
      minHeight: '34px',

      '&:hover': {
        color: colors.navy.grey
      }
    },
    selected: ({ value }) => ({
      ...typography.subtitle1,
      color: value === 0 ? colors.navy.veryLightGrey : colors.navy.background,
      transition: 'color 300ms',
      maxHeight: '34px',

      '&:hover': {
        color: value === 0 ? colors.navy.veryLightGrey : colors.navy.background
      }
    })
  }))

  const useTabsStyles = makeStyles<Theme, { value: number }>(() => ({
    root: { overflow: 'visible', minHeight: '34px' },
    indicator: ({ value }) => ({
      height: '100%',
      borderRadius: 5,
      backgroundColor: value === 0 ? colors.navy.button : colors.green.button
    }),
    scrollable: {
      overflow: 'visible',
      maxHeight: '34px'
    },
    scrollButtons: {
      color: 'white'
    },
    flexContainer: {
      justifyContent: 'space-around',
      borderRadius: '5px',
      background: colors.navy.background,
      maxHeight: '34px'
    }
  }))

  const singleTabClasses = useSingleTabStyles({ value })
  const tabsClasses = useTabsStyles({ value })
  return (
    <Grid className={classes.root}>
      <Grid className={classes.wrapper}>
        <Grid className={classes.tabs} container direction='row' justifyContent='space-between'>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='off'
            TabIndicatorProps={{ children: <span /> }}
            classes={tabsClasses}>
            <Tab disableRipple label='open' classes={singleTabClasses} />
            <Tab disableRipple label='close' classes={singleTabClasses} />
          </Tabs>
          <Grid>
            {' '}
            <MobileTooltip
              hint={
                <>
                  <Typography className={classes.tooltipTitle} style={{ marginBottom: 10 }}>
                    When can you Short and Long?
                  </Typography>
                  <Typography className={classes.tooltipDescription} style={{ marginBottom: 10 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum justo
                    dui, vel gravida mi vulputate et. Nunc luctus hendrerit metus eget convallis.
                    Praesent elementum dignissim tristique. Pellentesque ante eros, venenatis id
                    nisl eu,
                  </Typography>
                </>
              }
              anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
              mobilePlacement='top-end'
              desktopPlacement='top-end'
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider style={{ background: colors.navy.darkGrey }} />
      <Fade in={fadeIn}>
        <Grid className={slide ? classes.slide : ''}>{tabsContent}</Grid>
      </Fade>
    </Grid>
  )
}

export default SwitchLeverage
