import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Tokens from '@components/Tokens/Tokens'
import { syntheticAccountsArray, accounts, stakedAccountsArray } from '@selectors/solanaWallet'
import { synthetics } from '@selectors/exchange'
import SelectTokenModal from '@components/Modals/SelectModals/SelectTokenModal/SelectTokenModal'
import { actions } from '@reducers/staking'
import { actions as snackbarActions } from '@reducers/snackbars'
import { blurContent, unblurContent } from '@consts/uiUtils'

export const TokenListWrapper: React.FC = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const userTokens = useSelector(syntheticAccountsArray)
  const userStaked = useSelector(stakedAccountsArray)
  const allSynthetics = useSelector(synthetics)
  const userAccounts = useSelector(accounts)

  return (
    <>
      <Tokens
        synthetic={userTokens.map(
          token => ({
            ...token,
            ticker: token.symbol
          })
        )}
        staked={userStaked.map(
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
        tokens={Object.values(allSynthetics).map(token => ({ symbol: token.symbol }))}
        open={open}
        centered={true}
        anchorEl={null}
        onSelect={(chosen) => {
          const syntheticTokenAddress = Object.values(allSynthetics).find((synthetic) => synthetic.symbol === chosen)?.assetAddress
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
