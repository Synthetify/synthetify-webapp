import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ModalTemplate from '@components/Modals/ModalTemplate/ModalTemplate'
import { mint } from '@selectors/modals'
import { userMaxMintUsd } from '@selectors/exchange'
import { actions } from '@reducers/modals'
import { BN } from '@project-serum/anchor'
import { SvgIcon } from '@material-ui/core'
import MintIcon from '@static/svg/mint_ic.svg'

export const SendMoneyModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(mint)
  const maxUsd = useSelector(userMaxMintUsd)
  return (
    <ModalTemplate
      onSend={(amount: BN) => {
        dispatch(actions.mint({ amount }))
      }}
      icon={
        <SvgIcon component={MintIcon} style={{ width: 220, height: 220 }} viewBox='0 0 220 220' />
      }
      open={modalState.open}
      title='Mint'
      ticker='xUSD'
      helpText='Enter a custom or max amount of xUSD you want to mint.'
      loading={modalState.sending}
      txid={modalState.txid}
      handleClose={() => {
        if (modalState.txid) {
          console.log('reset')
          dispatch(actions.closeModal('mint'))
          setTimeout(() => {
            dispatch(actions.resetModal('mint'))
          }, 500)
        } else {
          dispatch(actions.closeModal('mint'))
        }
      }}
      balance={maxUsd}
      decimals={6}
      amountSend={modalState.amount}
    />
  )
}

export default SendMoneyModal
