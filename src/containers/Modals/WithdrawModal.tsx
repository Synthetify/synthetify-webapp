import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ModalTemplate from '@components/Modals/ModalTemplate/ModalTemplate'
import { withdraw } from '@selectors/modals'
import { userMaxWithdraw } from '@selectors/exchange'
import { actions } from '@reducers/modals'
import { BN } from '@project-serum/anchor'
import { SvgIcon } from '@material-ui/core'
import { ReactComponent as WithdrawIcon } from '@static/svg/withdraw_ic.svg'

export const WithdrawModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(withdraw)
  const maxWithdraw = useSelector(userMaxWithdraw)
  return (
    <ModalTemplate
      onSend={(amount: BN) => {
        dispatch(actions.withdraw({ amount }))
      }}
      icon={
        <SvgIcon
          component={WithdrawIcon}
          style={{ width: 220, height: 220 }}
          viewBox='0 0 220 220'
        />
      }
      open={modalState.open}
      title='Withdraw'
      ticker='SNY'
      helpText='Enter a custom or max amount of collateral token you want to withdraw.'
      loading={modalState.sending}
      txid={modalState.txid}
      handleClose={() => {
        if (modalState.txid) {
          dispatch(actions.closeModal('withdraw'))
          setTimeout(() => {
            dispatch(actions.resetModal('withdraw'))
          }, 500)
        } else {
          dispatch(actions.closeModal('withdraw'))
        }
      }}
      balance={maxWithdraw}
      decimals={6}
      amountSend={modalState.amount}
    />
  )
}

export default WithdrawModal
