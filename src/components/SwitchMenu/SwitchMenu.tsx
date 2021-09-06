import React from 'react'
import { Box, Grid, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

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
      fontWeight: 400,
      fontSize: 22,
      minHeight: 60,
      minWidth: '20%',
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
        padding: 5
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 13,
        padding: 0
      },
      color: colors.navy.info,

      '&:hover': {
        color: colors.navy.grey
      }
    },
    selected: {
      fontWeight: 600,
      color: colors.white.main,

      '&:hover': {
        color: colors.white.main
      }
    }
  })
)((props: FullHeightIndicatorTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles(() => ({
  tabs: {
    borderRadius: 10,
    backgroundColor: colors.navy.dark
  }
}))

export const SwitchMenu: React.FC<IProps> = ({ menuItems, onChange }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    onChange(newValue)
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
      <Grid>{tabsContent}</Grid>
    </Grid>
  )
}

export default SwitchMenu
