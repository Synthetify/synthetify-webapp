import { Grid, Tab, Tabs } from '@material-ui/core'
import React from 'react'

import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
export interface ILeverProps {
  setLeverStatus: (val: boolean) => void
  firstOption: string
  secondOption: string
  openCloseLeverage?: (event: any) => void
  openCloseModal?: boolean
}
export const SwitchButton: React.FC<ILeverProps> = ({
  setLeverStatus,
  firstOption,
  secondOption,
  openCloseLeverage,
  openCloseModal
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState<number>(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTimeout(() => {
      setValue(newValue)
      setLeverStatus(newValue !== 0)
    }, 100)
  }
  React.useEffect(() => {
    if (!openCloseModal) {
      setValue(0)
    }
  }, [openCloseModal, value])

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
        <Tab disableRipple label={firstOption} classes={singleTabClasses} />
        <Tab
          disableRipple
          label={secondOption}
          classes={singleTabClasses}
          onClick={openCloseLeverage}
        />
      </Tabs>
    </Grid>
  )
}
