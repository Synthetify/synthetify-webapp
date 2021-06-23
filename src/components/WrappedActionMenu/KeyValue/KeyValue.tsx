import React from 'react'
import { printBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  keyName: string
  value: BN
  decimal: number
  unit: string
}

export const KeyValue: React.FC<IProps> = ({ keyName, value, decimal, unit }) => {
  const classes = useStyles()
  const valueToPrint = `${unit} ${printBN(value, decimal)}`

  return (
    <Grid item alignItems='center' className={classes.available}>
      <Typography className={classNames(classes.property, classes.lineHeight)}>
        {keyName}
      </Typography>
      <Typography className={classNames(classes.value, classes.lineHeight)}>
        {valueToPrint}
      </Typography>
    </Grid>
  )
}

export default KeyValue
