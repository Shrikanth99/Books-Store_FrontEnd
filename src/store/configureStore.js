import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { productsReducer } from '../redux-reducers/products-reducer'
import { addressReducer } from '../redux-reducers/address-reducer'
import { wishlistReducer } from '../redux-reducers/wishlist-reducer'

const configureStore = () =>{
    const store = createStore(combineReducers({
        products: productsReducer,
        address : addressReducer,
        wishlist:wishlistReducer
    }),applyMiddleware(thunk))
    return store
}
 

export default configureStore