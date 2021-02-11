import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { actions } from '@reducers/snackbars'
import { snackbars } from '@selectors/snackbars'

let displayed: string[] = []

const Notifier = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(snackbars)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: string) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: string) => {
    displayed = [...displayed.filter(key => id !== key)]
  }

  React.useEffect(() => {
    notifications.forEach(({ key = '', message, open, action, variant, persist = true }) => {
      if (!open) {
        // dismiss snackbar using notistack
        closeSnackbar(key)
        return
      }

      // do nothing if snackbar is already displayed
      if (key && displayed.includes(key)) return

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        action: action,
        variant: variant,
        persist: persist,
        // autoHideDuration: 5000,
        onExited: (_event, myKey) => {
          dispatch(actions.remove(myKey as string))
          removeDisplayed(myKey as string)
        }
      })
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])

  return null
}

export default Notifier
