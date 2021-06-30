import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TokenList } from '@components/TokenList/TokenList'
import { accountsArray, accounts } from '@selectors/solanaWallet'
import { assets } from '@selectors/exchange'
import SelectTokenModal from '@components/Modals/SelectTokenModal/SelectTokenModal'
import { actions } from '@reducers/modals'
import { actions as snackbarActions } from '@reducers/snackbars'
import { blurContent, unblurContent } from '@consts/uiUtils'

export const TokenListWrapper: React.FC = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const userTokens = useSelector(accountsArray)
  const allTokens = useSelector(assets)
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
        tokens={Object.values(allTokens).map(token => token.symbol)}
        open={open}
        centered={true}
        anchorEl={null}
        onSelect={(chosen) => {
          const tokenAddress = Object.values(allTokens).find(token => token.symbol === chosen)?.assetAddress
          if (userAccounts[chosen]) {
            dispatch(
              snackbarActions.add({
                message: 'Token account already exist.',
                variant: 'info',
                persist: false
              })
            )
          } else if (tokenAddress) {
            dispatch(actions.createAccount({ tokenAddress }))
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
