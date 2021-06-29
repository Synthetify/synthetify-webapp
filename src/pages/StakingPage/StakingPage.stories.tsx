import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import StakingPage from './StakingPage'
import { PublicKey } from '@solana/web3.js'
import Header from '@components/HeaderRedesign/Header'
import { toBlur } from '@consts/uiUtils'
import Footer from '@components/Footer/Footer'

storiesOf('pages/StakingPage', module)
  .addDecorator(withKnobs)
  .add('Example staking page', () => (
    <div id={toBlur}>
      <Header
        address={new PublicKey(42)}
        onNetworkSelect={(chosen: string) => {
          action(`network changed to: ${chosen}`)()
        }}
        onWalletSelect={(chosen: string) => {
          action(`wallet changed to: ${chosen}`)()
        }}
        walletConnected={true}
        landing='staking'
      />
      <StakingPage />
      <Footer />
    </div>
  ))
