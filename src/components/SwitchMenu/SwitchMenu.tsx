import React from 'react'
import { Box, Fade, Grid, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export interface IProps {
  menuItems: IMenuItem
  onChange: (newValue: number) => void
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

interface FullHeightIndicatorTabsProps {
  value?: any
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const FullHeightIndicatorTabs = withStyles({
  root: { overflow: 'visible' },
  indicator: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: colors.navy.button
  },
  scrollable: {
    overflow: 'visible'
  },
  scrollButtons: {
    color: 'white'
  },
  flexContainer: {
    justifyContent: 'space-around'
  }
})((props: FullHeightIndicatorTabsProps) => (
  <Tabs
    variant='scrollable'
    scrollButtons='off'
    TabIndicatorProps={{ children: <span /> }}
    {...props}
  />
))

interface FullHeightIndicatorTabProps {
  label: string
}

const FullHeightIndicatorTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 1,
      textTransform: 'capitalize',
      ...typography.body2,
      minHeight: 60,
      minWidth: '20%',
      [theme.breakpoints.down('sm')]: {
        ...typography.subtitle2,
        padding: 5
      },
      [theme.breakpoints.down('xs')]: {
        ...typography.body4,
        padding: 0
      },
      color: colors.navy.info,

      '&:hover': {
        color: colors.navy.grey
      }
    },
    selected: {
      ...typography.body1,
      color: colors.white.main,

      '&:hover': {
        color: colors.white.main
      },

      [theme.breakpoints.down('sm')]: {
        ...typography.subtitle1
      },

      [theme.breakpoints.down('xs')]: {
        ...typography.body3
      }
    },
    wrapper: {
      position: 'relative',
      top: -2,

      [theme.breakpoints.down('sm')]: {
        top: -1
      }
    }
  })
)((props: FullHeightIndicatorTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles(() => ({
  tabs: {
    borderRadius: 10,
    backgroundColor: colors.navy.dark
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
  }
}))

export const SwitchMenu: React.FC<IProps> = ({ menuItems, onChange }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [fadeIn, setFadeIn] = React.useState(true)
  const [slide, setSlide] = React.useState(true)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTimeout(() => {
      setValue(newValue)
      onChange(newValue)
    }, 100)
    setTimeout(() => {
      setFadeIn(true)
      setSlide(true)
    }, 200)
    setFadeIn(!fadeIn)
    setSlide(!slide)
  }

  const tabs = Object.keys(menuItems).map((item, index) => (
    <FullHeightIndicatorTab key={index} label={item} />
  ))

  const tabsContent = Object.keys(menuItems).map((key, index) => {
    return (
      <TabPanel key={index} value={value} index={index}>
        {menuItems[key]}
      </TabPanel>
    )
  })
  return (
    <Grid style={{ width: '100%' }}>
      <Grid className={classes.tabs}>
        <FullHeightIndicatorTabs value={value} onChange={handleChange}>
          {tabs}
        </FullHeightIndicatorTabs>
      </Grid>
      <Fade in={fadeIn} ><Grid className={slide ? classes.slide : ''}>{tabsContent}</Grid></Fade>
    </Grid>
  )
}

export default SwitchMenu
