import React from 'react'
import { Grid, makeStyles, Tab, Tabs } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

export interface IProps {
  onChange: (newValue: number) => void
}

const useStyles = makeStyles(() => ({
  tabs: {
    borderRadius: 10,
    backgroundColor: colors.navy.dark
  }
}))

const useTabsStyles = makeStyles<Theme, { value: number }>(() => ({
  root: { overflow: 'visible' },
  indicator: ({ value }) => ({
    height: '100%',
    borderRadius: 10,
    backgroundColor: value === 0 ? colors.navy.button : colors.green.button,
    transition: 'background-color 1s'
  }),
  scrollable: {
    overflow: 'visible'
  },
  scrollButtons: {
    color: 'white'
  },
  flexContainer: {
    justifyContent: 'space-around'
  }
}))

const useSingleTabStyles = makeStyles<Theme, { value: number }>((theme: Theme) => ({
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
  selected: ({ value }) => ({
    fontWeight: 600,
    color: value === 0 ? colors.navy.veryLightGrey : colors.navy.background,
    transition: 'color 1s'
  })
}))

export const Switch: React.FC<IProps> = ({ onChange }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const tabsClasses = useTabsStyles({ value })
  const singleTabClasses = useSingleTabStyles({ value })
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <Grid style={{ maxWidth: 414 }}>
      <Grid className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='off'
          TabIndicatorProps={{ children: <span /> }}
          classes={tabsClasses}
        >
          <Tab disableRipple label='Staked' classes={singleTabClasses} />
          <Tab disableRipple label='Synthetic' classes={singleTabClasses} />
        </Tabs>
      </Grid>
    </Grid>
  )
}

export default Switch
