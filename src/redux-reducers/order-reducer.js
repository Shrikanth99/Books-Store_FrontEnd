const initialState = {orders:[]}

export const orderReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'GET_ORDER':{
            return {...state,orders:action.payload}
        }
        
        default:{
            return {...state}
        }
    }
}