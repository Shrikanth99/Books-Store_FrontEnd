const initialState = {data:[]}

export const wishlistReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'CREATE_WISHLIST':{
            return {...state,data:[...state.data,action.payload]}
        }
        case 'SET_WISHLIST':{
            return {...state,data:action.payload}
        }
        case 'REMOVE_WISHLIST':{
            return {...state,data:state.data.filter(ele=>ele._id!=action.payload)}
        }
        case 'CLEAR_WISHLIST' : {
            return {...state, data:[] }
        }
        default:{
            return {...state}
        }
    }
}