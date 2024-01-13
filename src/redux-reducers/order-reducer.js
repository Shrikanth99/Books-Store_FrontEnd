const initialState = {orders:[]  }

export const orderReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'GET_ORDER':{
            return {...state, orders:action.payload}
        }
        case 'ALL_ORDERS' : {
            return { ...state, orders : action.payload  }
        }
        case 'REMOVE_ORDER':{
            return {...state,orders:state.orders.filter(ele=>ele._id !== action.payload)}
        }
        default:{
            return {...state}
        }
    }
}