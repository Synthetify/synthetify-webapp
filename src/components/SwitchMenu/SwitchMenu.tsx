import React from 'react'
import { Box, Grid, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

interface IProps {
  items: string[]
  itemContents: React.ReactNode[]
  menuItems?: IMenuItem
  maxWidth?: number
  onChange: (newValue: number) => void
}

interface IMenuItem {
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
        <Box p={3}>
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
  indicator: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: colors.gray.mid
  },
  scrollButtons: {
    color: 'white'
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
      textTransform: 'none',
      fontWeight: 400,
      fontSize: 22,
      [theme.breakpoints.down('xs')]: {
        fontSize: 18
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
  root: {
    borderRadius: 10,
    backgroundColor: colors.gray.dark
  }
}))

export const SwitchMenu: React.FC<IProps> = ({
  items,
  itemContents,
  menuItems,
  maxWidth,
  onChange
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const tabs = items.map((item, index) => <FullHeightIndicatorTab key={index} label={item} />)

  const menuItemExample: IMenuItem = {
    option1: 'content1',
    option2: 'content2'
  }

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    onChange(newValue)
  }

  const tabContents = Object.keys(menuItemExample).map((key, index) => {
    return (
      <TabPanel value={value} index={index}>
        {menuItemExample[key]}
      </TabPanel>
    )
  })

  return (
    <Grid className={classes.root} style={{ maxWidth: maxWidth || '100%' }}>
      <FullHeightIndicatorTabs value={value} onChange={handleChange}>
        {tabs}
      </FullHeightIndicatorTabs>
      {tabContents}
    </Grid>
  )
}

export default SwitchMenu
