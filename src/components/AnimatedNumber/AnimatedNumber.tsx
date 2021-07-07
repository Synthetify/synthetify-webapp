import React, { useState, useEffect } from 'react'
import ReactAnimatedNumber from 'react-animated-numbers'

export interface IProps {
  numberToAnimate: string
  showZeroAfterDot?: boolean
}

export const AnimatedNumber: React.FC<IProps> = ({ numberToAnimate, showZeroAfterDot }) => {
  const [integer, setInteger] = useState(numberToAnimate.split('.')[0])
  const [decimal, setDecimal] = useState(numberToAnimate.split('.')?.[1] ?? null)

  useEffect(() => {
    setInteger(numberToAnimate.split('.')[0])
    setDecimal(numberToAnimate.split('.')?.[1])
  }, [numberToAnimate])
  return (
    <>
      <span style={{ display: 'inline-block' }}><ReactAnimatedNumber animateToNumber={+integer} /></span>
      {(decimal !== undefined) && (+decimal !== 0 || showZeroAfterDot) && '.'}
      {(decimal !== undefined) && (+decimal !== 0 || showZeroAfterDot) && <span style={{ display: 'inline-block' }}><ReactAnimatedNumber animateToNumber={+decimal} /></span>}
    </>
  )
}

export default AnimatedNumber
