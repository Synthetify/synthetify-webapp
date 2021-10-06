// these defs are only temporary - they are also on the branch with redux logic but it's not finished yet

import { BN } from '@project-serum/anchor'
import { ICollateral, ISynthetic } from '@reducers/exchange'
import { Asset, Swapline } from '@synthetify/sdk/lib/exchange'

export type SwaplineSwapType = 'nativeToSynthetic' | 'syntheticToNative'

export type ExchangeSyntheticTokens = Asset & ISynthetic & { balance: BN }

export type ExchangeCollateralTokens = Asset & ICollateral & { balance: BN }

export interface SwaplinePair extends Swapline {
  collateralData: ExchangeCollateralTokens
  syntheticData: ExchangeSyntheticTokens
}
