import React from 'react'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'

import { store } from './store'
import { theme } from './static/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import WelcomePage from '@containers/WelcomePage/WelcomePage'
import Notifier from '@containers/Notifier/Notifier'
import { SnackbarProvider } from 'notistack'
import GlobalLoader from '@containers/GlobalLoader/GlobalLoader'
setConfig({
  reloadHooks: false
})
const App: React.FC = () => {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={99}>
            <WelcomePage />
            <Notifier />
            <GlobalLoader />
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
export default process.env.NODE_ENV === 'development' ? hot(App) : App
