import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TokenList } from '@components/TokenList/TokenList'
import { accountsArray } from '@selectors/solanaWallet'
import { actions } from '@reducers/modals'

export const TokenListWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const userTokens = useSelector(accountsArray)

  return <TokenList
    tokens={userTokens.map(
      token => ({
        ...token,
        ticker: token.symbol ?? 'token',
        decimals: 6
      })
    )}
    addAccount={() => { dispatch(actions.openModal('createAccount')) }}
  />
}

export default TokenListWrapper
