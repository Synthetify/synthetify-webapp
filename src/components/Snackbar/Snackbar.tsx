import React from 'react'
import { SnackbarProvider } from 'notistack'
import useStyles from './style'

interface ISnackbarProps {
  children: JSX.Element[]
}
export const Snackbar: React.FC<ISnackbarProps> = ({ children }) => {
  const classes = useStyles()
  return (
    <SnackbarProvider
      maxSnack={99}
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info
      }}>
      {children}
    </SnackbarProvider>
  )
}
export default Snackbar
