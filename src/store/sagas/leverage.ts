import { actions } from '@reducers/leverage'
import { synthetics, getLeverageVaultPairs } from '@selectors/exchange'
import { accounts } from '@selectors/solanaWallet'
import { getExchangeProgram } from '@web3/programs/exchange'
import { BN } from '@project-serum/anchor'
import { spawn, all, select, put, call } from 'typed-redux-saga'

export function* initLeveragePairs(): Generator {
  const syntheticTokens = yield* select(synthetics)
  const tokensAccounts = yield* select(accounts)
  const exchangeProgram = yield* call(getExchangeProgram)
  const leverageVaults = yield* select(getLeverageVaultPairs)

  for (const vault of leverageVaults) {
    const syntheticAccount = tokensAccounts[vault.synthetic.toString()]
    const collateralAccount = tokensAccounts[vault.collateral.toString()]
    const { vaultAddress } = yield* call(
      [exchangeProgram, exchangeProgram.getVaultAddress],
      vault.synthetic,
      vault.collateral,
      vault.vaultType
    )

    if (
      syntheticTokens[vault.collateral.toString()].symbol === 'xUSD' &&
      syntheticTokens[vault.synthetic.toString()].symbol[0] === 'x'
    ) {
      // add short
      yield* put(
        actions.setShortPair({
          collateralSymbol: syntheticTokens[vault.collateral.toString()].symbol,
          syntheticSymbol: syntheticTokens[vault.synthetic.toString()].symbol,
          collateralBalance: collateralAccount
            ? { val: collateralAccount.balance, scale: collateralAccount.decimals }
            : { val: new BN(0), scale: 1 },
          syntheticBalance: syntheticAccount
            ? { val: syntheticAccount.balance, scale: syntheticAccount.decimals }
            : { val: new BN(0), scale: 1 },
          vaultAddress: vaultAddress,
          ...vault
        })
      )
    }
    if (
      syntheticTokens[vault.synthetic.toString()].symbol === 'xUSD' &&
      syntheticTokens[vault.collateral.toString()].symbol[0] === 'x'
    ) {
      yield* put(
        actions.setLongPair({
          collateralSymbol: syntheticTokens[vault.collateral.toString()].symbol,
          syntheticSymbol: syntheticTokens[vault.synthetic.toString()].symbol,
          collateralBalance: collateralAccount
            ? { val: collateralAccount.balance, scale: collateralAccount.decimals }
            : { val: new BN(0), scale: 1 },
          syntheticBalance: syntheticAccount
            ? { val: syntheticAccount.balance, scale: syntheticAccount.decimals }
            : { val: new BN(0), scale: 1 },
          vaultAddress: vaultAddress,
          ...vault
        })
      )
    }
  }
}

// export function* setLeverageVaultAddres(): Generator {
//   yield* takeEvery(actions.setLeveragePair, initLeveragePairs)
// }

export function* leverageSaga(): Generator {
  yield all([].map(spawn))
}
