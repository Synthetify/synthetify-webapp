import React from 'react'
import { Grid, makeStyles, Tab, Tabs } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

export interface IProps {
  onChange: (newValue: number) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRadius: 10,
    backgroundColor: '#060620'
  },
  wrapper: {
    maxWidth: 320,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 414
    }
  }
}))

const useTabsStyles = makeStyles<Theme, { value: number }>(() => ({
  root: { overflow: 'visible' },
  indicator: ({ value }) => ({
    height: '100%',
    borderRadius: 10,
    backgroundColor: value === 0 ? colors.navy.button : colors.green.button
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

const useSingleTabStyles = makeStyles<Theme, { value: number }>(() => ({
  root: {
    zIndex: 1,
    textTransform: 'capitalize',
    ...typography.body2,
    minHeight: 60,
    minWidth: '50%',
    color: colors.navy.info,

    '&:hover': {
      color: colors.navy.grey
    }
  },
  selected: ({ value }) => ({
    ...typography.body1,
    color: value === 0 ? colors.navy.veryLightGrey : colors.navy.background,
    transition: 'color 300ms',

    '&:hover': {
      color: value === 0 ? colors.navy.veryLightGrey : colors.navy.background
    }
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
    <Grid className={classes.wrapper}>
      <Grid className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='off'
          TabIndicatorProps={{ children: <span /> }}
          classes={tabsClasses}>
          <Tab disableRipple label='Staked' classes={singleTabClasses} />
          <Tab disableRipple label='Synthetic' classes={singleTabClasses} />
        </Tabs>
      </Grid>
    </Grid>
  )
}

export default Switch
