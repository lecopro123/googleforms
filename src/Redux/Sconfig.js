import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import reducers from './reducer'

const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {
    const { createLogger } = require(`redux-logger`)
    const logger = createLogger({
        collapsed: true
    })

    middlewares.push(logger)
}

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
