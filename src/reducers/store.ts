import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';

const composeEnhancers = typeof window === 'object' && Reflect.has(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__') ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const middleware = [thunkMiddleware]

if (process.env.NODE_ENV === 'development') {
    middleware.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(applyMiddleware(...middleware))

export default function configStore () {
    return createStore(rootReducer, enhancer)
}