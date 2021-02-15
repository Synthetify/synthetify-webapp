import React from 'react'
import SolanaWalletEvents from './solanaWallet'
import ExchangeEvents from './exchange'

const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <ExchangeEvents />
    </>
  )
}

export default EventHandler
