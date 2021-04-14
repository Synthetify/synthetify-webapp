import React from 'react'
import SolanaWalletEvents from './solanaWallet'
import ExchangeEvents from './exchange'
import ManagerEvents from './manager'

const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <ExchangeEvents />
      <ManagerEvents />
    </>
  )
}

export default EventHandler
