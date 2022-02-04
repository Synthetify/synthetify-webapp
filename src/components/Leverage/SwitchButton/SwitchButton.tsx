import { Grid, Tab, Tabs } from '@material-ui/core'
import React from 'react'

import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
export interface ILeverProps {
  setLeverStatus: (val: boolean) => void
}
export const SwitchButton: React.FC<ILeverProps> = ({ setLeverStatus }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTimeout(() => {
      setValue(newValue)
      setLeverStatus(newValue !== 0)
    }, 100)
  }
  const singleTabClasses = useSingleTabStyles({ value })
  const tabsClasses = useTabsStyles({ value })
  return (
    <Grid className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='off'
        TabIndicatorProps={{ children: <span /> }}
        classes={tabsClasses}>
        <Tab disableRipple label='Long' classes={singleTabClasses} />
        <Tab disableRipple label='Short' classes={singleTabClasses} />
      </Tabs>
    </Grid>
  )
}
