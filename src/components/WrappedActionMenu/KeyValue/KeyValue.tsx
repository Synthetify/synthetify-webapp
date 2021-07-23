import React from 'react'
import { printBN } from '@consts/utils'
import { Typography } from '@material-ui/core'
import BN from 'bn.js'
import classNames from 'classnames'
import useStyles from './style'
import AnimatedNumber from '@components/AnimatedNumber'

export interface IProps {
  keyName: string
  value: BN
  decimal: number
  unit: string
  keyClassName?: string
  valueClassName?: string
}

export const KeyValue: React.FC<IProps> = ({
  keyName,
  value,
  decimal,
  unit,
  keyClassName,
  valueClassName
}) => {
  const classes = useStyles()

  return (
    <>
      <Typography
        className={classNames(classes.text, classes.property, classes.lineHeight, keyClassName)}>
        {keyName}
      </Typography>
      <Typography
        className={classNames(classes.text, classes.value, classes.lineHeight, valueClassName)}>
        {unit} <AnimatedNumber value={printBN(value, decimal)} duration={300} formatValue={(value: string) => Number(value).toFixed(4)}/>
      </Typography>
    </>
  )
}

export default KeyValue
