import React from 'react'
import { printBN, showMorK } from '@consts/utils'
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
        {unit}{' '}
        <AnimatedNumber
          value={printBN(value, decimal)}
          duration={300}
          formatValue={(value: string) => {
            const num = Number(value)

            if (num < 10000) {
              return num.toFixed(4)
            }

            if (num < 1000000) {
              return (num / 1000).toFixed(3)
            }

            return (num / 1000000).toFixed(3)
          }}
        />
        {showMorK(+printBN(value, decimal))}
      </Typography>
    </>
  )
}

export default KeyValue
