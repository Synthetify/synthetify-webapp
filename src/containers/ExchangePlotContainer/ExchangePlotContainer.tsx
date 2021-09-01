import ExchangePlot from '@components/ExchangePlot/ExchangePlot'
import { ExchangeTokensWithBalance } from '@selectors/solanaWallet'
import React, { useEffect, useState } from 'react'
import Binance from 'binance-api-node'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'

const ExchangePlotContainer: React.FC<{ token?: ExchangeTokensWithBalance }> = ({ token }) => {
  const firstTimestamp = Date.now()
  console.log(firstTimestamp)
  const [data, setData] = useState<Array<{ x: number, y: number }>>(
    [...Array(25).keys()].map((index) => ({
      x: firstTimestamp - (index * 1000 * 60 * 60),
      y: 1
    }))
  )
  const binanceClient = Binance()

  useEffect(() => {
    if ((!token) || (token.symbol === 'xUSD')) {
      const timestamp = Date.now()
      setData(
        [...Array(25).keys()].map((index) => ({
          x: timestamp - (index * 1000 * 60 * 60),
          y: 1
        }))
      )

      return
    }

    binanceClient.candles({
      symbol: `${token?.symbol.substr(1)}USDT`,
      interval: '1h',
      limit: 25
    }).then((candles) => {
      setData(
        candles.map((candle) => ({
          x: candle.closeTime,
          y: +candle.close
        }))
      )
    }).catch(() => {})
    console.log(token)
  }, [token])

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
