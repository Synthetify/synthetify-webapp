import { PublicKey } from '@solana/web3.js'
import { Network } from '@synthetify/sdk'

export const VAULTS_MAP: {
  [key in Network]: Array<{ synthetic: PublicKey; collateral: PublicKey }>
} = {
  [Network.DEV]: [
    {
      synthetic: new PublicKey('76qqFEokX3VgTxXX8dZYkDMijFtoYbJcxZZU4DgrDnUF'),
      collateral: new PublicKey('91qzpKj8nwYkssvG52moAtUUiWV5w4CuHwhkPQtBWTDE')
    },
    {
      synthetic: new PublicKey('HL5aKrMbm13a6VGNRSxJmy61nRsgySDacHVpLzCwHhL5'),
      collateral: new PublicKey('HgexCyLCZUydm7YcJWeZRMK9HzsU17NJQvJGnMuzGVKG')
    }
  ],
  [Network.LOCAL]: [],
  [Network.MAIN]: [],
  [Network.TEST]: []
}
