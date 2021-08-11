import React from 'react'
import { Grid, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

export interface IProps {
  onChange: (newValue: number) => void
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
      minWidth: '50%',
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
        padding: 5
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 13,
        padding: 0
      },
      color: colors.navy.darkGrey
    },
    selected: {
      fontWeight: 600,
      color: colors.white.main
    }
  })
)((props: FullHeightIndicatorTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles(() => ({
  tabs: {
    borderRadius: 10,
    backgroundColor: colors.navy.dark
  }
}))

export const Switch: React.FC<IProps> = ({ onChange }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <Grid style={{ maxWidth: 414 }}>
      <Grid className={classes.tabs}>
        <FullHeightIndicatorTabs value={value} onChange={handleChange}>
          <FullHeightIndicatorTab label='Staked' />
          <FullHeightIndicatorTab label='Synthetic' />
        </FullHeightIndicatorTabs>
      </Grid>
    </Grid>
  )
}

export default Switch
