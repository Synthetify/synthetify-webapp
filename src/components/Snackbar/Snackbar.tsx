import React from 'react'
import { SnackbarProvider } from 'notistack'
import useStyles from './style'
import { store } from '@store/index'
import { useSelector } from 'react-redux'
import { snackbars } from '@selectors/snackbars'
import { network } from '@selectors/solanaConnection'

interface ISnackbarProps {
  children: JSX.Element[]
  maxSnack: number
}
export const Snackbar: React.FC<ISnackbarProps> = ({ children, maxSnack }) => {
  const classes = useStyles()

  const snackbarsArray = useSelector(snackbars)
  const currentNetwork: string = useSelector(network)

  return (
    <SnackbarProvider
      maxSnack={maxSnack}
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info
      }}

      action={
        (
          <button className={classes.button} onClick={() => {
            const txid: string = snackbarsArray.at(-1).txid
            console.log(currentNetwork)
            console.log(txid)
            if (currentNetwork.toLocaleLowerCase() === 'devnet' && txid !== undefined) {
              window.open('https://explorer.solana.com/tx/' + txid + '?cluster=devnet')
            } else if (currentNetwork.toLocaleLowerCase() === 'testnet' && txid !== undefined) {
              window.open('https://explorer.solana.com/tx/' + txid + '?cluster=testnet')
            } else if (currentNetwork.toLocaleLowerCase() === 'mainnet' && txid !== undefined) {
              window.open('https://explorer.solana.com/tx/' + txid)
            }
            // window.open(URL);
          } }>
            Details
          </button>
        )}
      // autoHideDuration= {99999999}
    >
      {children}
    </SnackbarProvider>
  )
}
export default Snackbar
