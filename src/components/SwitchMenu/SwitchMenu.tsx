import React from 'react'
import { Grid, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

interface IProps {
  items: string[]
  maxWidth: number
  onChange: (newValue: number) => void
}

interface FullHeightIndicatorTabsProps {
  value: number
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

export const SwitchMenu: React.FC<IProps> = ({ items, maxWidth, onChange }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const tabs = items.map((item, index) => <FullHeightIndicatorTab key={index} label={item} />)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <Grid className={classes.root} style={{ maxWidth }}>
      <FullHeightIndicatorTabs value={value} onChange={handleChange}>
        {tabs}
      </FullHeightIndicatorTabs>
    </Grid>
  )
}

export default SwitchMenu
