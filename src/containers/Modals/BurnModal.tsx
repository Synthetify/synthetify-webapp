import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ModalTemplate from '#components/Modals/ModalTemplate/ModalTemplate'
import { burn } from '#selectors/modals'
import { tokenTicker, userMaxBurnToken } from '#selectors/exchange'
import { actions } from '#reducers/modals'
import { BN } from '@project-serum/anchor'
import { SvgIcon } from '@material-ui/core'
import BurnIcon from '#static/svg/burn_ic.svg'
import { tokenAccount } from '#selectors/solanaWallet'

export const WithdrawModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(burn)
  const burnedTokenAccount = useSelector(tokenAccount(modalState.tokenAddress))
  const maxBurnToken = useSelector(userMaxBurnToken(modalState.tokenAddress))
  const ticker = useSelector(tokenTicker(modalState.tokenAddress))
  return (
    <ModalTemplate
      onSend={(amount: BN) => {
        dispatch(actions.burn({ amount }))
      }}
      icon={
        <SvgIcon component={BurnIcon} style={{ width: 220, height: 220 }} viewBox='0 0 220 220' />
      }
      open={modalState.open}
      title='Burn'
      ticker={ticker || 'xBTC'}
      helpText={`Enter a custom or max amount of ${ticker || 'xBTC'} token you want to burn.`}
      loading={modalState.sending}
      txid={modalState.txid}
      handleClose={() => {
        dispatch(actions.closeModal('burn'))
        dispatch(actions.resetModal('burn'))
      }}
      balance={
        burnedTokenAccount?.balance.lt(maxBurnToken) ? burnedTokenAccount?.balance : maxBurnToken
      }
      decimals={burnedTokenAccount?.decimals}
      amountSend={modalState.amount}
    />
  )
}

export default WithdrawModal
