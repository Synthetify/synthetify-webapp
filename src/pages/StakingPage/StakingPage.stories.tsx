import React from 'react'
import { storiesOf } from '@storybook/react'
import { BN } from '@project-serum/anchor'
import { IToken } from '@components/TokenItem/TokenItem'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import StakingPage from './StakingPage'
import { PublicKey } from '@solana/web3.js'
import Header from '@components/HeaderRedesign/Header'
import { toBlur } from '@consts/uiUtils'

const xSNY: IToken = {
  ticker: '$SNY',
  balance: new BN(562830),
  decimals: 6,
  usdValue: new BN(116579)
}

const xBTC: IToken = {
  ticker: '$BTC',
  balance: new BN(1e6),
  decimals: 6,
  usdValue: new BN(391933000)
}

const SOL: IToken = {
  ticker: 'SOL',
  balance: new BN(394987483),
  decimals: 6,
  usdValue: new BN(180593500)
}

const FTT: IToken = {
  ticker: 'FTT',
  balance: new BN(2 * 1e6),
  decimals: 6,
  usdValue: new BN(341000)
}

const tokens = [xSNY, xBTC, SOL, FTT]

storiesOf('pages/StakingPage', module)
  .addDecorator(withKnobs)
  .add(
    'Example staking page',
    () => (
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
        <StakingPage
          stakedValue={new BN(100000000)}
          currentDebt={new BN(735645)}
          collateralRatio={501.5}
          tokens={tokens}
          addAccount={action('addAccount')}
        />
      </div>
    )
  )
