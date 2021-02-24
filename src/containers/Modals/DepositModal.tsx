import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ModalTemplate from '@components/Modals/ModalTemplate/ModalTemplate'
import { tokenBalance } from '@selectors/solanaWallet'
import { deposit } from '@selectors/modals'
import { collateralToken } from '@selectors/exchange'
import { actions } from '@reducers/modals'
import { BN } from '@project-serum/anchor'
import { SvgIcon } from '@material-ui/core'
import { ReactComponent as DepositIcon } from '@static/svg/depo_ic.svg'

export const SendMoneyModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(deposit)
  const token = useSelector(collateralToken)
  const { balance, decimals } = useSelector(tokenBalance(token))
  return (
    <ModalTemplate
      onSend={(amount: BN) => {
        dispatch(actions.deposit({ amount }))
      }}
      icon={
        <SvgIcon component={DepositIcon} style={{ width: 220, height: 220 }} viewBox='0 0 220 220' />
      }
      open={modalState.open}
      title='Deposit'
      ticker='SNY'
      helpText='Enter a custom or max amount of SNY collateral token you want to deposit.'
      loading={modalState.sending}
      txid={modalState.txid}
      handleClose={() => {
        if (modalState.txid) {
          dispatch(actions.closeModal('deposit'))
          setTimeout(() => {
            dispatch(actions.resetModal('deposit'))
          }, 500)
        } else {
          dispatch(actions.closeModal('deposit'))
        }
      }}
      balance={balance}
      decimals={decimals}
      amountSend={modalState.amount}
    />
  )
}

export default SendMoneyModal
