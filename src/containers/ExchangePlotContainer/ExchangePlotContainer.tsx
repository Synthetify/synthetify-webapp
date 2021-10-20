import ExchangePlot from '@components/ExchangePlot/ExchangePlot'
import { ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import React, { useEffect, useState } from 'react'
import Binance from 'binance-api-node'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'

const ExchangePlotContainer: React.FC<{ token?: ExchangeSyntheticTokens }> = ({ token }) => {
  const firstTimestamp = Date.now()
  const [data, setData] = useState<Array<{ x: number, y: number }>>(
    [...Array(25).keys()].map((index) => ({
      x: firstTimestamp - (index * 1000 * 60 * 60),
      y: 1
    })).reverse()
  )
  const binanceClient = Binance()

  useEffect(() => {
    const timestamp = Date.now()
    if ((!token) || (token.symbol === 'xUSD')) {
      setData(
        [...Array(25).keys()].map((index) => ({
          x: timestamp - (index * 1000 * 60 * 60),
          y: 1
        })).reverse()
      )

      return
    }

    binanceClient.candles({
      symbol: `${token?.symbol.substr(1)}USDT`,
      interval: '1h',
      limit: 25
    }).then((candles) => {
      const newData = candles.map((candle) => ({
        x: candle.closeTime,
        y: +candle.close
      }))
      newData[24].x = timestamp // necessary because closeTime on last candle is greater than actual current timestamp
      setData(newData)
    }).catch(() => {})
  }, [token?.symbol])

  return (
    <ExchangePlot
      tokenName={token?.symbol ?? 'xUSD'}
      supply={token?.supply ?? { val: new BN(0), scale: 0 }}
      maxSupply={token?.maxSupply ?? { val: new BN(0), scale: 0 }}
      assetAddress={token?.assetAddress ?? DEFAULT_PUBLICKEY}
      price={token?.price ?? { val: new BN(1), scale: 6 }}
      data={data}
    />
  )
}

export default ExchangePlotContainer
