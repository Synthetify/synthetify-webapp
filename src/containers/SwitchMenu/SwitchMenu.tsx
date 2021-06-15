import React from 'react'
import { Grid, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

interface IProps {
  items: string[]
  onChange: (newValue: number) => void
}

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: colors.black.controls
  }
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

interface StyledTabProps {
  label: string
}

const StyledTab = withStyles(() =>
  createStyles({
    root: {
      textTransform: 'none',
      fontWeight: 400,
      fontSize: 22,
      color: colors.gray.manatee,
      '&:focus': {
        fontWeight: 600,
        color: colors.gray.C4
      }
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles(() => ({
  root: {
    borderWidth: 1,
    borderBlockStyle: 'solid',
    borderColor: colors.gray.manatee,
    borderRadius: 10,
    backgroundColor: colors.blue.bastille
  }
}))

export const SwitchMenu: React.FC<IProps> = ({ items, onChange }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const tabs = items.map(item => <StyledTab label={item} />)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <Grid className={classes.root}>
      <StyledTabs value={value} onChange={handleChange}>
        {tabs}
      </StyledTabs>
    </Grid>
  )
}

export default SwitchMenu
