import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import CreateAccountModalComponent from '#components/Modals/CreateAccountModal/CreateAccountModal'
import { createAccount } from '#selectors/modals'
import { assets } from '#selectors/exchange'
import { accounts } from '#selectors/solanaWallet'
import { actions } from '#reducers/modals'
import { actions as snackbarActions } from '#reducers/snackbars'
import { PublicKey } from '@solana/web3.js'

export const CreateAccountModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(createAccount)
  const exchangeAssets = useSelector(assets)
  const userAccounts = useSelector(accounts)
  return (
    <CreateAccountModalComponent
      onSend={(tokenAddress: PublicKey) => {
        if (userAccounts[tokenAddress.toString()]) {
          dispatch(
            snackbarActions.add({
              message: 'Token account already exist.',
              variant: 'info',
              persist: false
            })
          )
        } else {
          dispatch(actions.createAccount({ tokenAddress }))
        }
      }}
      open={modalState.open}
      assets={Object.values(exchangeAssets)}
      loading={modalState.sending}
      txid={modalState.txid}
      handleClose={() => {
        if (modalState.txid) {
          dispatch(actions.closeModal('createAccount'))
          setTimeout(() => {
            dispatch(actions.resetModal('createAccount'))
          }, 500)
        } else {
          dispatch(actions.closeModal('createAccount'))
        }
      }}
    />
  )
}

export default CreateAccountModal
