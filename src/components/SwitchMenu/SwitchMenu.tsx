import React from 'react'
import { Box, Grid, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

export interface IProps {
  menuItems: IMenuItem
  maxWidth?: number
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
          <Typography>{children}</Typography>
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
    height: 'calc(100% + 10px)',
    borderRadius: 10,
    backgroundColor: colors.gray.mid,
    bottom: -5
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
    scrollButtons='auto'
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
      [theme.breakpoints.down('xs')]: {
        fontSize: 13,
        minWidth: 62,
        padding: 0
      },
      color: colors.gray.manatee
    },
    selected: {
      fontWeight: 600,
      color: colors.gray.veryLight
    }
  })
)((props: FullHeightIndicatorTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles(() => ({
  tabs: {
    borderRadius: 10,
    backgroundColor: colors.gray.dark
  }
}))

export const SwitchMenu: React.FC<IProps> = ({ menuItems, maxWidth, onChange }) => {
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
      <TabPanel value={value} index={index}>
        {menuItems[key]}
      </TabPanel>
    )
  })

  return (
    <Grid>
      <Grid className={classes.tabs} style={{ maxWidth: maxWidth || '100%' }}>
        <FullHeightIndicatorTabs value={value} onChange={handleChange}>
          {tabs}
        </FullHeightIndicatorTabs>
      </Grid>
      <Grid>{tabsContent}</Grid>
    </Grid>
  )
}

export default SwitchMenu
