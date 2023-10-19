import React from 'react'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'

import { store } from './store'
import { theme } from './static/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Notifier from '@containers/Notifier/Notifier'
import GlobalLoader from '@containers/GlobalLoader/GlobalLoader'
import PagesRouter from './pages/PagesRouter'
import Snackbar from '@components/Snackbar/Snackbar'

setConfig({
  reloadHooks: false
})
const App: React.FC = () => {
  const persistor = persistStore(store)
  // Redirect to https://twitter.com/synthetify
  window.location.href = 'https://twitter.com/synthetify'
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Snackbar maxSnack={99}>
            <Notifier />
            <GlobalLoader />
            <PagesRouter />
          </Snackbar>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
export default process.env.NODE_ENV === 'development' ? hot(App) : App
