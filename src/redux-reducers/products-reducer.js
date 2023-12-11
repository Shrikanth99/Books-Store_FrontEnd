const initialState = {data:[],cart:[]}

export const productsReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_PRODUCTS':{
            return {...state,data: action.payload}
        }
        case 'SET_CARTS':{
            return {...state,cart:action.payload}
        }
        default:{
            return {...state}
        }
    }
}