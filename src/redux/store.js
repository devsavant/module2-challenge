import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer } from './productsDuck';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    products:productsReducer,
})

export default () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
    // traer algo del api que siempre se usa
    store.dispatch({
        type:"GET_TOKEN_FROM_LOCAL"
    })
    return store
}