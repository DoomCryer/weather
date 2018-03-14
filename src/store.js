import { createStore, applyMiddleware } from 'redux'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import { createLogger } from 'redux-logger'
import rootReducer from './modules/index'

const loggerMiddleware = createLogger()
const middlewares = [reduxPackMiddleware, loggerMiddleware]

export default createStore(rootReducer, {}, applyMiddleware(...middlewares))
