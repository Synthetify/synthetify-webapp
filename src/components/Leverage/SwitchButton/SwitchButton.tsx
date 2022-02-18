import { Grid, Tab, Tabs } from '@material-ui/core'
import React from 'react'

import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
export interface ILeverProps {
  setLeverStatus: (val: boolean) => void
  firstOption: string
  secondOption: string
  openCloseLeverage?: (event: any) => void
  openCloseModal?: boolean
  changeStatus?: number
}
export const SwitchButton: React.FC<ILeverProps> = ({
  setLeverStatus,
  firstOption,
  secondOption,
  openCloseLeverage,
  openCloseModal,
  changeStatus
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState<number>(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    setLeverStatus(newValue !== 0)
  }
  React.useEffect(() => {
    if (typeof openCloseModal !== 'undefined' && !openCloseModal) {
      setValue(0)
    }
  }, [openCloseModal, value])

  React.useEffect(() => {
    if (typeof changeStatus !== 'undefined') {
      setValue(changeStatus)
    }
  }, [changeStatus])
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
