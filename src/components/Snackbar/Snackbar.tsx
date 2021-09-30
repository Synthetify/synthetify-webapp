import React from 'react'
import { SnackbarProvider } from 'notistack'
import useStyles from './style'
import { useSelector } from 'react-redux'
import { snackbars } from '@selectors/snackbars'
import { network } from '@selectors/solanaConnection'
import { ISnackbar } from '@store/reducers/snackbars'
interface ISnackbarProps {
  children: JSX.Element[]
  maxSnack: number
}
export const Snackbar: React.FC<ISnackbarProps> = ({ children, maxSnack }) => {
  const classes = useStyles()

  const snackbarsArray: ISnackbar[] = useSelector(snackbars)
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
      autoHideDuration= {99999999}
    >
      {children}
    </SnackbarProvider>

  )
}
export default Snackbar
