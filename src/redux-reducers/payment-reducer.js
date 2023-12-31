const initialState = { payment:{}, allPayments:[] }

export const paymentsReducer = (state=initialState,action) => {
    switch(action.type){
        case 'SUCCESS_PAYMENT':{
            return {...state,payment:action.payload}    
        }
        default : {
            return {...state}
        }
    }
}