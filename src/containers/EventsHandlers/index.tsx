import React from 'react'
import SolanaWalletEvents from './solanaWallet'
import ExchangeEvents from './exchange'
import VaultEvents from './vault'
const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <ExchangeEvents />
      <VaultEvents />
    </>
  )
}

export default EventHandler
