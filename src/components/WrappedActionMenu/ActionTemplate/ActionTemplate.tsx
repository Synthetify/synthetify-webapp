import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import AmountInputWithLabel from '@components/Input/AmountInputWithLabel'
import MaxButton from '@components/CommonButton/MaxButton'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import BN from 'bn.js'
import useStyles from './style'

export interface IProps {
  action: string
  onClick: () => void
}

export const ActionTemplate: React.FC<IProps> = ({ action, onClick }) => {
  const classes = useStyles()

  const capitalize = (str: string) => {
    if (!str) {
      return str
    }
    return str[0].toUpperCase() + str.substr(1).toLowerCase()
  }

  return (
    <Grid
      container
      justify='space-around'
      alignItems='flex-start'
      direction='column'
      className={classes.root}>
      <Grid
        container
        item
        direction='row'
        wrap='nowrap'
        justify='space-between'
        alignItems='flex-end'>
        <Grid item>
          <AmountInputWithLabel
            className={classes.amountInput}
            setValue={(value: string) => value}
            currency={'xUSD'}
          />
        </Grid>
        <Grid item>
          <MaxButton />
        </Grid>
        <Grid item alignItems='center'>
          <Divider orientation='vertical' className={classes.divider} />
        </Grid>
        <Grid item alignItems='center' className={classes.available}>
          <KeyValue
            keyName={`Available to ${action}`}
            value={new BN(51640189)}
            decimal={4}
            unit='xUSD'
          />
        </Grid>
      </Grid>
      <Grid item>
        <OutlinedButton
          name={capitalize(action)}
          color='secondary'
          padding='11px 40px'
          style={{ width: 160 }}
          onClick={onClick}
        />
      </Grid>
    </Grid>
  )
}

export default ActionTemplate
