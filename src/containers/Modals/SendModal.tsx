import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import SendModalComponent from '@components/Modals/SendModal/SendModal'
import { send } from '@selectors/modals'
import { actions } from '@reducers/modals'
import { BN } from '@project-serum/anchor'
import { SvgIcon } from '@material-ui/core'
import SendIcon from '@static/svg/send_ic.svg'
import { tokenBalance } from '@selectors/solanaWallet'
import { tokenTicker } from '@selectors/exchange'
import { PublicKey } from '@solana/web3.js'

export const SendModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(send)
  const { balance, decimals } = useSelector(tokenBalance(modalState.tokenAddress))
  const ticker = useSelector(tokenTicker(modalState.tokenAddress))
  return (
    <SendModalComponent
      onSend={(amount: BN, recipient: string) => {
        dispatch(actions.send({ amount, recipient: new PublicKey(recipient) }))
      }}
      icon={
        <SvgIcon component={SendIcon} style={{ width: 220, height: 220 }} viewBox='0 0 220 220' />
      }
      open={modalState.open}
      title='Send'
      ticker={ticker || 'xBTC'}
      helpText={`Send a set amount of ${ticker || 'xBTC'} to the recipient.`}
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
      amountSend={modalState.amount}
      sendTo={modalState.recipient.toString()}
    />
  )
}

export default SendModal
