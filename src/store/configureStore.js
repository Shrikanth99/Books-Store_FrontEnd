import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { paymentsReducer } from '../redux-reducers/payment-reducer'
import { productsReducer } from '../redux-reducers/products-reducer'
import { addressReducer } from '../redux-reducers/address-reducer'
import { wishlistReducer } from '../redux-reducers/wishlist-reducer'
import { orderReducer } from '../redux-reducers/order-reducer'
import { reviewReducer } from '../redux-reducers/review-reducer'
import { categoryReducer } from '../redux-reducers/category-reducer'
import { procurementReducer } from '../redux-reducers/procurement-reducer'

const configureStore = () =>{
    const store = createStore(combineReducers({
        payments : paymentsReducer,
        products: productsReducer,
        address : addressReducer,
        wishlist:wishlistReducer,
        order: orderReducer,
        review : reviewReducer,
        categories : categoryReducer,
        procurement: procurementReducer
    }),applyMiddleware(thunk))
    return store
}
 

export default configureStore