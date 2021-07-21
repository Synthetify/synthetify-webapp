import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TokenList } from '@components/TokenList/TokenList'
import { accountsArray, accounts } from '@selectors/solanaWallet'
import { assets, collaterals, synthetics } from '@selectors/exchange'
import SelectTokenModal from '@components/Modals/SelectTokenModal/SelectTokenModal'
import { actions } from '@reducers/staking'
import { actions as snackbarActions } from '@reducers/snackbars'
import { blurContent, unblurContent } from '@consts/uiUtils'

export const TokenListWrapper: React.FC = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const userTokens = useSelector(accountsArray)
  const allTokens = useSelector(assets)
  const allSynthetics = useSelector(synthetics)
  const allCollaterals = useSelector(collaterals)
  const userAccounts = useSelector(accounts)

  return (
    <>
      <TokenList
        tokens={userTokens.map(
          token => ({
            ...token,
            ticker: token.symbol
          })
        )}
        addAccount={() => {
          blurContent()
          setOpen(true)
        }}
      />
      <SelectTokenModal
        tokens={allTokens.map(token => token.symbol)}
        open={open}
        centered={true}
        anchorEl={null}
        onSelect={(chosen) => {
          const syntheticTokenAddress = Object.values(allSynthetics).find((synthetic) => allTokens[synthetic.assetIndex].symbol === chosen)?.assetAddress
          const collateralTokenAddress = Object.values(allCollaterals).find((collateral) => allTokens[collateral.assetIndex].symbol === chosen)?.collateralAddress
          if (userAccounts[chosen]) {
            dispatch(
              snackbarActions.add({
                message: 'Token account already exist.',
                variant: 'info',
                persist: false
              })
            )
          } else if (syntheticTokenAddress) {
            dispatch(actions.createAccount({ tokenAddress: syntheticTokenAddress }))
          } else if (collateralTokenAddress) {
            dispatch(actions.createAccount({ tokenAddress: collateralTokenAddress }))
          }
        }}
        handleClose={() => {
          unblurContent()
          setOpen(false)
        }}
      />
    </>
  )
}

export default TokenListWrapper
