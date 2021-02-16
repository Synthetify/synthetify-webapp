import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import SendMoneyModalComponent from '@components/Modals/SendMoneyModal/SendMoneyModal'
import { tokenBalance } from '@selectors/solanaWallet'
import { send } from '@selectors/modals'
import { actions } from '@reducers/modals'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

export const SendMoneyModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(send)
  const { balance, decimals } = useSelector(tokenBalance(modalState.tokenAddress))
  console.log(decimals)
  console.log(balance.toString())
  return (
    <SendMoneyModalComponent
      onSend={(amount: BN, recipient: string) => {
        dispatch(actions.send({ amount, recipient: new PublicKey(recipient) }))
      }}
      open={modalState.open}
      loading={modalState.sending}
      txid={modalState.txid}
      handleClose={() => {
        if (modalState.txid) {
          dispatch(actions.closeModal('send'))
          setTimeout(() => {
            dispatch(actions.resetModal('send'))
          }, 500)
        } else {
          dispatch(actions.closeModal('send'))
        }
      }}
      balance={balance}
      decimals={decimals}
    />
  )
}

export default SendMoneyModal
