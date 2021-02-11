import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import historyProvider from '../providers/historyProvider'

// It will start spinning sagas passed to it as an args
export const sagaMiddleware = createSagaMiddleware()

// Push custom middleware here
export const middleware = [sagaMiddleware, routerMiddleware(historyProvider)]
